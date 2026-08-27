import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import OngLayout from "@/components/layout/ong-layout";
import { Container, Eyebrow } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/constants";
import { getPublicContent } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | All Nations One Voice",
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
              <p className="font-heading text-4xl leading-[0.95] font-medium tracking-tight sm:text-5xl">
                {SITE.addressLine1}
              </p>
              <p className="font-heading text-3xl text-muted-foreground">{SITE.cityLine}</p>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="flex gap-3">
                <Clock className="mt-1 size-4 text-primary" />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-medium">Office hours</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{content.officeHours}</p>
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="mt-1 size-4 text-primary" />
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
                  <a href={SITE.emailHref} className="flex items-center gap-3 text-sm hover:text-primary">
                    <Mail className="size-4" />
                    {SITE.email}
                  </a>
                  <a href={SITE.phoneHref} className="flex items-center gap-3 text-sm hover:text-primary">
                    <Phone className="size-4" />
                    {SITE.phone}
                  </a>
                </div>
                <div className="flex flex-col gap-3">
                  <Button asChild size="lg">
                    <a href={mailto}>Email us</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={SITE.phoneHref}>Call {SITE.phone}</a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="secondary">
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

      <section className="border-t py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-4">
            <Eyebrow>Questions</Eyebrow>
            <h2 className="font-heading mt-4 text-4xl leading-[0.95] font-medium tracking-tight">
              Frequently asked
            </h2>
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
