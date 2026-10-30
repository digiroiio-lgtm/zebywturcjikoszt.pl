"use client";

import { trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { WHATSAPP_HERO_CTA, WHATSAPP_NEW_TAB } from "@/lib/cta";

/** Secondary hero action: a Polish-language chat without filling the form. */
export function HeroWhatsapp() {
  return <a className="text-link hero-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label={`${WHATSAPP_HERO_CTA} ${WHATSAPP_NEW_TAB}`} onClick={() => trackEvent("whatsapp_click", { button_location: "hero" })}><WhatsAppIcon /><span>{WHATSAPP_HERO_CTA}</span></a>;
}
