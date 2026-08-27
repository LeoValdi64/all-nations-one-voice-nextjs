import type { Metadata } from "next";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import OngLayout from "@/components/layout/ong-layout";
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
      <section className="px-4 py-16 sm:px-6 lg:py-24">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-4 text-center">
          <h1 className="font-heading text-4xl font-semibold tracking-tight sm:text-6xl">Classes</h1>
          <p className="text-lg text-muted-foreground">
            When a class is scheduled, it appears here. Register online and we will follow up.
          </p>
        </div>
      </section>

      <section className="px-4 pb-20 sm:px-6">
        <div className="mx-auto max-w-5xl">
          {classes.length === 0 ? (
            <Empty className="border">
              <EmptyHeader>
                <EmptyMedia variant="icon">
                  <CalendarDays />
                </EmptyMedia>
                <EmptyTitle>No classes scheduled right now</EmptyTitle>
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
            <div className="flex flex-col gap-6">
              {classes.map((item) => {
                const left = seatsLeft(item);
                return (
                  <Card key={item.id}>
                    <CardHeader>
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle>{item.title}</CardTitle>
                        {item.status === "cancelled" ? <Badge variant="destructive">Cancelled</Badge> : null}
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
        </div>
      </section>
    </OngLayout>
  );
}
