// The publication gate, shared by the site (lib/geo/workflow.ts) and the verifier (scripts/verify-geo.mjs): one implementation, no copies.
const PROVENANCE = ["value", "denominator", "year", "definition", "dataset", "sourceUrl", "verifiedOn"];

const filled = (claim, key) => claim[key] !== null && claim[key] !== undefined && claim[key] !== "";

/**
 * Two source tiers can be shown on a page:
 * - "official": a direct extract of the official table, with every provenance field including the denominator.
 * - "official-secondary": a figure an official body (e.g. a council) publishes citing the census. No denominator exists, so the page must
 *   attribute it to that publisher; the claim needs a named publication, its URL, the basis of verification and a verification date.
 * "brief" figures and anything unverified never pass.
 */
export function claimIsPublishable(claim) {
  if (!claim || claim.verified !== true) return false;
  if (claim.source === "official") return PROVENANCE.every((key) => filled(claim, key));
  if (claim.source === "official-secondary") {
    const publication = claim.corroboration?.[0];
    return PROVENANCE.filter((key) => key !== "denominator").every((key) => filled(claim, key)) && filled(claim, "verificationBasis") && !!publication?.publisher && !!publication?.document && !!publication?.sourceUrl;
  }
  return false;
}

/**
 * A site-owner waiver for an evidence field (listed in workflow.waivable): { field, by, on, reason }, all filled.
 * It is not an approval and never replaces a verified census claim or the editorial approval; it is listed by `npm run test:geo`.
 */
export function isWaived(record, workflow, field) {
  if (!(workflow.waivable ?? []).includes(field)) return false;
  return (record.waivers ?? []).some((waiver) => waiver.field === field && ["by", "on", "reason"].every((key) => typeof waiver[key] === "string" && waiver[key].trim() !== ""));
}

/** Problems that prevent `record` from being at its stated stage; every earlier gate must hold too. */
export function gateProblems(record, workflow, claims) {
  const reached = workflow.stages.indexOf(record.stage);
  if (reached < 0) return [`unknown stage ${record.stage}`];
  const problems = [];
  for (const [stage, fields] of Object.entries(workflow.requiredBefore)) {
    if (workflow.stages.indexOf(stage) > reached) continue;
    for (const field of fields) {
      const value = record[field];
      if (field === "demographicClaims") {
        for (const id of value ?? []) if (!claimIsPublishable(claims.find((claim) => claim.id === id))) problems.push(`claim ${id} is not verified with full provenance`);
      } else if ((value === undefined || value === null || value === "") && !isWaived(record, workflow, field)) problems.push(`${field} is required at stage ${record.stage}`);
    }
  }
  if (reached >= workflow.stages.indexOf("published") && !record.content) problems.push("published record has no content");
  return problems;
}
