"use client";

import type { ReactNode } from "react";
import { trackEvent } from "./tracked-link";

/** Button that takes the visitor to the on-page form with the topic preselected and the section recorded as the CTA location. */
export function SectionCta({ children, location, topic = "", className = "button", event = "home_section_cta" }: { children: ReactNode; location: string; topic?: string; className?: string; event?: string }) {
  return <a className={className} href="#home-lead-form" onClick={() => {
    window.dispatchEvent(new CustomEvent("lead-form:topic", { detail: { topic, cta_location: location } }));
    trackEvent(event, { lead_source: "OGZ-PL", cta_location: location, topic });
  }}>{children}</a>;
}
