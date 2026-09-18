import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div><p className="footer-brand">Zęby w Turcji</p><p>Rzetelne informacje dla osób z Polski rozważających leczenie stomatologiczne w Turcji.</p><p className="footer-note">Serwis informacyjny o celu komercyjnym. Nie zastępuje badania ani porady lekarza dentysty.</p></div>
        <div><p className="footer-heading">Leczenie</p><Link href="/koszt/">Koszt leczenia</Link><Link href="/implanty/">Implanty</Link><Link href="/licowki/">Licówki</Link><Link href="/cala-szczeka/">Cała szczęka</Link><Link href="/all-on-4/">All-on-4</Link></div>
        <div><p className="footer-heading">Świadoma decyzja</p><Link href="/jak-wybrac-klinike/">Jak wybrać klinikę</Link><Link href="/opinie/">Jak oceniać opinie</Link><Link href="/przed-i-po/">Przed i po</Link><Link href="/antalya/">Plan wyjazdu</Link></div>
        <div><p className="footer-heading">O serwisie</p><Link href="/o-nas/">O nas</Link><Link href="/kontakt/">Kontakt</Link><Link href="/polityka-redakcyjna/">Polityka redakcyjna</Link><Link href="/weryfikacja-medyczna/">Weryfikacja medyczna</Link><Link href="/polityka-prywatnosci/">Prywatność</Link><Link href="/cookies/">Cookies</Link><Link href="/regulamin/">Regulamin</Link><Link href="/reklamacje/">Reklamacje</Link></div>
      </div>
      <div className="shell footer-bottom">© 2026 Zęby w Turcji. Informacje aktualizowane z zachowaniem zasad transparentności.</div>
    </footer>
  );
}
