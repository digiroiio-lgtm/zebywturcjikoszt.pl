/** Publication requires documented source verification; missing fields never imply clinical facts. */
export type ClinicalSource = {
  title: string;
  organization: string;
  url: string;
  claimSupported: string;
  publicationDate?: string;
  accessedDate?: string;
};

export type VerifiedExpert = {
  slug: string;
  name: string;
  professionalTitle: string;
  biography: string;
  profileUrl: string;
  verificationUrl: string;
  reviewedSlugs: string[];
  lastVerified: string;
};

export type VerifiedCase = {
  id: string;
  status: "verified";
  initialSituation: string;
  objective: string;
  treatment: string;
  limitations: string;
  consentDocumented: true;
  medicalVerificationDocumented: true;
  clinician?: string;
  implants?: number;
  restorations?: string;
  material?: string;
  visits?: number;
  timeline?: string;
  imageDates?: string[];
};

// No expert or case can be published until source documents, consent and review exist.
export const verifiedExperts: VerifiedExpert[] = [];
export const verifiedCases: VerifiedCase[] = [];
