import { verifiedExperts } from "./evidence";
import type { VerifiedExpert } from "./evidence";

export type ReviewState =
  | { reviewStatus: "not-reviewed"; lastUpdated: string }
  | { reviewStatus: "review-pending"; lastUpdated: string }
  | { reviewStatus: "reviewed"; reviewer: string; reviewDate: string; lastUpdated: string; approvalReference: string };

// Record a review here only after the clinician actually checks the named page.
// Retain the approval evidence outside this public repository and reference it here.
export const pageReviews: Record<string, ReviewState> = {};

export function reviewFor(slug: string, lastUpdated: string): ReviewState {
  return pageReviews[slug] ?? { reviewStatus: "not-reviewed", lastUpdated };
}

export function approvedReviewer(state: ReviewState): VerifiedExpert | null {
  if (state.reviewStatus !== "reviewed" || !state.reviewDate || !state.approvalReference || state.lastUpdated > state.reviewDate) return null;
  return verifiedExperts.find((expert) => expert.slug === state.reviewer) ?? null;
}
