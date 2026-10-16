"use client";

import { useEffect, useRef, useState } from "react";
import { guideAssessmentHref } from "@/lib/guides";
import { TrackedLink, trackEvent } from "./tracked-link";

const STORAGE_KEY = "exit-intent-dismissed-at";
const SNOOZE_MS = 14 * 24 * 60 * 60 * 1000;
const MIN_TIME_ON_PAGE_MS = 10_000;

function snoozed() {
  try { const at = Number(localStorage.getItem(STORAGE_KEY)); return Boolean(at) && Date.now() - at < SNOOZE_MS; } catch { return false; }
}

/** Desktop-only exit-intent offer for price pages: shown once per page view, never on touch devices, snoozed for 14 days after it is closed. */
export function ExitIntentOffer({ slug, leadSource = "OGZ-PL" }: { slug: string; leadSource?: string }) {
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const location = "exit_intent";
  const tracking = { lead_source: leadSource, cta_location: location, source_page_path: `/${slug}` };

  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches || snoozed()) return;
    const loadedAt = Date.now();
    let shown = false;
    function onLeave(event: MouseEvent) {
      if (shown || event.relatedTarget || event.clientY > 0 || Date.now() - loadedAt < MIN_TIME_ON_PAGE_MS) return;
      if (document.querySelector("dialog[open]")) return;
      shown = true;
      document.removeEventListener("mouseout", onLeave);
      setOpen(true);
    }
    document.addEventListener("mouseout", onLeave);
    return () => document.removeEventListener("mouseout", onLeave);
  }, []);

  useEffect(() => {
    if (!open) return;
    dialogRef.current?.showModal();
    trackEvent("exit_intent_shown", tracking);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    try { localStorage.setItem(STORAGE_KEY, String(Date.now())); } catch { /* snooze is a convenience only */ }
    dialogRef.current?.close();
    setOpen(false);
  }

  if (!open) return null;
  return <dialog className="case-lead-dialog exit-intent-dialog" ref={dialogRef} aria-labelledby="exit-intent-title" onCancel={close} onClick={(event) => { if (event.target === event.currentTarget) close(); }}>
    <div className="case-lead-dialog-inner">
      <button type="button" className="dialog-close" aria-label="Zamknij" onClick={close}>×</button>
      <p className="mini-label">Indywidualna wycena</p>
      <h2 id="exit-intent-title">Cennik to ceny pozycji, nie koszt całego leczenia</h2>
      <p>Opisz krótko, czego potrzebujesz. Wskażemy, jakie informacje są potrzebne do wstępnej oceny. Plan i ostateczny koszt ustala lekarz po badaniu. Nie przesyłaj dokumentacji medycznej w pierwszej wiadomości.</p>
      <div className="button-row">
        <TrackedLink href={guideAssessmentHref(`/${slug}`, location, leadSource)} event="exit_intent_cta" tracking={tracking} className="button">Poproś o wstępną wycenę</TrackedLink>
        <button type="button" className="text-link" onClick={close}>Nie, dziękuję</button>
      </div>
    </div>
  </dialog>;
}
