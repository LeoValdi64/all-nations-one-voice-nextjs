import Link from "next/link";
import OngLayout from "@/components/layout/ong-layout";
import { Container } from "@/components/layout/container";
import { PageIntro } from "@/components/layout/page-intro";
import { SITE } from "@/lib/constants";

export function LegalDocument({
  eyebrow,
  title,
  lede,
  updated,
  children,
}: {
  eyebrow: string;
  title: string;
  lede: string;
  updated: string;
  children: React.ReactNode;
}) {
  return (
    <OngLayout>
      <PageIntro align="left" eyebrow={eyebrow} title={title}>
        {lede}
      </PageIntro>
      <section className="pb-20 sm:pb-28">
        <Container className="max-w-3xl">
          <p className="mb-10 text-sm text-muted-foreground">Last updated {updated}.</p>
          <article className="flex flex-col gap-10">{children}</article>
          <p className="mt-12 text-sm leading-relaxed text-muted-foreground">
            Questions about these pages:{" "}
            <a href={SITE.emailHref} className="text-foreground underline-offset-4 hover:underline">
              {SITE.email}
            </a>
            {" · "}
            <Link href="/contact" className="text-foreground underline-offset-4 hover:underline">
              Contact
            </Link>
            {" · "}
            <Link href="/privacy" className="text-foreground underline-offset-4 hover:underline">
              Privacy
            </Link>
            {" · "}
            <Link href="/terms" className="text-foreground underline-offset-4 hover:underline">
              Terms
            </Link>
          </p>
        </Container>
      </section>
    </OngLayout>
  );
}

export function LegalSection({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="font-heading text-2xl font-medium">{title}</h2>
      <div className="flex flex-col gap-3 text-base leading-relaxed text-muted-foreground">
        {children}
      </div>
    </section>
  );
}
