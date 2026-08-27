"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Heart, Menu } from "lucide-react";
import { SiteMark } from "@/components/brand/site-mark";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
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

export function SiteHeader({ content }: { content: SiteContent }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const donationUrl = content.links.donation || SITE.donationUrl;
  const facebook = content.links.facebook || SITE.facebook;

  return (
    <>
      {content.announcement ? (
        <div className="bg-accent px-4 py-2.5 text-center text-sm text-accent-foreground">
          {content.announcement}
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-20 w-full max-w-6xl items-center justify-between gap-4 px-5 sm:px-8">
          <SiteMark compact />

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-1 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-1 h-px origin-left bg-accent transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100",
                    )}
                  />
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild className="hidden sm:inline-flex">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate
              </a>
            </Button>

            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Open menu">
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[min(100%,22rem)] gap-0 bg-cream">
                <SheetHeader className="px-6 pt-6">
                  <SheetTitle className="sr-only">{SITE.name}</SheetTitle>
                  <SheetDescription className="sr-only">
                    Site navigation for {SITE.name}
                  </SheetDescription>
                  <SiteMark href="/" compact />
                </SheetHeader>
                <Separator />
                <nav className="flex flex-1 flex-col justify-center gap-1 px-6 py-8">
                  {navLinks.map((link) => {
                    const active = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "font-heading py-2 text-3xl leading-none tracking-tight transition-colors",
                          active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                        )}
                      >
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>
                <div className="flex flex-col gap-3 px-6 pb-8">
                  <Button asChild size="lg">
                    <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                      <Heart data-icon="inline-start" />
                      Donate
                    </a>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <a href={facebook} target="_blank" rel="noopener noreferrer">
                      Facebook
                    </a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
