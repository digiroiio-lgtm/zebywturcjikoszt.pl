import Link from "next/link";
import { primaryNav } from "@/lib/site";
import { TrackedLink } from "./tracked-link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Zęby w Turcji – strona główna"><span className="brand-mark" aria-hidden="true">Z</span><span>Zęby w Turcji</span></Link>
        <nav className="desktop-nav" aria-label="Główna nawigacja">{primaryNav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <TrackedLink href="/kontakt/" event="header_assessment_cta" className="button button-small">Sprawdź koszt</TrackedLink>
        <details className="mobile-menu"><summary aria-label="Otwórz menu">Menu</summary><nav aria-label="Nawigacja mobilna">{primaryNav.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<Link href="/jak-wybrac-klinike/">Jak wybrać klinikę</Link></nav></details>
      </div>
    </header>
  );
}
