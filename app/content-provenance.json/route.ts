import { newGuides } from "@/lib/guides";
import { pages, SITE_URL, PUBLISHED_ISO_DATE, UPDATED_ISO_DATE } from "@/lib/site";
import { approvedReviewer, reviewFor } from "@/lib/medical-review";
export function GET() {
  const records = [...Object.values(pages), ...Object.values(newGuides)].map((page) => {
    const review = reviewFor(page.slug, page.lastUpdated ?? UPDATED_ISO_DATE);
    const reviewer = approvedReviewer(review);
    return { path: `/${page.slug}`, url: `${SITE_URL}/${page.slug}`, schemaType: page.schemaType ?? "WebPage", author: "Redakcja serwisu", published: page.published ?? PUBLISHED_ISO_DATE, updated: review.lastUpdated, reviewStatus: reviewer ? "reviewed" : review.reviewStatus === "review-pending" ? "review-pending" : "not-reviewed", reviewer: reviewer?.name ?? null, reviewerUrl: reviewer ? `${SITE_URL}${reviewer.profileUrl}` : null, reviewDate: reviewer && review.reviewStatus === "reviewed" ? review.reviewDate : null, sources: page.sources?.map(({ href }) => href) ?? [] };
  });
  return Response.json({ records }, { headers: { "X-Robots-Tag": "noindex" } });
}
