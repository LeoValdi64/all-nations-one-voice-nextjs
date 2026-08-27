import Image from "next/image";
import Link from "next/link";
import { Heart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";
import type { GalleryPhoto } from "@/lib/gallery";
import { cn } from "@/lib/utils";

export function HeroSection({
  content,
  photo,
}: {
  content: SiteContent;
  photo: GalleryPhoto | null;
}) {
  const donationUrl = content.links.donation || SITE.donationUrl;

  if (!photo) {
    return (
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-2 lg:gap-12">
          <div className="reveal-up flex flex-col items-start gap-5 sm:gap-6">
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
              {content.hero.subtitle}
            </p>
            <h1 className="display-title max-w-xl">{content.hero.title}</h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.hero.body}
            </p>
            <HeroActions donationUrl={donationUrl} onDark={false} />
          </div>
          <div className="reveal-up flex justify-center [animation-delay:120ms] lg:justify-end">
            <Image
              src="/images/logo1.webp"
              alt={SITE.name}
              width={480}
              height={480}
              preload
              className="w-full max-w-md rounded-[2rem] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="relative isolate min-h-[34rem] overflow-hidden bg-ink h-[min(86svh,42rem)] md:h-[calc(100svh-5rem)] md:min-h-[38rem]">
        <Image
          src={photo.src}
          alt={photo.caption || "FOUND IT! Thrift Store"}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/52 to-black/25" />
        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-5 pt-20 pb-8 sm:px-8 sm:pt-24 sm:pb-16 md:pb-20">
          <div className="reveal-up flex max-w-3xl flex-col items-start gap-4 sm:gap-6">
            <div className="rounded-[1.35rem] bg-cream p-1.5 shadow-[0_12px_40px_rgba(0,0,0,0.35)] ring-1 ring-white/80 sm:rounded-[1.6rem] sm:p-2">
              <Image
                src="/images/logo1.webp"
                alt=""
                width={88}
                height={88}
                className="size-14 rounded-[1.05rem] object-cover sm:size-20 sm:rounded-[1.2rem]"
              />
            </div>
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
              {content.hero.subtitle}
            </p>
            <h1 className="display-title text-background">{content.hero.title}</h1>
            <p className="hidden max-w-xl text-lg leading-relaxed text-background/80 md:block">
              {content.hero.body}
            </p>
            <HeroActions donationUrl={donationUrl} onDark />
          </div>
        </div>
      </div>
      <div className="md:hidden">
        <p className="mx-auto max-w-6xl px-5 py-8 text-base leading-relaxed text-muted-foreground">
          {content.hero.body}
        </p>
      </div>
    </section>
  );
}

function HeroActions({
  donationUrl,
  onDark,
}: {
  donationUrl: string;
  onDark: boolean;
}) {
  const secondary = onDark
    ? "border-background/30 bg-background/12 text-background hover:bg-background/22 hover:text-background"
    : undefined;

  return (
    <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
      <Button asChild size="lg" className="h-12 w-full sm:w-auto">
        <Link href="/store">
          <Store data-icon="inline-start" />
          Visit the store
        </Link>
      </Button>
      <div className="grid grid-cols-2 gap-3 sm:contents">
        <Button asChild size="lg" variant="secondary" className={cn("h-12 w-full sm:w-auto", secondary)}>
          <Link href="/contact">Get support</Link>
        </Button>
        <Button asChild size="lg" variant="secondary" className={cn("h-12 w-full sm:w-auto", secondary)}>
          <a href={donationUrl} target="_blank" rel="noopener noreferrer">
            <Heart data-icon="inline-start" />
            Donate
          </a>
        </Button>
      </div>
    </div>
  );
}
