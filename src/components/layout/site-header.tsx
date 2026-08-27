"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Heart, Menu, X } from "lucide-react";
import { SiteMark } from "@/components/brand/site-mark";
import { Button } from "@/components/ui/button";
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

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open]);

  return (
    <>
      {content.announcement ? (
        <div className="bg-accent px-4 py-2.5 text-center text-sm text-accent-foreground">
          {content.announcement}
        </div>
      ) : null}

      <header className="sticky top-0 z-40 border-b bg-background/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between gap-3 px-[max(1.25rem,env(safe-area-inset-left))] pr-[max(1.25rem,env(safe-area-inset-right))] sm:h-20 sm:px-8">
          <SiteMark compact wordmark="desktop" />

          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative py-2 text-[0.72rem] font-semibold tracking-[0.16em] uppercase transition-colors",
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
            <Button asChild className="h-11 px-3.5 sm:px-4">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate
              </a>
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              className="lg:hidden"
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-nav"
              onClick={() => setOpen(true)}
            >
              <Menu />
            </Button>
          </div>
        </div>
      </header>

      {open ? (
        <div
          id="mobile-nav"
          className="fixed inset-0 z-50 flex flex-col bg-cream lg:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={`Site navigation for ${SITE.name}`}
        >
          <div className="flex items-center justify-between px-5 pt-[max(1rem,env(safe-area-inset-top))] pr-[max(1.25rem,env(safe-area-inset-right))] pb-4">
            <SiteMark href="/" compact />
            <Button
              type="button"
              variant="outline"
              size="icon-lg"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              <X />
            </Button>
          </div>
          <nav className="flex flex-1 flex-col justify-center gap-1 px-6">
            {navLinks.map((link) => {
              const active = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "font-heading flex min-h-14 items-center text-4xl leading-none tracking-tight transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
          <div className="flex flex-col gap-3 px-6 pb-[max(2rem,env(safe-area-inset-bottom))]">
            <p className="text-sm leading-relaxed text-muted-foreground">
              {SITE.addressLine1}
              <br />
              {SITE.cityLine}
            </p>
            <Button asChild size="lg" className="h-12">
              <a href={donationUrl} target="_blank" rel="noopener noreferrer">
                <Heart data-icon="inline-start" />
                Donate
              </a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12">
              <a href={facebook} target="_blank" rel="noopener noreferrer">
                Facebook
              </a>
            </Button>
          </div>
        </div>
      ) : null}
    </>
  );
}
