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
  /** ISO date (YYYY-MM-DD) when the listing was submitted. */
  submittedDate: string;
  verified: boolean;
  /** ISO date when the live listing was compared with lib/clinic-facts.ts. Required when verified. */
  verifiedDate?: string;
  notes?: string;
};

export const directoryListings: DirectoryListing[] = [];

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
