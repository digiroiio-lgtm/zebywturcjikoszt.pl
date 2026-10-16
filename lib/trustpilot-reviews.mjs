/** Public metadata and direct links only unless an excerpt has a documented reuse permission. */
export function sourceVerifiedReviews(config) {
  const seen = new Set();
  return (config.reviews ?? []).filter((review) => {
    if (review.sourceVerified !== true || review.language !== "pl" || review.rating !== 5 || !review.author?.trim()) return false;
    if (!/^[a-f0-9]{24}$/.test(review.id) || review.sourceUrl !== `https://pl.trustpilot.com/reviews/${review.id}` || seen.has(review.id)) return false;
    if (!/^\d{4}-\d{2}-\d{2}T/.test(review.publishedAt) || !Number.isFinite(Date.parse(review.publishedAt))) return false;
    if (!/^\d{4}-\d{2}-\d{2}$/.test(review.sourceCheckedOn ?? "")) return false;
    seen.add(review.id);
    return true;
  }).slice(0, 12).map((review) => ({
    id: review.id, author: review.author, publishedAt: review.publishedAt, rating: review.rating,
    sourceUrl: review.sourceUrl,
    // Never pass hidden draft quotes or permission pointers to a client component.
    ...(typeof review.excerptPermissionReference === "string" && review.excerptPermissionReference.trim() && review.excerpt?.trim()
      ? { excerpt: review.excerpt.trim() } : {}),
  }));
}
