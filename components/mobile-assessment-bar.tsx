"use client";

import { usePathname } from "next/navigation";
import { TrackedLink } from "./tracked-link";

export function MobileAssessmentBar() {
  const pathname = usePathname();
  if (pathname === "/kontakt") return null;

  const guide = pathname.startsWith("/poradniki");
  const params = new URLSearchParams({ cta_location: "mobile_sticky", page_path: pathname, ...(guide ? { lead_source: "OGZ-PL", guide_source: pathname } : {}) });
  return <nav className="mobile-assessment-bar" aria-label="Wstępna ocena leczenia">
    <TrackedLink href={`/kontakt?${params.toString()}#assessment-form`} event="mobile_sticky_assessment_cta" tracking={{ cta_location: "mobile_sticky" }} className="button">{guide ? "Poproś o wstępną wycenę" : "Poproś o wstępną ocenę"} <span aria-hidden="true">→</span></TrackedLink>
  </nav>;
}
