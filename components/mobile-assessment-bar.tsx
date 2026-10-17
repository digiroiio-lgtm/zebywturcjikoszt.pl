"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TrackedLink } from "./tracked-link";

export function MobileAssessmentBar() {
  const pathname = usePathname();
  // On the home page the hero already shows the same CTA: keep the sticky bar hidden until that button scrolls out of view.
  const [heroCtaInView, setHeroCtaInView] = useState(true);
  useEffect(() => {
    if (pathname !== "/") return;
    const target = document.querySelector(".home-hero .hero-copy .button");
    if (!target || !("IntersectionObserver" in window)) { const frame = requestAnimationFrame(() => setHeroCtaInView(false)); return () => cancelAnimationFrame(frame); }
    const observer = new IntersectionObserver(([entry]) => setHeroCtaInView(entry.isIntersecting), { threshold: 0.6 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);
  if (pathname === "/kontakt") return null;

  const guide = pathname.startsWith("/poradniki");
  const uk = pathname === "/uk" || pathname.startsWith("/uk/");
  const params = new URLSearchParams({ cta_location: "mobile_sticky", page_path: pathname, ...(guide ? { lead_source: "OGZ-PL", guide_source: pathname } : uk ? { lead_source: "OGZ-UK" } : {}) });
  return <nav className="mobile-assessment-bar" aria-label="Wstępna ocena leczenia" data-hidden={pathname === "/" && heroCtaInView ? "true" : undefined}>
    <TrackedLink href={`/kontakt?${params.toString()}#assessment-form`} event="mobile_sticky_assessment_cta" tracking={{ cta_location: "mobile_sticky" }} className="button">{guide ? "Poproś o wstępną wycenę" : "Poproś o bezpłatną wstępną ocenę"} <span aria-hidden="true">→</span></TrackedLink>
  </nav>;
}
