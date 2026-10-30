/**
 * Campaign configuration: the single place to switch a promotion on or off and to set its dates.
 * `startsAt` / `endsAt` are ISO timestamps; null means "not specified" (no date is invented). Operators set them here.
 */
export type Campaign = {
  id: string;
  /** Operator's own wording; sent with the lead and appended to the WhatsApp message. */
  name: string;
  /** What the visitor sees in the form (Polish, no price); `name` stays the tracking and notification label. */
  displayName: string;
  /** Who the offer is for. The price is in GBP, so it is shown only on the UK pages; "pl" and "all" need an owner-supplied PLN/EUR offer. */
  audience: "uk" | "pl" | "all";
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
  displayName: "Oferta świąteczna: 16 koron cyrkonowych",
  audience: "uk",
  active: true,
  // Operator-supplied, Antalya time (UTC+03:00): 17.10.2026 to 01.01.2027 00:01.
  startsAt: "2026-10-17T00:00:00+03:00",
  endsAt: "2027-01-01T00:01:00+03:00",
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

/** UK section: /uk and everything below it. Every other page serves the Polish audience. */
export const isUkPath = (pathname: string) => pathname === "/uk" || pathname.startsWith("/uk/");

/** The live campaign meant for the audience of this page, so a GBP offer never reaches the Polish pages. */
export function activeCampaignForPath(pathname: string, now = Date.now()): Campaign | undefined {
  const audience = isUkPath(pathname) ? "uk" : "pl";
  return campaigns.find((campaign) => isCampaignLive(campaign, now) && (campaign.audience === "all" || campaign.audience === audience));
}
/** Names the lead API accepts, so an arbitrary string can never be written into a lead notification as a "campaign". */
export const knownCampaignNames: string[] = campaigns.map((campaign) => campaign.name);
