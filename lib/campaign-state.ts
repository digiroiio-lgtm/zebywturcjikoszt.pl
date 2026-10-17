/** Browser-side keys shared by the campaign popup and the lead form. Values describe the campaign and visit state, never the visitor. */
export const POPUP_SHOWN_KEY = "campaign-popup-shown";
export const POPUP_DISMISSED_KEY = "campaign-popup-dismissed-at";
export const POPUP_SECONDS_KEY = "campaign-popup-seconds";
export const LEAD_ENGAGED_KEY = "lead-form-engaged";
export const CAMPAIGN_STORAGE_KEY = "lead-campaign";

export type StoredCampaign = { name: string; cta_location?: string; page_path?: string };

export function storeCampaign(value: StoredCampaign) {
  try { sessionStorage.setItem(CAMPAIGN_STORAGE_KEY, JSON.stringify(value)); } catch { /* best effort */ }
}
export function readStoredCampaign(): StoredCampaign | null {
  try { const parsed = JSON.parse(sessionStorage.getItem(CAMPAIGN_STORAGE_KEY) ?? "null"); return parsed && typeof parsed.name === "string" ? parsed : null; } catch { return null; }
}
export function clearStoredCampaign() {
  try { sessionStorage.removeItem(CAMPAIGN_STORAGE_KEY); } catch { /* best effort */ }
}
