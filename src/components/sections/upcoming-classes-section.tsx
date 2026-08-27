import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { Container, Eyebrow } from "@/components/layout/container";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Empty, EmptyContent, EmptyDescription, EmptyHeader, EmptyMedia, EmptyTitle } from "@/components/ui/empty";
import { formatClassWhen } from "@/lib/format";
import { seatsLeft, type ClassWithCounts } from "@/lib/classes";
import { ORG } from "@/lib/organization";

export function UpcomingClassesSection({ classes }: { classes: ClassWithCounts[] }) {
  return (
    <section className="py-16 sm:py-28">
      <Container className="flex flex-col gap-10">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-xl flex-col gap-4">
            <Eyebrow>Learn with us</Eyebrow>
            <h2 className="display-title-md">Classes</h2>
            <p className="text-base leading-relaxed text-muted-foreground">
              When a class is scheduled, it appears here with online registration. We do not
              currently run {ORG.programsNotOffered.slice(0, -1).join(", ")}, or{" "}
              {ORG.programsNotOffered.at(-1)}.
            </p>
          </div>
          <Button asChild variant="outline" className="h-12">
            <Link href="/classes">All classes</Link>
          </Button>
        </Reveal>

        {classes.length === 0 ? (
          <Empty className="border bg-card px-6 py-12 sm:px-8">
            <EmptyHeader>
              <EmptyMedia variant="icon">
                <CalendarDays />
              </EmptyMedia>
              <EmptyTitle className="font-heading text-2xl font-medium">
                No classes scheduled right now
              </EmptyTitle>
              <EmptyDescription>
                Visit the store or contact us if you need job-search help. New classes will be
                posted here first.
              </EmptyDescription>
            </EmptyHeader>
            <EmptyContent>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <Button asChild className="h-11">
                  <Link href="/contact">Get support</Link>
                </Button>
                <Button asChild variant="outline" className="h-11">
                  <Link href="/store">Visit the store</Link>
                </Button>
              </div>
            </EmptyContent>
          </Empty>
        ) : (
          <div className="grid gap-5 md:grid-cols-3">
            {classes.map((item, index) => {
              const left = seatsLeft(item);
              return (
                <RevealItem key={item.id} delay={index * 0.08}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="font-heading text-2xl font-medium">{item.title}</CardTitle>
                      <CardDescription>{formatClassWhen(item.startsAt, item.endsAt)}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-3">
                      <p className="line-clamp-3 text-muted-foreground">{item.description}</p>
                      <p className="text-sm text-muted-foreground">
                        {left == null ? "Open registration" : `${left} seat${left === 1 ? "" : "s"} left`}
                      </p>
                    </CardContent>
                    <CardFooter>
                      <Button asChild variant="outline">
                        <Link href="/classes">View details</Link>
                      </Button>
                    </CardFooter>
                  </Card>
                </RevealItem>
              );
            })}
          </div>
        )}
      </Container>
    </section>
  );
}
