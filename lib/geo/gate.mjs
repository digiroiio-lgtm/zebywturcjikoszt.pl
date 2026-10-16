// The publication gate, shared by the site (lib/geo/workflow.ts) and the verifier (scripts/verify-geo.mjs): one implementation, no copies.
const PROVENANCE = ["value", "denominator", "year", "definition", "dataset", "sourceUrl", "verifiedOn"];

export function claimIsPublishable(claim) {
  return !!claim && claim.verified === true && claim.source === "official" && PROVENANCE.every((key) => claim[key] !== null && claim[key] !== undefined && claim[key] !== "");
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
      } else if (value === undefined || value === null || value === "") problems.push(`${field} is required at stage ${record.stage}`);
    }
  }
  if (reached >= workflow.stages.indexOf("published") && !record.content) problems.push("published record has no content");
  return problems;
}
