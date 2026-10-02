/** Public third-party profiles of the partner clinic. Ratings were read by the site operator from the live profiles on RATINGS_CHECKED_ISO_DATE and change over time; they are shown as dated third-party data and are NOT published as AggregateRating markup. */
export const CLINIC_NAME = "Akdeniz Dental";
export const CLINIC_URL = "https://akdenizdental.com";
export const CLINIC_ID = `${CLINIC_URL}/#organization`;
export const RATINGS_CHECKED_ISO_DATE = "2026-10-02";
export const RATINGS_CHECKED_DATE = "2 października 2026";
export const CLINIC_ADDRESS = { streetAddress: "Çaybaşı Mah. 1358. Sk. Premier Plaza D:1 B Blok", postalCode: "07100", addressLocality: "Muratpaşa", addressRegion: "Antalya", addressCountry: "TR" };
export const CLINIC_ADDRESS_TEXT = "Çaybaşı, 1358. Sk. Premier Plaza D:1 B Blok, 07100 Muratpaşa/Antalya, Turcja";
export const CLINIC_GEO = { latitude: 36.8881905, longitude: 30.7220551 };

export const clinicProfiles = [
  { key: "trustpilot", label: "Trustpilot", description: "Profil kliniki Akdeniz Dental Clinic na platformie opinii Trustpilot (profil przejęty przez firmę w maju 2022).", rating: "4,7", reviewCount: "95", href: "https://www.trustpilot.com/review/akdenizdental.com" },
  { key: "google-maps", label: "Mapy Google", description: "Wizytówka „Antalya Akdeniz Dental Clinic” w Mapach Google: lokalizacja i opinie.", rating: "5,0", reviewCount: "1157", href: "https://www.google.com/maps/place/Antalya+Akdeniz+Dental+Clinic/@36.8881905,25.8441254,7z/data=!4m10!1m2!2m1!1sakdeniz+dental!3m6!1s0x14c3853818debb29:0xeebda4dc170f9b9d!8m2!3d36.8881905!4d30.7220551!15sCg5ha2Rlbml6IGRlbnRhbFoQIg5ha2Rlbml6IGRlbnRhbJIBDWRlbnRhbF9jbGluaWOaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnFiSFJwUjJSbkVBReABAPoBBAhTEEg!16s%2Fg%2F11ll4yhrd0" }
] as const;
