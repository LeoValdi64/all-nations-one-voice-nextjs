import { PhotoFrame } from "@/components/media/photo-frame";
import { RevealItem } from "@/components/motion/reveal";
import type { GalleryPhoto } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const heights = ["aspect-[4/5]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]"];

export function StoreGallery({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) {
    return (
      <p className="text-muted-foreground">Photos will appear here once they are added.</p>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="columns-1 gap-4 sm:columns-2">
        {photos.map((photo, index) => (
          <RevealItem key={photo.id} delay={(index % 4) * 0.05} className="mb-4 break-inside-avoid">
            <figure className="group">
              <PhotoFrame
                src={photo.src}
                alt={photo.caption || "FOUND IT! Thrift Store"}
                sizes="(max-width: 640px) 100vw, 34vw"
                className={cn("rounded-2xl", heights[index % heights.length])}
              />
              {photo.caption ? (
                <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>
              ) : null}
            </figure>
          </RevealItem>
        ))}
      </div>
    </div>
  );
}
