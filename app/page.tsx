import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { TrackedLink } from "@/components/tracked-link";
import { CuratedCaseGallery } from "@/components/case-gallery";
import { HomeHeroCases } from "@/components/home-hero-cases";
import { HomeModelHero } from "@/components/home-model-hero";
import { HomeMagdelenaGallery } from "@/components/home-magdelena-gallery";
import { HomeClinicStrip } from "@/components/home-clinic-strip";
import { HomeTrustStrip } from "@/components/home-trust-strip";
import { SectionCta } from "@/components/section-cta";
import { LeadForm } from "@/components/lead-form";
import { PolishReviewsSection } from "@/components/polish-reviews-section";
import { PatientStoriesSection } from "@/components/patient-stories-section";
import { PUBLISHED_DATE, PUBLISHED_ISO_DATE, HOME_UPDATED_ISO_DATE, SITE_URL } from "@/lib/site";
import { clinicProfiles } from "@/lib/clinic-profiles";
import { clinicalTeam } from "@/lib/clinical-team";
import { siteMedicalReviewer } from "@/lib/evidence";
import { FaqSection } from "@/components/faq-section";
import { SourceList } from "@/components/source-list";

const homeFaq = [
  { question: "Ile kosztuje leczenie zębów w Akdeniz Dental?", answer: "Na stronie podajemy pozycje z cennika kliniki w EUR z orientacyjnym przeliczeniem na PLN i datą aktualizacji. Pełny koszt zależy od diagnostyki, liczby etapów i planu ustalonego po badaniu, dlatego najlepiej poprosić o pisemną wycenę." },
  { question: "Czy ceny na stronie są ceną całego leczenia?", answer: "Nie. To pozycje z cennika kliniki w EUR z orientacyjnym przeliczeniem na PLN i datą aktualizacji. Pełny koszt zależy od diagnostyki, liczby etapów i planu ustalonego po badaniu." },
  { question: "Kto ustala plan leczenia?", answer: "Uprawniony lekarz dentysta po badaniu i diagnostyce. Informacje w serwisie mają charakter edukacyjny i nie kwalifikują do zabiegu." },
  { question: "Czy leczenie kończy się podczas jednego wyjazdu?", answer: "Nie zawsze. Liczba pobytów i odstępy między etapami zależą od indywidualnego planu. Zapytaj o nie przed rezerwacją biletów." },
  { question: "Co po powrocie do Polski?", answer: "Przed leczeniem uzgodnij kontakt w razie problemu, dokumenty, kontrole i zasady korekt. Dostępność i koszt opieki w polskim gabinecie ustal osobno." },
  { question: "Czy serwis publikuje opinie pacjentów?", answer: "Nie publikujemy opinii, których autentyczności nie możemy potwierdzić. Na stronie o opiniach opisujemy, jak je weryfikować, i wskazujemy publiczne profile kliniki." },
  { question: "Czym jest serwis Zęby w Turcji?", answer: "To polskojęzyczny serwis informacyjny o celu komercyjnym dla osób rozważających leczenie stomatologiczne w Turcji. Nie świadczy usług medycznych. Prowadzi go spółka, która prowadzi też klinikę Akdeniz Dental w Antalyi; dane operatora są na stronie „O serwisie”." }
];

const processSteps = [
  { title: "Kontakt", text: "Wysyłasz krótkie zapytanie. Odpowiadamy w wybranym kanale: WhatsApp, telefon lub e-mail, po polsku.", href: "/kontakt", label: "Przejdź do kontaktu", topic: "contact" },
  { title: "Ocena wstępna i wycena", text: "Na podstawie opisu otrzymujesz wstępną ocenę możliwości i orientacyjną wycenę. Pełny plan ustala lekarz po badaniu i diagnostyce.", href: "/koszt", label: "Co zawiera cena", topic: "budget" },
  { title: "Podróż i leczenie", text: "Ustalasz terminy, etapy i liczbę pobytów. Lot, noclegi i transfery potwierdź przed zakupem biletów.", href: "/antalya", label: "Zaplanuj podróż", topic: "travel" },
  { title: "Kontakt po leczeniu", text: "Przed wyjazdem uzgodnij kontrole, dokumenty i sposób zgłoszenia problemu po powrocie do Polski.", href: "/poradniki/opieka-po-leczeniu", label: "Opieka po powrocie", topic: "aftercare" }
];

export const metadata: Metadata = {
  title: { absolute: "Leczenie zębów w Turcji – Ceny, implanty i korony" },
  description: "Poznaj ceny implantów, koron cyrkonowych i innych zabiegów w Turcji. Leczenie w klinice Akdeniz Dental w Antalyi. Zaplanuj wizytę i uzyskaj wycenę.",
  alternates: { canonical: "/" }
};

import { PriceHighlights } from "@/components/price-list";

const treatments = [
  { href: "/koszt", topic: "other", label: "Koszt leczenia", text: "Co wpływa na cenę i jak porównać pełny zakres wyceny.", image: "/images/leczenie/koszt.webp", alt: "Konsultacja w gabinecie: lekarz omawia z pacjentką plan i koszty leczenia" },
  { href: "/implanty", topic: "implants", label: "Implanty", text: "Kwalifikacja, etapy, odbudowa i pytania do kliniki.", image: "/images/leczenie/implanty.webp", alt: "Implant tytanowy z koroną ceramiczną" },
  { href: "/korony-cyrkonowe", topic: "crowns", label: "Korony cyrkonowe", text: "150 EUR za pozycję: zakres, dodatkowe koszty i przykładowe sumy.", image: "/images/poradniki/veneer-options.svg", alt: "Porównanie odbudów estetycznych" },
  { href: "/licowki", topic: "veneers", label: "Licówki", text: "Plan estetyczny, materiały i alternatywy dla licówek.", image: "/images/leczenie/licowki.webp", alt: "Cienka licówka porcelanowa trzymana pincetą w gabinecie" },
  { href: "/cala-szczeka", topic: "full-arch", label: "Cała szczęka", text: "Dlaczego pełna odbudowa nie oznacza jednego zabiegu.", image: "/images/leczenie/cala-szczeka.webp", alt: "Model pełnych łuków zębowych górnego i dolnego" },
  { href: "/all-on-4", topic: "full-arch", label: "All-on-4", text: "Na czym polega koncepcja i co decyduje o kwalifikacji.", image: "/images/leczenie/all-on-4.webp", alt: "Proteza dolnego łuku zamocowana na czterech implantach" }
];

export default function Home() {
  return <main>
    <HomeMagdelenaGallery />
    <section className="home-hero"><div className="shell hero-grid"><div className="hero-copy"><p className="eyebrow">Przewodnik dla pacjentów z Polski</p><h1>Leczenie zębów w Turcji – <span className="hero-wide">implanty i </span><span className="hero-accent">metamorfozy uśmiechu</span></h1><p className="hero-lead"><span className="hero-wide">Dowiedz się, jakie opcje leczenia pasują do Ciebie i ile mogą kosztować. Cennik w EUR i PLN, lekarze kliniki i opieka po powrocie w jednym miejscu.</span><span className="hero-narrow">Poznaj możliwości leczenia w Akdeniz Dental w Antalyi. Sprawdź ceny i zobacz efekty leczenia naszych pacjentów.</span></p><HomeHeroCases /><p className="hero-partner">Akdeniz Dental · Antalya, Turcja · klinika operatora serwisu</p><div className="button-row"><TrackedLink href="/kontakt?lead_source=OGZ-PL&cta_location=home_hero&page_path=%2F" event="home_assessment_cta" tracking={{ lead_source: "OGZ-PL", cta_location: "home_hero", page_path: "/" }} className="button">Poproś o bezpłatną wycenę<span className="hero-cta-arrow" aria-hidden="true"> →</span></TrackedLink><Link href="#visual-proof-title" className="text-link">Zobacz efekty leczenia <span aria-hidden="true">→</span></Link></div><p className="microcopy">Ostateczny plan leczenia wymaga konsultacji i odpowiedniej diagnostyki.</p></div><HomeModelHero /></div></section>
    <HomeTrustStrip />
    <HomeClinicStrip />
    <CuratedCaseGallery />
    <PriceHighlights><div className="case-cta"><div><p><strong>Cena zabiegu a cały budżet</strong></p><p>Cena pojedynczej korony lub implantu nie jest ceną całego leczenia. Poproś o pisemną wycenę: diagnostyka, materiały, etapy i możliwe dopłaty. Osobno potwierdź lot, noclegi i transfery.</p><TrackedLink href="/koszt#cennik" event="home_budget_details_click" tracking={{ cta_location: "home_pricing", destination_path: "/koszt" }} className="text-link">Sprawdź pełny zakres kosztów →</TrackedLink></div><SectionCta location="home_pricing">Poproś o łączną wycenę</SectionCta></div></PriceHighlights>
    <PolishReviewsSection />
    <div className="shell home-review-profiles">{clinicProfiles.map((profile) => <TrackedLink key={profile.key} href={profile.href} event="home_review_profile_click" tracking={{ cta_location: "home_patient_reviews", topic: profile.key }} className="text-link">{profile.label}: profil i opinie →</TrackedLink>)}<Link className="text-link" href="/opinie">Jak oceniać wiarygodność opinii →</Link></div>
    <section className="shell section-space" aria-labelledby="home-treatments-title"><div className="section-heading"><div><p className="eyebrow">Możliwości leczenia</p><h2 id="home-treatments-title">Od czego zacząć?</h2></div><p>Nie wiesz, od czego zacząć? Sprawdź informacje o kosztach, implantach, koronach, licówkach i pełnej odbudowie zębów.</p></div><div className="treatment-grid">{treatments.map((item, index) => <article className="treatment-card" key={item.href}><Link className="treatment-card-link" href={item.href}><div className="treatment-visual"><span>0{index + 1}</span><Image src={item.image} alt={item.alt} width={800} height={450} sizes="(max-width: 760px) 100vw, 360px" /></div><h3>{item.label}</h3><p>{item.text}</p><b>Przeczytaj przewodnik →</b></Link><SectionCta className="text-link treatment-card-quote" location={`home_treatment_${item.href.slice(1)}`} topic={item.topic}>Poproś o wycenę: {item.label} →</SectionCta></article>)}</div></section>
    <section className="shell section-space home-partner-clinic home-doctors" aria-labelledby="home-doctors-title"><div className="section-heading"><div><p className="eyebrow">Dlaczego Akdeniz Dental?</p><h2 id="home-doctors-title">Lekarze i zespół Akdeniz Dental</h2></div><p>Kliniką prowadzoną przez operatora serwisu jest <a href="https://akdenizdental.com/our-history" className="text-link">Akdeniz Dental</a> w Antalyi. Poznaj lekarzy wraz z profilami i źródłami; plan leczenia ustala lekarz po badaniu. Przed decyzją zapytaj o lekarza prowadzącego, diagnostykę, zakres wyceny, etapy leczenia i opiekę po powrocie.</p></div><div className="home-doctor-grid">{clinicalTeam.filter((doctor) => ["mustafa-akca", "mehmet-onur-merey", "omer-isen", "ali-burak-bozkurt"].includes(doctor.slug)).map((doctor) => <article className="home-doctor-card" key={doctor.slug}><div className="home-doctor-photo"><Image src={doctor.imageUrl} alt={`Lekarz dentysta ${doctor.name} z zespołu Akdeniz Dental`} width={360} height={360} sizes="(max-width: 359px) calc(100vw - 56px), (max-width: 767px) calc((100vw - 104px) / 2), (max-width: 1199px) calc((100vw - 122px) / 2), 250px" loading="lazy" /></div><div><p className="mini-label">Lekarz dentysta</p><h3>{doctor.name}</h3><p className="home-doctor-area" title={doctor.area}>{doctor.area}</p><Link className="text-link" href={doctor.reviewerUrl ?? `/nasi-lekarze#${doctor.slug}`}>Profil i źródła →</Link></div></article>)}</div><div className="button-row"><SectionCta location="home_partner_clinic">Poproś o wstępną ocenę</SectionCta><Link className="text-link" href="/nasi-lekarze">Poznaj lekarzy kliniki →</Link><Link className="text-link" href="/jak-wybrac-klinike">Co sprawdzić przed wyborem kliniki →</Link></div><p className="microcopy">Obszary pracy według profili kliniki. Informacje o wykształceniu i kwalifikacjach znajdziesz w profilach lekarzy.</p></section>
    <PatientStoriesSection />
    <section className="shell section-space home-process" aria-labelledby="home-process-title"><div className="section-heading"><div><p className="eyebrow">Jak to wygląda</p><h2 id="home-process-title">Od zapytania do leczenia w 4 krokach</h2></div><p>Liczba wizyt, długość pobytu i zakres opieki zależą od indywidualnego planu i warunków kliniki. Nie zakładaj, że leczenie zakończy się podczas jednego wyjazdu.</p></div><ol className="process-steps">{processSteps.map((step, index) => <li className="process-step" key={step.title}><span className="mini-label">0{index + 1}</span><h3>{step.title}</h3><p>{step.text}</p><TrackedLink href={step.href} event="home_process_click" tracking={{ cta_location: "home_process", destination_path: step.href, topic: step.topic }} className="text-link">{step.label} →</TrackedLink></li>)}</ol><p className="home-process-note">Ostateczny plan leczenia ustala lekarz po badaniu. Nie zakładaj automatycznej opieki w polskim gabinecie po powrocie; jej dostępność i koszt trzeba ustalić osobno.</p><div className="button-row"><SectionCta location="home_process">Zacznij od zapytania</SectionCta><Link className="text-link" href="/opinie">Jak oceniać opinie →</Link><Link className="text-link" href="/przed-i-po">Co pokazują zdjęcia przed i po →</Link></div></section>
    <section className="shell section-space home-aftercare" aria-labelledby="home-aftercare-title"><div className="section-heading"><div><p className="eyebrow">Po powrocie do Polski</p><h2 id="home-aftercare-title">Kontakt i opieka po leczeniu</h2></div><p>Przed leczeniem uzgodnij kanał kontaktu w razie problemu, dokumenty, kontrole i zasady korekt oraz to, kto odpowiada za kolejne etapy. Dostępność opieki w Polsce i jej koszt ustal osobno.</p></div><div className="button-row"><TrackedLink href="/poradniki/opieka-po-leczeniu" event="home_patient_journey_click" tracking={{ cta_location: "home_aftercare", destination_path: "/poradniki/opieka-po-leczeniu", topic: "aftercare" }} className="text-link">Sprawdź opiekę po powrocie →</TrackedLink><TrackedLink href="/listy-kontrolne" event="home_patient_journey_click" tracking={{ cta_location: "home_aftercare", destination_path: "/listy-kontrolne", topic: "assessment" }} className="text-link">Lista przed konsultacją →</TrackedLink></div></section>
    <FaqSection path="/" items={homeFaq} className="shell section-space" />
    <section className="closing-cta home-lead-section" id="home-lead-form" aria-label="Formularz wstępnej wyceny"><div className="shell narrow"><p className="eyebrow">Wstępna wycena</p><p>Opisz krótko, jakiego leczenia potrzebujesz. Zdjęcia i dokumentację medyczną przekaż dopiero bezpiecznym kanałem.</p><LeadForm enabled={process.env.CONTACT_FORM_ENABLED !== "false"} context={{ leadSource: "OGZ-PL", ctaLocation: "home_form", sourcePagePath: "/" }} headingId="home-lead-form-title" heading="Bezpłatna wstępna wycena" /></div></section>
    <SourceList className="shell section-space sources" intro="Ceny, zespół i status recenzji pochodzą z poniższych stron i źródeł." sources={[{ label: "Cennik kliniki Akdeniz Dental (pozycje w EUR, z datą)", href: "/koszt#cennik" }, { label: "Nasi lekarze: zespół kliniki prowadzonej przez operatora serwisu", href: "/nasi-lekarze" }, { label: "Weryfikacja medyczna: zasady i status recenzji", href: "/weryfikacja-medyczna" }, { label: "Polityka redakcyjna: autorstwo, źródła i korekty", href: "/polityka-redakcyjna" }, { label: "Akdeniz Dental: oficjalna strona kliniki prowadzonej przez operatora serwisu", href: "https://akdenizdental.com" }]} />
    <section className="shell editorial-strip"><p><strong>Autor:</strong> Redakcja serwisu</p><p><strong>Publikacja:</strong> {PUBLISHED_DATE}</p><p><strong>Ostatnia aktualizacja:</strong> {new Date(`${HOME_UPDATED_ISO_DATE}T00:00:00Z`).toLocaleDateString("pl-PL", { timeZone: "UTC" })}</p><p><strong>Recenzent medyczny serwisu:</strong> <Link href={siteMedicalReviewer.profileUrl}>Lek. dent. {siteMedicalReviewer.name}</Link> · Akdeniz Dental, Antalya</p><p><strong>Recenzja medyczna:</strong> jeszcze nieprzeprowadzona</p><Link href="/polityka-redakcyjna">Standard redakcyjny</Link></section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebPage",
      "@id": `${SITE_URL}/#webpage`,
      name: "Leczenie zębów w Turcji – ceny, metody i świadoma decyzja",
      url: SITE_URL,
      inLanguage: "pl-PL",
      isPartOf: { "@id": `${SITE_URL}/#website` },
      author: { "@id": `${SITE_URL}/#organization` },
      datePublished: PUBLISHED_ISO_DATE,
      dateModified: HOME_UPDATED_ISO_DATE
    }) }} />
  </main>;
}
