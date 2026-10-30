"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { activeCampaignForPath } from "@/lib/campaigns";
import { LEAD_ENGAGED_KEY, POPUP_DISMISSED_KEY, POPUP_SECONDS_KEY, POPUP_SHOWN_KEY, storeCampaign } from "@/lib/campaign-state";
import { trackEvent } from "./tracked-link";

const MIN_SECONDS = 20;
const MIN_SCROLL = 0.35;
const SNOOZE_MS = 7 * 24 * 60 * 60 * 1000;
const EXCLUDED = ["/kontakt", "/cookies", "/polityka-prywatnosci", "/regulamin", "/reklamacje"];
const LOCATION = "campaign_popup";

function read(storage: "session" | "local", key: string) {
  try { return (storage === "session" ? sessionStorage : localStorage).getItem(key); } catch { return null; }
}
function write(storage: "session" | "local", key: string, value: string) {
  try { (storage === "session" ? sessionStorage : localStorage).setItem(key, value); } catch { /* the popup then simply follows the in-memory state */ }
}
function snoozed() {
  const at = Number(read("local", POPUP_DISMISSED_KEY));
  return Boolean(at) && Date.now() - at < SNOOZE_MS;
}

/**
 * Campaign popup, shown only on pages of the campaign's audience (the Christmas offer is priced in GBP: /uk pages). Opens once per session when the visitor has spent 20 s (counted across client-side
 * navigation, visible tab only) AND reached 35 % of the current page; either may happen first, never on load.
 * Waits while another dialog is open; stays away once the lead form was started or sent, and for 7 days after closing.
 */
export function CampaignPopup() {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const returnFocus = useRef<HTMLElement | null>(null);
  const openRef = useRef(false);
  const campaign = activeCampaignForPath(pathname);

  useEffect(() => {
    if (!campaign || EXCLUDED.includes(pathname)) return;
    let maxScroll = 0;
    let seconds = Number(read("session", POPUP_SECONDS_KEY)) || 0;
    let engaged = read("session", LEAD_ENGAGED_KEY) === "1";
    let preloaded = false;
    const onStarted = () => { engaged = true; };
    const measure = () => {
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollable > 0) maxScroll = Math.max(maxScroll, window.scrollY / scrollable);
    };
    const check = () => {
      if (openRef.current || engaged || read("session", POPUP_SHOWN_KEY) || snoozed()) return;
      if (seconds < MIN_SECONDS || maxScroll < MIN_SCROLL) return;
      // Another modal (or a cookie notice, if one is added) is on screen: keep waiting and re-check on the next tick.
      if (document.querySelector("dialog[open], [data-blocks-popup]")) return;
      write("session", POPUP_SHOWN_KEY, "1");
      returnFocus.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      openRef.current = true;
      setOpen(true);
    };
    const tick = window.setInterval(() => {
      if (document.visibilityState !== "visible") return;
      seconds += 1;
      write("session", POPUP_SECONDS_KEY, String(seconds));
      // Warm the image shortly before it can be needed so opening never waits on the network.
      if (!preloaded && seconds >= MIN_SECONDS - 8 && campaign) { preloaded = true; const img = new Image(); img.src = campaign.popup.imageWebp; }
      measure();
      check();
    }, 1000);
    const onScroll = () => { measure(); check(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("lead-form:started", onStarted);
    return () => { window.clearInterval(tick); window.removeEventListener("scroll", onScroll); window.removeEventListener("lead-form:started", onStarted); };
  }, [pathname, campaign]);

  useEffect(() => {
    if (!open || !campaign) return;
    dialogRef.current?.showModal();
    trackEvent("campaign_popup_shown", { cta_location: LOCATION, campaign: campaign.name });
  }, [open, campaign]);

  const finish = useCallback((restoreFocus: boolean) => {
    dialogRef.current?.close();
    openRef.current = false;
    setOpen(false);
    if (restoreFocus) { const target = returnFocus.current; if (target && document.contains(target)) target.focus(); }
  }, []);

  if (!open || !campaign) return null;
  const { popup } = campaign;

  function dismiss() {
    write("local", POPUP_DISMISSED_KEY, String(Date.now()));
    trackEvent("campaign_popup_dismiss", { cta_location: LOCATION, campaign: campaign!.name });
    finish(true);
  }
  function accept() {
    trackEvent("campaign_popup_cta_click", { cta_location: LOCATION, button_location: LOCATION, campaign: campaign!.name });
    finish(false);
    const target = document.getElementById("home-lead-form") ?? document.getElementById("assessment-form");
    if (target) {
      window.dispatchEvent(new CustomEvent("lead-form:topic", { detail: { topic: popup.topic, cta_location: LOCATION, campaign: campaign!.name } }));
      target.scrollIntoView({ behavior: "smooth", block: "start" });
      window.setTimeout(() => target.querySelector<HTMLElement>("input[name='name']")?.focus({ preventScroll: true }), 400);
    } else {
      storeCampaign({ name: campaign!.name, cta_location: LOCATION, page_path: window.location.pathname });
      router.push("/kontakt#assessment-form");
    }
  }

  return <dialog className="campaign-dialog" ref={dialogRef} aria-labelledby="campaign-popup-title" onCancel={(event) => { event.preventDefault(); dismiss(); }} onClick={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
    <div className="campaign-dialog-inner">
      <button type="button" className="dialog-close" aria-label="Zamknij okno z ofertą" onClick={dismiss}>×</button>
      <picture className="campaign-dialog-photo">
        <source srcSet={popup.imageAvif} type="image/avif" />
        <img src={popup.imageWebp} alt={campaign.imageAlt} width={560} height={748} decoding="async" />
      </picture>
      <div className="campaign-dialog-copy">
        <p className="mini-label">{popup.eyebrow}</p>
        <h2 id="campaign-popup-title">{popup.title}</h2>
        <p className="campaign-tagline">{popup.tagline}</p>
        <p className="campaign-offer"><strong>{popup.offer}</strong><span>{popup.detail}</span></p>
        <p className="campaign-price">{popup.price}</p>
        <p className="campaign-includes-title">{popup.includesTitle}</p>
        <ul className="campaign-includes">{popup.includes.map((item) => <li key={item}>✓ {item}</li>)}</ul>
        <p className="campaign-clinic">{popup.clinic}</p>
        <button type="button" className="button campaign-cta" autoFocus onClick={accept}>{popup.cta}</button>
        <p className="campaign-note-small">{popup.note}</p>
      </div>
    </div>
  </dialog>;
}
