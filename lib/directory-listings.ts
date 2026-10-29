/**
 * Third-party directory and portal listings of the clinic (Google Business Profile, health-tourism directories,
 * local business directories, diaspora portals). Add an entry ONLY after the listing was submitted by a person and
 * the directory confirmed it. Set `verified: true` and `verifiedDate` only when the live listing page was opened and
 * its name, address and phone match lib/clinic-facts.ts. Unverified entries are never published, never added to
 * structured data and never listed in citation-kit.json. While the list is empty nothing is rendered.
 */
export type DirectoryKind = "official-registry" | "google-business" | "bing-places" | "apple-business" | "health-tourism-directory" | "local-directory" | "diaspora-portal" | "social-profile";

export type DirectoryListing = {
  id: string;
  name: string;
  /** Public URL of the listing page that a visitor can open. */
  url: string;
  kind: DirectoryKind;
  /** ISO date (YYYY-MM-DD) when the listing was submitted by us. Omit for listings that already existed and were found by the owner. */
  submittedDate?: string;
  verified: boolean;
  /** ISO date when the live listing was compared with lib/clinic-facts.ts. Required when verified. */
  verifiedDate?: string;
  notes?: string;
};

export const directoryListings: DirectoryListing[] = [
  {
    id: "healthturkiye",
    name: "HealthTürkiye: profil placówki w portalu Ministerstwa Zdrowia Turcji",
    url: "https://www.healthturkiye.gov.tr/hospital/ozel-antalya-akdeniz-agiz-ve-dis-sagligi-poliklinigi-2921177745-2921177745",
    kind: "health-tourism-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Opened by the owner on 2026-10-30. The profile is titled with the official facility name (Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği); the portal states the information was verified by the Ministry of Health and shows a page date of 25/04/2023. It is a profile, not an authorisation document. The portal lists 8 service languages while lib/clinic-hours.ts lists 5: the owner has to confirm which is current."
  },
  {
    id: "whatclinic",
    name: "WhatClinic: Akdeniz Dental w Antalyi",
    url: "https://www.whatclinic.com/dentists/turkey/antalya-province/antalya/akdeniz-dental",
    kind: "health-tourism-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Opened by the owner on 2026-10-30. Name, address (Çaybaşı, 1358. Sk. Premier Plaza D:1 B Blok, 07100) and Mon–Sat 9:00–19:00 hours match; the phone is hidden behind a button. The listing is unclaimed and has no description, photos or reviews yet."
  },
  {
    id: "antalya-sm-registry",
    name: "Antalya İl Sağlık Müdürlüğü: wpis w rejestrze prywatnych ośrodków stomatologicznych",
    url: "https://www.antalyasm.gov.tr/ozel-agiz-ve-dis-sagligi-merkezleri/ozel-antalya-akdeniz-agiz-ve-dis-sagligi-poliklinigi-detay/4120",
    kind: "official-registry",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "URL supplied by the owner on 2026-10-30, who confirmed name, address and phone against the live page; Claude could not open it (no network access). Official registry page of the Antalya Provincial Health Directorate for the facility Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği. Record licence or authorisation details in lib/credentials.ts only from the page itself."
  },
  {
    id: "getclinicturkey",
    name: "GetClinicTurkey: Akdeniz Dental Clinic (porównywarka klinik)",
    url: "https://getclinicturkey.com/clinic/akdeniz-dental-antalya/",
    kind: "health-tourism-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Opened by the owner on 2026-10-30 (screenshots). The comparison site shows the clinic name, the address in the same form as lib/clinic-facts.ts, Mon-Sat 09:00-19:00 and 2 languages (English, Turkish). It states that the facility is on the Ministry of Health list of facilities holding an international health tourism authorisation certificate (22 October 2026 list, checked by the site on 26 October 2026). That statement was confirmed on 2026-10-30 against the Ministry's own list (row 147, see lib/credentials.ts); the site's profile itself remains a third-party page. The prices on that profile are the site's own planning ranges, not the clinic's."
  },
  {
    id: "facebook",
    name: "Facebook: Akdeniz Dental Clinic",
    url: "https://www.facebook.com/akdenizdentalclinic/",
    kind: "social-profile",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Clinic's own profile; URL supplied and confirmed by the owner on 2026-10-30 (the locale parameter was removed)."
  },
  {
    id: "instagram",
    name: "Instagram: akdenizdentalclinic",
    url: "https://www.instagram.com/akdenizdentalclinic/",
    kind: "social-profile",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Clinic's own profile; URL supplied and confirmed by the owner on 2026-10-30."
  },
  {
    id: "yandex-maps",
    name: "Yandex Haritalar: Akdeniz Dental Clinic",
    url: "https://yandex.com.tr/maps/org/akdeniz_dental_clinic/38986351325/",
    kind: "local-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "URL supplied by the owner on 2026-10-30, who confirmed name, address and phone against the live page (gallery and map parameters removed from the URL)."
  },
  {
    id: "iyifirma",
    name: "İyi Firma: Akdeniz Dental Clinic Muratpaşa",
    url: "https://iyifirma.com/akdeniz-dental-clinic-muratpasa/",
    kind: "local-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "URL supplied by the owner on 2026-10-30, who confirmed name, address and phone against the live page."
  },
  {
    id: "antalya-explore",
    name: "Antalya Explore: Antalya Akdeniz Dental Clinic",
    url: "https://antalyaexplore.com/tr/kesfetmek/antalya-akdeniz-dental-clinic/",
    kind: "local-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Turkish tourism portal page; URL supplied by the owner on 2026-10-30, who asked for it to be added. Claude could not open it (no network access); the weekly check:listings run looks for the clinic name, the legal name or an alternate name on the page."
  },
  {
    id: "find-com-tr",
    name: "Find.com.tr: DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ",
    url: "https://www.find.com.tr/Company/dentakdenizagizvedissagligihizmetlerilimitedsirketi",
    kind: "local-directory",
    verified: true,
    verifiedDate: "2026-10-30",
    notes: "Company directory entry for the operator's legal entity; URL supplied by the owner on 2026-10-30, who confirmed the details against the live page."
  }
];

export const DIRECTORY_KIND_LABEL: Record<DirectoryKind, string> = {
  "official-registry": "Rejestr urzędowy (Turcja)",
  "google-business": "Profil w Google",
  "bing-places": "Bing Places",
  "apple-business": "Apple Business Connect",
  "health-tourism-directory": "Katalog turystyki zdrowotnej",
  "local-directory": "Katalog lokalny",
  "diaspora-portal": "Portal dla Polaków za granicą",
  "social-profile": "Profil w mediach społecznościowych"
};

export const verifiedListings = (): DirectoryListing[] => directoryListings.filter((listing) => listing.verified && listing.verifiedDate);
