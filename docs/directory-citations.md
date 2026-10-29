# Directory listings and the citation kit

Purpose: the clinic appears in directories and portals with the same name, address and phone as on the site, so search engines and AI assistants connect the listings to one business.

## Single source
- Data: `lib/clinic-facts.ts` (built from `lib/operator.ts`, `lib/clinic-profiles.ts`, `lib/clinic-hours.ts`, `lib/whatsapp.ts`).
- Published as the page `/dane-kliniki` (copy blocks) and `/citation-kit.json`. Use these values exactly when filling in a directory form.
- The price list is published as data at `/dane/cennik-kliniki` (CSV and JSON), generated from `lib/pricing.ts`.
- `npm run test:citations` (part of `npm run verify`) fails if the kit, the structured data, `llms.txt`, `clinic-verification.json` and the dataset disagree.

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
