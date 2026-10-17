"use client";

import { trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { useActiveCampaign } from "./use-active-campaign";
import { topicFromPath } from "@/lib/lead-options";

/** Shown after the price and scope tables: asks the clinic on WhatsApp with a message prepared for this treatment. */
export function TreatmentWhatsappCta({ slug }: { slug: string }) {
  const topic = topicFromPath(`/${slug}`);
  const campaign = useActiveCampaign()?.name;
  return <p className="treatment-whatsapp"><a className="whatsapp-button" href={whatsappUrl(topic, campaign)} target="_blank" rel="noopener noreferrer" aria-label="Zapytaj na WhatsApp o koszt leczenia (otwiera się w nowej karcie)" onClick={() => trackEvent("whatsapp_click", { button_location: "treatment_price", ...(topic ? { treatment: topic } : {}), ...(campaign ? { campaign } : {}) })}><WhatsAppIcon /><span>Zapytaj na WhatsApp</span></a><span className="microcopy">Nie musisz wypełniać formularza.</span></p>;
}
