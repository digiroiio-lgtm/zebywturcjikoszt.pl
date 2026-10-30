"use client";

import { trackEvent } from "./tracked-link";
import { WhatsAppIcon } from "./whatsapp-icon";
import { whatsappUrl } from "@/lib/whatsapp";
import { WHATSAPP_CTA, WHATSAPP_NEW_TAB } from "@/lib/cta";
import { topicFromPath } from "@/lib/lead-options";

/** Shown after the price and scope tables: asks the clinic on WhatsApp with a message prepared for this treatment. */
export function TreatmentWhatsappCta({ slug }: { slug: string }) {
  const topic = topicFromPath(`/${slug}`);
  return <p className="treatment-whatsapp"><a className="whatsapp-button" href={whatsappUrl(topic)} target="_blank" rel="noopener noreferrer" aria-label={`${WHATSAPP_CTA} w sprawie kosztu leczenia ${WHATSAPP_NEW_TAB}`} onClick={() => trackEvent("whatsapp_click", { button_location: "treatment_price", ...(topic ? { treatment: topic } : {}) })}><WhatsAppIcon /><span>{WHATSAPP_CTA}</span></a><span className="microcopy">Nie musisz wypełniać formularza.</span></p>;
}
