import { getSiteContent } from "@/lib/storage";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { OrganizationJsonLd } from "@/components/seo/organization-json-ld";
import { PageTransition } from "@/components/ui/page-transition";

export default async function OngLayout({
  children,
}: {
  children: React.ReactNode;
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
}) {
  const content = await getSiteContent();
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <OrganizationJsonLd />
      <a
        href="#main-content"
        className="bg-primary text-primary-foreground sr-only focus-visible:not-sr-only focus-visible:fixed focus-visible:top-3 focus-visible:left-3 focus-visible:z-[80] focus-visible:rounded-lg focus-visible:px-4 focus-visible:py-2"
      >
        Skip to content
      </a>
      <SiteHeader content={content} />
      <main id="main-content" className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter content={content} />
    </div>
  );
}
