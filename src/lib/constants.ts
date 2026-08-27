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
  instagram: "https://www.instagram.com/found.it.thrift.store/",
  mapsShare: "https://maps.app.goo.gl/Wf1Pcr1gcohJKaUj7",
  mapsEmbed:
    "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2700!2d-122.3163508!3d47.2942123!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x549057387b17a28f%3A0xc24e950dd21e3661!2sFOUND%20IT!%20Thrift%20store!5e0!3m2!1sen!2sus",
  mapsLat: 47.2942123,
  mapsLng: -122.3163508,
  donationUrl:
    process.env.NEXT_PUBLIC_STRIPE_DONATION_URL ||
    "https://donate.stripe.com/dR615Z1P6eHrg6c000",
} as const;

export const DEFAULT_OFFICE_HOURS = "Monday–Friday, 10am–4pm, by appointment only";
export const DEFAULT_STORE_HOURS = "Tuesday–Sunday, 10am–5pm. Closed Monday.";
export const DEFAULT_CLASS_LOCATION = SITE.fullAddress;

const LEGACY_MAPS_URLS = new Set(["https://share.google/eTxOIDHxCbYp9ZLFe"]);

export function mapsUrl(stored?: string | null) {
  const value = stored?.trim() ?? "";
  if (!value || LEGACY_MAPS_URLS.has(value)) return SITE.mapsShare;
  return value;
}
