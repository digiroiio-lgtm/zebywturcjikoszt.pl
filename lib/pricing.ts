/** Prices transcribed from the clinic price list supplied by the site operator. */
export const PRICING_UPDATED_ISO_DATE = "2026-09-30";
export const PRICING_UPDATED_DATE = "30 września 2026";
export const EUR_PLN_RATE = 4.37;
export const EUR_PLN_RATE_TIMESTAMP = "2026-09-30T09:11:00Z";

export type PriceItem = { id: string; label: string; sourceLabel: string; eur: number };

export const priceItems: PriceItem[] = [
  { id: "curettage", label: "Kiretaż periodontologiczny (jeden łuk zębowy)", sourceLabel: "KÜRETAJ (Tek Çene)", eur: 150 },
  { id: "implant-removal", label: "Usunięcie implantu", sourceLabel: "İmplant çıkartılması", eur: 150 },
  { id: "emax", label: "Odbudowa E-max", sourceLabel: "E-MAX", eur: 225 },
  { id: "veneer-crown", label: "Odbudowa „Veneer kuron”", sourceLabel: "VENEER KURON", eur: 400 },
  { id: "composite-filling", label: "Wypełnienie kompozytowe", sourceLabel: "COMPOSITE FILLING", eur: 90 },
  { id: "full-mouth-cleaning", label: "Higienizacja całej jamy ustnej", sourceLabel: "CLEANING FULL MOUNT", eur: 70 },
  { id: "retreatment", label: "Powtórne leczenie (retreatment)", sourceLabel: "RETREATMENT", eur: 300 },
  { id: "bleaching", label: "Wybielanie zębów", sourceLabel: "BLEACHING", eur: 300 },
  { id: "fiber-post", label: "Wkład z włókna szklanego", sourceLabel: "FIBER POST", eur: 75 },
  { id: "zirconia-crown", label: "Korona cyrkonowa", sourceLabel: "ZIRCONIUM CROWN", eur: 150 },
  { id: "composite-veneer", label: "Licówka kompozytowa", sourceLabel: "COMPOSITE VENEER", eur: 130 },
  { id: "root-canal", label: "Leczenie kanałowe zęba jednokorzeniowego", sourceLabel: "ROOT CANAL TR TEK KÖKLÜ", eur: 250 },
  { id: "gingivectomy", label: "Gingiwektomia", sourceLabel: "GINGIVEKTOMI", eur: 60 },
  { id: "frenectomy", label: "Frenektomia (zabieg na wędzidełku)", sourceLabel: "FRENEKTOMI", eur: 100 },
  { id: "night-guard", label: "Szyna nocna", sourceLabel: "NIGHT GUARD", eur: 100 },
  { id: "sinus-lift", label: "Podniesienie dna zatoki (sinus lift)", sourceLabel: "SINUS LIFT", eur: 300 },
  { id: "general-anesthesia", label: "Znieczulenie ogólne", sourceLabel: "GENERAL ANESTHESIA", eur: 1250 },
  { id: "sedation", label: "Sedacja", sourceLabel: "SEDATION", eur: 400 },
  { id: "masseter-botox", label: "Toksyna botulinowa w mięśnie żwacze", sourceLabel: "MASSETER BOTOX", eur: 250 },
  { id: "bone-graft", label: "Odbudowa kości (bone graft)", sourceLabel: "BONE GRAFT", eur: 250 },
  { id: "straumann", label: "Implant Straumann (Szwajcaria)", sourceLabel: "STRAUMANN (SWISS) IMPLANT", eur: 900 },
  { id: "aiser", label: "Implant Aiser", sourceLabel: "AISER IMPLANT", eur: 450 },
  { id: "medentika", label: "Implant Medentika", sourceLabel: "MEDENTIKA IMPLANT", eur: 450 },
  { id: "complicated-extraction", label: "Skomplikowane usunięcie zęba", sourceLabel: "COMPLICATED EXTRACTION", eur: 100 }
];

const implantIds = ["straumann", "aiser", "medentika", "implant-removal", "sinus-lift", "bone-graft", "zirconia-crown"];
const restorationIds = ["composite-veneer", "emax", "veneer-crown", "zirconia-crown", "bleaching"];
const fullArchIds = ["straumann", "aiser", "medentika", "zirconia-crown", "sinus-lift", "bone-graft", "complicated-extraction", "sedation", "general-anesthesia"];

export function pricesForPage(slug: string): PriceItem[] {
  const ids = slug === "implanty" ? implantIds : slug === "licowki" ? restorationIds : ["cala-szczeka", "all-on-4"].includes(slug) ? fullArchIds : null;
  if (slug === "koszt") return priceItems;
  return ids ? ids.map((id) => priceItems.find((item) => item.id === id)!) : [];
}

export function toPln(eur: number) { return Math.round(eur * EUR_PLN_RATE * 100) / 100; }
export function formatEur(eur: number) { return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "EUR" }).format(eur); }
export function formatPln(eur: number) { return new Intl.NumberFormat("pl-PL", { style: "currency", currency: "PLN" }).format(toPln(eur)); }
