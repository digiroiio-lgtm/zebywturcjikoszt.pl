/**
 * Publication gate for patient-derived content (verified cases, patient testimonials, aggregate patient statistics).
 * Set to the ISO date (YYYY-MM-DD) on which a lawyer confirmed the privacy policy and the consent wording in
 * docs/consent-and-data-handling.md. While it is null the SEO audit fails if any such content is published.
 */
export const LEGAL_REVIEW_CONFIRMED_DATE: string | null = null;
