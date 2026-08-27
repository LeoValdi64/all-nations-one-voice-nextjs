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
  title: "Classes | All Nations One Voice",
  description: "See upcoming classes from All Nations One Voice and register online.",
};

export default async function ClassesPage() {
  const classes = await getPublishedClasses();

  return (
    <OngLayout>
      <PageIntro eyebrow="Learn with us" title="Classes">
        When a class is scheduled, it appears here. Register online and we will follow up.
      </PageIntro>

      <section className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          {classes.length === 0 ? (
            <Empty className="border bg-card px-8 py-16">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarDays />
                </EmptyMedia>
                <EmptyTitle className="font-heading text-2xl font-medium">
                  No classes scheduled right now
                </EmptyTitle>
                <EmptyDescription>
                  We will post classes here when they are ready. Until then, visit the store or
                  contact us if you need job-search help.
                </EmptyDescription>
              </EmptyHeader>
              <EmptyContent>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Button asChild>
                    <Link href="/contact">Contact us</Link>
                  </Button>
                  <Button asChild variant="outline">
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
