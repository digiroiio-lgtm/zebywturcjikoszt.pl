/** Publication requires documented source verification; missing fields never imply clinical facts. */
export type ClinicalSource = {
  title: string;
  organization: string;
  url: string;
  claimSupported: string;
  publicationDate?: string;
  accessedDate?: string;
};

export type VerifiedExpert = {
  slug: string;
  name: string;
  professionalTitle: string;
  location: string;
  clinic: string;
  biography: string;
  professionalFocus: string[];
  profileUrl: string;
  sources: { label: string; url: string }[];
  lastVerified: string;
};

export type VerifiedCase = {
  id: string;
  status: "verified";
  initialSituation: string;
  objective: string;
  treatment: string;
  limitations: string;
  consentDocumented: true;
  medicalVerificationDocumented: true;
  clinician?: string;
  implants?: number;
  restorations?: string;
  material?: string;
  visits?: number;
  timeline?: string;
  imageDates?: string[];
};

export const siteMedicalReviewer: VerifiedExpert = {
  slug: "mustafa-akca",
  name: "Mustafa Akça",
  professionalTitle: "Diş Hekimi",
  location: "Antalya, Turcja",
  clinic: "Akdeniz Dental Clinic / Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği",
  biography: "Mustafa Akça jest dentystą w Antalyi związanym z Akdeniz Dental. Według biografii opublikowanej przez klinikę urodził się w Antalyi w 1994 roku, studiował stomatologię na Uniwersytecie Medipol w latach 2012–2018 i jest założycielem oraz właścicielem placówki. Informacje o edukacji i roli właścicielskiej pochodzą ze strony kliniki; publiczne profile zawodowe potwierdzają jego imię, zawód i lokalizację.",
  professionalFocus: ["protetyka stomatologiczna", "kompleksowa odbudowa uzębienia", "uzupełnienia cyrkonowe", "stomatologia estetyczna i planowanie uśmiechu"],
  profileUrl: "/eksperci/mustafa-akca",
  sources: [
    { label: "Akdeniz Dental Clinic: profil lekarza i biografia", url: "https://akdenizdental.com/mustafa-akca" },
    { label: "Antalya Diş Hekimleri: zawód, lokalizacja i placówka", url: "https://www.antalyadishekimleri.com/dis-hekimi/mustafa-akca/" },
    { label: "Doktorsitesi: profil dentysty", url: "https://www.doktorsitesi.com/mustafa-akca/dis-hekimi/antalya" },
    { label: "Teeth Done in Turkey: profil recenzenta w serwisie anglojęzycznym", url: "https://www.teethdoneinturkey.co.uk/medical-reviewers/mustafa-akca" }
  ],
  lastVerified: "2026-09-30"
};

export const verifiedExperts: VerifiedExpert[] = [siteMedicalReviewer];

// Cases remain unpublished until source documents, consent and clinical details are verified.
export const verifiedCases: VerifiedCase[] = [];
