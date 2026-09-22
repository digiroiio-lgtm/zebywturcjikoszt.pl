import { pages, PUBLISHED_ISO_DATE, UPDATED_ISO_DATE } from "@/lib/site";
export function GET() {
  const records = Object.values(pages).map((page) => ({ path: `/${page.slug}`, author: "Redakcja serwisu", published: PUBLISHED_ISO_DATE, updated: UPDATED_ISO_DATE, reviewStatus: page.medicalReview?.verificationUrl && page.medicalReview.profileUrl ? "reviewed" : "not-reviewed", reviewer: page.medicalReview?.verificationUrl && page.medicalReview.profileUrl ? page.medicalReview.name : null, sources: page.sources?.map(({ href }) => href) ?? [] }));
  return Response.json({ records });
}
