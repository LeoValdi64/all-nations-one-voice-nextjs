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

  const [featured, ...rest] = photos;

  return (
    <div className="flex flex-col gap-4">
      {featured ? (
        <RevealItem>
          <figure className="group">
            <PhotoFrame
              src={featured.src}
              alt={featured.caption || "FOUND IT! Thrift Store"}
              sizes="(max-width: 1024px) 100vw, 70vw"
              preload
              className="aspect-[16/10] rounded-2xl sm:aspect-[16/9]"
            />
            {featured.caption ? (
              <figcaption className="mt-3 text-sm text-muted-foreground">{featured.caption}</figcaption>
            ) : null}
          </figure>
        </RevealItem>
      ) : null}

      <div className="columns-1 gap-4 sm:columns-2">
        {rest.map((photo, index) => (
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
