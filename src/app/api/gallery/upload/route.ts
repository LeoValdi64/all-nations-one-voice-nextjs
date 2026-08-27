import { isAdmin } from "@/lib/auth";
import { getGallery, saveGallery, uploadStoreImage } from "@/lib/storage";

function extensionFor(type: string, name: string) {
  if (type.includes("png") || name.endsWith(".png")) return "png";
  if (type.includes("webp") || name.endsWith(".webp")) return "webp";
  if (type.includes("gif") || name.endsWith(".gif")) return "gif";
  return "jpg";
}

export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const form = await request.formData();
  const file = form.get("file");
  if (!(file instanceof File) || file.size === 0) {
    return Response.json({ error: "Choose a photo to upload." }, { status: 400 });
  }
  if (file.size > 8 * 1024 * 1024) {
    return Response.json({ error: "Photos must be under 8MB." }, { status: 400 });
  }

  const ext = extensionFor(file.type, file.name);
  const id = `upload-${crypto.randomUUID()}`;
  const filename = `${id}.${ext}`;
  const src = await uploadStoreImage(filename, file);
  const photos = await getGallery();
  const nextOrder = photos.reduce((max, photo) => Math.max(max, photo.order), -1) + 1;
  const photo = {
    id,
    src,
    caption: String(form.get("caption") ?? ""),
    visible: true,
    order: nextOrder,
    source: "upload",
  };
  const next = [...photos, photo];
  await saveGallery(next);
  return Response.json({ photo, photos: next });
}
