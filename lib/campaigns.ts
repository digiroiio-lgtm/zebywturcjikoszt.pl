/** Active promotion. The label is the operator's own wording; no validity dates or conditions are stated anywhere on the site. */
export type Campaign = { id: string; name: string; image: string; imageAlt: string };

export const christmasCampaign: Campaign = {
  id: "christmas-hollywood-smile",
  name: "Christmas Hollywood Smile | 16 crowns | £2,390",
  image: "/images/kampanya/swiateczna-oferta.webp",
  imageAlt: "Uśmiechnięta modelka w świątecznej scenerii Akdeniz Dental, napis Healthy Smiles Brighter Holidays"
};

export const CAMPAIGN_ACTIVE = true;
export function activeCampaign(): Campaign | undefined { return CAMPAIGN_ACTIVE ? christmasCampaign : undefined; }
