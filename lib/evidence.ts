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
  introduction?: string;
  experience?: string;
  affiliation?: string;
  sourceNote?: string;
  reviewScope?: string;
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

export const implantMedicalReviewer: VerifiedExpert = {
  slug: "mehmet-onur-merey",
  name: "Mehmet Onur Merey",
  professionalTitle: "Diş Hekimi",
  location: "Antalya, Turcja",
  clinic: "Akdeniz Dental Clinic",
  biography: "Mehmet Onur Merey jest dentystą związanym z Akdeniz Dental w Antalyi. Według indywidualnego profilu kliniki studiował stomatologię na Marmara University w latach 2010–2016, a następnie kształcił się w chirurgii jamy ustnej i szczękowo-twarzowej na Akdeniz University w latach 2018–2023. Klinika opisuje go również jako właściciela placówki.",
  professionalFocus: ["chirurgia jamy ustnej i szczękowo-twarzowa", "implantologia", "odbudowa kości", "złożone ekstrakcje"],
  introduction: "Dentysta związany z chirurgią jamy ustnej i szczękowo-twarzową w Akdeniz Dental w Antalyi, w Turcji.",
  experience: "Według profilu kliniki zajmuje się leczeniem implantologicznym, odbudową kości i złożonymi ekstrakcjami. Dane o wykształceniu oraz obszarach pracy pochodzą od kliniki; profil nie stanowi niezależnej weryfikacji dyplomu ani uprawnień.",
  affiliation: "Mehmet Onur Merey pracuje w Akdeniz Dental, klinice partnerskiej serwisu, i według jej profilu jest właścicielem placówki. Jest to powiązanie zawodowe i komercyjne; nie przedstawiamy go jako niezależnego recenzenta. Rola recenzenta nie oznacza gwarancji wyniku leczenia ani zastąpienia indywidualnego badania.",
  sourceNote: "Indywidualny profil Akdeniz Dental opisuje pełne imię i nazwisko, wykształcenie, obszary pracy i rolę w klinice. W zestawieniu zespołu występuje również skrócone imię Onur Merey. Źródło nie stanowi rekomendacji naszego serwisu.",
  reviewScope: "W tym serwisie jego zakres recenzji obejmuje wyłącznie przewodniki o implantach i All-on-4. Pozostałe kategorie nie są przypisywane mu automatycznie.",
  profileUrl: "/eksperci/mehmet-onur-merey",
  sources: [{ label: "Akdeniz Dental: indywidualny profil Mehmet Onur Merey", url: "https://akdenizdental.com/mehmet-onur-merey" }, { label: "Akdeniz Dental: zespół kliniczny", url: "https://akdenizdental.com/our-team" }],
  lastVerified: "2026-09-30"
};

export const verifiedExperts: VerifiedExpert[] = [siteMedicalReviewer, implantMedicalReviewer];

// Cases remain unpublished until source documents, consent and clinical details are verified.
export const verifiedCases: VerifiedCase[] = [];
