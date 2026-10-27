import Link from "next/link";
import { OPERATOR, operatorIsPublished, operatorRows } from "@/lib/operator";
import { credentialsPublished } from "@/lib/credentials";
import { ConsentSettingsButton } from "./consent-banner";
import { FooterContact } from "./footer-contact";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell"><FooterContact /></div>
      <div className="shell footer-grid">
        <nav className="footer-group" aria-labelledby="footer-treatments"><p className="footer-heading" id="footer-treatments">Leczenie i ceny</p><Link href="/koszt">Koszt leczenia</Link><Link href="/implanty">Implanty</Link><Link href="/korony-cyrkonowe">Korony cyrkonowe</Link><Link href="/licowki">Licówki</Link><Link href="/cala-szczeka">Cała szczęka</Link><Link href="/all-on-4">All-on-4</Link></nav>
        <nav className="footer-group" aria-labelledby="footer-patients"><p className="footer-heading" id="footer-patients">Dla pacjentów</p><Link href="/poradniki">Poradniki dla pacjentów</Link><Link href="/jak-wybrac-klinike">Jak wybrać klinikę</Link><Link href="/opinie">Opinie</Link><Link href="/przed-i-po">Przed i po</Link><Link href="/antalya">Plan wyjazdu do Antalyi</Link><Link href="/poradniki/opieka-po-leczeniu">Opieka po leczeniu</Link><Link href="/pytania-i-odpowiedzi">Pytania i odpowiedzi</Link></nav>
        <nav className="footer-group" aria-labelledby="footer-abroad"><p className="footer-heading" id="footer-abroad">Polacy za granicą</p><Link href="/uk">Dla Polaków w UK</Link><Link href="/uk/finansowanie-leczenia-zebow-w-turcji">Finansowanie leczenia</Link></nav>
        <nav className="footer-group" aria-labelledby="footer-about"><p className="footer-heading" id="footer-about">O nas i kontakt</p><Link href="/o-nas">O nas</Link><Link href="/nasi-lekarze">Nasi lekarze</Link><Link href="/nasz-zespol">Nasz zespół</Link><Link href="/kontakt">Kontakt</Link><Link href="/wlasciciel-serwisu">Właściciel serwisu</Link><Link href="/reklamacje">Reklamacje</Link></nav>
        <nav className="footer-group" aria-labelledby="footer-legal"><p className="footer-heading" id="footer-legal">Informacje prawne</p><Link href="/polityka-prywatnosci">Polityka prywatności</Link><Link href="/cookies">Cookies</Link><ConsentSettingsButton /><Link href="/regulamin">Regulamin</Link></nav>
      </div>
      <div className="shell">
        <details className="footer-more">
          <summary>Zasady redakcyjne i weryfikacja treści</summary>
          <nav aria-label="Zasady redakcyjne i weryfikacja treści"><Link href="/polityka-redakcyjna">Polityka redakcyjna</Link><Link href="/weryfikacja-medyczna">Weryfikacja medyczna</Link><Link href="/metodologia">Metodologia</Link><Link href="/korekty">Korekty</Link><Link href="/listy-kontrolne">Listy kontrolne</Link><Link href="/eksperci">Eksperci</Link>{credentialsPublished && <Link href="/dokumenty-i-licencje">Dokumenty i licencje</Link>}</nav>
        </details>
      </div>
      <div className="shell footer-bottom">
        <p className="footer-brand">Zęby w Turcji</p>
        <p>Rzetelne informacje dla osób z Polski rozważających leczenie stomatologiczne w Turcji.</p>
        <p className="footer-note">Serwis informacyjny o celu komercyjnym. Nie zastępuje badania ani porady lekarza dentysty.</p>
        {operatorIsPublished && <p>Operator serwisu: {OPERATOR.legalName}, {operatorRows(OPERATOR).find((row) => row.label === "Adres")?.value}. Spółka prowadzi także klinikę Akdeniz Dental. <Link href="/o-nas">Więcej o operatorze</Link></p>}
        <p>© 2026 Zęby w Turcji. Sprawdź, jak powstają i kiedy są aktualizowane nasze treści.</p>
      </div>
    </footer>
  );
}
