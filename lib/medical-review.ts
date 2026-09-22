import { verifiedExperts } from "./evidence";
import type { VerifiedExpert } from "./evidence";

export type ReviewState =
  | { reviewStatus: "not-reviewed"; lastUpdated: string }
  | { reviewStatus: "review-pending"; lastUpdated: string }
  | { reviewStatus: "reviewed"; reviewer: string; reviewDate: string; lastUpdated: string; approvalReference: string };

// Record a review here only after the clinician actually checks the named page.
// Retain the approval evidence outside this public repository and reference it here.
// Approval is reported for these pages, but the actual review date is absent.
// Keep them pending until that date is supplied and recorded per page.
export const pageReviews: Record<string, ReviewState> = {
  implanty: { reviewStatus: "review-pending", lastUpdated: "2026-09-19" },
  licowki: { reviewStatus: "review-pending", lastUpdated: "2026-09-19" },
  "cala-szczeka": { reviewStatus: "review-pending", lastUpdated: "2026-09-19" },
  "all-on-4": { reviewStatus: "review-pending", lastUpdated: "2026-09-19" }
};

export function reviewFor(slug: string, lastUpdated: string): ReviewState {
  return pageReviews[slug] ?? { reviewStatus: "not-reviewed", lastUpdated };
}

export function approvedReviewer(state: ReviewState): VerifiedExpert | null {
  if (state.reviewStatus !== "reviewed" || !state.reviewDate || !state.approvalReference || state.lastUpdated > state.reviewDate) return null;
  return verifiedExperts.find((expert) => expert.slug === state.reviewer) ?? null;
}

export function reviewedPagesBy(reviewerSlug: string, lastUpdated: string, pages: Record<string, { h1: string }>) {
  return Object.entries(pages).filter(([slug]) => {
    const state = reviewFor(slug, lastUpdated);
    return approvedReviewer(state)?.slug === reviewerSlug;
  }).map(([slug, page]) => ({ slug, title: page.h1 }));
}
