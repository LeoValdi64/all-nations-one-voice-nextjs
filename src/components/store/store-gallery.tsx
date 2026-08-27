import Image from "next/image";
import { X } from "lucide-react";
import { PhotoFrame } from "@/components/media/photo-frame";
import { RevealItem } from "@/components/motion/reveal";
import { buttonVariants } from "@/components/ui/button";
import type { GalleryPhoto } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const heights = ["aspect-[4/5]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]"];

export function StoreGallery({ photos }: { photos: GalleryPhoto[] }) {
  if (photos.length === 0) {
    return <p className="text-muted-foreground">Photos will appear here once they are added.</p>;
  }

  return (
    <div id="store-gallery" className="flex flex-col gap-4">
      <div className="columns-1 gap-4 sm:columns-2">
        {photos.map((photo, index) => (
          <RevealItem key={photo.id} delay={(index % 4) * 0.05} className="mb-4 break-inside-avoid">
            <figure className="group">
              <a
                href={`#photo-${photo.id}`}
                className="block w-full rounded-2xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <PhotoFrame
                  src={photo.src}
                  alt={photo.caption || "FOUND IT! Thrift Store"}
                  sizes="(max-width: 640px) 100vw, 34vw"
                  className={cn("rounded-2xl", heights[index % heights.length])}
                />
              </a>
              {photo.caption ? (
                <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>
              ) : null}
            </figure>
          </RevealItem>
        ))}
      </div>

      {photos.map((photo) => (
        <div
          key={`lightbox-${photo.id}`}
          id={`photo-${photo.id}`}
          className="photo-lightbox"
          role="dialog"
          aria-label={photo.caption || "Store photo"}
        >
          <div className="flex justify-end p-3">
            <a
              href="#store-gallery"
              className={cn(buttonVariants({ size: "icon-lg", variant: "secondary" }))}
              aria-label="Close photo"
            >
              <X />
            </a>
          </div>
          <div className="relative min-h-0 flex-1">
            <Image
              src={photo.src}
              alt={photo.caption || "FOUND IT! Thrift Store"}
              fill
              sizes="100vw"
              className="object-contain p-4 sm:p-10"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
