import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { clinicalTeam } from "@/lib/clinical-team";
import { notFound } from "next/navigation";
import { verifiedExperts } from "@/lib/evidence";
import { SITE_URL, UPDATED_ISO_DATE, pages } from "@/lib/site";
import { SourceList } from "@/components/source-list";
import { reviewedPagesBy } from "@/lib/medical-review";
import { OG_IMAGES, TWITTER_IMAGES, breadcrumbList } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return verifiedExperts.map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  return expert ? { title: `Lek. dent. ${expert.name} – Recenzent medyczny`, description: `Profil recenzenta medycznego serwisu: ${expert.name}, dentysta i właściciel Akdeniz Dental w Antalyi. Biografia, źródła i status recenzji treści.`, openGraph: { images: OG_IMAGES, title: `Lek. dent. ${expert.name} – Recenzent medyczny`, description: expert.introduction ?? expert.biography, url: expert.profileUrl, type: "profile" }, twitter: { images: TWITTER_IMAGES, card: "summary_large_image", title: `Lek. dent. ${expert.name} – Recenzent medyczny`, description: expert.introduction ?? expert.biography }, alternates: { canonical: expert.profileUrl } } : {};
}
export default async function ExpertProfile({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const expert = verifiedExperts.find((item) => item.slug === slug);
  if (!expert) notFound();
  const doctor = clinicalTeam.find((item) => item.slug === slug);
  const reviewedPages = reviewedPagesBy(slug, UPDATED_ISO_DATE, pages);
  const schema = { "@context": "https://schema.org", "@type": "Person", "@id": `${SITE_URL}${expert.profileUrl}/#person`, name: expert.name, alternateName: doctor?.alternateNames, image: doctor ? `${SITE_URL}${doctor.imageUrl}` : undefined, jobTitle: "Dentysta i recenzent medyczny serwisu", url: `${SITE_URL}${expert.profileUrl}`, description: expert.biography, knowsAbout: expert.professionalFocus, worksFor: { "@type": "Organization", name: "Akdeniz Dental", url: "https://akdenizdental.com" }, sameAs: expert.sources.map(({ url }) => url) };
  return <main className="shell expert-profile content-section">
    <nav aria-label="Ścieżka nawigacji"><Link href="/">Strona główna</Link> / <Link href="/eksperci">Eksperci</Link> / {expert.name}</nav>
    <p className="eyebrow">Recenzent medyczny serwisu</p><h1>Lek. dent. {expert.name}</h1><p className="lead">{expert.introduction ?? "Dentysta oraz założyciel i właściciel Akdeniz Dental w Antalyi, w Turcji."}</p>
    {doctor && <Image className="reviewer-portrait" src={doctor.imageUrl} alt={`Lek. dent. ${expert.name} – Akdeniz Dental`} width={300} height={300} sizes="300px" />}
    <p><Link className="text-link" href="/nasi-lekarze">Poznaj zespół kliniki partnerskiej →</Link></p>
    <section><h2>Biografia i wykształcenie</h2><p>{expert.biography}</p></section>
    <section><h2>Doświadczenie zawodowe</h2><p>{expert.experience ?? "Publiczny profil kliniki opisuje go jako dentystę oraz założyciela i właściciela placówki. Dane o studiach i roli w klinice pochodzą od samej kliniki. Nie wskazują na formalnie potwierdzoną specjalizację stomatologiczną."}</p></section>
    <section><h2>Obszary zainteresowania zawodowego</h2><p>Według profilu Akdeniz Dental Clinic są to:</p><ul>{expert.professionalFocus.map((focus) => <li key={focus}>{focus}</li>)}</ul><p>Są to obszary pracy opisane przez klinikę, nie tytuły specjalisty.</p></section>
    <section><h2>Rola recenzenta medycznego</h2><p>Rolą recenzenta jest ocena informacji stomatologicznych: opisów leczenia, wskazań, przeciwwskazań, ryzyka, alternatyw i opieki po zabiegu. Redakcja pozostaje autorem treści. Recenzja jest przypisywana konkretnej stronie dopiero po udokumentowaniu jej zakresu i daty.</p>{expert.reviewScope && <p>{expert.reviewScope}</p>}<Link className="text-link" href="/weryfikacja-medyczna">Jak weryfikujemy treści →</Link></section>
    <section><h2>Powiązanie z kliniką partnerską</h2><p>{expert.affiliation ?? "Mustafa Akça jest założycielem i właścicielem Akdeniz Dental, kliniki partnerskiej tego serwisu. Jest to powiązanie zawodowe i komercyjne; nie przedstawiamy go jako niezależnego recenzenta. Rola recenzenta nie oznacza gwarancji wyniku leczenia ani zastąpienia indywidualnego badania."}</p></section>
    <SourceList intro={`${expert.sourceNote ?? "Strona kliniki opisuje biografię i obszary pracy, a publiczne profile zawodowe podają zawód i lokalizację. Profil w serwisie Teeth Done in Turkey opisuje rolę recenzenta na tamtej stronie; nie potwierdza recenzji treści tego serwisu. Źródła nie stanowią rekomendacji naszego serwisu."} Ostatnia aktualizacja źródeł: ${expert.lastVerified}.`} sources={expert.sources.map((source) => ({ label: source.label, href: source.url }))} />
    <section><h2>Jak czytać ten profil</h2><p>Profil potwierdza tożsamość zawodową i powiązania recenzenta, a nie jakość leczenia w klinice ani wynik leczenia konkretnego pacjenta. Recenzja dotyczy wyłącznie stron wymienionych poniżej i ma datę wykonania. Zasady opisują strony <Link className="text-link" href="/weryfikacja-medyczna">Weryfikacja medyczna</Link> i <Link className="text-link" href="/polityka-redakcyjna">Polityka redakcyjna</Link>.</p></section>
    <section><h2>Zweryfikowane treści</h2>{reviewedPages.length > 0 ? <ul>{reviewedPages.map((page) => <li key={page.slug}><Link href={`/${page.slug}`}>{page.title}</Link></li>)}</ul> : <p>Lista zweryfikowanych artykułów pojawi się po potwierdzeniu daty recenzji. Sam profil lekarza nie oznacza, że sprawdził treść danej strony.</p>}</section>
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({ "@context": "https://schema.org", "@graph": [schema, breadcrumbList([{ name: "Eksperci", path: "/eksperci" }, { name: expert.name, path: expert.profileUrl }]), { "@type": "ProfilePage", "@id": `${SITE_URL}${expert.profileUrl}`, url: `${SITE_URL}${expert.profileUrl}`, name: `Lek. dent. ${expert.name} – Recenzent medyczny`, mainEntity: { "@id": schema["@id"] } }] }) }} />
  </main>;
}
