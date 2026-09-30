"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
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

export function TrackedLink({ href, event, className, children, tracking }: { href: string; event: string; className?: string; children: ReactNode; tracking?: Record<string, string> }) {
  const [destination, setDestination] = useState(href);
  useEffect(() => {
    if (!href.startsWith("/") || href.startsWith("//")) return;
    const incoming = new URLSearchParams(window.location.search);
    const url = new URL(href, window.location.origin);
    for (const key of ["guide_source", "utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]) {
      if (incoming.has(key) && (!url.searchParams.has(key) || (key === "guide_source" && href.startsWith("/kontakt") && !window.location.pathname.startsWith("/poradniki")))) url.searchParams.set(key, incoming.get(key)!);
    }
    setDestination(url.pathname + url.search + url.hash);
  }, [href]);
  return <Link href={destination} className={className} onClick={() => trackEvent(event, tracking)}>{children}</Link>;
}
