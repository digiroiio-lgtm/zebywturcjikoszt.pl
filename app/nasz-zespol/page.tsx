import { PRIMARY_CTA } from "@/lib/cta";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CommercialNote } from "@/components/commercial-note";
import { SourceList } from "@/components/source-list";
import { breadcrumbList, ogImagesFor, twitterImagesFor } from "@/lib/seo";
import { SITE_URL } from "@/lib/site";
import { publishedTeamImages, supportRoles } from "@/lib/support-team";

const title = "Nasz zespół w Antalyi | Akdeniz Dental";
const description = "Poznaj osoby wspierające pacjentów Akdeniz Dental w Antalyi: koordynację leczenia, kontakt z pacjentem, asystę stomatologiczną, laboratorium i organizację transferów.";
export const metadata: Metadata = {
  title: { absolute: title }, description, alternates: { canonical: "/nasz-zespol" },
  openGraph: { title, description, url: "/nasz-zespol", type: "website", images: ogImagesFor("nasz-zespol", title) },
  twitter: { title, description, card: "summary_large_image", images: twitterImagesFor("nasz-zespol") },
};

export default function SupportTeamPage() {
  const url = `${SITE_URL}/nasz-zespol`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "WebPage", "@id": url, url, name: title, description, inLanguage: "pl-PL", about: { "@id": "https://akdenizdental.com/#organization" } },
    breadcrumbList([{ name: "Nasz zespół", path: "/nasz-zespol" }]),
  ] };
  return <main className="shell support-team-page">
    <nav className="support-breadcrumb" aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / Nasz zespół</nav>
    <header className="support-hero">
      <div><p className="eyebrow">Ludzie i organizacja wizyty</p><h1>Poznaj zespół Akdeniz Dental w Antalyi</h1>
        <p className="lead">Za organizacją wizyty i codzienną opieką nad pacjentem stoją różne osoby. Poznaj role zespołu, który wspiera przygotowanie do leczenia i pobyt w Antalyi.</p>
        <div className="button-row"><Link className="button" href="/kontakt">Zapytaj o organizację wizyty</Link><Link className="text-link" href="/nasi-lekarze">Poznaj lekarzy kliniki →</Link></div>
      </div>
      <figure><Image src="/images/klinika/portfolio-02b.webp" alt="Recepcja Akdeniz Dental w Antalyi, miejsce pierwszego kontaktu podczas wizyty w klinice" width={1200} height={1000} sizes="(max-width: 767px) calc(100vw - 40px), (max-width: 1230px) 42vw, 490px" priority /><figcaption>Akdeniz Dental, Antalya. Organizację swojej wizyty ustal bezpośrednio z kliniką.</figcaption></figure>
    </header>
    <CommercialNote />
    <section className="support-intro" aria-labelledby="support-intro-title"><h2 id="support-intro-title">Jasny kontakt na każdym etapie</h2><p>Poniżej wyjaśniamy role i pytania, które warto zadać przed wyjazdem. To nie jest imienny wykaz personelu ani potwierdzenie, że każda z tych usług jest częścią Twojej oferty. Osobę prowadzącą, język kontaktu i zakres wsparcia potwierdź na piśmie.</p></section>
    <section aria-labelledby="support-roles-title"><div className="support-heading"><p className="eyebrow">Kto pomaga w czym</p><h2 id="support-roles-title">Role wokół Twojej wizyty</h2></div>
      <div className="support-role-grid">{supportRoles.map((role, i) => <article className="support-role-card" id={role.id} key={role.id}><span className="support-role-number" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><p className="eyebrow">{role.stage}</p><h3>{role.title}</h3><p>{role.text}</p><div className="support-question"><strong>Zapytaj przed wizytą</strong><p>{role.question}</p></div></article>)}</div>
    </section>
    {publishedTeamImages.length > 0 && <section className="support-section" aria-labelledby="support-gallery-title"><h2 id="support-gallery-title">Ludzie i zaplecze kliniki</h2><div className="support-gallery">{publishedTeamImages.map((item) => <figure key={item.src}><Image src={item.src} alt={item.alt} width={item.width} height={item.height} sizes="(max-width: 767px) calc(100vw - 40px), 560px" loading="lazy" /><figcaption>{item.caption}</figcaption></figure>)}</div></section>}
    <section className="support-section support-contact-plan"><div><p className="eyebrow">Dla pacjentów z Polski</p><h2>Ustal kontakt przed wyjazdem i po powrocie</h2><p>Zapisz ustalenia w jednym miejscu. Nie zakładaj, że każda osoba w zespole mówi po polsku lub że opieka w Polsce jest wliczona w leczenie.</p></div><ol><li><strong>Przed rezerwacją</strong><span>Imię osoby kontaktowej, język rozmowy, godziny dostępności i zastępstwo.</span></li><li><strong>Podczas pobytu</strong><span>Terminy wizyt, miejsce odbioru i kontakt przy zmianie planu.</span></li><li><strong>Po powrocie</strong><span>Sposób przekazania dokumentacji, zgłoszenia problemu i ustalenia kontroli.</span></li></ol></section>
    <section className="support-section"><h2>Wsparcie organizacyjne a decyzje lekarza</h2><p>Koordynacja, rozmowa o cenie i transport pomagają zorganizować wizytę. Rozpoznanie, kwalifikację i plan leczenia omawiaj z lekarzem dentystą. Osoby wspierające organizację nie są przedstawiane jako lekarze ani recenzenci medyczni serwisu.</p><div className="button-row"><Link className="text-link" href="/nasi-lekarze">Wykształcenie i profile lekarzy →</Link><Link className="text-link" href="/poradniki/opieka-po-leczeniu">Jak przygotować opiekę po powrocie →</Link><Link className="text-link" href="/antalya">Zaplanuj pobyt w Antalyi →</Link></div></section>
    <SourceList intro="Strona opisuje role i pytania organizacyjne. Nie potwierdza kwalifikacji konkretnego pracownika, dostępności usług ani składu personelu podczas Twojej wizyty. Dane lekarzy i zasady odpowiedzialności przedstawiamy osobno." sources={[{ label: "Profile lekarzy i źródła zawodowe", href: "/nasi-lekarze" }, { label: "Wybór kliniki i zakres odpowiedzialności", href: "/jak-wybrac-klinike" }, { label: "Operator serwisu i kliniki", href: "/wlasciciel-serwisu" }]} />
    <section className="support-final"><h2>Porozmawiajmy o Twojej wizycie</h2><p>Zapytaj o osobę kontaktową, język rozmowy i zakres organizacji pobytu przed podjęciem decyzji.</p><Link className="button" href="/kontakt">{PRIMARY_CTA}</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
