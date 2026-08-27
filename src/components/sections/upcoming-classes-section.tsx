import Link from "next/link";
import { Container, Eyebrow } from "@/components/layout/container";
import { Reveal, RevealItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { formatClassWhen } from "@/lib/format";
import { seatsLeft, type ClassWithCounts } from "@/lib/classes";

export function UpcomingClassesSection({ classes }: { classes: ClassWithCounts[] }) {
  if (classes.length === 0) return null;

  return (
    <section className="border-t py-20 sm:py-28">
      <Container className="flex flex-col gap-12">
        <Reveal className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div className="flex max-w-xl flex-col gap-4">
            <Eyebrow>Learn with us</Eyebrow>
            <h2 className="display-title-md">Upcoming classes</h2>
            <p className="text-muted-foreground">
              Register online. We will follow up by email or phone.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/classes">All classes</Link>
          </Button>
        </Reveal>
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
      </Container>
    </section>
  );
}
