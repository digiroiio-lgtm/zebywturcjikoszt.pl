"use client";

import Link from "next/link";
import type { ReactNode } from "react";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function trackEvent(event: string, details: Record<string, string> = {}) {
  const payload = { event, page_path: window.location.pathname, ...details };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("site:analytics", { detail: payload }));
}

export function TrackedLink({ href, event, className, children, tracking }: { href: string; event: string; className?: string; children: ReactNode; tracking?: Record<string, string> }) {
  return <Link href={href} className={className} onClick={() => trackEvent(event, tracking)}>{children}</Link>;
}
