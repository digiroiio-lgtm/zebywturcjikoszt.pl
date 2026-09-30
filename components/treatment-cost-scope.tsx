import Link from "next/link";
import { formatEur, formatPln, priceSubtotal } from "@/lib/pricing";

const commercialPages = ["koszt", "implanty", "korony-cyrkonowe", "licowki", "cala-szczeka", "all-on-4"];

export function TreatmentCostScope({ slug }: { slug: string }) {
  if (!commercialPages.includes(slug)) return null;
  const implants = slug === "implanty" || slug === "koszt";
  const crowns = slug === "korony-cyrkonowe";
  const veneers = slug === "licowki";
  const scenarios = implants ? ["aiser", "medentika", "straumann"].map((id) => ({
    label: `1 pozycja implant ${id === "aiser" ? "Aiser" : id === "medentika" ? "Medentika" : "Straumann"} + 1 pozycja korona cyrkonowa`,
    lines: [{ id, quantity: 1 }, { id: "zirconia-crown", quantity: 1 }]
  })) : crowns || veneers ? [1, 6, 10].map((quantity) => ({
    label: `${quantity} × ${crowns ? "korona cyrkonowa" : "licówka kompozytowa"}`,
    lines: [{ id: crowns ? "zirconia-crown" : "composite-veneer", quantity }]
  })) : [];
  return <>
    {scenarios.length > 0 && <section className="content-section" id="przykladowe-sumy" aria-labelledby="subtotal-title">
      <p className="mini-label">Obliczenie z cennika</p><h2 id="subtotal-title">Ile wynosi suma wybranych pozycji?</h2>
      <p>To przykłady arytmetyczne przy założeniu osobnego rozliczania każdej wskazanej pozycji. Nie są potwierdzonymi ofertami, pełnym kosztem leczenia ani zaleceniem liczby odbudów. Klinikę należy poprosić o potwierdzenie jednostki rozliczenia i zakresu, aby nie liczyć dwa razy elementów już włączonych do ceny.</p>
      <div className="table-wrap"><table className="pricing-table"><caption>Suma wybranych pozycji, bez niepotwierdzonych elementów</caption><thead><tr><th scope="col">Przykładowe pozycje</th><th scope="col">Suma EUR</th><th scope="col">Około PLN</th></tr></thead><tbody>{scenarios.map((scenario) => {
        const total = priceSubtotal(scenario.lines);
        return <tr key={scenario.label} data-subtotal-eur={total}><th scope="row">{scenario.label}</th><td>{formatEur(total)}</td><td>≈ {formatPln(total)}</td></tr>;
      })}</tbody></table></div>
      <p className="pricing-scope">{implants ? "Łącznik, diagnostyka, praca tymczasowa, zabiegi dodatkowe i koszt pobytu nie mają tu potwierdzonej ceny ani statusu włączenia. Korona z cennika wymaga potwierdzenia zastosowania na danym implancie. Suma 600 EUR lub 1 050 EUR nie jest ceną kompletnego implantu zęba." : "Suma obejmuje tylko wymienione odbudowy. Badania, przygotowanie zębów, prace tymczasowe, leczenie dodatkowe i pobyt wymagają osobnego potwierdzenia. Liczbę odbudów ustala lekarz po ocenie."}</p>
    </section>}
    <section className="content-section" id={slug === "implanty" ? "zakres-implantu" : "zakres-wyceny"} aria-labelledby="scope-title">
      <h2 id="scope-title">{slug === "implanty" ? "Co obejmuje cena implantu, a co wymaga potwierdzenia?" : "Co musi obejmować całkowita wycena?"}</h2>
      <div className="table-wrap"><table><caption>Zakres ceny: informacje dostępne i brakujące</caption><thead><tr><th scope="col">Element</th><th scope="col">Co wiemy z cennika</th><th scope="col">Co potwierdzić w ofercie</th></tr></thead><tbody>
        <tr><th scope="row">{crowns ? "Korony cyrkonowe" : veneers ? "Licówki i materiał" : "Implanty i odbudowa"}</th><td>{crowns ? "Korona cyrkonowa: 150 EUR" : veneers ? "Licówka kompozytowa: 130 EUR; E-max: 225 EUR; „Veneer kuron”: 400 EUR" : "Aiser / Medentika: 450 EUR; Straumann: 900 EUR; korona cyrkonowa: 150 EUR"}</td><td>Jednostka rozliczenia, liczba, dokładny rodzaj odbudowy, materiał i zastosowanie.</td></tr>
        {!crowns && !veneers && <tr><th scope="row">Łącznik (abutment)</th><td>Brak osobnej ceny i potwierdzenia włączenia.</td><td>Typ łącznika, zgodność z implantem oraz czy koszt jest zawarty w cenie.</td></tr>}
        <tr><th scope="row">Diagnostyka i kwalifikacja</th><td>Brak cen konsultacji i badań obrazowych.</td><td>Jakie badania są potrzebne, gdzie są wykonywane i kto za nie płaci.</td></tr>
        <tr><th scope="row">Prace tymczasowe i docelowe</th><td>Brak potwierdzonego pakietu.</td><td>Oddzielny opis obu etapów, materiał, liczba wizyt i cena.</td></tr>
        <tr><th scope="row">Dodatkowe leczenie i znieczulenie</th><td>Wybrane ceny zabiegów są w cenniku.</td><td>Czy są potrzebne w konkretnym planie, ile pozycji i czy są dodatkowo płatne.</td></tr>
        <tr><th scope="row">Podróż, pobyt i opieka</th><td>Brak potwierdzenia włączenia hotelu, lotów i transferów.</td><td>Koszt każdego pobytu, kontroli, korekt i ewentualnego powrotu do kliniki.</td></tr>
      </tbody></table></div>
    </section>
    <section className="content-section quote-confirmation" id="cena-calkowita" aria-labelledby="quote-title">
      <p className="mini-label">Oferta po ustaleniu zakresu</p><h2 id="quote-title">Potwierdzona cena całkowita: co jest potrzebne?</h2>
      <p><strong>Nie opublikowano jeszcze potwierdzonej ceny całego pakietu.</strong> Dostępny dokument podaje ceny pozycji, ale nie określa kompletnego planu ani ostatecznego kosztu. Dla {slug === "all-on-4" ? "All-on-4" : slug === "cala-szczeka" ? "pełnej odbudowy łuku" : "Twojego leczenia"} poproś o pisemną ofertę z poniższymi informacjami.</p>
      <ol className="check-list"><li>Liczba, jednostka i cena każdej pozycji; suma w EUR oraz warunki przeliczenia na PLN.</li><li>Osobna lista usług wliczonych, niewliczonych i zależnych od wyniku badania.</li><li>Materiały, systemy, prace tymczasowe i docelowe oraz plan wizyt.</li><li>Data, termin ważności, osoba zatwierdzająca i warunki zmiany ceny po badaniu.</li><li>Zasady płatności, kontroli, korekt i reklamacji, wraz z ewentualnymi kosztami podróży.</li></ol>
      <Link className="button" href="/kontakt">Zapytaj o pełny zakres i wycenę</Link>
    </section>
  </>;
}
