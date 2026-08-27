import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { GalleryPhoto } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function StoreTeaserSection({ photos }: { photos: GalleryPhoto[] }) {
  return (
    <section className="py-16 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>{SITE.storeName}</Eyebrow>
          <h2 className="display-title-md">A neighborhood shop, not a cart.</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Shop and donate clothing and household goods at the same address as our office. This is
            a promotional page — inventory lives on the floor in Federal Way.
          </p>
          <Button asChild className="h-12 w-full sm:w-fit" size="lg">
            <Link href="/store">
              See the store
              <ArrowUpRight data-icon="inline-end" />
            </Link>
          </Button>
        </Reveal>

        <div className="grid grid-cols-2 gap-3 lg:col-span-7">
          {photos.length === 0 ? (
            <RevealItem className="col-span-2">
              <div className="bg-muted text-muted-foreground flex min-h-72 items-center justify-center rounded-2xl px-6 text-center">
                Store photos will appear here once they are published.
              </div>
            </RevealItem>
          ) : (
            photos.map((photo, index) => (
              <RevealItem key={photo.id} delay={index * 0.06}>
                <Link href="/store" className="group block">
                  <PhotoFrame
                    src={photo.src}
                    alt={photo.caption || "FOUND IT! Thrift Store"}
                    sizes="(max-width: 1024px) 50vw, 28vw"
                    className={cn(
                      "rounded-2xl",
                      index === 0 ? "aspect-[4/5]" : "aspect-[4/3]",
                      index === 3 ? "aspect-[5/4]" : null,
                    )}
                  />
                </Link>
              </RevealItem>
            ))
          )}
        </div>
      </Container>
    </section>
  );
}
