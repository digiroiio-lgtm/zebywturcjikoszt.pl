"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { TrackedLink, trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { useActiveCampaign } from "./use-active-campaign";
import { HEADER_CTA } from "@/lib/cta";
import { topicFromPath } from "@/lib/lead-options";

/** One contact component: a two-action bar on phones (quote 60 % / WhatsApp 40 %) and a floating WhatsApp button on larger screens; CSS shows exactly one of them. */
export function MobileAssessmentBar() {
  const pathname = usePathname();
  // On the home page the hero already shows the same CTA: keep the sticky bar hidden until that button scrolls out of view.
  const [heroCtaInView, setHeroCtaInView] = useState(true);
  const [footerInView, setFooterInView] = useState(false);
  useEffect(() => {
    if (pathname !== "/") return;
    const target = document.querySelector(".home-hero .hero-copy .button");
    if (!target || !("IntersectionObserver" in window)) { const frame = requestAnimationFrame(() => setHeroCtaInView(false)); return () => cancelAnimationFrame(frame); }
    const observer = new IntersectionObserver(([entry]) => setHeroCtaInView(entry.isIntersecting), { threshold: 0.6 });
    observer.observe(target);
    return () => observer.disconnect();
  }, [pathname]);
  // The floating desktop button steps aside while the footer is on screen so it never covers footer actions.
  useEffect(() => {
    const footer = document.querySelector(".site-footer");
    if (!footer || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => setFooterInView(entry.isIntersecting));
    observer.observe(footer);
    return () => observer.disconnect();
  }, [pathname]);

  const topic = topicFromPath(pathname);
  const campaign = useActiveCampaign()?.name;
  const home = pathname === "/";
  const guide = pathname.startsWith("/poradniki");
  const label = HEADER_CTA;
  const context = { ...(topic ? { treatment: topic } : {}), ...(campaign ? { campaign } : {}) };
  const whatsapp = (location: string) => <a className="whatsapp-button" href={whatsappUrl(topic, campaign)} target="_blank" rel="noopener noreferrer" aria-label="Zapytaj na WhatsApp (otwiera się w nowej karcie)" onClick={() => trackEvent("whatsapp_click", { button_location: location, ...context })}><WhatsAppIcon /><span>WhatsApp</span></a>;

  return <>
    {pathname !== "/kontakt" && <nav className="mobile-assessment-bar" aria-label="Kontakt w sprawie leczenia" data-hidden={home && heroCtaInView ? "true" : undefined}>
      {home
        ? <a className="button quote-button" href="#home-lead-form" onClick={() => { window.dispatchEvent(new CustomEvent("lead-form:topic", { detail: { topic: "", cta_location: "mobile_sticky" } })); trackEvent("quote_cta_click", { lead_source: "OGZ-PL", cta_location: "mobile_sticky", button_location: "mobile_sticky_bar", ...context }); }}>{label}</a>
        : <TrackedLink href={`/kontakt?${new URLSearchParams({ cta_location: "mobile_sticky", page_path: pathname, ...(guide ? { lead_source: "OGZ-PL", guide_source: pathname } : {}) }).toString()}#assessment-form`} event="quote_cta_click" tracking={{ cta_location: "mobile_sticky", button_location: "mobile_sticky_bar", ...context }} className="button quote-button">{label}</TrackedLink>}
      {whatsapp("mobile_sticky_bar")}
    </nav>}
    <div className="whatsapp-floating" data-hidden={footerInView ? "true" : undefined}>{whatsapp("desktop_floating")}</div>
  </>;
}
