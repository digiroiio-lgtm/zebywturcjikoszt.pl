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
  // The first banner is held back until the page has loaded so it is never part of the initial paint (it would otherwise
  // become the LCP element). Nothing is collected meanwhile: every consent type starts denied.
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const reopen = () => setReopened(true);
    window.addEventListener(CONSENT_OPEN_EVENT, reopen);
    let timer: number | undefined;
    const show = () => { timer = window.setTimeout(() => setReady(true), 600); };
    if (document.readyState === "complete") show(); else window.addEventListener("load", show, { once: true });
    return () => { window.removeEventListener(CONSENT_OPEN_EVENT, reopen); window.removeEventListener("load", show); window.clearTimeout(timer); };
  }, []);

  function choose(next: Choice) {
    try { localStorage.setItem(CONSENT_STORAGE_KEY, next); } catch { /* the choice then only lasts for this page view */ }
    try { window.gtag?.("consent", "update", { analytics_storage: next }); } catch { /* analytics is optional */ }
    setReopened(false);
    window.dispatchEvent(new Event(CHANGED));
  }

  if (choice === "server" || (choice !== "none" && !reopened) || (choice === "none" && !ready && !reopened)) return null;
  return <div className="consent-banner" role="region" aria-label="Ustawienia cookies" data-blocks-popup>
    <p>Za Twoją zgodą używamy Google Analytics 4 (statystyki, mogą zapisywać cookies). Odmowa nie ogranicza serwisu. <Link href="/cookies">Polityka cookies</Link></p>
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
