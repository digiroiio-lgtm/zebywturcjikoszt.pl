import { EUR_PLN_RATE, EUR_PLN_RATE_TIMESTAMP, PRICING_UPDATED_ISO_DATE, priceItems, toPln } from "./pricing";

export const DATASET_PATH = "/dane/cennik-kliniki";

export type PriceRow = { id: string; label: string; sourceLabel: string; eur: number; pln: number };

export const priceRows = (): PriceRow[] => priceItems.map((item) => ({ id: item.id, label: item.label, sourceLabel: item.sourceLabel, eur: item.eur, pln: toPln(item.eur) }));

const csvCell = (value: string | number) => {
  const text = String(value);
  return /[",\n]/.test(text) ? `"${text.replace(/"/g, '""')}"` : text;
};

export function priceCsv(): string {
  const header = ["id", "label_pl", "label_source", "price_eur", "approx_price_pln", "eur_pln_rate", "rate_timestamp_utc", "price_list_date"];
  const rows = priceRows().map((row) => [row.id, row.label, row.sourceLabel, row.eur, row.pln, EUR_PLN_RATE, EUR_PLN_RATE_TIMESTAMP, PRICING_UPDATED_ISO_DATE]);
  return `${[header, ...rows].map((row) => row.map(csvCell).join(",")).join("\n")}\n`;
}

export function priceJson() {
  return {
    name: "Cennik kliniki Akdeniz Dental w Antalyi (pozycje w EUR)",
    description: "Pozycje cennika kliniki z orientacyjnym przeliczeniem na PLN. To ceny pozycji, a nie cena całego leczenia, pakietu ani wyjazdu.",
    priceListDate: PRICING_UPDATED_ISO_DATE,
    currency: "EUR",
    conversion: { to: "PLN", rate: EUR_PLN_RATE, rateTimestampUtc: EUR_PLN_RATE_TIMESTAMP, note: "Kurs nie jest aktualizowany automatycznie; kurs płatności może być inny. Kwoty w PLN zaokrąglono do pełnych złotych." },
    items: priceRows().map((row) => ({ id: row.id, label: row.label, sourceLabel: row.sourceLabel, priceEur: row.eur, approxPricePln: row.pln }))
  };
}
