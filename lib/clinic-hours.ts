/** Opening hours and service languages of the clinic in Antalya, as supplied by the site operator (clinic website, 2026-10-03). */
export const CLINIC_TIME_ZONE_NOTE = "czas turecki, UTC+3, bez zmiany czasu";

export const openingHours = [
  { days: "Poniedziałek – wtorek", schema: ["Monday", "Tuesday"], opens: "09:00", closes: "19:00" },
  { days: "Środa – czwartek", schema: ["Wednesday", "Thursday"], opens: "09:00", closes: "19:00" },
  { days: "Piątek – sobota", schema: ["Friday", "Saturday"], opens: "09:00", closes: "19:00" },
  { days: "Niedziela", schema: [], opens: null, closes: null }
] as const;

export const serviceLanguages = [
  { code: "pl", label: "polski" },
  { code: "en", label: "angielski" },
  { code: "ru", label: "rosyjski" },
  { code: "de", label: "niemiecki" },
  { code: "ro", label: "rumuński" }
] as const;

const hhmm = (value: string) => value.replace(/^0/, "");

/** One-line summary used next to the contact form, e.g. "pon.–sob. 9:00–19:00 czasu tureckiego, niedziela zamknięte". */
export const hoursSummary = `pon.–sob. ${hhmm("09:00")}–${hhmm("19:00")} czasu tureckiego, niedziela zamknięte`;
export const languagesSummary = serviceLanguages.map((language) => language.label).join(", ");

export const openingHoursSpecification = openingHours
  .filter((row) => row.opens)
  .map((row) => ({ "@type": "OpeningHoursSpecification", dayOfWeek: [...row.schema], opens: row.opens, closes: row.closes }));
