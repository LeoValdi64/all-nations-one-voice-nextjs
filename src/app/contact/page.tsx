import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import OngLayout from "@/components/layout/ong-layout";
import { Container, Eyebrow } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { MapEmbed } from "@/components/media/map-embed";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/constants";
import { getPublicContent } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Contact All Nations One Voice in Federal Way. Office hours are by appointment. Visit FOUND IT! Thrift Store at the same address.",
};

const faqs = [
  {
    title: "How can I help?",
    body: "Donate online, donate items to the thrift store, volunteer, or email us. We will talk through what is most useful.",
  },
  {
    title: "How do I donate money?",
    body: "Use the Donate button for a secure Stripe gift. For a bank transfer, email or call us and we will share instructions privately. We do not publish account numbers.",
  },
  {
    title: "Can I visit?",
    body: "Yes. The store has its own hours. Office meetings are Monday–Friday, 10am–4pm, by appointment.",
  },
  {
    title: "Do you offer classes?",
    body: "When a class is scheduled, it is listed on the Classes page with online registration. We do not currently advertise GED or English classes.",
  },
];

export default async function ContactPage() {
  const content = await getPublicContent();
  const mailto = `${SITE.emailHref}?subject=${encodeURIComponent("Message from the website")}`;
  const facebook = content.links.facebook || SITE.facebook;
  const donationUrl = content.links.donation || SITE.donationUrl;
  const mapsUrl = content.links.maps || SITE.mapsShare;

  return (
    <OngLayout>
      <PageIntro align="left" eyebrow="Federal Way" title="Contact us">
        Call, email, or come by. Office visits are by appointment. The thrift store is at the same
        address with its own hours.
      </PageIntro>

      <section className="pb-16 sm:pb-24">
        <Container className="grid items-start gap-10 lg:grid-cols-12">
          <Reveal className="flex flex-col gap-10 lg:col-span-7">
            <div className="flex flex-col gap-4">
              <Eyebrow>The destination</Eyebrow>
              <p className="display-title-md">{SITE.addressLine1}</p>
              <p className="font-heading text-2xl text-muted-foreground sm:text-3xl">{SITE.cityLine}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <Clock className="mt-1 size-4 shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Office hours</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{content.officeHours}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 size-4 shrink-0 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Store hours</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{content.storeHours}</p>
                </div>
              </div>
            </div>
          </Reveal>

          <RevealItem className="lg:col-span-5" delay={0.08}>
            <Card>
              <CardHeader>
                <CardTitle className="font-heading text-2xl font-medium">Send a message</CardTitle>
                <CardDescription>
                  There is no fake contact form. Email or call us and we will get back to you.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-5">
                <Separator />
                <div className="flex flex-col gap-3">
                  <a
                    href={SITE.emailHref}
                    className="flex min-h-11 items-center gap-3 text-sm break-all hover:text-primary"
                  >
                    <Mail className="size-4 shrink-0" />
                    {SITE.email}
                  </a>
                  <a
                    href={SITE.phoneHref}
                    className="flex min-h-11 items-center gap-3 text-sm hover:text-primary"
                  >
                    <Phone className="size-4 shrink-0" />
                    {SITE.phone}
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg" className="h-12">
                    <a href={mailto}>Email us</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12">
                    <a href={SITE.phoneHref}>Call {SITE.phone}</a>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="h-12">
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="secondary" className="h-12">
                    <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                      Donate
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </RevealItem>
        </Container>
      </section>

      <section className="border-t">
        <Container className="py-10 sm:py-14">
          <Card className="overflow-hidden py-0">
            <CardHeader className="pt-6">
              <CardTitle className="font-heading text-2xl font-medium">Find us</CardTitle>
              <CardDescription>
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
                  {SITE.fullAddress}
                </a>
              </CardDescription>
            </CardHeader>
            <CardContent className="px-0 pb-0">
              <MapEmbed title="All Nations One Voice map" />
            </CardContent>
          </Card>
        </Container>
      </section>

      <section className="border-t py-16 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="display-title-md mt-4">Frequently asked</h2>
          </Reveal>
          <div className="flex flex-col lg:col-span-8">
            {faqs.map((item, index) => (
              <RevealItem key={item.title} delay={index * 0.05}>
                <div className="flex flex-col gap-3 py-7">
                  <h3 className="font-heading text-2xl font-medium">{item.title}</h3>
                  <p className="leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
                {index < faqs.length - 1 ? <Separator /> : null}
              </RevealItem>
            ))}
          </div>
        </Container>
      </section>
    </OngLayout>
  );
}
