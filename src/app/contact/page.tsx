import type { Metadata } from "next";
import { Clock, Mail, MapPin, Phone } from "lucide-react";
import OngLayout from "@/components/layout/ong-layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SITE } from "@/lib/constants";
import { getPublicContent } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | All Nations One Voice",
  description:
    "Contact All Nations One Voice in Federal Way. Office hours are by appointment. Visit FOUND IT! Thrift Store at the same address.",
};

export default async function ContactPage() {
  const content = await getPublicContent();

  const mailto = `${SITE.emailHref}?subject=${encodeURIComponent("Message from the website")}`;

  return (
    <OngLayout>
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">Contact us</h1>
          <p className="mt-5 text-lg text-muted-foreground">
            Call, email, or come by. Office visits are by appointment. The thrift store is at the
            same address with its own hours.
          </p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardHeader>
              <MapPin />
              <CardTitle>Address</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">
              {SITE.addressLine1}
              <br />
              {SITE.cityLine}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Mail />
              <CardTitle>Email</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={SITE.emailHref} className="text-muted-foreground hover:text-primary">
                {SITE.email}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Phone />
              <CardTitle>Phone</CardTitle>
            </CardHeader>
            <CardContent>
              <a href={SITE.phoneHref} className="text-muted-foreground hover:text-primary">
                {SITE.phone}
              </a>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Clock />
              <CardTitle>Office hours</CardTitle>
            </CardHeader>
            <CardContent className="text-muted-foreground">{content.officeHours}</CardContent>
          </Card>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <Card className="mx-auto max-w-3xl">
          <CardHeader>
            <CardTitle>Send a message</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-4">
            <p className="text-muted-foreground">
              There is no fake contact form. Email or call us and we will get back to you.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild>
                <a href={mailto}>Email us</a>
              </Button>
              <Button asChild variant="outline">
                <a href={SITE.phoneHref}>Call {SITE.phone}</a>
              </Button>
              <Button asChild variant="outline">
                <a href={content.links.facebook || SITE.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight">
            Frequently asked questions
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>How can I help?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Donate online, donate items to the thrift store, volunteer, or email us. We will
                talk through what is most useful.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>How do I donate money?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Use the Donate button for a secure Stripe gift. For a bank transfer, email or call
                us and we will share instructions privately. We do not publish account numbers.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Can I visit?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                Yes. The store has its own hours. Office meetings are Monday–Friday, 10am–4pm, by
                appointment.
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Do you offer classes?</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                When a class is scheduled, it is listed on the Classes page with online
                registration. We do not currently advertise GED or English classes.
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </OngLayout>
  );
}
