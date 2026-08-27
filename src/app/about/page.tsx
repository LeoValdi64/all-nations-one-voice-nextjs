import type { Metadata } from "next";
import OngLayout from "@/components/layout/ong-layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getPublicContent } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "About Us | All Nations One Voice",
  description:
    "All Nations One Voice is a Federal Way nonprofit offering job-search help, support services, and FOUND IT! Thrift Store.",
};

const team = [
  { name: "Bersabed Ponce", role: "President", image: "/images/img2.webp" },
  { name: "Claudia Santana", role: "Vice President / Treasurer", image: "/images/img6.jpeg" },
  { name: "Carlos Santana", role: "Secretary", image: "/images/img5.jpeg" },
  { name: "Julian Santana", role: "Board Member", image: "" },
];

export default async function AboutPage() {
  const content = await getPublicContent();

  return (
    <OngLayout>
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">About us</h1>
          <p className="mt-5 text-lg text-muted-foreground">{content.about.body}</p>
        </div>
      </section>

      <section className="px-4 pb-16 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 md:items-center">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight">Our story</h2>
            <p className="mt-4 text-lg text-muted-foreground">
              All Nations One Voice began in 2025 in Federal Way. The work is local: sit with
              someone who needs a computer to look for a job, offer practical support, and keep
              FOUND IT! Thrift Store open at the same address.
            </p>
            <p className="mt-4 text-lg text-muted-foreground">
              We do not currently run GED or English classes. When a class is scheduled, it will
              appear on the Classes page so people can register.
            </p>
          </div>
          <img
            src="/images/about.jpg"
            alt="All Nations One Voice"
            className="h-80 w-full rounded-xl object-cover ring-1 ring-foreground/10"
          />
        </div>
      </section>

      <section className="bg-muted/40 px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight">Our values</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {content.values.map((value) => (
              <Card key={value.title}>
                <CardHeader>
                  <CardTitle>{value.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{value.body}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-6">
        <div className="mx-auto max-w-7xl">
          <h2 className="text-center font-heading text-3xl font-semibold tracking-tight">Our team</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((person) => (
              <Card key={person.name} className="text-center">
                <CardHeader className="items-center">
                  {person.image ? (
                    <img
                      src={person.image}
                      alt={person.name}
                      className="size-28 rounded-full object-cover"
                    />
                  ) : (
                    <div className="flex size-28 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground">
                      Photo
                    </div>
                  )}
                  <CardTitle>{person.name}</CardTitle>
                </CardHeader>
                <CardContent className="text-muted-foreground">{person.role}</CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </OngLayout>
  );
}
