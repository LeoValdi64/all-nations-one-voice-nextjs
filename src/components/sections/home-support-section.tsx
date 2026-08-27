import Link from "next/link";
import { Heart } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";
import { ORG } from "@/lib/organization";

export function HomeSupportSection({ content }: { content: SiteContent }) {
  const donationUrl = content.links.donation || SITE.donationUrl;

  return (
    <section className="py-16 sm:py-28">
      <Container className="grid items-start gap-12 lg:grid-cols-12 lg:gap-14">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>Who we serve</Eyebrow>
          <h2 className="display-title-md">Neighbors, not a program on paper.</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            People walk into one building in Federal Way. Some need a computer to look for work.
            Some need a hand with everyday needs. Many come to shop or drop off goods at the store.
          </p>
          <ul className="flex flex-col gap-3">
            {ORG.whoWeServe.map((item) => (
              <li key={item} className="text-sm leading-relaxed text-foreground/85">
                {item}
              </li>
            ))}
          </ul>
          <PhotoFrame
            src="/images/store/anv-2026-19-families.jpg"
            alt="Families leaving the store with essentials"
            sizes="(max-width: 1024px) 100vw, 40vw"
            className="mt-2 aspect-[4/3] rounded-2xl"
          />
        </Reveal>

        <RevealItem className="flex flex-col gap-8 lg:col-span-7" delay={0.08}>
          <div className="flex flex-col gap-4">
            <Eyebrow>How gifts are used</Eyebrow>
            <h3 className="font-heading text-3xl font-medium tracking-tight sm:text-4xl">
              A Stripe gift stays with this work.
            </h3>
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              Online donations go through Stripe. We do not publish bank account numbers. For a
              receipt, an employer match, or a grant packet, email us — we will send documents
              privately.
            </p>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {ORG.howGiftsAreUsed.map((item) => (
              <li
                key={item}
                className="rounded-2xl bg-card p-5 text-sm leading-relaxed text-foreground/85 ring-1 ring-foreground/8"
              >
                {item}
              </li>
            ))}
          </ul>
          <p className="text-sm leading-relaxed text-muted-foreground">
            We do not currently run {ORG.programsNotOffered.slice(0, -1).join(", ")}, or{" "}
            {ORG.programsNotOffered.at(-1)}. Support we seek is for the programs above — the store,
            the job desk, and practical help at this address.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <a href={ORG.funderEmailHref}>Email about support</a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-12">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </RevealItem>
      </Container>
    </section>
  );
}
