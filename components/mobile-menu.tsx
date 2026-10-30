"use client";

import { HEADER_CTA } from "@/lib/cta";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TrackedLink } from "./tracked-link";

type NavLink = { label: string; href: string };

export function MobileMenu({ before, treatments, after }: { before: NavLink[]; treatments: NavLink[]; after: NavLink[] }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  // The header persists across client-side navigation, so an open menu would otherwise stay open on the next page.
  useEffect(() => { menu.current?.removeAttribute("open"); }, [pathname]);
  return <details className="mobile-menu" ref={menu}><summary aria-label="Otwórz menu">Menu</summary><nav aria-label="Nawigacja mobilna">{before.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<p className="mobile-nav-heading" id="mobile-nav-treatments">Leczenie</p><div className="mobile-nav-group" role="group" aria-labelledby="mobile-nav-treatments">{treatments.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>{after.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<TrackedLink href="/kontakt?cta_location=mobile_menu#assessment-form" event="mobile_assessment_cta" tracking={{ cta_location: "mobile_menu" }} className="mobile-nav-cta">{HEADER_CTA}</TrackedLink></nav></details>;
}
