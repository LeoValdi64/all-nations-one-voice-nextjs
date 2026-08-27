import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/legal/legal-document";
import { SITE } from "@/lib/constants";
import { ORG } from "@/lib/organization";

export const metadata: Metadata = {
  title: "Terms and conditions",
  description:
    "Terms for using the All Nations One Voice website, visiting FOUND IT! Thrift Store, requesting support, and making donations.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Terms and conditions"
      lede="These terms explain how to use this website, visit the store, ask for help, and give. They are written in plain language for neighbors, volunteers, and people reviewing our work."
      updated={ORG.legalUpdated}
    >
      <LegalSection title="Who we are">
        <p>
          All Nations One Voice is a Federal Way nonprofit founded in {ORG.foundedYear}. FOUND IT!
          Thrift Store is our community store at the same address. The website is{" "}
          <a href={ORG.siteUrl} className="text-foreground underline-offset-4 hover:underline">
            allnationsonevoice.org
          </a>
          .
        </p>
        <p>
          {SITE.fullAddress}
          <br />
          {SITE.email} · {SITE.phone}
        </p>
      </LegalSection>

      <LegalSection title="Using this website">
        <p>
          You may browse the site to learn about our programs, store hours, and how to reach us.
          Do not use the site to break the law, send spam, try to break into staff tools, or scrape
          content in a way that harms the service.
        </p>
        <p>
          Information on the site is for general public use. Hours, photos, and class listings can
          change. If something matters for a visit, call or email first.
        </p>
      </LegalSection>

      <LegalSection title="What we offer — and what we do not">
        <p>
          Today we offer job-search help with computer access, practical support services, and
          FOUND IT! Thrift Store. Classes appear on the{" "}
          <Link href="/classes" className="text-foreground underline-offset-4 hover:underline">
            Classes
          </Link>{" "}
          page only when one is scheduled.
        </p>
        <p>
          We do not currently operate {ORG.programsNotOffered.slice(0, -1).join(", ")}, or{" "}
          {ORG.programsNotOffered.at(-1)}. We do not claim those programs here so that neighbors and
          funders see the work we actually do.
        </p>
        <p>
          Support is practical and local. We are not a government agency, a law office, a clinic, or
          a guaranteed job-placement service. Asking for help does not create a right to a specific
          outcome.
        </p>
      </LegalSection>

      <LegalSection title="The thrift store">
        <p>
          FOUND IT! is an in-person shop. There is no online cart. Items are sold as-is. Inventory
          lives on the floor and changes every day. Store hours are posted on the site and may be
          updated by staff.
        </p>
        <p>
          Please treat the space, the staff, and other shoppers with respect. We may refuse a sale
          or ask someone to leave if they are unsafe or disruptive.
        </p>
      </LegalSection>

      <LegalSection title="Donations">
        <p>
          Money gifts are processed by Stripe through the Donate link. We do not publish bank
          routing or account numbers. If you need a transfer, email or call and we will share
          instructions privately.
        </p>
        <p>
          Item donations may be accepted at the store during posted hours, subject to space and
          condition. We may decline items we cannot use.
        </p>
        <p>
          This website does not state that a gift is tax-deductible. For a receipt or documents for
          a grant or employer match, email {SITE.email}. Do not rely on the site alone for tax
          advice.
        </p>
      </LegalSection>

      <LegalSection title="Class registration">
        <p>
          When a class is published, you may register with your name, email, phone, and optional
          notes. Registering asks us to hold a seat and follow up. It is not a paid ticket unless a
          listing says otherwise. We may cancel or reschedule a class and will try to reach
          registered people at the contact they gave.
        </p>
      </LegalSection>

      <LegalSection title="Photos">
        <p>
          Photos on this site show the real store, donation days, and community events. If you
          appear in a photo and want it taken down, email us with a link or description. We will
          review the request and remove the image when we reasonably can.
        </p>
      </LegalSection>

      <LegalSection title="Nondiscrimination">
        <p>{ORG.nondiscrimination}</p>
      </LegalSection>

      <LegalSection title="Intellectual property">
        <p>
          The All Nations One Voice name, FOUND IT! name, logo, and original site copy belong to
          the organization or are used with permission. You may share links. You may not copy the
          site to impersonate us or to raise money as if you were us.
        </p>
      </LegalSection>

      <LegalSection title="Third-party services">
        <p>
          Donate, maps, Facebook, Instagram, and similar buttons leave our site. Those services
          have their own terms. We are not responsible for their pages.
        </p>
      </LegalSection>

      <LegalSection title="Disclaimer and liability">
        <p>
          The site is provided as-is. We work to keep it accurate, but we do not warrant that it is
          complete or always available. To the fullest extent Washington law allows, All Nations
          One Voice is not liable for indirect or consequential damages from using the site.
        </p>
      </LegalSection>

      <LegalSection title="Governing law">
        <p>
          These terms are governed by the laws of the State of Washington, without regard to
          conflict-of-law rules. If a court finds one part unenforceable, the rest still applies.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We may update these terms as the organization or the site changes. The date at the top is
          the latest revision. Continued use of the site after an update means you accept the
          revised terms.
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
