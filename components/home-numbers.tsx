import Link from "next/link";
import { clinicProfiles, RATINGS_CHECKED_DATE, RATINGS_CHECKED_ISO_DATE } from "@/lib/clinic-profiles";
import { clinicalTeam, TEAM_SOURCE_DATE, TEAM_SOURCE_URL } from "@/lib/clinical-team";
import { openingHours, serviceLanguages } from "@/lib/clinic-hours";
import { EUR_PLN_RATE, PRICING_UPDATED_DATE, PRICING_UPDATED_ISO_DATE, formatEur, formatPln, priceById, priceCategories, priceItems } from "@/lib/pricing";

/**
 * "In numbers" section for the home page. Every figure is read from the same data the rest of the site uses
 * (price list, team list, opening hours, dated third-party ratings), so it cannot drift from the pages it summarises.
 */
export function HomeNumbers() {
  const crown = priceById("zirconia-crown");
  const aiser = priceById("aiser");
  const straumann = priceById("straumann");
  const veneer = priceById("composite-veneer");
  const emax = priceById("emax");
  const openDays = openingHours.filter((row) => row.opens).reduce((sum, row) => sum + row.schema.length, 0);
  const hoursPerWeek = openDays * 10;
  const trustpilot = clinicProfiles.find((profile) => profile.key === "trustpilot")!;
  const google = clinicProfiles.find((profile) => profile.key === "google-maps")!;
  return <section className="shell section-space home-numbers" aria-labelledby="home-numbers-title">
    <div className="section-heading"><div><p className="eyebrow">Fakty i liczby</p><h2 id="home-numbers-title">Ile kosztuje leczenie w Akdeniz Dental i kto je prowadzi?</h2></div>
      <p>Poniższe liczby pochodzą z cennika kliniki, listy lekarzy i publicznych profili opinii. Każda ma datę i źródło, a ceny pojedynczych pozycji nie są ceną całego leczenia, bo o zakresie decyduje lekarz po badaniu.</p></div>
    <ul className="home-numbers-list">
      <li><strong>{priceItems.length} pozycji</strong> liczy cennik kliniki z {PRICING_UPDATED_DATE}, w tym korony, licówki, implanty i zabiegi chirurgiczne (<Link href="/koszt#cennik">pełny cennik</Link>).</li>
      <li><strong>{formatEur(crown.eur)}</strong> (około {formatPln(crown.eur)}) kosztuje jedna korona cyrkonowa; cena nie obejmuje diagnostyki ani leczenia przygotowującego ząb.</li>
      <li><strong>{formatEur(aiser.eur)}</strong> (około {formatPln(aiser.eur)}) kosztuje implant Aiser, tyle samo co Medentika; implant Straumann kosztuje <strong>{formatEur(straumann.eur)}</strong> ({formatPln(straumann.eur)}), czyli {straumann.eur / aiser.eur} razy więcej. Cena implantu nie obejmuje korony ani ewentualnej odbudowy kości.</li>
      <li><strong>{clinicalTeam.length} lekarzy</strong> pracuje w zespole kliniki według jej strony z {new Date(`${TEAM_SOURCE_DATE}T00:00:00Z`).toLocaleDateString("pl-PL", { timeZone: "UTC" })} (<Link href="/nasi-lekarze">nasi lekarze</Link>); <a href={TEAM_SOURCE_URL}>źródło: strona kliniki</a>.</li>
      <li><strong>{serviceLanguages.length} języków</strong> obsługi pacjentów, w tym polski, od poniedziałku do soboty w godzinach 9:00–19:00 czasu tureckiego.</li>
      <li><strong>{trustpilot.rating}</strong> na {trustpilot.reviewCount} opinii w Trustpilot i <strong>{google.rating}</strong> na {google.reviewCount} opinii w Mapach Google; oceny odczytano <time dateTime={RATINGS_CHECKED_ISO_DATE}>{RATINGS_CHECKED_DATE}</time> i zmieniają się w czasie, dlatego nie traktuj ich jako gwarancji wyniku (<Link href="/opinie">jak czytać opinie</Link>).</li>
      <li><strong>{priceCategories.length} kategorii</strong> obejmuje cennik: {priceCategories.map((category) => `${category.label.toLowerCase()} (${category.ids.length})`).join(", ")}.</li>
      <li><strong>{formatEur(crown.eur * 4)}</strong> (około {formatPln(crown.eur * 4)}) to cena czterech koron cyrkonowych, a <strong>{formatEur(crown.eur * 8)}</strong> (około {formatPln(crown.eur * 8)}) ośmiu; to suma cen pozycji, bez diagnostyki i leczenia przygotowującego.</li>
      <li><strong>{formatEur(aiser.eur + crown.eur)}</strong> (około {formatPln(aiser.eur + crown.eur)}) to suma ceny implantu Aiser i jednej korony cyrkonowej; z implantem Straumann suma wynosi <strong>{formatEur(straumann.eur + crown.eur)}</strong> (około {formatPln(straumann.eur + crown.eur)}).</li>
      <li><strong>{formatEur(veneer.eur)}</strong> kosztuje licówka kompozytowa, a odbudowa E-max <strong>{formatEur(emax.eur)}</strong>, czyli {(emax.eur / veneer.eur).toFixed(1).replace(".", ",")} raza więcej za pozycję.</li>
      <li><strong>{hoursPerWeek} godzin tygodniowo</strong> ({openDays} dni po 10 godzin) klinika przyjmuje pacjentów według godzin podanych przez operatora; w niedzielę jest zamknięta.</li>
    </ul>
    <p className="microcopy">Przeliczenie na PLN: 1 EUR = {String(EUR_PLN_RATE).replace(".", ",")} PLN, kurs z <time dateTime={PRICING_UPDATED_ISO_DATE}>{PRICING_UPDATED_DATE}</time>, nieaktualizowany automatycznie; kurs płatności może być inny.</p>
  </section>;
}
