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

export const verifiedExperts: VerifiedExpert[] = [{
  slug: "mustafa-akca",
  name: "Mustafa Akça",
  professionalTitle: "Diş Hekimi",
  location: "Antalya, Turcja",
  clinic: "Akdeniz Dental Clinic / Özel Antalya Akdeniz Ağız ve Diş Sağlığı Polikliniği",
  biography: "Mustafa Akça jest dentystą w Antalyi związanym z Akdeniz Dental Clinic. Profil kliniki podaje, że ukończył Uniwersytet Medipol w latach 2012–2018 i jest założycielem i właścicielem placówki. Te szczegóły pochodzą ze strony kliniki; publiczne katalogi potwierdzają jego imię, zawód oraz lokalizację.",
  professionalFocus: ["protetyka stomatologiczna", "odbudowy pełnego łuku", "uzupełnienia cyrkonowe", "stomatologia estetyczna"],
  profileUrl: "/eksperci/mustafa-akca",
  sources: [
    { label: "Akdeniz Dental Clinic: profil lekarza i biografia", url: "https://akdenizdental.com/mustafa-akca" },
    { label: "Antalya Diş Hekimleri: zawód, lokalizacja i placówka", url: "https://www.antalyadishekimleri.com/dis-hekimi/mustafa-akca/" },
    { label: "Doktorsitesi: profil dentysty", url: "https://www.doktorsitesi.com/mustafa-akca/dis-hekimi/antalya" }
  ],
  lastVerified: "2026-09-22"
}];

// Cases remain unpublished until source documents, consent and clinical details are verified.
export const verifiedCases: VerifiedCase[] = [];
