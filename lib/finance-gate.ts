/**
 * Publication gate for finance wording on the /uk pages.
 * Set to the ISO date (YYYY-MM-DD) on which a real finance arrangement is documented: UK entity details,
 * FCA status (authorised credit broker or appointed representative), the named lender, approved terms
 * (amount, term, representative APR, eligibility) and sign-off of the financial promotions by an authorised person.
 * While it is null the SEO audit fails if a /uk page contains finance-promotion wording (see scripts/validate-seo.mjs).
 */
export const FINANCE_PRODUCT_CONFIRMED_DATE: string | null = null;

/**
 * Operator decision of 2026-10-17: a neutral page about financing through a UK partner is published
 * (/uk/finansowanie-leczenia-zebow-w-turcji). It names no partner and states no amount, rate or instalment.
 * The promotion patterns in scripts/validate-seo.mjs stay forbidden on every /uk page until FINANCE_PRODUCT_CONFIRMED_DATE is set.
 * Partner name, FCA status and approved wording are not recorded in this repository; the legal responsibility for the
 * financial-promotion rules lies with the site operator.
 */
export const FINANCE_NEUTRAL_PAGE_DECISION_DATE = "2026-10-17";
export const FINANCE_PARTNER_DETAILS_RECORDED = false;
