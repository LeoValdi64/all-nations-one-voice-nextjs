import Link from "next/link";
import { Container, Eyebrow } from "@/components/layout/container";
import { PhotoFrame } from "@/components/media/photo-frame";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteContent } from "@/lib/content";
import { ORG } from "@/lib/organization";

export function MissionSection({ content }: { content: SiteContent }) {
  return (
    <section id="mission" className="py-16 sm:py-28">
      <Container className="flex flex-col gap-10 sm:gap-14">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-4 text-center sm:gap-5">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="display-title-md">{content.mission.title}</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            {content.mission.body}
          </p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {ORG.programsCurrent.map((program, index) => {
            const service = content.services.find((item) => item.id === program.id);
            return (
              <RevealItem key={program.id} delay={index * 0.08}>
                <Card className="h-full pt-0">
                  <PhotoFrame
                    src={program.image}
                    alt={program.imageAlt}
                    sizes="(max-width: 1024px) 100vw, 33vw"
                    className="aspect-[4/3] rounded-none"
                  />
                  <CardHeader className="gap-3 pt-1">
                    <p className="font-heading text-3xl text-primary/80">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <CardTitle className="font-heading text-2xl font-medium">
                      {service?.title || program.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="leading-relaxed text-muted-foreground">
                      {service?.description || program.summary}
                    </p>
                  </CardContent>
                  <CardFooter className="border-0 bg-transparent">
                    <Button asChild variant="outline" className="h-11 w-full">
                      <Link href={program.href}>{program.cta}</Link>
                    </Button>
                  </CardFooter>
                </Card>
              </RevealItem>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
