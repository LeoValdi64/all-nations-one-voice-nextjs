import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import OngLayout from "@/components/layout/ong-layout";
import { PageIntro } from "@/components/layout/page-intro";
import { Container } from "@/components/layout/container";
import { RegisterDialog } from "@/components/classes/register-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { formatClassWhen } from "@/lib/format";
import { seatsLeft } from "@/lib/classes";
import { getPublishedClasses } from "@/lib/site-queries";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Classes",
  description:
    "Upcoming classes from All Nations One Voice. We do not currently run GED or English classes.",
  alternates: { canonical: "/classes" },
};

export default async function ClassesPage({
  searchParams,
}: {
  searchParams: Promise<{ registered?: string; error?: string }>;
}) {
  const classes = await getPublishedClasses();
  const params = await searchParams;

  return (
    <OngLayout>
      <PageIntro eyebrow="Learn with us" title="Classes">
        When a class is scheduled, it appears here. Register online and we will follow up. We do
        not currently advertise GED, English, or Education Access classes.
      </PageIntro>
      {params.registered === "1" ? (
        <Container className="max-w-3xl pb-6">
          <p className="rounded-xl border bg-card px-4 py-3 text-sm">
            You are registered. We will contact you at the email or phone you shared.
          </p>
        </Container>
      ) : null}
      {params.error === "1" ? (
        <Container className="max-w-3xl pb-6">
          <p className="rounded-xl border bg-card px-4 py-3 text-sm text-destructive">
            We could not complete that registration. Check the form and try again.
          </p>
        </Container>
      ) : null}

      <section className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          {classes.length === 0 ? (
            <Empty className="border bg-card px-6 py-14 sm:px-8 sm:py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarDays />
                </EmptyMedia>
                <EmptyTitle className="font-heading text-2xl font-medium sm:text-3xl">
                  No classes scheduled right now
                </EmptyTitle>
                <EmptyDescription>
                  We will post classes here when they are ready. Until then, visit the store or
                  contact us if you need job-search help.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                  <Button asChild className="h-11">
                    <Link href="/contact">Contact us</Link>
                  </Button>
                  <Button asChild variant="outline" className="h-11">
                    <Link href="/store">Visit the store</Link>
                  </Button>
                </div>
              </EmptyContent>
            </Empty>
          ) : (
            <div className="flex flex-col gap-5">
              {classes.map((item) => {
                const left = seatsLeft(item);
                return (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="font-heading text-2xl font-medium">{item.title}</CardTitle>
                        {item.status === "cancelled" ? (
                          <Badge variant="destructive">Cancelled</Badge>
                        ) : null}
                      </div>
                      <CardDescription>{formatClassWhen(item.startsAt, item.endsAt)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3 text-muted-foreground">
                      <p>{item.description}</p>
                      <p>{item.location}</p>
                      <p className="text-sm">
                        {left == null
                          ? `${item.registeredCount} registered`
                          : `${item.registeredCount} registered · ${left} seat${left === 1 ? "" : "s"} left`}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <RegisterDialog item={item} />
                    </CardFooter>
                  </Card>
                );
              })}
            </div>
          )}
        </Container>
      </section>
    </OngLayout>
  );
}
