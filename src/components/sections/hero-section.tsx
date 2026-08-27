"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Store } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";

export function HeroSection({ content }: { content: SiteContent }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-cream" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(227,140,0,0.16),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(91,188,71,0.14),transparent_60%)]" />

      <div className="relative mx-auto grid min-h-[calc(100vh-4rem)] max-w-7xl items-center gap-12 px-4 py-16 sm:px-6 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center gap-6 text-center lg:items-start lg:text-left"
        >
          <p className="text-sm font-medium tracking-wide text-primary uppercase">
            {content.hero.subtitle}
          </p>
          <h1 className="font-heading text-4xl font-semibold tracking-tight text-primary sm:text-6xl">
            {content.hero.title}
          </h1>
          <p className="max-w-xl text-lg text-muted-foreground">{content.hero.body}</p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild size="lg">
              <Link href="/store">
                <Store data-icon="inline-start" />
                Visit the store
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contact">Get support</Link>
            </Button>
            <Button asChild size="lg" variant="secondary">
              <a href={content.links.donation || SITE.donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate
              </a>
            </Button>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="flex justify-center"
        >
          <img
            src="/images/logo1.webp"
            alt={SITE.name}
            className="w-full max-w-md drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
}
