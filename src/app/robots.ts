import type { MetadataRoute } from "next";
import { headers } from "next/headers";

const CANONICAL_HOSTS = new Set(["allnationsonevoice.org", "www.allnationsonevoice.org"]);

export default async function robots(): Promise<MetadataRoute.Robots> {
  const host = (await headers()).get("host")?.split(":")[0]?.toLowerCase() ?? "";

  if (!CANONICAL_HOSTS.has(host)) {
    return {
      rules: { userAgent: "*", disallow: "/" },
    };
  }

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
