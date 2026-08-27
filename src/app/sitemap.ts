import type { MetadataRoute } from "next";

const routes = ["", "/store", "/classes", "/about", "/contact"] as const;

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map((path) => ({
    url: `https://allnationsonevoice.org${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" || path === "/store" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.7,
  }));
}
