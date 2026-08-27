import { isAdmin } from "@/lib/auth";
import type { GalleryPhoto } from "@/lib/gallery";
import { sortPhotos, visiblePhotos } from "@/lib/gallery";
import { getGallery, persistHint, saveGallery } from "@/lib/storage";

export async function GET() {
  const photos = await getGallery();
  const admin = await isAdmin();
  return Response.json({
    photos: admin ? sortPhotos(photos) : visiblePhotos(photos),
    persist: persistHint(),
  });
}

export async function PUT(request: Request) {
  if (!(await isAdmin())) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = (await request.json().catch(() => null)) as { photos?: GalleryPhoto[] } | null;
  if (!body?.photos || !Array.isArray(body.photos)) {
    return Response.json({ error: "Expected { photos: [] }" }, { status: 400 });
  }
  await saveGallery(body.photos);
  return Response.json({ photos: sortPhotos(body.photos) });
}
