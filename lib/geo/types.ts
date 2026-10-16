export type CountryId = "england" | "scotland" | "wales" | "northern-ireland";
export type Stage = "research" | "verified" | "draft" | "editorial-review" | "clinical-review" | "seo-qa" | "approved" | "published";
export type LocationKind = "area" | "authority" | "landmark";

export type GeoCountry = { id: CountryId; name: string; nameEn: string; slug: string };
/** A research candidate from the brief. Not a validated concentration of Polish residents and not a page. */
export type GeoLocation = {
  id: string; kind: LocationKind; name: string; group: string; country: CountryId; region: string; authority: string; cityGroup: string;
  /** A postal district is not a ward or LSOA; allocation to a place stays uncertain until checked against ONSPD / NSPL. */
  postalDistricts: string[]; districtStatus: "brief-claimed-unverified" | "none-in-brief" | "verified";
  evidenceLevel: "brief-candidate"; stage: Stage; note: string | null;
};

/** The three demographic definitions are separate metrics and are never summed or substituted for each other. */
export type MetricName = "polandBorn" | "polishMainLanguage" | "polishNationalIdentity";
export type CensusClaim = {
  id: string; geography: { level: string; name: string; country: CountryId }; metric: MetricName;
  value: number | null; unit: string; denominator: number | null; year: number | null; definition: string | null; dataset: string | null;
  sourceUrl: string | null; verifiedOn: string | null; confidence: "unverified" | "low" | "medium" | "high"; verified: boolean; source: "brief" | "official";
};

export type ClinicFact = { id: string; claim: string; status: "verified" | "needs-operator-confirmation"; evidence: string };

/** One reviewed geo page. Absent from pages.json means not published. */
export type GeoPageRecord = {
  slug: string; kind: "city" | "region"; locationIds: string[]; stage: Stage; title: string; description: string;
  demographicClaims?: string[]; uniqueContentEvidence?: string; searchDemandEvidence?: { source: string; date: string };
  editorialApproval?: { by: string; on: string }; clinicalReview?: { reviewer: string; on: string; approvalReference: string };
  canonicalPath?: string; approvedBy?: string; approvedOn?: string; publishedOn?: string;
  content?: import("../site").PageContent;
};
