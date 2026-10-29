/**
 * Official documents and registry entries for the clinic and its doctors.
 *
 * Fill an entry ONLY with values read from the official document or registry itself (Ministry of Health
 * authorisation, operating licence, trade registry, diploma or professional register). Never add personal data of
 * patients; scans must have personal data masked. While both lists are empty nothing is rendered, no page is
 * published and no structured data is emitted.
 */
export type CredentialKind = "health-facility-registry" | "health-tourism-authorisation" | "clinic-licence" | "trade-registry" | "diploma" | "specialty" | "professional-register";

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

export const clinicCredentials: OfficialCredential[] = [
  {
    id: "antalya-sm-oral-dental-centres",
    kind: "health-facility-registry",
    title: "Wpis w wykazie prywatnych ośrodków zdrowia jamy ustnej i zębów: Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği",
    issuer: "T.C. Sağlık Bakanlığı, Antalya İl Sağlık Müdürlüğü (Ministerstwo Zdrowia Turcji, wojewódzka dyrekcja zdrowia w Antalyi)",
    // The registry page shows the facility name, telephone, address and e-mail; it shows no licence number, so none is recorded.
    verifyUrl: "https://www.antalyasm.gov.tr/ozel-agiz-ve-dis-sagligi-merkezleri/ozel-antalya-akdeniz-agiz-ve-dis-sagligi-poliklinigi-detay/4120",
    checkedDate: "2026-10-30"
  },
  {
    id: "ministry-health-tourism-authorisation-list",
    kind: "health-tourism-authorisation",
    title: "Wpis na liście placówek, które uzyskały zezwolenie na turystykę zdrowotną: Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği",
    issuer: "T.C. Sağlık Bakanlığı (Ministerstwo Zdrowia Turcji)",
    // Row 147 of "Sağlık Turizmi Yetki Belgesi Almaya Hak Kazanan Sağlık Tesisleri" (diger-saglik-tesisleripdf.pdf, 79 pages), opened by the owner on 2026-10-30.
    // The list shows the facility name, type, address and telephone; it shows no certificate number or dates, so none are recorded.
    verifyUrl: "https://dosyamerkez.saglik.gov.tr/Eklenti/56718/0/diger-saglik-tesisleripdf.pdf?_tag1=BBE51C2725E1DE83E73088BF0902691B84E5BF02",
    checkedDate: "2026-10-30"
  },
  {
    id: "ministry-health-tourism-authorisation-list-perge",
    kind: "health-tourism-authorisation",
    title: "Wpis na liście placówek, które uzyskały zezwolenie na turystykę zdrowotną: Özel Antalya Akdeniz Ağız Ve Diş Sağlığı Polikliniği – Perge Şubesi (oddział kliniki)",
    issuer: "T.C. Sağlık Bakanlığı (Ministerstwo Zdrowia Turcji)",
    // Row 148 of the same list; the owner confirmed on 2026-10-30 that the Perge branch is the clinic's own. No certificate number or dates are shown.
    verifyUrl: "https://dosyamerkez.saglik.gov.tr/Eklenti/56718/0/diger-saglik-tesisleripdf.pdf?_tag1=BBE51C2725E1DE83E73088BF0902691B84E5BF02",
    checkedDate: "2026-10-30"
  }
];

/** Keyed by clinicalTeam slug. */
export const doctorCredentials: Record<string, OfficialCredential[]> = {};

export const credentialsPublished = clinicCredentials.length > 0;

export const CREDENTIAL_KIND_LABEL: Record<CredentialKind, string> = {
  "health-facility-registry": "Wykaz placówek zdrowia (Turcja)",
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
