import { newGuides, GUIDES_LATEST_DATE } from "@/lib/guides";
import { allUkPages } from "@/lib/uk";
import type { MetadataRoute } from "next";
import { pages, SITE_URL, UPDATED_ISO_DATE } from "@/lib/site";
import { PRICING_UPDATED_ISO_DATE } from "@/lib/pricing";
import { verifiedExperts } from "@/lib/evidence";
import { FAQ_PUBLISHED_DATE } from "@/lib/ai-content";
import { TEAM_SOURCE_DATE, clinicalTeam } from "@/lib/clinical-team";
import { caseImages } from "@/lib/gallery";

type Entry = MetadataRoute.Sitemap[number];
const day = (iso: string) => new Date(`${iso.slice(0, 10)}T00:00:00Z`);
const latest = (dates: string[]) => dates.reduce((a, b) => (a > b ? a : b));
const abs = (path: string) => `${SITE_URL}${path}`;

export default function sitemap(): MetadataRoute.Sitemap {
  const indexable = Object.values(pages).filter((page) => !page.noindex).sort((a, b) => a.slug.localeCompare(b.slug, "pl"));
  const pageEntries: Entry[] = indexable.map((page) => ({
    url: abs(`/${page.slug}`),
    lastModified: day(page.lastUpdated ?? UPDATED_ISO_DATE),
    ...(page.slug === "przed-i-po" ? { images: caseImages.map((item) => abs(item.src)) } : {})
  }));
  const guideEntries: Entry[] = [{ slug: "poradniki", date: GUIDES_LATEST_DATE }, ...Object.values(newGuides).map((guide) => ({ slug: guide.slug, date: guide.lastUpdated! }))].map(({ slug, date }) => ({ url: abs(`/${slug}`), lastModified: day(date) }));
  const expertDates = verifiedExperts.map((expert) => expert.lastVerified);
  const homeDate = latest([PRICING_UPDATED_ISO_DATE, GUIDES_LATEST_DATE, ...indexable.map((page) => page.lastUpdated ?? UPDATED_ISO_DATE)]);

  return [
    { url: SITE_URL, lastModified: day(homeDate) },
    ...pageEntries,
    ...guideEntries,
    ...allUkPages.map((page): Entry => ({ url: abs(`/${page.slug}`), lastModified: day(page.lastUpdated!) })),
    { url: abs("/pytania-i-odpowiedzi"), lastModified: day(FAQ_PUBLISHED_DATE) },
    { url: abs("/nasi-lekarze"), lastModified: day(TEAM_SOURCE_DATE), images: clinicalTeam.map((doctor) => abs(doctor.imageUrl)) },
    { url: abs("/eksperci"), lastModified: day(latest(expertDates)) },
    ...verifiedExperts.map((expert): Entry => ({ url: abs(expert.profileUrl), lastModified: day(expert.lastVerified) }))
  ];
}
