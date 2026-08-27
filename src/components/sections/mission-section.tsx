import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ServiceIcon } from "@/components/icons/service-icon";
import type { SiteContent } from "@/lib/content";

export function MissionSection({ content }: { content: SiteContent }) {
  return (
    <section id="mission" className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {content.mission.title}
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">{content.mission.body}</p>
        </div>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {content.services.map((service) => (
            <Card key={service.id}>
              <CardHeader>
                <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ServiceIcon name={service.icon} />
                </div>
                <CardTitle>{service.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{service.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
