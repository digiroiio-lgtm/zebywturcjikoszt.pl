import type { Metadata } from "next";
import Link from "next/link";
import { CommercialNote } from "@/components/commercial-note";
import { SourceList } from "@/components/source-list";
import { EntitySchema } from "@/components/entity-schema";
import { CLINIC_ID, CLINIC_NAME, CLINIC_URL } from "@/lib/clinic-profiles";
import { DATASET_PATH, priceRows } from "@/lib/price-dataset";
import { EUR_PLN_RATE, EUR_PLN_RATE_TIMESTAMP, PRICING_UPDATED_DATE, PRICING_UPDATED_ISO_DATE, formatEur, formatPln } from "@/lib/pricing";
import { breadcrumbList, ogImagesFor, twitterImagesFor } from "@/lib/seo";
import { SITE_NAME, SITE_URL } from "@/lib/site";

const rows = priceRows();
const title = "Cennik kliniki Akdeniz Dental: dane CSV i JSON";
const description = `Cennik kliniki Akdeniz Dental w Antalyi: ${rows.length} pozycji w EUR z przeliczeniem na PLN, datą cennika i kursem. Pobierz CSV lub JSON i cytuj ze źródłem.`;
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: DATASET_PATH, languages: { "pl-PL": DATASET_PATH } },
  openGraph: { title, description, url: DATASET_PATH, type: "website", images: ogImagesFor("dane/cennik-kliniki", title) },
  twitter: { title, description, card: "summary_large_image", images: twitterImagesFor("dane/cennik-kliniki") }
};

export default function PriceDatasetPage() {
  const url = `${SITE_URL}${DATASET_PATH}`;
  const rate = String(EUR_PLN_RATE).replace(".", ",");
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "pl-PL", dateModified: PRICING_UPDATED_ISO_DATE, about: { "@id": `${url}#dataset` } },
    {
      "@type": "Dataset", "@id": `${url}#dataset`, name: "Cennik kliniki Akdeniz Dental w Antalyi (pozycje w EUR)",
      description: "Pozycje cennika kliniki z orientacyjnym przeliczeniem na PLN. To ceny pozycji, a nie cena całego leczenia, pakietu ani wyjazdu.",
      url, inLanguage: "pl-PL", dateModified: PRICING_UPDATED_ISO_DATE, isAccessibleForFree: true,
      creator: { "@type": "Organization", "@id": CLINIC_ID, name: CLINIC_NAME, url: CLINIC_URL }, publisher: { "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: SITE_NAME, url: SITE_URL },
      license: "https://creativecommons.org/licenses/by/4.0/",
      keywords: ["cennik", "leczenie zębów w Turcji", "implanty", "korony cyrkonowe", "licówki", "EUR", "PLN"],
      variableMeasured: ["price_eur", "approx_price_pln"],
      distribution: [
        { "@type": "DataDownload", encodingFormat: "text/csv", contentUrl: `${SITE_URL}${DATASET_PATH}.csv` },
        { "@type": "DataDownload", encodingFormat: "application/json", contentUrl: `${SITE_URL}${DATASET_PATH}.json` }
      ]
    },
    breadcrumbList([{ name: "Dane cennika", path: DATASET_PATH }])
  ] };
  return <main className="shell narrow content-section price-dataset">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / Dane cennika</nav>
    <p className="eyebrow">Dane do cytowania</p>
    <h1>Cennik kliniki Akdeniz Dental: dane CSV i JSON</h1>
    <p className="lead">{rows.length} pozycji cennika kliniki w Antalyi w EUR, z orientacyjnym przeliczeniem na PLN. Cennik z {PRICING_UPDATED_DATE}, kurs 1 EUR = {rate} PLN z <time dateTime={EUR_PLN_RATE_TIMESTAMP}>{EUR_PLN_RATE_TIMESTAMP.slice(0, 10).split("-").reverse().join(".")}</time>.</p>
    <CommercialNote />
    <p className="button-row"><a className="button" href={`${DATASET_PATH}.csv`}>Pobierz CSV</a><a className="button button-secondary" href={`${DATASET_PATH}.json`}>Pobierz JSON</a></p>
    <section aria-labelledby="dataset-scope-title">
      <h2 id="dataset-scope-title">Czego te dane nie opisują</h2>
      <p>Każdy wiersz to cena jednej pozycji z cennika kliniki. To nie jest cena całego leczenia, pakietu, wyjazdu ani zakresu zalecanego w konkretnym przypadku. O zakresie i kosztach decyduje lekarz po badaniu, a ostateczną kwotę potwierdza pisemna oferta. Kwoty w PLN są przeliczeniem po podanym kursie i mogą różnić się od kursu płatności.</p>
    </section>
    <section aria-labelledby="dataset-cite-title">
      <h2 id="dataset-cite-title">Jak cytować</h2>
      <p>Możesz przytaczać te dane w artykułach, zestawieniach i opracowaniach. Podaj źródło, link do tej strony i datę cennika, na przykład: <em>Cennik kliniki Akdeniz Dental, stan na {PRICING_UPDATED_DATE}, {url}</em>. Dane są dostępne na licencji <a className="text-link" href="https://creativecommons.org/licenses/by/4.0/" rel="license noopener">CC BY 4.0</a>: wymagane jest podanie źródła. Zaznacz, że chodzi o ceny pozycji, a nie całego leczenia, oraz że klinika jest prowadzona przez spółkę, która prowadzi także serwis.</p>
    </section>
    <section aria-labelledby="dataset-table-title">
      <h2 id="dataset-table-title">Pozycje cennika</h2>
      <div className="table-wrap"><table><thead><tr><th scope="col">Pozycja</th><th scope="col">Cena EUR</th><th scope="col">Około PLN</th></tr></thead>
        <tbody>{rows.map((row) => <tr key={row.id}><td>{row.label}</td><td>{formatEur(row.eur)}</td><td>{formatPln(row.eur)}</td></tr>)}</tbody></table></div>
      <p>Opis pozycji, przykładowe sumy i wyjaśnienie, czego cena nie obejmuje, znajdziesz na stronie <Link className="text-link" href="/koszt#cennik">koszt leczenia zębów w Turcji</Link>.</p>
    </section>
    <SourceList intro="Cennik pochodzi od kliniki; poniżej strony, które go opisują i wyjaśniają zakres." sources={[{ label: "Koszt leczenia zębów w Turcji: cennik, przykładowe sumy i zakres ceny", href: "/koszt#cennik" }, { label: "Metodologia: jak zbieramy, sprawdzamy i oznaczamy informacje", href: "/metodologia" }, { label: "Akdeniz Dental: oficjalna strona kliniki", href: "https://akdenizdental.com" }]} />
    <EntitySchema /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
