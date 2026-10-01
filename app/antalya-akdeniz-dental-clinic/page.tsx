import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { TrackedLink } from "@/components/tracked-link";
import { guideAssessmentHref } from "@/lib/guides";
import { CLINIC_PATH, CLINIC_UPDATED, CLINIC_TITLE, CLINIC_DESCRIPTION, CLINIC_SUMMARY, CLINIC_GALLERY_SOURCE, clinicImages } from "@/lib/clinic-gallery";
import { SITE_URL } from "@/lib/site";

const reception = clinicImages.find((image) => image.id === "recepcja-kliniki")!;
const socialImage = { url: reception.src, width: reception.width, height: reception.height, alt: reception.alt };
export const metadata: Metadata = {
  title: CLINIC_TITLE,
  description: CLINIC_DESCRIPTION,
  alternates: { canonical: CLINIC_PATH },
  openGraph: { title: CLINIC_TITLE, description: CLINIC_DESCRIPTION, url: CLINIC_PATH, type: "website", locale: "pl_PL", images: [socialImage] },
  twitter: { card: "summary_large_image", title: CLINIC_TITLE, description: CLINIC_DESCRIPTION, images: [socialImage] },
};

export default function ClinicPage() {
  const url = `${SITE_URL}${CLINIC_PATH}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "ImageGallery", "@id": `${url}#webpage`, url, name: CLINIC_TITLE, description: CLINIC_SUMMARY, inLanguage: "pl-PL", dateModified: CLINIC_UPDATED, isPartOf: { "@id": `${SITE_URL}/#website` }, about: { "@id": "https://akdenizdental.com/#organization" }, primaryImageOfPage: { "@id": `${url}#${reception.id}` }, image: clinicImages.map((image) => ({ "@id": `${url}#${image.id}` })), citation: CLINIC_GALLERY_SOURCE },
    { "@type": "Organization", "@id": "https://akdenizdental.com/#organization", name: "Akdeniz Dental", url: "https://akdenizdental.com", location: { "@type": "Place", name: "Antalya, Turcja", address: { "@type": "PostalAddress", addressLocality: "Antalya", addressCountry: "TR" } } },
    { "@type": "BreadcrumbList", itemListElement: [ { "@type": "ListItem", position: 1, name: "Strona główna", item: SITE_URL }, { "@type": "ListItem", position: 2, name: "Akdeniz Dental Antalya", item: url } ] },
    ...clinicImages.map((image) => ({ "@type": "ImageObject", "@id": `${url}#${image.id}`, contentUrl: `${SITE_URL}${image.src}`, name: image.title, caption: image.alt, description: image.alt, width: image.width, height: image.height, encodingFormat: "image/webp", inLanguage: "pl-PL", isPartOf: { "@id": `${url}#webpage` }, creditText: "Akdeniz Dental", isBasedOn: image.sourceUrl })),
  ] };
  return <main className="clinic-page">
    <section className="page-hero"><div className="shell">
      <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / Akdeniz Dental Antalya</nav>
      <div className="clinic-hero-grid"><div><p className="eyebrow">Klinika partnerska · Antalya, Turcja</p><h1>Akdeniz Dental Antalya: klinika stomatologiczna</h1><p className="lead">Planujesz leczenie zębów w Turcji? Zobacz wnętrza Akdeniz Dental, poznaj zespół i przygotuj pytania przed konsultacją.</p><p>{CLINIC_SUMMARY}</p><div className="button-row"><TrackedLink className="button" href={guideAssessmentHref(CLINIC_PATH, "clinic_hero")} event="clinic_contact_cta" tracking={{ cta_location: "clinic_hero" }}>Poproś o wycenę po polsku</TrackedLink><Link className="text-link" href="/nasi-lekarze">Poznaj lekarzy →</Link></div></div>
        <figure className="clinic-hero-photo"><Image src={reception.src} alt={reception.alt} width={reception.width} height={reception.height} sizes="(max-width: 900px) 100vw, 45vw" priority /><figcaption>{reception.title} · Antalya, Turcja</figcaption></figure>
      </div>
    </div></section>
    <div className="shell">
      <section className="content-section clinic-intro" aria-labelledby="clinic-planning"><h2 id="clinic-planning">Leczenie zębów w Antalyi: od czego zacząć?</h2><p>Przed wyborem terminu sprawdź, jaki zakres leczenia odpowiada Twoim potrzebom. W serwisie znajdziesz informacje o <Link href="/implanty">implantach zębowych</Link>, <Link href="/korony-cyrkonowe">koronach cyrkonowych</Link>, <Link href="/licowki">licówkach</Link> i <Link href="/all-on-4">odbudowie All-on-4</Link>. Kwalifikację i ostateczny plan ustala lekarz po badaniu.</p><p><Link href="/koszt">Porównaj ceny leczenia w Turcji</Link> i <Link href="/antalya">zaplanuj podróż do Antalyi</Link>. Liczbę wizyt, diagnostykę, hotel, transfery oraz opiekę po powrocie do Polski potwierdź w pisemnej ofercie. Zapytanie możesz wysłać po polsku; dostępność obsługi po polsku podczas wizyt ustal przed rezerwacją.</p></section>
      <section className="content-section" aria-labelledby="clinic-gallery-title"><p className="eyebrow">Poznaj placówkę</p><h2 id="clinic-gallery-title">Zdjęcia kliniki Akdeniz Dental w Antalyi</h2><p>Recepcja, poczekalnia i gabinety na zdjęciach z oficjalnej galerii kliniki. Dwa kadry wejścia do gabinetu numer 5 pokazują tę samą przestrzeń.</p><div className="clinic-gallery">{clinicImages.map((image) => <figure key={image.id} id={image.id}><Image src={image.src} alt={image.alt} width={image.width} height={image.height} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" /><figcaption><h3>{image.title}</h3><p>{image.alt}</p></figcaption></figure>)}</div></section>
      <section className="content-section clinic-intro"><h2>Co potwierdzić przed rezerwacją wizyty?</h2><ul className="check-list"><li>Adres placówki, w której odbędzie się Twoje leczenie, oraz nazwisko lekarza prowadzącego.</li><li>Rodzaj odbudowy, materiały, zakres diagnostyki i koszty dodatkowe.</li><li>Liczbę pobytów, terminy kontroli i sposób kontaktu po powrocie do Polski.</li><li>Warunki gwarancji oraz procedurę zgłoszenia ewentualnych korekt.</li></ul><p><Link className="text-link" href="/jak-wybrac-klinike">Lista pytań pomocnych przy wyborze kliniki →</Link></p></section>
      <section className="content-section sources"><h2>Źródło zdjęć i aktualizacja</h2><p>Zdjęcia: <a href={CLINIC_GALLERY_SOURCE} target="_blank" rel="noopener noreferrer">oficjalna galeria Akdeniz Dental</a>. Aktualizacja tej strony: <time dateTime={CLINIC_UPDATED}>1 października 2026</time>. Fotografie pokazują wnętrza udostępnione przez klinikę; nie określają daty wykonania zdjęć ani placówki przypisanej do Twojej wizyty.</p></section>
    </div>
    <section className="closing-cta"><div className="shell narrow"><p className="eyebrow">Wstępna konsultacja</p><h2>Zapytaj o leczenie w Akdeniz Dental</h2><p>Opisz swoje potrzeby po polsku i poproś o wstępną wycenę. Dokumentację medyczną przekaż dopiero po ustaleniu bezpiecznego kanału kontaktu.</p><TrackedLink className="button button-light" href={guideAssessmentHref(CLINIC_PATH, "clinic_bottom")} event="clinic_contact_cta" tracking={{ cta_location: "clinic_bottom" }}>Poproś o wstępną wycenę</TrackedLink></div></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }} />
  </main>;
}
