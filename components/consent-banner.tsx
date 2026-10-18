"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { CONSENT_OPEN_EVENT, CONSENT_STORAGE_KEY } from "@/lib/consent";

type Choice = "granted" | "denied";
const CHANGED = "consent:changed";

function stored(): Choice | "none" {
  try { const value = localStorage.getItem(CONSENT_STORAGE_KEY); return value === "granted" || value === "denied" ? value : "none"; } catch { return "none"; }
}
const subscribe = (notify: () => void) => {
  window.addEventListener(CHANGED, notify);
  window.addEventListener("storage", notify);
  return () => { window.removeEventListener(CHANGED, notify); window.removeEventListener("storage", notify); };
};

/**
 * Consent Mode v2 banner for Google Analytics 4. The page starts with every consent type denied (see GTAG_INIT in
 * app/layout.tsx); this only records the visitor's choice and forwards it to gtag. Advertising storage is never granted.
 * `data-blocks-popup` keeps the campaign popup from opening on top of it.
 */
export function ConsentBanner() {
  // "server" keeps the first render empty so the static HTML never differs from the hydrated page.
  const choice = useSyncExternalStore(subscribe, stored, () => "server" as const);
  const [reopened, setReopened] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    return () => window.removeEventListener(CONSENT_OPEN_EVENT, reopen);
  }, []);

  function choose(next: Choice) {
    try { localStorage.setItem(CONSENT_STORAGE_KEY, next); } catch { /* the choice then only lasts for this page view */ }
    try { window.gtag?.("consent", "update", { analytics_storage: next }); } catch { /* analytics is optional */ }
    setReopened(false);
    window.dispatchEvent(new Event(CHANGED));
  }

  if (choice === "server" || (choice !== "none" && !reopened)) return null;
  return <div className="consent-banner" role="region" aria-label="Ustawienia cookies" data-blocks-popup>
    <p>Za Twoją zgodą używamy Google Analytics 4 do statystyk odwiedzin (mogą zapisywać pliki cookies). Odmowa nie ogranicza korzystania z serwisu. <Link href="/cookies">Polityka cookies</Link></p>
    <div className="consent-actions">
      <button type="button" className="consent-button" onClick={() => choose("denied")}>Odrzucam</button>
      <button type="button" className="consent-button" onClick={() => choose("granted")}>Akceptuję</button>
    </div>
  </div>;
}

/** Footer control that re-opens the banner so the choice can be changed. */
export function ConsentSettingsButton() {
  return <button type="button" className="consent-settings" onClick={() => window.dispatchEvent(new Event(CONSENT_OPEN_EVENT))}>Ustawienia cookies</button>;
}
