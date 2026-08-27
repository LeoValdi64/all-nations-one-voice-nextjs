import { SITE } from "@/lib/constants";
import { ORG } from "@/lib/organization";

export function OrganizationJsonLd() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: ORG.legalName,
    alternateName: ORG.storeName,
    url: ORG.siteUrl,
    email: SITE.email,
    telephone: SITE.phone,
    foundingDate: String(ORG.foundedYear),
    description:
      "Job-search help, support services, and FOUND IT! Thrift Store in Federal Way, Washington.",
    address: {
      "@type": "PostalAddress",
      streetAddress: SITE.addressLine1,
      addressLocality: "Federal Way",
      addressRegion: "WA",
      postalCode: "98003",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: SITE.mapsLat,
      longitude: SITE.mapsLng,
    },
    hasMap: SITE.mapsShare,
    areaServed: {
      "@type": "City",
      name: "Federal Way",
    },
    sameAs: [SITE.facebook, SITE.instagram, SITE.mapsShare],
    department: {
      "@type": "Store",
      name: SITE.storeName,
      image: `${ORG.siteUrl}/images/store/anv-2026-18-storefront.jpg`,
      hasMap: SITE.mapsShare,
      geo: {
        "@type": "GeoCoordinates",
        latitude: SITE.mapsLat,
        longitude: SITE.mapsLng,
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.addressLine1,
        addressLocality: "Federal Way",
        addressRegion: "WA",
        postalCode: "98003",
        addressCountry: "US",
      },
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
