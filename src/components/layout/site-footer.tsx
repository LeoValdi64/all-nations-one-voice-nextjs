import Link from "next/link";
import { Heart } from "lucide-react";
import { SiteMark } from "@/components/brand/site-mark";
import { Container } from "@/components/layout/container";
import { SponsorsSection } from "@/components/sections/sponsors-section";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/classes", label: "Classes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteFooter({ content }: { content: SiteContent }) {
  const donationUrl = content.links.donation || SITE.donationUrl;
  const facebook = content.links.facebook || SITE.facebook;
  const year = new Date().getFullYear();

  return (
    <footer>
      <SponsorsSection />

      <section className="bg-ink text-background">
        <Container className="flex flex-col items-start gap-8 py-20 sm:py-24">
          <p className="text-[0.7rem] font-semibold tracking-[0.22em] text-primary uppercase">
            Federal Way
          </p>
          <h2 className="display-title max-w-3xl text-background">Visit, donate, or ask for help.</h2>
          <p className="max-w-xl text-base leading-relaxed text-background/72">
            FOUND IT! Thrift Store and our support desk share one address. Come by, give online, or
            send a real message — we will answer.
          </p>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <Button asChild size="lg" className="h-12">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate now
              </a>
            </Button>
            <Button asChild size="lg" variant="secondary" className="h-12">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </Container>
      </section>

      <div className="border-t bg-card">
        <Container className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-5">
            <SiteMark href="/" compact />
            <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">
              A Federal Way nonprofit offering job-search help, support services, and a community
              thrift store.
            </p>
            <Button asChild variant="outline" className="w-fit">
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Explore
            </p>
            <div className="flex flex-col gap-2.5">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-flex min-h-11 items-center text-sm text-foreground/80 transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Visit
            </p>
            <p className="text-sm leading-relaxed text-foreground/80">{SITE.fullAddress}</p>
            <a
              className="inline-flex min-h-11 items-center text-sm break-all text-foreground/80 hover:text-foreground"
              href={SITE.emailHref}
            >
              {SITE.email}
            </a>
            <a
              className="inline-flex min-h-11 items-center text-sm text-foreground/80 hover:text-foreground"
              href={SITE.phoneHref}
            >
              {SITE.phone}
            </a>
          </div>

          <div className="flex flex-col gap-4">
            <p className="text-[0.7rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase">
              Write to us
            </p>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Email is still the surest way to reach the team. We do not run a newsletter form.
            </p>
            <Button asChild className="w-fit">
              <a href={SITE.emailHref}>Email us</a>
            </Button>
          </div>
        </Container>

        <Separator />
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-center text-sm text-muted-foreground sm:flex-row sm:text-left">
          <p>
            © {year} {SITE.name}. All rights reserved.
          </p>
          <p>
            Site by{" "}
            <a
              href="https://leovaldi.com"
              className="inline-flex min-h-11 items-center text-foreground underline-offset-4 hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              LeoValdi
            </a>
          </p>
        </Container>
      </div>
    </footer>
  );
}
