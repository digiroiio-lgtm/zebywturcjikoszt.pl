"use client";

import { trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { useActiveCampaign } from "./use-active-campaign";
import { whatsappUrl } from "@/lib/whatsapp";

/** Secondary hero action: a Polish-language chat without filling the form. */
export function HeroWhatsapp() {
  const campaign = useActiveCampaign()?.name;
  return <a className="text-link hero-whatsapp" href={whatsappUrl("", campaign)} target="_blank" rel="noopener noreferrer" aria-label="Porozmawiaj po polsku na WhatsApp (otwiera się w nowej karcie)" onClick={() => trackEvent("whatsapp_click", { button_location: "hero", ...(campaign ? { campaign } : {}) })}><WhatsAppIcon /><span>Porozmawiaj po polsku na WhatsApp</span></a>;
}
