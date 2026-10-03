import Link from "next/link";
import { OPERATOR, operatorIsPublished, operatorRows } from "@/lib/operator";
import { credentialsPublished } from "@/lib/credentials";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><p className="footer-brand">Zęby w Turcji</p><p>Rzetelne informacje dla osób z Polski rozważających leczenie stomatologiczne w Turcji.</p><p className="footer-note">Serwis informacyjny o celu komercyjnym. Nie zastępuje badania ani porady lekarza dentysty.</p></div>
        <div><p className="footer-heading">Leczenie</p><Link href="/koszt">Koszt leczenia</Link><Link href="/implanty">Implanty</Link><Link href="/licowki">Licówki</Link><Link href="/korony-cyrkonowe">Korony cyrkonowe</Link><Link href="/cala-szczeka">Cała szczęka</Link><Link href="/all-on-4">All-on-4</Link></div>
        <div><p className="footer-heading">Świadoma decyzja</p><Link href="/poradniki">Poradniki dla pacjentów</Link><Link href="/jak-wybrac-klinike">Jak wybrać klinikę</Link><Link href="/opinie">Jak oceniać opinie</Link><Link href="/przed-i-po">Przed i po</Link><Link href="/antalya">Plan wyjazdu</Link><Link href="/pytania-i-odpowiedzi">Pytania i odpowiedzi</Link><Link href="/listy-kontrolne">Wszystkie listy kontrolne</Link><Link href="/uk">Dla Polaków w UK</Link></div>
        <div><p className="footer-heading">O serwisie</p><Link href="/o-nas">O nas</Link><Link href="/kontakt">Kontakt</Link><Link href="/polityka-redakcyjna">Polityka redakcyjna</Link><Link href="/weryfikacja-medyczna">Weryfikacja medyczna</Link><Link href="/metodologia">Metodologia</Link><Link href="/wlasciciel-serwisu">Właściciel serwisu</Link><Link href="/korekty">Korekty</Link>{credentialsPublished && <Link href="/dokumenty-i-licencje">Dokumenty i licencje</Link>}<Link href="/eksperci">Eksperci</Link><Link href="/nasi-lekarze">Nasi lekarze</Link><Link href="/polityka-prywatnosci">Prywatność</Link><Link href="/cookies">Cookies</Link><Link href="/regulamin">Regulamin</Link><Link href="/reklamacje">Reklamacje</Link></div>
      </div>
      <div className="shell footer-bottom">{operatorIsPublished && <p>Operator serwisu: {OPERATOR.legalName}, {operatorRows(OPERATOR).find((row) => row.label === "Adres")?.value}. Spółka prowadzi także klinikę Akdeniz Dental. <Link href="/o-nas">Więcej o operatorze</Link></p>}© 2026 Zęby w Turcji. Sprawdź, jak powstają i kiedy są aktualizowane nasze treści.</div>
    </footer>
  );
}
