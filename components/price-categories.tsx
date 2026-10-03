import type { ReactNode } from "react";
import { TrackedLink } from "./tracked-link";
import { guideAssessmentHref } from "@/lib/guides";
import { formatEur, formatPln, priceById, priceCategories, priceItems, PRICING_UPDATED_DATE } from "@/lib/pricing";

const icons: Record<string, ReactNode> = {
  "korony-licowki": <path d="M6 9c0-3 2-5 5-5 1.3 0 2 .6 3 .6s1.7-.6 3-.6c3 0 5 2 5 5 0 3-1 4.5-1.5 7-.4 2.2-.8 4-2 4s-1.4-2-2-4c-.5-1.8-1-2.5-2.5-2.5S10 14.2 9.5 16C9 18 8.8 20 7.5 20s-1.6-1.8-2-4C5 13.5 6 12 6 9z" />,
  "implanty-chirurgia": <path d="M8 3h8M9 3v4h6V3M10 7v3h4V7M9.5 10l5 2.5M9.5 13l5 2.5M10 16l4 2M12 18v3" />,
  "leczenie-dziasel": <path d="M12 21c-5-4-8-7-8-11a4 4 0 0 1 8-1 4 4 0 0 1 8 1c0 4-3 7-8 12z" />,
  "higiena-estetyka": <path d="M12 3l1.8 5.200L19 10l-5.200 1.8L12 17l-1.8-5.200L5 10l5.200-1.8zM19 16l.8 2.2L22 19l-2.2.8L19 22l-.8-2.2L16 19l2.2-.8z" />,
  znieczulenie: <path d="M12 3c3 4 6 7 6 11a6 6 0 0 1-12 0c0-4 3-7 6-11z" />
};

/** Visual summary of the price list by category. Every number is derived from lib/pricing.ts, so it cannot drift from the table below it. */
export function PriceCategoriesInfographic() {
  const scaleMax = Math.max(...priceItems.map((item) => item.eur));
  const cheapest = priceItems.reduce((a, b) => (b.eur < a.eur ? b : a));
  const dearest = priceItems.reduce((a, b) => (b.eur > a.eur ? b : a));
  const rows = priceCategories.map((category) => {
    const items = category.ids.map(priceById);
    const eurs = items.map((item) => item.eur);
    return { ...category, items, min: Math.min(...eurs), max: Math.max(...eurs) };
  });
  return <section className="price-infographic" aria-labelledby="price-infographic-title">
    <p className="mini-label">Cennik w pięciu kategoriach</p>
    <h3 id="price-infographic-title">Od czego zależy koszt: kategorie cennika i widełki cen pozycji</h3>
    <p className="price-infographic-lead">Pozycje cennika kliniki Akdeniz Dental kosztują od {formatEur(cheapest.eur)} ({cheapest.label.toLowerCase()}) do {formatEur(dearest.eur)} ({dearest.label.toLowerCase()}). Poniżej widełki w każdej kategorii na wspólnej skali, stan na {PRICING_UPDATED_DATE}.</p>
    <ol className="price-infographic-grid">
      {rows.map((row) => <li key={row.id} className="price-infographic-card">
        <div className="price-infographic-head">
          <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{icons[row.id]}</svg>
          <h4>{row.label}</h4>
        </div>
        <p className="price-infographic-range"><strong>{row.min === row.max ? formatEur(row.min) : `${formatEur(row.min)} – ${formatEur(row.max)}`}</strong><span>≈ {row.min === row.max ? formatPln(row.min) : `${formatPln(row.min)} – ${formatPln(row.max)}`}</span></p>
        <div className="price-infographic-bar" aria-hidden="true"><span style={{ left: `${(row.min / scaleMax) * 100}%`, width: `${Math.max(((row.max - row.min) / scaleMax) * 100, 3)}%` }} /></div>
        <p className="price-infographic-items">{row.items.length} pozycji, m.in. {row.items.slice(0, 3).map((item) => item.label.replace(/ \(.*\)$/, "").toLowerCase()).join(", ")}.</p>
        <a className="text-link" href={`#cennik-${row.id}`}>Zobacz pozycje →</a>
      </li>)}
    </ol>
    <p className="price-infographic-note">To ceny pojedynczych pozycji, nie pakietów. Liczba pozycji, materiały, badania, nocleg i dojazd zależą od planu ustalonego przez lekarza po badaniu.</p>
    <div className="price-infographic-cta">
      <div><strong>Chcesz wiedzieć, które pozycje dotyczą Ciebie?</strong><p>Opisz krótko, czego potrzebujesz. Nie przesyłaj dokumentacji medycznej. Wstępna wycena porządkuje rozmowę, a plan i cenę ustala lekarz po badaniu.</p></div>
      <div className="price-infographic-actions">
        <TrackedLink href={guideAssessmentHref("/koszt", "price_infographic")} event="page_cta" tracking={{ cta_location: "price_infographic" }} className="button">Poproś o wstępną wycenę</TrackedLink>
        <TrackedLink href="/poradniki/calkowity-koszt-wyjazdu" event="guide_open" tracking={{ destination_path: "/poradniki/calkowity-koszt-wyjazdu" }} className="text-link">Policz koszt całego wyjazdu →</TrackedLink>
      </div>
    </div>
  </section>;
}
