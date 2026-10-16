"use client";

import Link from "next/link";
import { track } from "@vercel/analytics";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

/** Only these keys are forwarded to Vercel Analytics (cookieless). They describe the page and the CTA, never the visitor. */
const ANALYTICS_KEYS = ["page_type", "geographic_market", "geographic_region", "city_slug", "selected_treatment", "content_cluster", "page_path", "cta_location", "lead_source", "guide_source", "source_page_path", "destination_path", "case_reference", "preferred_channel", "topic", "utm_source", "utm_medium", "utm_campaign"];

function forwardToAnalytics(event: string, payload: Record<string, unknown>) {
  const properties: Record<string, string> = {};
  for (const key of ANALYTICS_KEYS) if (typeof payload[key] === "string" && payload[key]) properties[key] = String(payload[key]).slice(0, 120);
  try { track(event, properties); } catch { /* analytics must never break a click or a form submission */ }
}

const ATTRIBUTION_KEYS = ["lead_source", "cta_location", "page_path", "guide_source"] as const;
type AttributionKey = (typeof ATTRIBUTION_KEYS)[number];
export type Attribution = Partial<Record<AttributionKey, string>>;
type StoredCta = Attribution & { target: string; at: number };

const STORAGE_KEY = "lead-attribution";
/** A remembered CTA only describes the click that led to the page it targeted, and only for a short while. */
const CTA_TTL_MS = 30 * 60 * 1000;

function readStore(): { guide_source?: string; cta?: StoredCta } {
  try { return JSON.parse(sessionStorage.getItem(STORAGE_KEY) ?? "{}") ?? {}; } catch { return {}; }
}

/**
 * Internal CTAs used to carry lead_source / cta_location / page_path / guide_source in their href. Those URLs are
 * crawlable duplicates of the clean page (canonicalised, uppercase, parameters), so the href stays clean and the
 * same context travels in sessionStorage instead. It describes the page and the CTA, never the visitor.
 */
function splitAttribution(href: string): { href: string; attribution: Attribution } {
  if (!href.startsWith("/") || href.startsWith("//") || !href.includes("?")) return { href, attribution: {} };
  const url = new URL(href, "https://placeholder.invalid");
  const attribution: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = url.searchParams.get(key);
    if (value) attribution[key] = value;
    url.searchParams.delete(key);
  }
  return { href: url.pathname + url.search + url.hash, attribution };
}

/** Context for the page the visitor is on: an explicit query string (older links) wins over the CTA that brought them here. */
export function readAttribution(): Attribution {
  const params = new URLSearchParams(window.location.search);
  const store = readStore();
  const cta = store.cta && store.cta.target === window.location.pathname && Date.now() - store.cta.at < CTA_TTL_MS ? store.cta : undefined;
  const result: Attribution = {};
  for (const key of ATTRIBUTION_KEYS) {
    const value = params.get(key) ?? cta?.[key] ?? (key === "guide_source" ? store.guide_source : undefined);
    if (value) result[key] = value;
  }
  if (!result.page_path) {
    try { const referrer = new URL(document.referrer); if (referrer.origin === window.location.origin && referrer.pathname !== window.location.pathname) result.page_path = referrer.pathname; } catch { /* no usable referrer */ }
  }
  return result;
}

function rememberAttribution(cleanHref: string, fromHref: Attribution, tracking: Record<string, string>) {
  const here = window.location.pathname;
  const guide = fromHref.guide_source ?? tracking.guide_source ?? readAttribution().guide_source;
  const leadSource = fromHref.lead_source ?? tracking.lead_source ?? (here === "/uk" || here.startsWith("/uk/") ? "OGZ-UK" : undefined);
  const cta: StoredCta = {
    target: new URL(cleanHref, window.location.origin).pathname,
    at: Date.now(),
    page_path: fromHref.page_path ?? tracking.page_path ?? here,
    ...(leadSource ? { lead_source: leadSource } : {}),
    ...((fromHref.cta_location ?? tracking.cta_location) ? { cta_location: fromHref.cta_location ?? tracking.cta_location } : {})
  };
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ ...(guide ? { guide_source: guide } : {}), cta })); } catch { /* attribution is best effort */ }
}

export function trackEvent(event: string, details: Record<string, string> = {}) {
  const params = new URLSearchParams(window.location.search);
  const guideSource = params.get("guide_source") ?? (window.location.pathname.startsWith("/poradniki") ? window.location.pathname : readStore().guide_source ?? "");
  const payload = { event, page_path: window.location.pathname, ...(guideSource ? { guide_source: guideSource } : {}), ...details };
  (window.dataLayer ??= []).push(payload);
  forwardToAnalytics(event, payload);
  window.dispatchEvent(new CustomEvent("site:analytics", { detail: payload }));
}

const subscribeToLocation = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const currentLocation = () => `${window.location.pathname}${window.location.search}`;
const serverLocation = () => "";

/** Adds the visitor's campaign (utm_*) parameters to an internal href. Without a browser location the href is returned unchanged. */
function withAttribution(href: string, location: string) {
  if (!location || !href.startsWith("/") || href.startsWith("//")) return href;
  const current = new URL(location, "https://placeholder.invalid");
  const url = new URL(href, "https://placeholder.invalid");
  for (const key of ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (current.searchParams.has(key) && !url.searchParams.has(key)) url.searchParams.set(key, current.searchParams.get(key)!);
  }
  return url.pathname + url.search + url.hash;
}

export function TrackedLink({ href, event, className, children, tracking }: { href: string; event: string; className?: string; children: ReactNode; tracking?: Record<string, string> }) {
  const location = useSyncExternalStore(subscribeToLocation, currentLocation, serverLocation);
  const { href: cleanHref, attribution } = splitAttribution(href);
  return <Link href={withAttribution(cleanHref, location)} className={className} onClick={() => { rememberAttribution(cleanHref, attribution, tracking ?? {}); trackEvent(event, tracking); }}>{children}</Link>;
}
