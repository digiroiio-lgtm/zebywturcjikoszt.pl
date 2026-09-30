import { pages, PUBLISHED_ISO_DATE, UPDATED_ISO_DATE } from "@/lib/site";
import { approvedReviewer, reviewFor } from "@/lib/medical-review";
export function GET() {
  const records = Object.values(pages).map((page) => {
    const review = reviewFor(page.slug, page.lastUpdated ?? UPDATED_ISO_DATE);
    const reviewer = approvedReviewer(review);
    return { path: `/${page.slug}`, author: "Redakcja serwisu", published: page.published ?? PUBLISHED_ISO_DATE, updated: review.lastUpdated, reviewStatus: reviewer ? "reviewed" : review.reviewStatus === "review-pending" ? "review-pending" : "not-reviewed", reviewer: reviewer?.name ?? null, reviewDate: reviewer && review.reviewStatus === "reviewed" ? review.reviewDate : null, sources: page.sources?.map(({ href }) => href) ?? [] };
  });
  return Response.json({ records });
}
