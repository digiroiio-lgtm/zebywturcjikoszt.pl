export type ReviewRecord = { id: string; author: string; publishedAt: string; rating: number; language: string; sourceUrl: string; sourceCheckedOn: string; sourceVerified: boolean; excerpt?: string; excerptPermissionReference?: string | null };
export type ReviewItem = Pick<ReviewRecord, "id" | "author" | "publishedAt" | "rating" | "sourceUrl"> & { excerpt?: string };
export function sourceVerifiedReviews(config: { reviews?: ReviewRecord[] }): ReviewItem[];
