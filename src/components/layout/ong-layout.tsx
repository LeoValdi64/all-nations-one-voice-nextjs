import { getSiteContent } from "@/lib/storage";
import { SiteChrome } from "@/components/layout/site-chrome";

export default async function OngLayout({
  children,
}: {
  children: React.ReactNode;
  title?: string;
  metaDescription?: string;
  metaKeywords?: string;
}) {
  const content = await getSiteContent();
  return <SiteChrome content={content}>{children}</SiteChrome>;
}
