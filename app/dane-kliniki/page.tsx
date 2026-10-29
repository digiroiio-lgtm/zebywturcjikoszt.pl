import type { Metadata } from "next";
import Link from "next/link";
import { CommercialNote } from "@/components/commercial-note";
import { SourceList } from "@/components/source-list";
import { CopyBlock } from "@/components/copy-block";
import { EntitySchema } from "@/components/entity-schema";
import { CITATION_KIT_UPDATED, clinicDescriptions, clinicFacts } from "@/lib/clinic-facts";
import { DIRECTORY_KIND_LABEL, verifiedListings } from "@/lib/directory-listings";
import { CLINIC_ID } from "@/lib/clinic-profiles";
import { breadcrumbList, ogImagesFor, twitterImagesFor } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";

const title = "Dane kliniki Akdeniz Dental do katalogów i redakcji";
const description = "Nazwa, adres, telefon, godziny, języki i gotowe opisy kliniki Akdeniz Dental w Antalyi do wpisów w katalogach i publikacji. Te same dane w formacie JSON.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/dane-kliniki", languages: { "pl-PL": "/dane-kliniki" } },
  openGraph: { title, description, url: "/dane-kliniki", type: "website", images: ogImagesFor("dane-kliniki", title) },
  twitter: { title, description, card: "summary_large_image", images: twitterImagesFor("dane-kliniki") }
};

const dateText = new Date(`${CITATION_KIT_UPDATED}T00:00:00Z`).toLocaleDateString("pl-PL", { timeZone: "UTC" });

export default function CitationKitPage() {
  const url = `${SITE_URL}/dane-kliniki`;
  const listings = verifiedListings();
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": `${url}#webpage`, url, name: title, description, inLanguage: "pl-PL", dateModified: CITATION_KIT_UPDATED, about: { "@id": CLINIC_ID } },
    breadcrumbList([{ name: "Dane kliniki", path: "/dane-kliniki" }])
  ] };
  const nap = [
    { label: "Nazwa", value: clinicFacts.name },
    { label: "Nazwa prawna spółki", value: clinicFacts.legalName },
    { label: "Adres", value: clinicFacts.addressText },
    { label: "Telefon", value: clinicFacts.phone },
    { label: "WhatsApp", value: clinicFacts.whatsapp },
    { label: "E-mail", value: clinicFacts.email },
    { label: "Godziny", value: `${clinicFacts.hoursSummary} (${clinicFacts.timeZoneNote})` },
    { label: "Języki obsługi", value: clinicFacts.languages.map((language) => language.label).join(", ") },
    { label: "Współrzędne", value: `${clinicFacts.geo.latitude}, ${clinicFacts.geo.longitude}` },
    { label: "Strona kliniki", value: clinicFacts.url },
    { label: "Serwis informacyjny", value: clinicFacts.siteUrl }
  ];
  return <main className="shell narrow content-section citation-kit">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / Dane kliniki</nav>
    <p className="eyebrow">Dla katalogów, portali i redakcji</p>
    <h1>Dane kliniki Akdeniz Dental do katalogów i redakcji</h1>
    <p className="lead">Ta strona zbiera w jednym miejscu dane kliniki w Antalyi, które należy podawać identycznie w każdym katalogu, na portalach i w publikacjach. Wartości pochodzą z tych samych źródeł co reszta serwisu. Ostatnia aktualizacja: <strong>{dateText}</strong>.</p>
    <CommercialNote />
    <section aria-labelledby="kit-nap-title">
      <h2 id="kit-nap-title">Nazwa, adres i kontakt</h2>
      <p>Wpisuj dane dokładnie w tej postaci. Różnice w zapisie adresu lub telefonu między katalogami utrudniają ich powiązanie z jedną firmą.</p>
      <dl className="kit-nap">{nap.map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
      <p>Te same dane w formacie maszynowym: <a className="text-link" href="/citation-kit.json">citation-kit.json</a>.</p>
    </section>
    <section aria-labelledby="kit-desc-pl-title">
      <h2 id="kit-desc-pl-title">Opisy po polsku</h2>
      <p>Trzy długości do wyboru, zależnie od limitu znaków w katalogu. Nie dopisuj superlatywów ani obietnic wyniku leczenia.</p>
      <CopyBlock label="Krótki opis (do 160 znaków)" text={clinicDescriptions.pl.short} />
      <CopyBlock label="Średni opis" text={clinicDescriptions.pl.medium} />
      <CopyBlock label="Długi opis" text={clinicDescriptions.pl.long} />
    </section>
    <section aria-labelledby="kit-desc-en-title">
      <h2 id="kit-desc-en-title">Descriptions in English</h2>
      <CopyBlock label="Short description (up to 160 characters)" text={clinicDescriptions.en.short} />
      <CopyBlock label="Medium description" text={clinicDescriptions.en.medium} />
      <CopyBlock label="Long description" text={clinicDescriptions.en.long} />
    </section>
    {listings.length > 0 && <section aria-labelledby="kit-listings-title">
      <h2 id="kit-listings-title">Gdzie nas znajdziesz</h2>
      <p>Wpisy sprawdzone ręcznie pod kątem zgodności nazwy, adresu i telefonu z danymi powyżej.</p>
      <ul>{listings.map((listing) => <li key={listing.id}><a href={listing.url} target="_blank" rel="noopener noreferrer">{listing.name}</a>: {DIRECTORY_KIND_LABEL[listing.kind]}, sprawdzono {new Date(`${listing.verifiedDate}T00:00:00Z`).toLocaleDateString("pl-PL", { timeZone: "UTC" })}</li>)}</ul>
    </section>}
    <section aria-labelledby="kit-rules-title">
      <h2 id="kit-rules-title">Zasady korzystania z danych</h2>
      <ul>
        <li>Klinika Akdeniz Dental jest prowadzona przez spółkę, która prowadzi także serwis. Ta informacja powinna być widoczna, gdy opisujesz serwis.</li>
        <li>Cennik kliniki publikujemy osobno, z datą i kursem: <Link className="text-link" href="/dane/cennik-kliniki">dane cennika (CSV i JSON)</Link>. Cena pozycji nie jest ceną całego leczenia.</li>
        <li>Nie podajemy danych pacjentów ani zdjęć pacjentów. O kwalifikacji do leczenia decyduje lekarz po badaniu.</li>
      </ul>
    </section>
    <SourceList intro="Dane pochodzą z poniższych stron i profili. Nie potwierdzają jakości leczenia." sources={[{ label: "Właściciel serwisu: dane spółki prowadzącej serwis i klinikę", href: "/wlasciciel-serwisu" }, { label: "Kontakt i godziny otwarcia kliniki", href: "/kontakt" }, ...clinicFacts.profiles.map((profile) => ({ label: `${profile.label}: profil kliniki`, href: profile.url })), { label: "Akdeniz Dental: oficjalna strona kliniki", href: clinicFacts.url }]} />
    <EntitySchema /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
