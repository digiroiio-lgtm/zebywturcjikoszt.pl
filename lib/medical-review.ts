import { verifiedExperts } from "./evidence";
import type { VerifiedExpert } from "./evidence";

export type ReviewState =
  | { reviewStatus: "not-reviewed"; lastUpdated: string }
  | { reviewStatus: "review-pending"; lastUpdated: string }
  | { reviewStatus: "reviewed"; reviewer: string; reviewDate: string; lastUpdated: string; approvalReference: string };

// Record a review here only after the clinician actually checks the named page.
// Retain the approval evidence outside this public repository and reference it here.
// The site operator confirmed clinician approval for these four pages in the
// conversation on 2026-09-30 and supplied 2026-09-30 as the actual review date.
// The operator assigned implanty and all-on-4 specifically to Mehmet Onur Merey.
// On 2026-10-02 the operator confirmed that Mehmet Onur Merey (all-on-4) and Mustafa Akça (cala-szczeka)
// approved the updated text, which added a literature section and a PMC source on 2026-10-02.
export const pageReviews: Record<string, ReviewState> = {
  implanty: { reviewStatus: "reviewed", reviewer: "mehmet-onur-merey", reviewDate: "2026-09-30", lastUpdated: "2026-09-19", approvalReference: "operator-confirmation:2026-09-30:medical-review" },
  licowki: { reviewStatus: "reviewed", reviewer: "mustafa-akca", reviewDate: "2026-09-30", lastUpdated: "2026-09-19", approvalReference: "operator-confirmation:2026-09-30:medical-review" },
  "cala-szczeka": { reviewStatus: "reviewed", reviewer: "mustafa-akca", reviewDate: "2026-10-02", lastUpdated: "2026-09-19", approvalReference: "operator-confirmation:2026-10-02:medical-review" },
  "all-on-4": { reviewStatus: "reviewed", reviewer: "mehmet-onur-merey", reviewDate: "2026-10-02", lastUpdated: "2026-09-19", approvalReference: "operator-confirmation:2026-10-02:medical-review" }
};

export function reviewFor(slug: string, lastUpdated: string): ReviewState {
  const state = pageReviews[slug];
  return state ? { ...state, lastUpdated: state.lastUpdated > lastUpdated ? state.lastUpdated : lastUpdated } : { reviewStatus: "not-reviewed", lastUpdated };
}

export function approvedReviewer(state: ReviewState): VerifiedExpert | null {
  if (state.reviewStatus !== "reviewed" || !state.reviewDate || !state.approvalReference || state.lastUpdated > state.reviewDate) return null;
  return verifiedExperts.find((expert) => expert.slug === state.reviewer) ?? null;
}

export function reviewedPagesBy(reviewerSlug: string, lastUpdated: string, pages: Record<string, { h1: string; lastUpdated?: string }>) {
  return Object.entries(pages).filter(([slug, page]) => {
    const state = reviewFor(slug, page.lastUpdated ?? lastUpdated);
    return approvedReviewer(state)?.slug === reviewerSlug;
  }).map(([slug, page]) => ({ slug, title: page.h1 }));
}
