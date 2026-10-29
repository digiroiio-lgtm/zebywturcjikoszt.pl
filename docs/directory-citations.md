# Directory listings and the citation kit

Purpose: the clinic appears in directories and portals with the same name, address and phone as on the site, so search engines and AI assistants connect the listings to one business.

## Single source
- Data: `lib/clinic-facts.ts` (built from `lib/operator.ts`, `lib/clinic-profiles.ts`, `lib/clinic-hours.ts`, `lib/whatsapp.ts`).
- Published as the page `/dane-kliniki` (copy blocks) and `/citation-kit.json`. Use these values exactly when filling in a directory form.
- The price list is published as data at `/dane/cennik-kliniki` (CSV and JSON), generated from `lib/pricing.ts`.
- `npm run test:citations` (part of `npm run verify`) fails if the kit, the structured data, `llms.txt`, `clinic-verification.json` and the dataset disagree.

## Listings already verified
- HealthTürkiye (Ministry of Health portal profile) and WhatClinic, opened by the owner on 2026-10-30. Both are recorded in `lib/directory-listings.ts` with notes; the portal profile is not an authorisation document, and its page date is 25/04/2023.
- The HealthTürkiye page uses the official facility name "Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği", which is why the kit carries `alternateNames` and `check:listings` accepts any of the names.

- Added on 2026-10-30 from URLs supplied and confirmed by the owner (Claude could not open them): the Antalya Provincial Health Directorate registry page, Facebook, Instagram, Yandex Maps, İyi Firma and the Find.com.tr company entry. The Trustpilot profile and the Google Maps listing are already in `clinicProfiles`; the clinic's own contact page (akdenizdental.com/pl/contact-us) is the clinic's website, not a listing.
- Social profiles (`kind: "social-profile"`) also appear as links in the footer; remove or edit the entry here and the footer follows.

- 2026-10-30, owner-supplied and added: Antalya Explore (`antalyaexplore.com`).

## Seen but deliberately not recorded as listings
- **topdentalclinicantalya.com** ("Antalya Akdeniz Dental Clinic" clinic file): a comparison site published by Precious Dental, a competing clinic that ranks itself first and places this clinic 13th of its list. It is not an identity profile of the clinic, it is controlled by a competitor and it can change, so it is not in `directoryListings` or `sameAs`. Its page states a Ministry authorisation number sourced from the HealthTürkiye record; that number must not be copied into `lib/credentials.ts` from a competitor's page. Read it from the HealthTürkiye "Accreditation and Certification" panel (or the official document) and record it with its dates and the portal URL as `verifyUrl`.
- **antalyadishekimleri.com** `…/caybasi/page/2/` (a category page) and `…/dis-hekimi/mustafa-akca/` (a doctor profile, already a source for Dr. Akça in `lib/evidence.ts`): not clinic listings.
- **medicaltourismchat.com** profile "Antalya Akdeniz Dental Clinic": the exact URL was not supplied, and the page shows a Google review count (674) that is older than the one on `lib/clinic-profiles.ts`. Add it once the owner sends the URL and has checked it.

## What comparison sites check (use as a checklist for the clinic's own website)
The competitor page scores the clinic 2 of 15 criteria. The missing items are facts the clinic would have to publish itself: written guarantee periods for implants, crowns and veneers; implant brands named (this site already names Aiser, Medentika and Straumann in the dated price list); a 3D scan (CBCT) mention; implant prices; a full-arch price per jaw and for both jaws; package contents; the tooth material. None of these may be added to this site until the operator confirms them in writing.

## Adding a listing
1. Submit the listing by hand (Google Business Profile, Bing Places, Apple Business Connect, health-tourism directories, local business directories, diaspora portals). Use the kit text, not a rewritten version.
2. Wait for the directory to publish it. Open the live page and compare name, address and phone with `/dane-kliniki`.
3. Add an entry to `directoryListings` in `lib/directory-listings.ts` with `verified: true` and `verifiedDate`. Unverified entries must not be added.
4. Verified entries appear in "Gdzie nas znajdziesz" on `/dane-kliniki`, in `citation-kit.json` and in the clinic's `sameAs`.
5. `npm run check:listings` (weekly in `.github/workflows/maintenance.yml`) opens each verified listing. A page without the clinic name fails the job; a missing phone or address, or an unreachable page, is a warning.

## Canonical data decisions (owner)
- Street line: "Çaybaşı, 1358. Sk. Premier Plaza D:1 B Blok" (the form shown in Google Maps and Trustpilot). The structured-data address previously said "Çaybaşı Mah."; it now matches the visible text.
- Public phone: the operator number in `lib/operator.ts`; the WhatsApp number is listed separately in the kit.
- Change any of these in one place and rebuild; the test shows what else differs.

## Do not
- Submit in bulk or with tools that fill forms automatically; directories forbid it and search engines treat it as spam.
- Buy links or listings, or rewrite the clinic's name, address or description per directory.
- Add claims that are not on the site (rankings, awards, licences, guarantees). Licences appear only after `lib/credentials.ts` has verified entries.
