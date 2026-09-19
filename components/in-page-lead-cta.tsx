"use client";

import { useRef } from "react";
import { LeadForm } from "./lead-form";
import { trackEvent } from "./tracked-link";

export function InPageLeadCta({ title, text, buttonLabel, location, caseReference, formEnabled, final = false }: { title: string; text: string; buttonLabel: string; location: string; caseReference?: string; formEnabled: boolean; final?: boolean }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const tracking = { lead_source: "OGZ-PL", cta_location: location, case_reference: caseReference ?? "", source_page_path: "/przed-i-po" };

  function openForm() {
    trackEvent("visual_assessment_cta", tracking);
    dialogRef.current?.showModal();
  }

  return <>
    <aside className={`case-cta${final ? " case-cta-final" : ""}`}>
      <div><p className="mini-label">Indywidualna ocena</p><h3>{title}</h3><p>{text}</p></div>
      <button type="button" className="button" onClick={openForm}>{buttonLabel}</button>
    </aside>
    <dialog className="case-lead-dialog" ref={dialogRef} aria-labelledby={`${location}-dialog-title`} onClick={(event) => { if (event.target === event.currentTarget) dialogRef.current?.close(); }}>
      <div className="case-lead-dialog-inner">
        <button type="button" className="dialog-close" aria-label="Zamknij formularz" onClick={() => dialogRef.current?.close()}>×</button>
        <p className="mini-label">OGZ-PL · Wstępna ocena</p>
        <h2 id={`${location}-dialog-title`}>Opisz krótko swoją sytuację</h2>
        <p className="dialog-intro">Przekaż podstawowe informacje. Nie przesyłaj dokumentacji medycznej przez niepotwierdzony kanał.</p>
        <LeadForm enabled={formEnabled} context={{ leadSource: "OGZ-PL", ctaLocation: location, sourcePagePath: "/przed-i-po", caseReference }} />
      </div>
    </dialog>
  </>;
}
