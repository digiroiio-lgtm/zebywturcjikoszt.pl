import type { Metadata } from "next";
import type { PageContent } from "./site";
import { PUBLISHED_ISO_DATE, UPDATED_ISO_DATE } from "./site";

export const AI_TEXT_HEADERS = {
  "Content-Type": "text/plain; charset=utf-8",
  "Content-Language": "pl",
  "Cache-Control": "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
};

export const OG_IMAGES = [{ url: "/opengraph-image", width: 1200, height: 630, alt: "Zęby w Turcji – ceny i leczenie w Antalyi" }];
export const TWITTER_IMAGES = ["/twitter-image"];

export function buildMetadata(page: PageContent): Metadata {
  const url = `/${page.slug}`;
  const isArticle = !page.noindex && (page.slug.startsWith("poradniki/") || page.schemaType === "MedicalWebPage");
  return {
    title: page.title,
    description: page.description,
    alternates: { canonical: url },
    robots: { index: !page.noindex, follow: true },
    openGraph: {
      title: page.title,
      description: page.description,
      url,
      locale: "pl_PL",
      siteName: "Zęby w Turcji",
      images: OG_IMAGES,
      ...(isArticle
        ? { type: "article" as const, publishedTime: page.published ?? PUBLISHED_ISO_DATE, modifiedTime: page.lastUpdated ?? UPDATED_ISO_DATE }
        : { type: "website" as const })
    },
    twitter: { card: "summary_large_image", images: TWITTER_IMAGES, title: page.title, description: page.description }
  };
}
