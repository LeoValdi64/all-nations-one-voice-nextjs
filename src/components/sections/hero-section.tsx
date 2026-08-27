"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";
import type { GalleryPhoto } from "@/lib/gallery";

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
        <div className="mx-auto grid min-h-[calc(100vh-5rem)] max-w-6xl items-center gap-12 px-5 py-16 sm:px-8 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease }}
            className="flex flex-col items-start gap-6"
          >
            <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
              {content.hero.subtitle}
            </p>
            <h1 className="font-heading max-w-xl text-5xl leading-[0.92] font-medium tracking-tight sm:text-7xl">
              {content.hero.title}
            </h1>
            <p className="max-w-lg text-lg leading-relaxed text-muted-foreground">{content.hero.body}</p>
            <HeroActions donationUrl={donationUrl} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
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
    <section className="relative min-h-[calc(100vh-5rem)] overflow-hidden">
      <Image
        src={photo.src}
        alt={photo.caption || "FOUND IT! Thrift Store"}
        fill
        preload
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/55 to-ink/25" />
      <div className="relative mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-6xl flex-col justify-end px-5 pt-24 pb-16 sm:px-8 sm:pb-20">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease }}
          className="flex max-w-3xl flex-col items-start gap-6 text-background"
        >
          <Image
            src="/images/logo1.webp"
            alt=""
            width={88}
            height={88}
            className="size-20 rounded-2xl object-cover shadow-lg ring-1 ring-background/20"
          />
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
            {content.hero.subtitle}
          </p>
          <h1 className="font-heading text-5xl leading-[0.92] font-medium tracking-tight sm:text-7xl">
            {content.hero.title}
          </h1>
          <p className="max-w-xl text-lg leading-relaxed text-background/80">{content.hero.body}</p>
          <HeroActions donationUrl={donationUrl} onPhoto />
        </motion.div>
      </div>
    </section>
  );
}

function HeroActions({ donationUrl, onPhoto = false }: { donationUrl: string; onPhoto?: boolean }) {
  return (
    <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center">
      <Button asChild size="lg">
        <Link href="/store">
          <Store data-icon="inline-start" />
          Visit the store
        </Link>
      </Button>
      <Button asChild size="lg" variant={onPhoto ? "secondary" : "outline"}>
        <Link href="/contact">Get support</Link>
      </Button>
      <Button asChild size="lg" variant={onPhoto ? "outline" : "secondary"}>
        <a href={donationUrl} target="_blank" rel="noopener noreferrer">
          <Heart data-icon="inline-start" />
          Donate
        </a>
      </Button>
    </div>
  );
}
