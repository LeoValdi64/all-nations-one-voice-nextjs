import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { SiteContent } from "@/lib/content";

export function AboutUsSection({ content }: { content: SiteContent }) {
  return (
    <section className="bg-card px-4 py-20 sm:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-2 md:items-center">
        <div className="flex flex-col gap-6">
          <h2 className="font-heading text-3xl font-semibold tracking-tight text-primary sm:text-4xl">
            {content.about.title}
          </h2>
          <p className="text-lg text-muted-foreground">{content.about.body}</p>
          <ul className="flex flex-col gap-3">
            {content.about.bullets.map((bullet) => (
              <li key={bullet} className="flex items-start gap-3 text-muted-foreground">
                <Check className="mt-0.5 size-5 text-primary" />
                <span>{bullet}</span>
              </li>
            ))}
          </ul>
          <Button asChild className="w-fit">
            <Link href="/about">Learn more about us</Link>
          </Button>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>FOUND IT! Thrift Store</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-3 text-muted-foreground">
            <p>Shop and donate clothing and household goods at the same address as our office.</p>
            <p>This is a promotional page, not an online checkout. Come see us in Federal Way.</p>
            <Button asChild variant="outline" className="w-fit">
              <Link href="/store">See the store</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}
