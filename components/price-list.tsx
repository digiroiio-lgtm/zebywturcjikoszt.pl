import { TrackedLink } from "./tracked-link";
import Link from "next/link";
import type { ReactNode } from "react";
import { formatEur, formatPln, PRICING_UPDATED_DATE, pricesForPage, priceItems, priceCategories, priceById } from "@/lib/pricing";

export function PriceList({ slug }: { slug: string }) {
  const items = pricesForPage(slug);
  if (!items.length) return null;
  const fullList = slug === "koszt";
  const fullArch = slug === "cala-szczeka" || slug === "all-on-4";
  return <section className="content-section pricing-section" id="cennik" aria-labelledby="pricing-title">
    <div className="pricing-heading"><p className="mini-label">Ceny w EUR i PLN</p><h2 id="pricing-title">{fullList ? "Pełny cennik leczenia" : fullArch ? "Ceny wybranych elementów leczenia" : "Cennik zabiegów związanych z leczeniem"}</h2><p>Aktualizacja cennika: <time dateTime="2026-09-30">{PRICING_UPDATED_DATE}</time>. {fullList ? "24 pozycje z cennika kliniki." : "Wybrane pozycje z pełnego cennika kliniki."}</p></div>
    <div className="pricing-rate"><strong>1 EUR = 4,37 PLN</strong><span>Kurs orientacyjny przyjęty do przeliczenia: <time dateTime="2026-09-30T09:11:00Z">30.09.2026, 09:11 UTC</time>.</span></div>
    {fullArch && <p className="pricing-scope">Poniższe kwoty dotyczą poszczególnych pozycji. Nie stanowią ceny pakietu All-on-4 ani pełnej odbudowy łuku. Całkowity koszt wymaga indywidualnego planu.</p>}
    {fullList && <nav className="price-category-nav" aria-label="Kategorie cennika">{priceCategories.map((category) => <a href={`#cennik-${category.id}`} key={category.id}>{category.label}</a>)}</nav>}
    {(fullList ? priceCategories.map((category) => ({ ...category, items: category.ids.map(priceById) })) : [{ id: "wybrane", label: "Wybrane pozycje cennika", items }]).map((category) => <div key={category.id} id={fullList ? `cennik-${category.id}` : undefined} className="price-category">
      {fullList && <h3>{category.label}</h3>}
      <div className="table-wrap pricing-table-wrap"><table className="pricing-table"><caption>{category.label}: ceny w EUR i orientacyjnie w PLN</caption><thead><tr><th scope="col">Zabieg / pozycja</th><th scope="col">Cena EUR</th><th scope="col">Około PLN</th></tr></thead><tbody>{category.items.map((item) => <tr key={item.id} data-price-id={item.id}><th scope="row">{item.id === "zirconia-crown" ? <TrackedLink href="/korony-cyrkonowe" event="guide_to_treatment" tracking={{ destination_path: "/korony-cyrkonowe" }}>{item.label}</TrackedLink> : ["aiser", "medentika", "straumann"].includes(item.id) ? <TrackedLink href="/implanty#zakres-implantu" event="guide_to_treatment" tracking={{ destination_path: "/implanty" }}>{item.label}</TrackedLink> : item.label}</th><td>{formatEur(item.eur)}</td><td>≈ {formatPln(item.eur)}</td></tr>)}</tbody></table></div>
    </div>)}
    <div className="pricing-notes"><p><strong>EUR jest walutą bazową cennika.</strong> Kwoty w PLN są orientacyjne. Ostateczne przeliczenie może się różnić zależnie od kursu banku, operatora płatności i dnia zapłaty.</p><p>Cena pozycji nie określa automatycznie pełnego kosztu leczenia. Liczbę zębów, implantów, wizyt, materiały i zakres usług potwierdza indywidualna wycena. Cennik nie określa włączenia hotelu, transferów, lotów, diagnostyki ani wszystkich elementów protetycznych.</p><p>„E-max” określa materiał, a nazwa „Veneer kuron” wymaga doprecyzowania rodzaju odbudowy. Licówki i korony mają odmienny zakres; przed wyborem poproś klinikę o dokładny opis pozycji. Zakres „retreatment” również należy potwierdzić w planie.</p></div>
    {!fullList && <TrackedLink className="text-link" href="/koszt#cennik" event="guide_to_pricing" tracking={{ destination_path: "/koszt" }}>Zobacz ceny leczenia</TrackedLink>}
  </section>;
}

export function PriceHighlights({ children, guideSource }: { children?: ReactNode; guideSource?: string }) {
  const ids = ["zirconia-crown", "composite-veneer", "aiser"];
  return <section className="shell section-space price-highlights" aria-labelledby="price-highlights-title"><div className="section-heading"><div><p className="eyebrow">Cennik kliniki · EUR / PLN</p><h2 id="price-highlights-title">Przykładowe ceny leczenia</h2></div><p>Ceny poszczególnych pozycji. Kwoty w złotych są orientacyjne przy kursie 1 EUR = 4,37 PLN z 30.09.2026.</p></div><div className="price-highlight-grid">{ids.map((id) => {
    const item = priceItems.find((price) => price.id === id)!;
    if (guideSource) return <TrackedLink key={id} href={`${id === "zirconia-crown" ? "/korony-cyrkonowe" : id === "aiser" ? "/implanty" : "/licowki"}?guide_source=${encodeURIComponent(guideSource)}`} event="guide_to_treatment" tracking={{ guide_source: guideSource, destination_path: id === "zirconia-crown" ? "/korony-cyrkonowe" : id === "aiser" ? "/implanty" : "/licowki" }} className="price-highlight-card"><h3>{item.label}</h3><strong>{formatEur(item.eur)}</strong><span>≈ {formatPln(item.eur)}</span></TrackedLink>;
    return <Link key={id} href={id === "zirconia-crown" ? "/korony-cyrkonowe" : id === "aiser" ? "/implanty#zakres-implantu" : "/licowki#cennik"} className="price-highlight-card"><h3>{item.label}</h3><strong>{formatEur(item.eur)}</strong><span>≈ {formatPln(item.eur)}</span></Link>;
  })}</div>{guideSource ? <TrackedLink className="text-link" href={`/koszt?guide_source=${encodeURIComponent(guideSource)}#cennik`} event="guide_to_pricing" tracking={{ guide_source: guideSource, destination_path: "/koszt" }}>Zobacz ceny leczenia</TrackedLink> : <Link className="text-link" href="/koszt#cennik">Sprawdź pełny cennik 24 zabiegów →</Link>}{children}</section>;
}
