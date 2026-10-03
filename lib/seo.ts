import { openingHoursSpecification, serviceLanguages } from "./clinic-hours";
import type { Metadata } from "next";
import type { PageContent } from "./site";
import { PUBLISHED_ISO_DATE, SITE_URL, UPDATED_ISO_DATE } from "./site";
import { operatorSchemaFields } from "./operator";
import { clinicCredentials, hasCredentialSchema } from "./credentials";
import { CLINIC_ADDRESS, CLINIC_GEO, CLINIC_ID, CLINIC_NAME, CLINIC_URL, clinicProfiles } from "./clinic-profiles";

export const AI_TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Content-Language": "pl",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
};

export const OG_IMAGES = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zęby w Turcji – ceny i leczenie w Antalyi" }];
export const TWITTER_IMAGES = ["/twitter-image"];
/** Page-specific social card (app/og/[...slug]/route.tsx). */
export const ogImagesFor = (slug: string, alt: string) => [{ url: `/og/${slug}`, width: 1200, height: 630, alt }];
export const twitterImagesFor = (slug: string) => [`/og/${slug}`];

export function buildMetadata(page: PageContent): Metadata {
  const url = `/${page.slug}`;
  const pageOgImages = page.noindex ? OG_IMAGES : ogImagesFor(page.slug, page.h1);
  const isArticle = !page.noindex && (page.slug.startsWith("poradniki/") || page.schemaType === "MedicalWebPage");
  return {
    title: page.title.length > 45 ? { absolute: page.title } : page.title,
    description: page.description,
    alternates: { canonical: url },
    robots: page.noindex ? { index: false, follow: true } : indexableRobots,
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      locale: "pl_PL",
      siteName: "Zęby w Turcji",
      images: pageOgImages,
      ...(isArticle
        ? { type: "article" as const, publishedTime: page.published ?? PUBLISHED_ISO_DATE, modifiedTime: page.lastUpdated ?? UPDATED_ISO_DATE }
        : { type: "website" as const })
    },
    twitter: { card: "summary_large_image", images: page.noindex ? TWITTER_IMAGES : twitterImagesFor(page.slug), title: page.title, description: page.description }
  };
}

/** Explicit preview directives for indexable pages (Google would allow them by default; stating them keeps large image previews eligible). */
const previewDirectives = { follow: true, "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } as const;
export const indexableRobots = { index: true, ...previewDirectives, googleBot: { index: true, ...previewDirectives } } as const;

export const clinicSchema = {
  "@type": ["Dentist", "MedicalClinic"],
  "@id": CLINIC_ID,
  name: CLINIC_NAME,
  alternateName: "Antalya Akdeniz Dental Clinic",
  url: CLINIC_URL,
  medicalSpecialty: "Dentistry",
  openingHoursSpecification,
  knowsLanguage: serviceLanguages.map((language) => language.code),
  address: { "@type": "PostalAddress", ...CLINIC_ADDRESS },
  geo: { "@type": "GeoCoordinates", ...CLINIC_GEO },
  hasMap: clinicProfiles.find((profile) => profile.key === "google-maps")!.href,
  sameAs: clinicProfiles.map((profile) => profile.href),
  ...operatorSchemaFields(),
  ...hasCredentialSchema(clinicCredentials)
};

export function breadcrumbList(items: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [{ name: "Strona główna", path: "" }, ...items].map((item, index) => ({ "@type": "ListItem", position: index + 1, name: item.name, item: `${SITE_URL}${item.path}` }))
  };
}
