export const SITE = {
  name: "All Nations One Voice",
  shortName: "ANOV",
  storeName: "FOUND IT! Thrift Store",
  addressLine1: "34303 Pacific Hwy S Ste 120",
  cityLine: "Federal Way, WA 98003",
  fullAddress: "34303 Pacific Hwy S Ste 120, Federal Way, WA 98003",
  email: "administration@allnationsonevoice.org",
  phone: "253-235-5057",
  phoneHref: "tel:+12532355057",
  emailHref: "mailto:administration@allnationsonevoice.org",
  facebook: "https://www.facebook.com/profile.php?id=61576508330685",
  mapsShare: "https://share.google/eTxOIDHxCbYp9ZLFe",
  mapsEmbed:
    "https://maps.google.com/maps?q=34303%20Pacific%20Hwy%20S%20Ste%20120%20Federal%20Way%20WA%2098003&z=16&output=embed",
  donationUrl:
    process.env.NEXT_PUBLIC_STRIPE_DONATION_URL ||
    "https://donate.stripe.com/dR615Z1P6eHrg6c000",
} as const;

export const DEFAULT_OFFICE_HOURS = "Monday–Friday, 10am–4pm, by appointment only";
export const DEFAULT_STORE_HOURS = "Tuesday–Sunday, 10am–5pm. Closed Monday.";
export const DEFAULT_CLASS_LOCATION = SITE.fullAddress;
