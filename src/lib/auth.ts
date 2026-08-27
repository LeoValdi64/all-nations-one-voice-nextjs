import { createHmac, scryptSync, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "anv_admin";

// Hash-only bootstrap so production login works before Vercel env is set.
// The plaintext password is not in this repo. ADMIN_PASSWORD overrides it.
const BOOTSTRAP_SALT_HEX = "2b5bd11ccfd7033705ffe5dcc83093f3";
const BOOTSTRAP_HASH_HEX = "688b8f98a7a7fd373ad81a9102bb8d9b6054de81082c34eac90ee49ea84b3055";

function safeEqualString(left: string, right: string) {
  const leftBuf = Buffer.from(left);
  const rightBuf = Buffer.from(right);
  if (leftBuf.length !== rightBuf.length) return false;
  return timingSafeEqual(leftBuf, rightBuf);
}

function bootstrapMatches(input: string) {
  const derived = scryptSync(input, Buffer.from(BOOTSTRAP_SALT_HEX, "hex"), 32);
  const expected = Buffer.from(BOOTSTRAP_HASH_HEX, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

export function isAdminConfigured() {
  return Boolean(process.env.ADMIN_PASSWORD) || process.env.NODE_ENV !== "production" || Boolean(BOOTSTRAP_HASH_HEX);
}

export function getAdminPassword() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== "production") return "anv-admin";
  return "";
}

function sessionSecret() {
  if (process.env.ADMIN_PASSWORD) return process.env.ADMIN_PASSWORD;
  if (process.env.NODE_ENV !== "production") return "anv-admin";
  return BOOTSTRAP_HASH_HEX;
}

export function sessionToken() {
  const secret = sessionSecret();
  if (!secret) return "";
  return createHmac("sha256", secret).update("anv-admin-session").digest("hex");
}

export function passwordMatches(input: string) {
  if (!input) return false;
  if (process.env.ADMIN_PASSWORD) {
    return safeEqualString(input, process.env.ADMIN_PASSWORD);
  }
  if (process.env.NODE_ENV !== "production" && safeEqualString(input, "anv-admin")) {
    return true;
  }
  return bootstrapMatches(input);
}

export async function isAdmin() {
  const expected = sessionToken();
  if (!expected) return false;
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) return false;
  return safeEqualString(value, expected);
}

export async function requireAdmin() {
  if (!(await isAdmin())) {
    const error = new Error("Unauthorized");
    error.name = "UnauthorizedError";
    throw error;
  }
}

export function cookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  };
}
