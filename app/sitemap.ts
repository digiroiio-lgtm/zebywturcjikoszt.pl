import { CLINIC_PATH, CLINIC_UPDATED, clinicImages } from "@/lib/clinic-gallery";
import { newGuides, GUIDES_DATE } from "@/lib/guides";
import type { MetadataRoute } from "next";
import { pages, SITE_URL, UPDATED_ISO_DATE } from "@/lib/site";
import { PRICING_UPDATED_ISO_DATE } from "@/lib/pricing";
import { verifiedExperts } from "@/lib/evidence";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date(UPDATED_ISO_DATE);
  const routes = Object.values(pages).filter((page) => !page.noindex).sort((a, b) => a.slug.localeCompare(b.slug, "pl")).map((page) => ({ url: `${SITE_URL}/${page.slug}`, lastModified: new Date(page.lastUpdated ?? UPDATED_ISO_DATE), changeFrequency: "monthly" as const, priority: page.slug === "koszt" ? 0.9 : 0.7 }));
  return [{ url: `${SITE_URL}${CLINIC_PATH}`, lastModified: new Date(CLINIC_UPDATED), changeFrequency: "monthly", priority: 0.7, images: clinicImages.map((image) => `${SITE_URL}${image.src}`) }, { url: SITE_URL, lastModified: new Date(PRICING_UPDATED_ISO_DATE), changeFrequency: "weekly", priority: 1 }, ...routes, ...["poradniki", ...Object.values(newGuides).map((guide) => guide.slug)].map((slug) => ({ url: `${SITE_URL}/${slug}`, lastModified: new Date(GUIDES_DATE), changeFrequency: "monthly" as const, priority: 0.7 })), { url: `${SITE_URL}/pytania-i-odpowiedzi`, lastModified: new Date("2026-09-30T00:00:00Z"), changeFrequency: "monthly" as const, priority: 0.6 }, { url: `${SITE_URL}/nasi-lekarze`, lastModified: new Date("2026-09-30T00:00:00Z"), changeFrequency: "monthly" as const, priority: 0.5 }, { url: `${SITE_URL}/eksperci`, lastModified, changeFrequency: "monthly" as const, priority: 0.4 }, ...verifiedExperts.map((expert) => ({ url: `${SITE_URL}${expert.profileUrl}`, lastModified: new Date(`${expert.lastVerified}T00:00:00Z`), changeFrequency: "monthly" as const, priority: 0.5 }))];
}
