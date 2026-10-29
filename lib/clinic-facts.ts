import { OPERATOR, OPERATOR_DISCLOSURE } from "./operator";
import { CLINIC_ADDRESS, CLINIC_ADDRESS_TEXT, CLINIC_GEO, CLINIC_NAME, CLINIC_URL, clinicProfiles } from "./clinic-profiles";
import { CLINIC_TIME_ZONE_NOTE, hoursSummary, openingHours, serviceLanguages } from "./clinic-hours";
import { WHATSAPP_DISPLAY } from "./whatsapp";
import { SITE_URL } from "./site";
import { verifiedListings } from "./directory-listings";

/** Official name of the licensed facility as it appears on the Ministry of Health portal (see lib/evidence.ts). Directories may list the clinic under this name. */
export const CLINIC_OFFICIAL_NAME = "Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği";

/** Date of the last change to the clinic data or the ready-made descriptions below (ISO). */
export const CITATION_KIT_UPDATED = "2026-10-30";

const openDays = openingHours.filter((row) => row.opens).reduce((sum, row) => sum + row.schema.length, 0);
const hoursPerDay = Math.max(...openingHours.map((row) => (row.opens && row.closes ? Number.parseInt(row.closes) - Number.parseInt(row.opens) : 0)));
const languagesPl = serviceLanguages.map((language) => language.label).join(", ");
const languagesEn = { pl: "Polish", en: "English", ru: "Russian", de: "German", ro: "Romanian" } as const;
const languagesEnText = serviceLanguages.map((language) => languagesEn[language.code]).join(", ");

/**
 * One source of truth for every directory, portal and editor that needs the clinic's name, address and phone.
 * Everything is derived from the modules that also feed the visible pages and the structured data, so the kit, the
 * site and the schema cannot drift apart (scripts/verify-citations.mjs checks this after the build).
 */
export const clinicFacts = {
  name: CLINIC_NAME,
  legalName: OPERATOR.legalName ?? CLINIC_NAME,
  alternateNames: [CLINIC_OFFICIAL_NAME, "Antalya Akdeniz Dental Clinic"],
  url: CLINIC_URL,
  siteUrl: SITE_URL,
  addressText: CLINIC_ADDRESS_TEXT,
  address: CLINIC_ADDRESS,
  geo: CLINIC_GEO,
  phone: OPERATOR.phone ?? "",
  whatsapp: WHATSAPP_DISPLAY,
  email: OPERATOR.email ?? "",
  hoursSummary,
  timeZoneNote: CLINIC_TIME_ZONE_NOTE,
  hoursPerWeek: openDays * hoursPerDay,
  languages: serviceLanguages.map((language) => ({ code: language.code, label: language.label })),
  profiles: clinicProfiles.map((profile) => ({ label: profile.label, url: profile.href })),
  disclosure: OPERATOR_DISCLOSURE
};

const pl = {
  short: `${CLINIC_NAME}: klinika stomatologiczna w Antalyi (Turcja). Implanty, korony, licówki. Obsługa po polsku, pon.–sob. 9:00–19:00 (czas turecki).`,
  medium: `${CLINIC_NAME} to klinika stomatologiczna w Antalyi w Turcji, prowadzona przez spółkę ${clinicFacts.legalName}. Przyjmuje pacjentów ${hoursSummary}. Obsługa pacjentów odbywa się w językach: ${languagesPl}. Cennik kliniki publikujemy w EUR z orientacyjnym przeliczeniem na PLN, datą i kursem.`,
  long: `${CLINIC_NAME} to klinika stomatologiczna w Antalyi w Turcji (${CLINIC_ADDRESS_TEXT}), prowadzona przez spółkę ${clinicFacts.legalName}. Klinika przyjmuje pacjentów ${hoursSummary}, czyli ${openDays} dni w tygodniu po ${hoursPerDay} godzin. Obsługa pacjentów odbywa się w językach: ${languagesPl}; to, kto prowadzi rozmowę po polsku, warto ustalić przed rezerwacją. Zakres leczenia obejmuje m.in. implanty, korony cyrkonowe i licówki, a plan leczenia ustala lekarz dentysta po badaniu. Polskojęzyczny serwis informacyjny ${SITE_URL.replace("https://", "")} o celu komercyjnym, prowadzony przez tę samą spółkę, publikuje cennik kliniki w EUR i PLN z datą, opisy etapów leczenia oraz zasady weryfikacji treści.`
};

const en = {
  short: `${CLINIC_NAME}: dental clinic in Antalya, Turkey. Implants, crowns, veneers. Polish-language service, Mon–Sat 9:00–19:00 (Turkish time).`,
  medium: `${CLINIC_NAME} is a dental clinic in Antalya, Turkey, run by ${clinicFacts.legalName}. It receives patients Monday to Saturday, 9:00–19:00 Turkish time (UTC+3, no daylight saving), and serves patients in: ${languagesEnText}. The clinic's price list is published in EUR with an approximate PLN conversion, a date and the exchange rate used.`,
  long: `${CLINIC_NAME} is a dental clinic in Antalya, Turkey (${CLINIC_ADDRESS_TEXT}), run by ${clinicFacts.legalName}. It receives patients ${openDays} days a week, ${hoursPerDay} hours a day, Monday to Saturday, 9:00–19:00 Turkish time (UTC+3, no daylight saving), and serves patients in ${languagesEnText}. Treatment includes implants, zirconia crowns and veneers; the treatment plan is set by a dentist after an examination. A Polish-language information website, ${SITE_URL.replace("https://", "")}, with a commercial purpose and run by the same company, publishes the clinic's price list in EUR and PLN with dates, descriptions of treatment stages and its content verification rules.`
};

export const clinicDescriptions = { pl, en };

/** Payload of /citation-kit.json. Only verified listings appear. */
export function citationKit() {
  return {
    name: clinicFacts.name,
    legalName: clinicFacts.legalName,
    alternateNames: clinicFacts.alternateNames,
    url: clinicFacts.url,
    siteUrl: clinicFacts.siteUrl,
    address: { text: clinicFacts.addressText, ...clinicFacts.address },
    geo: clinicFacts.geo,
    phone: clinicFacts.phone,
    whatsapp: clinicFacts.whatsapp,
    email: clinicFacts.email,
    hours: { summary: clinicFacts.hoursSummary, timeZone: clinicFacts.timeZoneNote, hoursPerWeek: clinicFacts.hoursPerWeek },
    languages: clinicFacts.languages,
    profiles: clinicFacts.profiles,
    descriptions: clinicDescriptions,
    disclosure: clinicFacts.disclosure,
    listings: verifiedListings().map(({ id, name, url, kind, verifiedDate }) => ({ id, name, url, kind, verifiedDate })),
    lastUpdated: CITATION_KIT_UPDATED,
    note: "Use these values exactly as written so that every directory carries the same name, address and phone. Listings are verified by a person before they appear here."
  };
}
