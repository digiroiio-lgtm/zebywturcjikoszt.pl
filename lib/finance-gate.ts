/**
 * Publication gate for finance wording on the /uk pages.
 * Set to the ISO date (YYYY-MM-DD) on which a real finance arrangement is documented: UK entity details,
 * FCA status (authorised credit broker or appointed representative), the named lender, approved terms
 * (amount, term, representative APR, eligibility) and sign-off of the financial promotions by an authorised person.
 * While it is null the SEO audit fails if a /uk page contains finance-promotion wording (see scripts/validate-seo.mjs).
 */
export const FINANCE_PRODUCT_CONFIRMED_DATE: string | null = null;
