"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PageTransition } from "@/components/ui/page-transition";
import { SponsorsSection } from "@/components/sections/sponsors-section";
import { SITE } from "@/lib/constants";
import type { SiteContent } from "@/lib/content";
import { cn } from "@/lib/utils";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/store", label: "Store" },
  { href: "/classes", label: "Classes" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export function SiteChrome({
  children,
  content,
}: {
  children: React.ReactNode;
  content: SiteContent;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const donationUrl = content.links.donation || SITE.donationUrl;
  const facebook = content.links.facebook || SITE.facebook;
  const year = new Date().getFullYear();

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {content.announcement ? (
        <div className="bg-accent px-4 py-2 text-center text-sm text-accent-foreground">
          {content.announcement}
        </div>
      ) : null}

      <header className="sticky top-0 z-50 border-b bg-background/85 backdrop-blur-md">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6">
          <Link href="/" className="flex items-center gap-2">
            <img src="/images/logo1.webp" alt={SITE.name} className="h-12 w-auto" />
            <span className="hidden font-heading text-base font-semibold sm:block">
              {SITE.name}
            </span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <Button
                key={link.href}
                asChild
                variant="ghost"
                className={cn(
                  pathname === link.href && "bg-muted text-foreground",
                )}
              >
                <Link href={link.href}>{link.label}</Link>
              </Button>
            ))}
            <Button asChild>
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate
              </a>
            </Button>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden" aria-label="Open menu">
                <Menu />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>{SITE.name}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-2 px-4">
                {navLinks.map((link) => (
                  <Button
                    key={link.href}
                    asChild
                    variant={pathname === link.href ? "secondary" : "ghost"}
                    className="justify-start"
                  >
                    <Link href={link.href} onClick={() => setOpen(false)}>
                      {link.label}
                    </Link>
                  </Button>
                ))}
                <Button asChild>
                  <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                    <Heart data-icon="inline-start" />
                    Donate
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>

      <section className="bg-accent px-4 py-16 text-accent-foreground sm:px-6">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <h2 className="font-heading text-3xl font-semibold tracking-tight sm:text-4xl">
            Visit, donate, or ask for help
          </h2>
          <p className="max-w-2xl text-accent-foreground/90">
            FOUND IT! Thrift Store and our support desk share one address in Federal Way.
            Come by, donate online, or send us a message.
          </p>
          <div className="flex flex-col items-center gap-3 sm:flex-row">
            <Button asChild variant="secondary" size="lg">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate now
              </a>
            </Button>
            <Button asChild variant="outline" size="lg" className="border-white/40 bg-white text-foreground">
              <Link href="/contact">Contact us</Link>
            </Button>
          </div>
        </div>
      </section>

      <SponsorsSection />

      <footer className="border-t bg-card px-4 py-12 sm:px-6">
        <div className="mx-auto grid max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col gap-4">
            <h3 className="font-heading text-lg font-semibold">{SITE.name}</h3>
            <p className="text-sm text-muted-foreground">
              A Federal Way nonprofit offering job-search help, support services, and a
              community thrift store.
            </p>
            <Button asChild variant="outline" className="w-fit">
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-semibold">Quick links</h3>
            <div className="flex flex-col gap-2">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-primary">
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-semibold">Visit</h3>
            <p className="text-sm text-muted-foreground">{SITE.fullAddress}</p>
            <a className="text-sm text-muted-foreground hover:text-primary" href={SITE.emailHref}>
              {SITE.email}
            </a>
            <a className="text-sm text-muted-foreground hover:text-primary" href={SITE.phoneHref}>
              {SITE.phone}
            </a>
          </div>

          <div className="flex flex-col gap-3">
            <h3 className="font-heading text-lg font-semibold">Stay in touch</h3>
            <p className="text-sm text-muted-foreground">
              Email us for updates. We do not run a fake newsletter signup.
            </p>
            <Button asChild>
              <a href={SITE.emailHref}>Email {SITE.email}</a>
            </Button>
          </div>
        </div>

        <Separator className="mx-auto mt-10 max-w-7xl" />
        <p className="mx-auto mt-6 max-w-7xl text-center text-sm text-muted-foreground">
          © {year} {SITE.name}. All rights reserved. Site by{" "}
          <a href="https://leovaldi.com" className="text-primary hover:underline" target="_blank" rel="noopener noreferrer">
            LeoValdi
          </a>
          .
        </p>
      </footer>
    </div>
  );
}
