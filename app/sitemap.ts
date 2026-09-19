import type { MetadataRoute } from "next";
import { pages, SITE_URL, UPDATED_ISO_DATE } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED_ISO_DATE);
  const routes = Object.values(pages).filter((page) => !page.noindex).map((page) => ({ url: `${SITE_URL}/${page.slug}`, lastModified, changeFrequency: "monthly" as const, priority: page.slug === "koszt" ? 0.9 : 0.7 }));
  return [{ url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 }, ...routes];
}
