import { getSiteContent } from "@/lib/storage";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
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
      <SiteHeader content={content} />
      <main className="flex-1">
        <PageTransition>{children}</PageTransition>
      </main>
      <SiteFooter content={content} />
    </div>
  );
}
