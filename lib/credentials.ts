/**
 * Official documents and registry entries for the clinic and its doctors.
 *
 * Fill an entry ONLY with values read from the official document or registry itself (Ministry of Health
 * authorisation, operating licence, trade registry, diploma or professional register). Never add personal data of
 * patients; scans must have personal data masked. While both lists are empty nothing is rendered, no page is
 * published and no structured data is emitted.
 */
export type CredentialKind = "health-tourism-authorisation" | "clinic-licence" | "trade-registry" | "diploma" | "specialty" | "professional-register";

export type OfficialCredential = {
  id: string;
  kind: CredentialKind;
  /** Polish display title, e.g. "Zezwolenie na świadczenie usług turystyki zdrowotnej". */
  title: string;
  /** Issuing body, e.g. "Ministerstwo Zdrowia Republiki Turcji". */
  issuer: string;
  number?: string;
  validFrom?: string;
  /** ISO date (YYYY-MM-DD). The SEO audit fails once a date has passed. */
  validUntil?: string;
  /** Official registry or verification link that a visitor can open. */
  verifyUrl?: string;
  /** ISO date when the entry was last compared with the official source. */
  checkedDate: string;
  /** Masked scan under /public/images/dokumenty/. */
  document?: { src: string; alt: string; width: number; height: number };
};

export const clinicCredentials: OfficialCredential[] = [];

/** Keyed by clinicalTeam slug. */
export const doctorCredentials: Record<string, OfficialCredential[]> = {};

export const credentialsPublished = clinicCredentials.length > 0;

export const CREDENTIAL_KIND_LABEL: Record<CredentialKind, string> = {
  "health-tourism-authorisation": "Zezwolenie turystyki zdrowotnej",
  "clinic-licence": "Licencja kliniki",
  "trade-registry": "Rejestr przedsiębiorców",
  diploma: "Dyplom",
  specialty: "Specjalizacja",
  "professional-register": "Rejestr zawodowy"
};

export function credentialRows(credential: OfficialCredential): { label: string; value: string }[] {
  return [
    { label: "Wydawca", value: credential.issuer },
    { label: "Numer", value: credential.number },
    { label: "Ważne od", value: credential.validFrom },
    { label: "Ważne do", value: credential.validUntil },
    { label: "Sprawdzono", value: credential.checkedDate }
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
}

export function credentialSchema(credential: OfficialCredential) {
  return {
    "@type": "EducationalOccupationalCredential",
    name: credential.title,
    credentialCategory: CREDENTIAL_KIND_LABEL[credential.kind],
    recognizedBy: { "@type": "Organization", name: credential.issuer },
    ...(credential.number ? { identifier: credential.number } : {}),
    ...(credential.verifyUrl ? { url: credential.verifyUrl } : {})
  };
}

export function hasCredentialSchema(list: OfficialCredential[]) {
  return list.length ? { hasCredential: list.map(credentialSchema) } : {};
}
