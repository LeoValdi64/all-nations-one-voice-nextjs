import type { Metadata } from "next";
import Link from "next/link";
import { LegalDocument, LegalSection } from "@/components/legal/legal-document";
import { SITE } from "@/lib/constants";
import { ORG } from "@/lib/organization";

export const metadata: Metadata = {
  title: "Privacy policy",
  description:
    "How All Nations One Voice collects, uses, and protects personal information from the website, class registrations, and donations.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <LegalDocument
      eyebrow="Legal"
      title="Privacy policy"
      lede="This policy explains what personal information we collect on allnationsonevoice.org, why we collect it, and how to ask us to delete it. We do not sell personal information."
      updated={ORG.legalUpdated}
    >
      <LegalSection title="Who is responsible">
        <p>
          All Nations One Voice, {SITE.fullAddress}. Email{" "}
          <a href={SITE.emailHref} className="text-foreground underline-offset-4 hover:underline">
            {SITE.email}
          </a>{" "}
          or call {SITE.phone}.
        </p>
      </LegalSection>

      <LegalSection title="What we collect">
        <p>We collect only what we need to answer you, run a published class, or keep the site working:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Messages you send by email or phone — whatever you choose to include in that message.
          </li>
          <li>
            Class registrations: first name, last name, email, phone, and optional notes. There is
            no public contact form on this site.
          </li>
          <li>
            A staff-only login cookie named <code className="text-foreground">anv_admin</code> when
            someone signs in to the admin tools. It is httpOnly, lasts up to 14 days, and is not
            used to advertise.
          </li>
          <li>
            Basic server logs (such as date, page requested, and technical errors) that our host
            may keep to operate the website.
          </li>
        </ul>
        <p>We do not run a newsletter signup, and we do not use advertising cookies.</p>
      </LegalSection>

      <LegalSection title="How we use information">
        <p>We use it to:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>Answer questions about the store, support, volunteering, or donations</li>
          <li>Hold a class seat and follow up by email or phone</li>
          <li>Keep the website and admin tools secure</li>
          <li>Prepare a receipt or grant packet when you ask for one</li>
        </ul>
        <p>We do not sell personal information. We do not rent or trade mailing lists.</p>
      </LegalSection>

      <LegalSection title="Who else sees it">
        <p>We share information only when needed to run the work:</p>
        <ul className="list-disc space-y-2 pl-5">
          <li>
            Stripe processes money gifts on a Stripe-hosted page. We do not store your full card
            number. Stripe’s privacy terms apply to that payment.
          </li>
          <li>
            The site is hosted on Vercel. Content and class registrations may be stored in our
            database so staff can follow up.
          </li>
          <li>
            Facebook, Instagram, and Google Maps are linked from the site. If you open those links,
            those companies receive whatever their own pages collect.
          </li>
          <li>We may share information if the law requires it or to protect people from harm.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Photos of people">
        <p>
          Event and store photos may include neighbors who were present that day. If you want a
          photo of you or your child removed, email {SITE.email} with a link or a clear description.
          We will take it down from the public site when we reasonably can.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>
          This website is for the general public. We do not knowingly collect personal information
          from children under 13 through the site. Class registrations are meant for the adult who
          is signing up or the parent or guardian who registers someone in their care.
        </p>
      </LegalSection>

      <LegalSection title="How long we keep it">
        <p>
          Emails and phone messages stay as long as we need them to help you and keep a responsible
          record. Class registrations stay while the class is useful to staff and for a reasonable
          time after, then we delete them when they are no longer needed. Admin cookies expire on
          their own or when staff sign out.
        </p>
      </LegalSection>

      <LegalSection title="Your choices">
        <p>
          Email {SITE.email} to ask what information we have about you, to correct it, or to delete
          a class registration or a photo. We will respond as promptly as we reasonably can. You
          can also stop emailing or calling us at any time.
        </p>
        <p>
          Washington residents and others may have additional rights under applicable law. This
          policy is meant to be honest about our small operation, not to limit a right you already
          have.
        </p>
      </LegalSection>

      <LegalSection title="Security">
        <p>
          We use HTTPS, a restricted admin login, and hosted infrastructure. No website is perfectly
          secure. Please do not send Social Security numbers, bank account numbers, or other highly
          sensitive records through a casual email unless we have asked for a specific document and
          told you how to send it.
        </p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>
          We will update this policy if our practices change. The date at the top is the latest
          revision. See also our{" "}
          <Link href="/terms" className="text-foreground underline-offset-4 hover:underline">
            Terms and conditions
          </Link>
          .
        </p>
      </LegalSection>
    </LegalDocument>
  );
}
