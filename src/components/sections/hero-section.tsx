"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";
import type { GalleryPhoto } from "@/lib/gallery";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

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
          <motion.div
            initial={{ y: 16 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col items-start gap-5 sm:gap-6"
          >
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
              {content.hero.subtitle}
            </p>
            <h1 className="display-title max-w-xl">{content.hero.title}</h1>
            <p className="max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.hero.body}
            </p>
            <HeroActions donationUrl={donationUrl} onDark={false} />
          </motion.div>
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.12, ease }}
            className="flex justify-center lg:justify-end"
          >
            <Image
              src="/images/logo1.webp"
              alt={SITE.name}
              width={480}
              height={480}
              preload
              className="w-full max-w-md rounded-[2rem] object-cover shadow-2xl"
            />
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative">
      <div className="relative isolate h-[min(78svh,40rem)] min-h-[32rem] overflow-hidden bg-ink md:h-[calc(100svh-5rem)] md:min-h-[38rem]">
        <Image
          src={photo.src}
          alt={photo.caption || "FOUND IT! Thrift Store"}
          fill
          preload
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/88 via-black/52 to-black/25" />
        <div className="relative mx-auto flex h-full w-full max-w-6xl flex-col justify-end px-5 pt-24 pb-8 sm:px-8 sm:pb-16 md:pb-20">
          <motion.div
            initial={{ y: 18 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, ease }}
            className="flex max-w-3xl flex-col items-start gap-4 sm:gap-6"
          >
            <Image
              src="/images/logo1.webp"
              alt=""
              width={88}
              height={88}
              className="size-14 rounded-2xl object-cover shadow-lg ring-1 ring-background/20 sm:size-20"
            />
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
              {content.hero.subtitle}
            </p>
            <h1 className="display-title text-background">{content.hero.title}</h1>
            <p className="hidden max-w-xl text-lg leading-relaxed text-background/80 md:block">
              {content.hero.body}
            </p>
            <HeroActions donationUrl={donationUrl} onDark />
          </motion.div>
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
