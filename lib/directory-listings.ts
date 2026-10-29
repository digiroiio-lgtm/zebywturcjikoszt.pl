/**
 * Third-party directory and portal listings of the clinic (Google Business Profile, health-tourism directories,
 * local business directories, diaspora portals). Add an entry ONLY after the listing was submitted by a person and
 * the directory confirmed it. Set `verified: true` and `verifiedDate` only when the live listing page was opened and
 * its name, address and phone match lib/clinic-facts.ts. Unverified entries are never published, never added to
 * structured data and never listed in citation-kit.json. While the list is empty nothing is rendered.
 */
export type DirectoryKind = "google-business" | "bing-places" | "apple-business" | "health-tourism-directory" | "local-directory" | "diaspora-portal" | "social-profile";

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
  }
];

export const DIRECTORY_KIND_LABEL: Record<DirectoryKind, string> = {
  "google-business": "Profil w Google",
  "bing-places": "Bing Places",
  "apple-business": "Apple Business Connect",
  "health-tourism-directory": "Katalog turystyki zdrowotnej",
  "local-directory": "Katalog lokalny",
  "diaspora-portal": "Portal dla Polaków za granicą",
  "social-profile": "Profil w mediach społecznościowych"
};

export const verifiedListings = (): DirectoryListing[] => directoryListings.filter((listing) => listing.verified && listing.verifiedDate);
