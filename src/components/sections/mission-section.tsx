import { Container, Eyebrow } from "@/components/layout/container";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { ServiceIcon } from "@/components/icons/service-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import type { SiteContent } from "@/lib/content";

export function MissionSection({ content }: { content: SiteContent }) {
  return (
    <section id="mission" className="py-20 sm:py-28">
      <Container className="flex flex-col gap-14">
        <Reveal className="mx-auto flex max-w-2xl flex-col items-center gap-5 text-center">
          <Eyebrow>What we do</Eyebrow>
          <h2 className="font-heading text-4xl leading-[0.95] font-medium tracking-tight sm:text-5xl">
            {content.mission.title}
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{content.mission.body}</p>
        </Reveal>

        <div className="grid gap-5 lg:grid-cols-3">
          {content.services.map((service, index) => (
            <RevealItem key={service.id} delay={index * 0.08}>
              <Card className="h-full py-7">
                <CardHeader className="gap-5">
                  <div className="flex items-center justify-between">
                    <span className="font-heading text-3xl text-primary/80">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="flex size-10 items-center justify-center rounded-full bg-secondary text-foreground">
                      <ServiceIcon name={service.icon} />
                    </span>
                  </div>
                  <Separator />
                  <CardTitle className="font-heading text-2xl font-medium">
                    {service.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="leading-relaxed text-muted-foreground">{service.description}</p>
                </CardContent>
              </Card>
            </RevealItem>
          ))}
        </div>
      </Container>
    </section>
  );
}
