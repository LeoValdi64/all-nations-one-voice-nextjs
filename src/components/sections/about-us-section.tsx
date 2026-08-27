import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content";

export function AboutUsSection({ content }: { content: SiteContent }) {
  return (
    <section className="border-y bg-card py-20 sm:py-28">
      <Container>
        <Reveal className="grid items-start gap-14 lg:grid-cols-12">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="font-heading text-4xl leading-[0.95] font-medium tracking-tight sm:text-5xl">
              {content.about.title}
            </h2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="text-lg leading-relaxed text-muted-foreground">{content.about.body}</p>
            <ul className="flex flex-col gap-3">
              {content.about.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-foreground/85">
                  <Check className="mt-0.5 size-5 text-accent" />
                  <span>{bullet}</span>
                </li>
              ))}
            </ul>
            <Button asChild className="w-fit">
              <Link href="/about">Learn more about us</Link>
            </Button>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
