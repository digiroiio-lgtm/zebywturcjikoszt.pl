"use client";

import Link from "next/link";
import { useSyncExternalStore } from "react";
import type { ReactNode } from "react";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function trackEvent(event: string, details: Record<string, string> = {}) {
  const params = new URLSearchParams(window.location.search);
  const guideSource = params.get("guide_source") ?? (window.location.pathname.startsWith("/poradniki") ? window.location.pathname : "");
  const payload = { event, page_path: window.location.pathname, ...(guideSource ? { guide_source: guideSource } : {}), ...details };
  (window.dataLayer ??= []).push(payload);
  window.dispatchEvent(new CustomEvent("site:analytics", { detail: payload }));
}

const subscribeToLocation = (notify: () => void) => {
  window.addEventListener("popstate", notify);
  return () => window.removeEventListener("popstate", notify);
};
const currentLocation = () => `${window.location.pathname}${window.location.search}`;
const serverLocation = () => "";

/** Adds attribution parameters from the current URL to an internal href. Without a browser location the href is returned unchanged. */
function withAttribution(href: string, location: string) {
  if (!location || !href.startsWith("/") || href.startsWith("//")) return href;
  const current = new URL(location, "https://placeholder.invalid");
  const url = new URL(href, "https://placeholder.invalid");
  for (const key of ["guide_source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
    if (current.searchParams.has(key) && (!url.searchParams.has(key) || (key === "guide_source" && href.startsWith("/kontakt") && !current.pathname.startsWith("/poradniki")))) url.searchParams.set(key, current.searchParams.get(key)!);
  }
  return url.pathname + url.search + url.hash;
}

export function TrackedLink({ href, event, className, children, tracking }: { href: string; event: string; className?: string; children: ReactNode; tracking?: Record<string, string> }) {
  const location = useSyncExternalStore(subscribeToLocation, currentLocation, serverLocation);
  return <Link href={withAttribution(href, location)} className={className} onClick={() => trackEvent(event, tracking)}>{children}</Link>;
}
