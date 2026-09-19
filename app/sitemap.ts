import type { MetadataRoute } from "next";
import { pages, SITE_URL } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.values(pages).filter((page) => !page.noindex).map((page) => ({ url: `${SITE_URL}/${page.slug}`, lastModified: new Date("2026-09-19"), changeFrequency: "monthly" as const, priority: page.slug === "koszt" ? 0.9 : 0.7 }));
  return [{ url: SITE_URL, lastModified: new Date("2026-09-19"), changeFrequency: "weekly", priority: 1 }, ...routes];
}
