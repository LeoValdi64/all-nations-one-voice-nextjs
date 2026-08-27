import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content";

export function AboutUsSection({ content }: { content: SiteContent }) {
  return (
    <section className="border-y bg-card py-16 sm:py-28">
      <Container className="grid items-center gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="flex flex-col gap-6 lg:col-span-6">
          <Eyebrow>Who we are</Eyebrow>
          <h2 className="display-title-md">{content.about.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.about.body}
          </p>
          <ul className="flex flex-col gap-3">
            {content.about.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-foreground/85">
                <Check className="mt-0.5 size-5 shrink-0 text-accent" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild className="w-fit" size="lg">
              <Link href="/about">Meet the team</Link>
            </Button>
            <Button asChild variant="outline" className="w-fit" size="lg">
              <Link href="/contact">Write to us</Link>
            </Button>
          </div>
        </Reveal>
        <RevealItem className="grid grid-cols-2 gap-3 lg:col-span-6" delay={0.08}>
          <PhotoFrame
            src="/images/store/anv-2026-18-storefront.jpg"
            alt="Neighbors outside FOUND IT! Thrift Store"
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="aspect-[3/4] rounded-2xl"
          />
          <PhotoFrame
            src="/images/store/anv-2026-05-red-gown.jpg"
            alt="Holiday clothing at the store"
            sizes="(max-width: 1024px) 50vw, 25vw"
            className="mt-8 aspect-[3/4] rounded-2xl sm:mt-14"
          />
        </RevealItem>
      </Container>
    </section>
  );
}
