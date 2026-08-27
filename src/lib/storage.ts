import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { neon } from "@neondatabase/serverless";
import { list, put } from "@vercel/blob";
import { mergeSiteContent, type SiteContent } from "@/lib/content";
import type { ClassItem, Registration } from "@/lib/classes";
import type { GalleryPhoto } from "@/lib/gallery";

const BLOB_PREFIX = "anv/";
const LOCAL_DIR = path.join(process.cwd(), "data");
const SEED_DIR = path.join(process.cwd(), "src/data");

type StoreDoc = { key: string; seedFile: string };

const KEYS = {
  content: { key: "site-content.json", seedFile: "site-content.json" },
  gallery: { key: "store-gallery.json", seedFile: "store-gallery.json" },
  classes: { key: "classes.json", seedFile: "classes.json" },
  registrations: { key: "registrations.json", seedFile: "registrations.json" },
} as const satisfies Record<string, StoreDoc>;

function hasBlobToken() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function databaseUrl() {
  return process.env.DATABASE_URL?.trim() || "";
}

function hasDatabase() {
  return Boolean(databaseUrl());
}

function sql() {
  return neon(databaseUrl());
}

function canWriteLocal() {
  return process.env.VERCEL !== "1";
}

async function readSeedFile<T>(file: string, fallback: T): Promise<T> {
  try {
    const raw = await readFile(path.join(SEED_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

async function readLocalOverlay<T>(file: string): Promise<T | null> {
  try {
    const raw = await readFile(path.join(LOCAL_DIR, file), "utf8");
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

async function readBlobJson<T>(file: string): Promise<T | null> {
  if (!hasBlobToken()) return null;
  const { blobs } = await list({ prefix: `${BLOB_PREFIX}${file}`, limit: 10 });
  const match = blobs.find((blob) => blob.pathname === `${BLOB_PREFIX}${file}`) ?? blobs[0];
  if (!match) return null;
  const response = await fetch(match.url, { cache: "no-store" });
  if (!response.ok) return null;
  return (await response.json()) as T;
}

async function readDatabaseJson<T>(file: string): Promise<T | null> {
  if (!hasDatabase()) return null;
  const rows = await sql()`
    SELECT value FROM site_docs WHERE key = ${file} LIMIT 1
  `;
  const value = rows[0]?.value;
  return value ? (value as T) : null;
}

async function readDocument<T>(doc: StoreDoc, fallback: T): Promise<T> {
  const fromBlob = await readBlobJson<T>(doc.key);
  if (fromBlob) return fromBlob;
  const fromDatabase = await readDatabaseJson<T>(doc.key);
  if (fromDatabase) return fromDatabase;
  const fromLocal = await readLocalOverlay<T>(doc.key);
  if (fromLocal) return fromLocal;
  return readSeedFile<T>(doc.seedFile, fallback);
}

async function writeDocument<T>(file: string, value: T) {
  const body = JSON.stringify(value, null, 2);
  if (hasBlobToken()) {
    await put(`${BLOB_PREFIX}${file}`, body, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
      contentType: "application/json",
    });
    return;
  }
  if (hasDatabase()) {
    await sql()`
      INSERT INTO site_docs (key, value, updated_at)
      VALUES (${file}, ${JSON.parse(body)}::jsonb, now())
      ON CONFLICT (key)
      DO UPDATE SET value = EXCLUDED.value, updated_at = now()
    `;
    return;
  }
  if (!canWriteLocal()) {
    throw new Error(
      "Production storage is read-only. Add DATABASE_URL or BLOB_READ_WRITE_TOKEN so admin changes persist.",
    );
  }
  await mkdir(LOCAL_DIR, { recursive: true });
  await writeFile(path.join(LOCAL_DIR, file), body, "utf8");
}

export async function uploadStoreImage(filename: string, file: Blob) {
  if (hasBlobToken()) {
    const blob = await put(`${BLOB_PREFIX}store/${filename}`, file, {
      access: "public",
      addRandomSuffix: false,
      allowOverwrite: true,
    });
    return blob.url;
  }
  if (hasDatabase()) {
    const bytes = Buffer.from(await file.arrayBuffer());
    const mime = file.type || "application/octet-stream";
    await sql()`
      INSERT INTO site_media (id, mime, bytes, updated_at)
      VALUES (${filename}, ${mime}, ${bytes}, now())
      ON CONFLICT (id)
      DO UPDATE SET mime = EXCLUDED.mime, bytes = EXCLUDED.bytes, updated_at = now()
    `;
    return `/api/media/${filename}`;
  }
  if (!canWriteLocal()) {
    throw new Error(
      "Photo uploads need DATABASE_URL or BLOB_READ_WRITE_TOKEN on Vercel.",
    );
  }
  const bytes = Buffer.from(await file.arrayBuffer());
  const publicDir = path.join(process.cwd(), "public/images/store");
  await mkdir(publicDir, { recursive: true });
  await writeFile(path.join(publicDir, filename), bytes);
  return `/images/store/${filename}`;
}

export async function getStoredMedia(id: string) {
  if (!hasDatabase() || !id) return null;
  const rows = await sql()`
    SELECT mime, bytes FROM site_media WHERE id = ${id} LIMIT 1
  `;
  const row = rows[0];
  if (!row) return null;
  const bytes = row.bytes;
  const buffer = Buffer.isBuffer(bytes) ? bytes : Buffer.from(bytes as Uint8Array);
  return { mime: String(row.mime || "application/octet-stream"), bytes: buffer };
}

export async function getSiteContent(): Promise<SiteContent> {
  const raw = await readDocument<Partial<SiteContent>>(KEYS.content, {});
  return mergeSiteContent(raw);
}

export async function saveSiteContent(content: SiteContent) {
  await writeDocument(KEYS.content.key, content);
}

export async function getGallery(): Promise<GalleryPhoto[]> {
  const raw = await readDocument<{ photos?: GalleryPhoto[] }>(KEYS.gallery, { photos: [] });
  return raw.photos ?? [];
}

export async function saveGallery(photos: GalleryPhoto[]) {
  await writeDocument(KEYS.gallery.key, { photos });
}

export async function getClasses(): Promise<ClassItem[]> {
  const raw = await readDocument<{ classes?: ClassItem[] }>(KEYS.classes, { classes: [] });
  return raw.classes ?? [];
}

export async function saveClasses(classes: ClassItem[]) {
  await writeDocument(KEYS.classes.key, { classes });
}

export async function getRegistrations(): Promise<Registration[]> {
  const raw = await readDocument<{ registrations?: Registration[] }>(KEYS.registrations, {
    registrations: [],
  });
  return raw.registrations ?? [];
}

export async function saveRegistrations(registrations: Registration[]) {
  await writeDocument(KEYS.registrations.key, { registrations });
}

export function persistHint() {
  if (hasBlobToken()) return "blob" as const;
  if (hasDatabase()) return "database" as const;
  if (canWriteLocal()) return "local" as const;
  return "readonly" as const;
}
