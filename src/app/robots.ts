import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin", "/api/"],
    },
    sitemap: "https://allnationsonevoice.org/sitemap.xml",
    host: "https://allnationsonevoice.org",
  };
}
