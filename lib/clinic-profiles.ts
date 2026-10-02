/** Public third-party profiles of the partner clinic, supplied by the site operator. Ratings and review counts are intentionally not stored: they are not verified here. */
export const CLINIC_NAME = "Akdeniz Dental";
export const CLINIC_URL = "https://akdenizdental.com";
export const CLINIC_ID = `${CLINIC_URL}/#organization`;
export const CLINIC_GEO = { latitude: 36.8881905, longitude: 30.7220551 };

export const clinicProfiles = [
  { key: "trustpilot", label: "Trustpilot", description: "Profil kliniki Akdeniz Dental na platformie opinii Trustpilot.", href: "https://www.trustpilot.com/review/akdenizdental.com" },
  { key: "google-maps", label: "Mapy Google", description: "Wizytówka „Antalya Akdeniz Dental Clinic” w Mapach Google: lokalizacja i opinie.", href: "https://www.google.com/maps/place/Antalya+Akdeniz+Dental+Clinic/@36.8881905,25.8441254,7z/data=!4m10!1m2!2m1!1sakdeniz+dental!3m6!1s0x14c3853818debb29:0xeebda4dc170f9b9d!8m2!3d36.8881905!4d30.7220551!15sCg5ha2Rlbml6IGRlbnRhbFoQIg5ha2Rlbml6IGRlbnRhbJIBDWRlbnRhbF9jbGluaWOaASNDaFpEU1VoTk1HOW5TMFZKUTBGblNVUnFiSFJwUjJSbkVBReABAPoBBAhTEEg!16s%2Fg%2F11ll4yhrd0" }
] as const;
