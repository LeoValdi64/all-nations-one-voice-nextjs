import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { formatClassWhen } from "@/lib/format";
import { seatsLeft, type ClassWithCounts } from "@/lib/classes";

export function UpcomingClassesSection({ classes }: { classes: ClassWithCounts[] }) {
  if (classes.length === 0) return null;

  return (
    <section className="px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
              Upcoming classes
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Register online. We will follow up by email or phone.
            </p>
          </div>
          <Button asChild variant="outline">
            <Link href="/classes">All classes</Link>
          </Button>
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {classes.map((item) => {
            const left = seatsLeft(item);
            return (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.title}</CardTitle>
                  <CardDescription>{formatClassWhen(item.startsAt, item.endsAt)}</CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  <p className="line-clamp-3 text-muted-foreground">{item.description}</p>
                  <p className="text-sm text-muted-foreground">
                    {left == null ? "Open registration" : `${left} seat${left === 1 ? "" : "s"} left`}
                  </p>
                  <Button asChild variant="outline">
                    <Link href="/classes">View details</Link>
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
