"use client";

import { TrackedLink, trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { CTA_ASSURANCE, PRIMARY_CTA, WHATSAPP_CTA, WHATSAPP_NEW_TAB } from "@/lib/cta";

/**
 * Lead block for trust pages (reviews, documents, price data, expert profiles). Visitors on these pages are checking
 * the clinic before contacting it, so the next step sits right after the evidence: the quote form or WhatsApp.
 */
export function TrustLeadCta({ location, title, text }: { location: string; title: string; text: string }) {
  const tracking = { lead_source: "OGZ-PL", cta_location: location };
  return <aside className="case-cta trust-lead-cta" aria-label="Kontakt w sprawie leczenia">
    <div><p className="mini-label">Następny krok</p><h2>{title}</h2><p>{text}</p><p className="microcopy">{CTA_ASSURANCE}</p></div>
    <div className="button-row">
      <TrackedLink href="/kontakt#assessment-form" event="trust_page_cta" tracking={tracking} className="button">{PRIMARY_CTA}</TrackedLink>
      <a className="whatsapp-button" href={whatsappUrl("")} target="_blank" rel="noopener noreferrer" aria-label={`${WHATSAPP_CTA} ${WHATSAPP_NEW_TAB}`} onClick={() => trackEvent("whatsapp_click", { button_location: location })}><WhatsAppIcon /><span>{WHATSAPP_CTA}</span></a>
    </div>
  </aside>;
}
