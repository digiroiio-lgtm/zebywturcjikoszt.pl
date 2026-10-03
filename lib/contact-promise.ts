import { hoursSummary, languagesSummary } from "./clinic-hours";

/**
 * Facts about how the clinic team answers enquiries, shown next to the form button and on the confirmation screen.
 * Hours and languages come from the operator (lib/clinic-hours.ts). The response time stays null until the operator
 * confirms a commitment; nothing is shown (and nothing is promised) while it is null.
 */
export const CONTACT_PROMISE: { responseTime: string | null; hours: string | null; languages: string | null } = {
  responseTime: null, // e.g. "w ciągu jednego dnia roboczego"
  hours: hoursSummary,
  languages: languagesSummary
};

export function contactPromiseLines(): string[] {
  const { responseTime, hours, languages } = CONTACT_PROMISE;
  return [
    responseTime && `Odpowiadamy ${responseTime}.`,
    hours && `Godziny otwarcia kliniki: ${hours}.`,
    languages && `Języki obsługi: ${languages}.`
  ].filter((line): line is string => Boolean(line));
}
