import { HEADER_CTA } from "@/lib/cta";
import Link from "next/link";
import { primaryNav, treatmentNav } from "@/lib/site";
import { TrackedLink } from "./tracked-link";
import { MobileMenu } from "./mobile-menu";
import { NavGroup } from "./nav-group";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="shell header-inner">
        <Link className="brand" href="/" aria-label="Zęby w Turcji – strona główna"><span className="brand-mark" aria-hidden="true">Z</span><span>Zęby w Turcji</span></Link>
        <nav className="desktop-nav" aria-label="Główna nawigacja">{primaryNav.before.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<NavGroup label="Leczenie" items={treatmentNav} />{primaryNav.after.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</nav>
        <TrackedLink href="/kontakt?cta_location=header#assessment-form" event="header_assessment_cta" tracking={{ cta_location: "header" }} className="button button-small">{HEADER_CTA}</TrackedLink>
        <MobileMenu before={primaryNav.before} treatments={treatmentNav} after={primaryNav.after} />
      </div>
    </header>
  );
}
