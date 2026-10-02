"use client";

import { useEffect } from "react";
import { trackEvent } from "./tracked-link";

const AI_HOSTS: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "www.perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "you.com": "you",
  "www.you.com": "you"
};

export function detectAiSource(referrer: string, utmSource: string | null) {
  const utm = utmSource?.toLowerCase().replace(/\.(com|ai)$/, "");
  if (utm && Object.values(AI_HOSTS).includes(utm)) return utm;
  try { return AI_HOSTS[new URL(referrer).hostname] ?? null; } catch { return null; }
}

// Kept in memory only: nothing is written to the visitor's device (no cookies, localStorage or sessionStorage).
let aiReferralSent = false;

/** Records a single `ai_referral` dataLayer event per page load when the visit comes from an AI assistant. No personal data is stored. */
export function AiReferralTracker() {
  useEffect(() => {
    const source = detectAiSource(document.referrer, new URLSearchParams(window.location.search).get("utm_source"));
    if (!source || aiReferralSent) return;
    aiReferralSent = true;
    trackEvent("ai_referral", { ai_source: source, landing_path: window.location.pathname });
  }, []);
  return null;
}
