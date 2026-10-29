"use client";

import { usePathname } from "next/navigation";
import { TrackedLink, trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";

/** Top of the footer: Polish-language contact with the general WhatsApp message and the quote form. */
export function FooterContact() {
  const pathname = usePathname();
  const audience = pathname === "/uk" || pathname.startsWith("/uk/") ? "uk" : "pl";
  return (
    <section className="footer-contact" aria-labelledby="footer-contact-title">
      <div>
        <p className="footer-contact-title" id="footer-contact-title">Masz pytania o leczenie zębów w Turcji?</p>
        <p className="footer-contact-text">Porozmawiaj z nami po polsku o możliwościach leczenia i wstępnej wycenie.</p>
      </div>
      <div className="footer-contact-actions">
        <a className="whatsapp-button" href={whatsappUrl("", audience)} target="_blank" rel="noopener noreferrer" aria-label="Napisz na WhatsApp (otwiera się w nowej karcie)" onClick={() => trackEvent("whatsapp_click", { button_location: "footer" })}><WhatsAppIcon /><span>Napisz na WhatsApp</span></a>
        <TrackedLink href="/kontakt" event="quote_cta_click" tracking={{ lead_source: "OGZ-PL", cta_location: "footer" }} className="button button-light">Skontaktuj się z nami</TrackedLink>
      </div>
    </section>
  );
}
