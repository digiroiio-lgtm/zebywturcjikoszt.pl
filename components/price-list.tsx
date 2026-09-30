import Link from "next/link";
import { formatEur, formatPln, PRICING_UPDATED_DATE, pricesForPage, priceItems } from "@/lib/pricing";

export function PriceList({ slug }: { slug: string }) {
  const items = pricesForPage(slug);
  if (!items.length) return null;
  const fullList = slug === "koszt";
  const fullArch = slug === "cala-szczeka" || slug === "all-on-4";
  return <section className="content-section pricing-section" id="cennik" aria-labelledby="pricing-title">
    <div className="pricing-heading"><p className="mini-label">Ceny w EUR i PLN</p><h2 id="pricing-title">{fullList ? "Pełny cennik leczenia" : fullArch ? "Ceny wybranych elementów leczenia" : "Cennik zabiegów związanych z leczeniem"}</h2><p>Aktualizacja cennika: <time dateTime="2026-09-30">{PRICING_UPDATED_DATE}</time>. {fullList ? "24 pozycje z cennika kliniki." : "Wybrane pozycje z pełnego cennika kliniki."}</p></div>
    <div className="pricing-rate"><strong>1 EUR = 4,37 PLN</strong><span>Kurs orientacyjny przyjęty do przeliczenia: <time dateTime="2026-09-30T09:11:00Z">30.09.2026, 09:11 UTC</time>.</span></div>
    {fullArch && <p className="pricing-scope">Poniższe kwoty dotyczą poszczególnych pozycji. Nie stanowią ceny pakietu All-on-4 ani pełnej odbudowy łuku. Całkowity koszt wymaga indywidualnego planu.</p>}
    <div className="table-wrap pricing-table-wrap"><table className="pricing-table"><caption>{fullList ? "Pełna lista 24 zabiegów: ceny w euro i orientacyjny koszt w złotych" : "Wybrane zabiegi: ceny w euro i orientacyjny koszt w złotych"}</caption><thead><tr><th scope="col">Zabieg / pozycja</th><th scope="col">Cena EUR</th><th scope="col">Około PLN</th></tr></thead><tbody>{items.map((item) => <tr key={item.id} data-price-id={item.id}><th scope="row">{item.label}</th><td>{formatEur(item.eur)}</td><td>≈ {formatPln(item.eur)}</td></tr>)}</tbody></table></div>
    <div className="pricing-notes"><p><strong>EUR jest walutą bazową cennika.</strong> Kwoty w PLN są orientacyjne. Ostateczne przeliczenie może się różnić zależnie od kursu banku, operatora płatności i dnia zapłaty.</p><p>Cena pozycji nie określa automatycznie pełnego kosztu leczenia. Liczbę zębów, implantów, wizyt, materiały i zakres usług potwierdza indywidualna wycena. Cennik nie określa włączenia hotelu, transferów, lotów, diagnostyki ani wszystkich elementów protetycznych.</p><p>„E-max” określa materiał, a nazwa „Veneer kuron” wymaga doprecyzowania rodzaju odbudowy. Licówki i korony mają odmienny zakres; przed wyborem poproś klinikę o dokładny opis pozycji. Zakres „retreatment” również należy potwierdzić w planie.</p></div>
    {!fullList && <Link className="text-link" href="/koszt#cennik">Zobacz pełny cennik: wszystkie 24 pozycje →</Link>}
  </section>;
}

export function PriceHighlights() {
  const ids = ["zirconia-crown", "composite-veneer", "aiser"];
  return <section className="shell section-space price-highlights" aria-labelledby="price-highlights-title"><div className="section-heading"><div><p className="eyebrow">Cennik kliniki · EUR / PLN</p><h2 id="price-highlights-title">Przykładowe ceny leczenia</h2></div><p>Ceny poszczególnych pozycji. Kwoty w złotych są orientacyjne przy kursie 1 EUR = 4,37 PLN z 30.09.2026.</p></div><div className="price-highlight-grid">{ids.map((id) => {
    const item = priceItems.find((price) => price.id === id)!;
    return <Link key={id} href="/koszt#cennik" className="price-highlight-card"><h3>{item.label}</h3><strong>{formatEur(item.eur)}</strong><span>≈ {formatPln(item.eur)}</span></Link>;
  })}</div><Link className="text-link" href="/koszt#cennik">Sprawdź pełny cennik 24 zabiegów →</Link></section>;
}
