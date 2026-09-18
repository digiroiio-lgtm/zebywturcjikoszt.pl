"use client";

import Link from "next/link";
import type { ReactNode } from "react";

declare global {
  interface Window { dataLayer?: Record<string, unknown>[]; }
}

export function trackEvent(event: string) {
  const payload = { event, page_path: window.location.pathname };
  window.dataLayer?.push(payload);
  window.dispatchEvent(new CustomEvent("site:analytics", { detail: payload }));
}

export function TrackedLink({ href, event, className, children }: { href: string; event: string; className?: string; children: ReactNode }) {
  return <Link href={href} className={className} onClick={() => trackEvent(event)}>{children}</Link>;
}
