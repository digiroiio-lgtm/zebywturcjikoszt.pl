/**
 * Facts about how the clinic team answers enquiries, shown next to the form button and on the confirmation screen.
 * Leave each value null until the operator confirms it; nothing is shown (and nothing is promised) while it is null.
 */
export const CONTACT_PROMISE: { responseTime: string | null; hours: string | null; languages: string | null } = {
  responseTime: null, // e.g. "w ciągu jednego dnia roboczego"
  hours: null, // e.g. "pon.–pt., 9:00–18:00 czasu tureckiego"
  languages: null // e.g. "po polsku i angielsku"
};

export function contactPromiseLines(): string[] {
  const { responseTime, hours, languages } = CONTACT_PROMISE;
  return [
    responseTime && `Odpowiadamy ${responseTime}.`,
    hours && `Godziny kontaktu: ${hours}.`,
    languages && `Obsługa ${languages}.`
  ].filter((line): line is string => Boolean(line));
}
