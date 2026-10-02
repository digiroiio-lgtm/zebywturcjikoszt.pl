import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { clinicalTeam, TEAM_SOURCE_DATE, TEAM_SOURCE_URL } from "@/lib/clinical-team";
import { SITE_URL } from "@/lib/site";
import { OG_IMAGES, TWITTER_IMAGES, breadcrumbList, clinicSchema } from "@/lib/seo";
import { ClinicProfiles } from "@/components/clinic-profiles";
import { SourceList } from "@/components/source-list";
import { FaqSection } from "@/components/faq-section";

const teamFaq = [
  { question: "Czy każdy lekarz z tej listy recenzuje treści serwisu?", answer: "Nie. Lista przedstawia zespół kliniki prowadzonej przez operatora serwisu. Recenzję medyczną wykonują tylko osoby wskazane w sekcji Eksperci, wyłącznie dla przypisanych im stron." },
  { question: "Czy obszar pracy lekarza oznacza tytuł specjalisty?", answer: "Nie. Obszary pracy pochodzą z profili kliniki i nie są niezależnie potwierdzonym tytułem specjalisty." },
  { question: "Skąd pochodzą dane o lekarzach?", answer: "Z zespołu Akdeniz Dental i indywidualnych profili wskazanych przy każdym lekarzu. Przy każdej osobie podajemy link do oficjalnego profilu kliniki." }
];

export const metadata: Metadata = {
  title: "Nasi lekarze – zespół Akdeniz Dental w Antalyi",
  description: "Poznaj 12 dentystów Akdeniz Dental w Antalyi: wykształcenie, obszary pracy i oficjalne profile. Sprawdź także rolę recenzenta medycznego serwisu.",
  alternates: { canonical: "/nasi-lekarze" },
  openGraph: { images: OG_IMAGES, title: "Nasi lekarze – zespół Akdeniz Dental w Antalyi", description: "Poznaj 12 dentystów kliniki prowadzonej przez operatora serwisu, ich wykształcenie, obszary pracy i źródła zawodowe.", url: "/nasi-lekarze", type: "website" },
  twitter: { images: TWITTER_IMAGES, card: "summary_large_image", title: "Nasi lekarze – Akdeniz Dental", description: "Zespół kliniki prowadzonej przez operatora serwisu w Antalyi i oficjalne profile lekarzy." },
};
export default function ClinicalTeam() {
  const url = `${SITE_URL}/nasi-lekarze`;
  const personId = (doctor: typeof clinicalTeam[number]) => doctor.reviewerUrl ? `${SITE_URL}${doctor.reviewerUrl}/#person` : `${url}#person-${doctor.slug}`;
  const schema = { "@context": "https://schema.org", "@graph": [
    { "@type": "CollectionPage", "@id": url, url, name: "Nasi lekarze – zespół Akdeniz Dental w Antalyi", mainEntity: { "@id": `${url}#lista` } },
    breadcrumbList([{ name: "Nasi lekarze", path: "/nasi-lekarze" }]),
    { ...clinicSchema, employee: clinicalTeam.map((doctor) => ({ "@id": personId(doctor) })) },
    { "@type": "ItemList", "@id": `${url}#lista`, numberOfItems: clinicalTeam.length, itemListElement: clinicalTeam.map((doctor, index) => ({ "@type": "ListItem", position: index + 1, item: { "@id": personId(doctor) } })) },
    ...clinicalTeam.map((doctor) => ({ "@type": "Person", "@id": personId(doctor), name: doctor.name, alternateName: doctor.alternateNames, jobTitle: "Lekarz dentysta", url: doctor.reviewerUrl ? `${SITE_URL}${doctor.reviewerUrl}` : `${url}#${doctor.slug}`, image: `${SITE_URL}${doctor.imageUrl}`, description: `${doctor.education} ${doctor.focus}`, knowsAbout: doctor.area, sameAs: [doctor.sourceUrl], worksFor: { "@id": "https://akdenizdental.com/#organization" } })),
  ] };
  return <main className="shell section-space content-section clinical-team-page">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / Nasi lekarze</nav>
    <p className="eyebrow">Klinika prowadzona przez operatora serwisu</p><h1>Nasi lekarze</h1>
    <p className="lead">Poznaj lekarzy stomatologów współpracującej z nami kliniki Akdeniz Dental w Antalyi. Sprawdź ich wykształcenie, doświadczenie kliniczne oraz obszary, którymi zajmują się w codziennej praktyce.</p>
    <p>Biografie, wykształcenie i obszary pracy pochodzą z indywidualnych profili kliniki. Obszary pracy nie są równoznaczne z niezależnie potwierdzonym tytułem specjalisty. Zdjęcia przedstawiają lekarzy wskazanych w tych profilach.</p>
    <div className="clinical-team-grid">{clinicalTeam.map((doctor) => <article className="clinical-team-card" id={doctor.slug} key={doctor.slug}>
      <Image src={doctor.imageUrl} alt={`Lek. dent. ${doctor.name} – Akdeniz Dental`} width={600} height={600} sizes="(max-width: 760px) 100vw, (max-width: 1000px) 50vw, 33vw" className="clinical-team-portrait" />
      <div className="clinical-team-body"><p className="eyebrow">Lekarz dentysta</p><h2>{doctor.name}</h2><p><strong>Obszar pracy:</strong> {doctor.area}</p><p><strong>Wykształcenie według kliniki:</strong> {doctor.education}</p><p>{doctor.focus}</p>{doctor.patientMention && <p className="patient-mention"><strong>Opinie pacjentów:</strong> {doctor.patientMention.text} <a className="text-link" href={doctor.patientMention.href} target="_blank" rel="noopener noreferrer">Zobacz opinię →</a> Opinia pacjenta nie jest weryfikacją kwalifikacji.</p>}
        <a className="text-link" href={doctor.sourceUrl} target="_blank" rel="noopener noreferrer">Oficjalny profil w klinice →</a>
        {doctor.reviewerUrl && <Link className="text-link" href={doctor.reviewerUrl}>Profil recenzenta medycznego i status recenzji →</Link>}
      </div>
    </article>)}</div>
    <section className="section-space"><h2>Zespół kliniczny a recenzja medyczna</h2><p>Akdeniz Dental jest kliniką prowadzoną przez operatora serwisu. Przynależność do jej zespołu nie oznacza, że lekarz sprawdził treści tej strony. Mustafa Akça pełni rolę recenzenta medycznego serwisu i jest właścicielem kliniki. Mehmet Onur Merey recenzuje wyłącznie przewodniki o implantach i All-on-4. Recenzję konkretnego artykułu przypisujemy dopiero po udokumentowaniu zakresu, daty i zatwierdzenia.</p><div className="button-row"><Link className="text-link" href="/eksperci/mustafa-akca">Mustafa Akça: profil i zweryfikowane treści →</Link><Link className="text-link" href="/eksperci/mehmet-onur-merey">Mehmet Onur Merey: implanty i All-on-4 →</Link><Link className="text-link" href="/weryfikacja-medyczna">Jak weryfikujemy treści →</Link></div></section>
    <ClinicProfiles />
    <FaqSection path="/nasi-lekarze" items={teamFaq} className="section-space" />
    <SourceList intro={`Biografie, wykształcenie i obszary pracy pochodzą z indywidualnych profili kliniki. Ostatnia aktualizacja danych: ${TEAM_SOURCE_DATE}.`} sources={[{ label: "Akdeniz Dental: zespół kliniki", href: TEAM_SOURCE_URL }, ...clinicalTeam.map((doctor) => ({ label: `Oficjalny profil: ${doctor.name}`, href: doctor.sourceUrl }))]} />
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
  </main>;
}
