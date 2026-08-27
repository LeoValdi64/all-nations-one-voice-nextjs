"use client";

import { useState } from "react";
import { X } from "lucide-react";
import { PhotoFrame } from "@/components/media/photo-frame";
import { RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import type { GalleryPhoto } from "@/lib/gallery";
import { cn } from "@/lib/utils";
import Image from "next/image";

const heights = ["aspect-[4/5]", "aspect-square", "aspect-[5/4]", "aspect-[3/4]"];

export function StoreGallery({ photos }: { photos: GalleryPhoto[] }) {
  const [active, setActive] = useState<GalleryPhoto | null>(null);

  if (photos.length === 0) {
    return <p className="text-muted-foreground">Photos will appear here once they are added.</p>;
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="columns-1 gap-4 sm:columns-2">
        {photos.map((photo, index) => (
          <RevealItem key={photo.id} delay={(index % 4) * 0.05} className="mb-4 break-inside-avoid">
            <figure className="group">
              <button
                type="button"
                onClick={() => setActive(photo)}
                className="block w-full rounded-2xl text-left outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <PhotoFrame
                  src={photo.src}
                  alt={photo.caption || "FOUND IT! Thrift Store"}
                  sizes="(max-width: 640px) 100vw, 34vw"
                  className={cn("rounded-2xl", heights[index % heights.length])}
                />
              </button>
              {photo.caption ? (
                <figcaption className="mt-2 text-sm text-muted-foreground">{photo.caption}</figcaption>
              ) : null}
            </figure>
          </RevealItem>
        ))}
      </div>

      <Dialog open={Boolean(active)} onOpenChange={(open) => !open && setActive(null)}>
        <DialogContent
          showCloseButton={false}
          className="inset-3 top-3 left-3 flex h-[calc(100dvh-1.5rem)] max-h-none w-[calc(100%-1.5rem)] max-w-none translate-x-0 translate-y-0 flex-col gap-0 overflow-hidden rounded-2xl bg-ink p-0 text-background ring-0 sm:inset-6 sm:top-6 sm:left-6 sm:h-[calc(100dvh-3rem)] sm:w-[calc(100%-3rem)] sm:max-w-none"
        >
          <DialogTitle className="sr-only">{active?.caption || "Store photo"}</DialogTitle>
          <DialogDescription className="sr-only">
            Larger view of a FOUND IT! Thrift Store photograph.
          </DialogDescription>
          <div className="absolute top-3 right-3 z-10">
            <Button
              type="button"
              size="icon-lg"
              variant="secondary"
              aria-label="Close photo"
              onClick={() => setActive(null)}
            >
              <X />
            </Button>
          </div>
          {active ? (
            <div className="relative min-h-0 flex-1">
              <Image
                src={active.src}
                alt={active.caption || "FOUND IT! Thrift Store"}
                fill
                sizes="100vw"
                className="object-contain p-4 sm:p-10"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
}
