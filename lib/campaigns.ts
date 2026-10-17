/**
 * Campaign configuration: the single place to switch a promotion on or off and to set its dates.
 * `startsAt` / `endsAt` are ISO timestamps; null means "not specified" (no date is invented). Operators set them here.
 */
export type Campaign = {
  id: string;
  /** Operator's own wording; sent with the lead and appended to the WhatsApp message. */
  name: string;
  active: boolean;
  startsAt: string | null;
  endsAt: string | null;
  image: string;
  imageAlt: string;
  popup: {
    imageWebp: string;
    imageAvif: string;
    eyebrow: string;
    title: string;
    tagline: string;
    offer: string;
    detail: string;
    price: string;
    includesTitle: string;
    includes: string[];
    clinic: string;
    cta: string;
    note: string;
    /** Topic preselected in the form when the popup CTA is used. */
    topic: string;
  };
};

export const christmasCampaign: Campaign = {
  id: "christmas-hollywood-smile",
  name: "Christmas Hollywood Smile | 16 crowns | £2,390",
  active: true,
  startsAt: null,
  endsAt: null,
  image: "/images/kampanya/swiateczna-oferta.webp",
  imageAlt: "Uśmiechnięta modelka w świątecznej scenerii Akdeniz Dental, napis Healthy Smiles Brighter Holidays",
  popup: {
    imageWebp: "/images/kampanya/swiateczna-oferta-popup.webp",
    imageAvif: "/images/kampanya/swiateczna-oferta-popup.avif",
    eyebrow: "🎄 ŚWIĄTECZNA OFERTA SPECJALNA",
    title: "HOLLYWOOD SMILE",
    tagline: "Podaruj sobie nowy uśmiech na Święta!",
    offer: "16 koron cyrkonowych",
    detail: "8 w górnym + 8 w dolnym łuku",
    price: "£2,390",
    includesTitle: "W cenie:",
    includes: ["Pobyt w hotelu 5★", "Transfery VIP"],
    clinic: "Akdeniz Dental Clinic • Antalya, Turcja",
    cta: "Odbierz bezpłatny plan leczenia",
    note: "Kwalifikacja do leczenia wymaga indywidualnej oceny stomatologicznej.",
    topic: "crowns"
  }
};

export const campaigns: Campaign[] = [christmasCampaign];

export function isCampaignLive(campaign: Campaign, now = Date.now()): boolean {
  if (!campaign.active) return false;
  if (campaign.startsAt && now < Date.parse(campaign.startsAt)) return false;
  if (campaign.endsAt && now > Date.parse(campaign.endsAt)) return false;
  return true;
}

export function activeCampaign(now = Date.now()): Campaign | undefined { return campaigns.find((campaign) => isCampaignLive(campaign, now)); }
/** Names the lead API accepts, so an arbitrary string can never be written into a lead notification as a "campaign". */
export const knownCampaignNames: string[] = campaigns.map((campaign) => campaign.name);
