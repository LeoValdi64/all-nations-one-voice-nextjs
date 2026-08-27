import { getStoredMedia } from "@/lib/storage";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const media = await getStoredMedia(id);
  if (!media) {
    return new Response("Not found", { status: 404 });
  }

  return new Response(Uint8Array.from(media.bytes), {
    headers: {
      "Content-Type": media.mime,
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
}
