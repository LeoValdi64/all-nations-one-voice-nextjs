import Link from "next/link";
import { Check } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import type { SiteContent } from "@/lib/content";

export function AboutUsSection({ content }: { content: SiteContent }) {
  return (
    <section className="border-y bg-card py-16 sm:py-28">
      <Container>
        <Reveal className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="flex flex-col gap-6 lg:col-span-5">
            <Eyebrow>Who we are</Eyebrow>
            <h2 className="display-title-md">{content.about.title}</h2>
          </div>
          <div className="flex flex-col gap-6 lg:col-span-7">
            <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
              {content.about.body}
            </p>
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
