"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { TrackedLink } from "./tracked-link";

export function MobileMenu({ items }: { items: { label: string; href: string }[] }) {
  const pathname = usePathname();
  const menu = useRef<HTMLDetailsElement>(null);
  // The header persists across client-side navigation, so an open menu would otherwise stay open on the next page.
  useEffect(() => { menu.current?.removeAttribute("open"); }, [pathname]);
  return <details className="mobile-menu" ref={menu}><summary aria-label="Otwórz menu">Menu</summary><nav aria-label="Nawigacja mobilna">{items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}<TrackedLink href="/kontakt?cta_location=mobile_menu" event="mobile_assessment_cta" tracking={{ cta_location: "mobile_menu" }} className="mobile-nav-cta">Poproś o bezpłatną wstępną ocenę</TrackedLink></nav></details>;
}
