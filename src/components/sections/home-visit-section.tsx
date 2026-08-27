import Link from "next/link";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { MapEmbed } from "@/components/media/map-embed";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";

export function HomeVisitSection({ content }: { content: SiteContent }) {
  const mapsUrl = content.links.maps || SITE.mapsShare;

  return (
    <section className="border-y bg-card py-16 sm:py-28">
      <Container className="grid items-start gap-10 lg:grid-cols-12 lg:gap-14">
        <Reveal className="flex flex-col gap-6 lg:col-span-5">
          <Eyebrow>Visit</Eyebrow>
          <h2 className="display-title-md">Same doors for the store and the desk.</h2>
          <p className="text-base leading-relaxed text-muted-foreground sm:text-lg">
            Come shop, donate items, or ask for job-search help. Office visits are by appointment.
            The store keeps its own hours.
          </p>
          <div className="flex flex-col gap-4">
            <div className="flex gap-3">
              <MapPin className="mt-1 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">Address</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{SITE.fullAddress}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-1 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">Store hours</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{content.storeHours}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Clock className="mt-1 size-4 shrink-0 text-primary" />
              <div>
                <p className="text-sm font-medium">Office hours</p>
                <p className="text-sm leading-relaxed text-muted-foreground">{content.officeHours}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Phone className="mt-1 size-4 shrink-0 text-primary" />
              <a href={SITE.phoneHref} className="inline-flex min-h-11 items-center text-sm hover:text-primary">
                {SITE.phone}
              </a>
            </div>
            <div className="flex gap-3">
              <Mail className="mt-1 size-4 shrink-0 text-primary" />
              <a
                href={SITE.emailHref}
                className="inline-flex min-h-11 items-center text-sm break-all hover:text-primary"
              >
                {SITE.email}
              </a>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                Get directions
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <Link href="/store">Store page</Link>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-12">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </Reveal>
        <RevealItem className="overflow-hidden rounded-2xl ring-1 ring-foreground/8 lg:col-span-7" delay={0.08}>
          <MapEmbed title="Map to All Nations One Voice and FOUND IT! Thrift Store" className="h-80 sm:h-[28rem]" />
        </RevealItem>
      </Container>
    </section>
  );
}
