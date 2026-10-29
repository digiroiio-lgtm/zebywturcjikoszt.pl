"use client";

import { useState } from "react";

/** Text block with a copy button; the text stays visible and selectable without JavaScript. */
export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [state, setState] = useState<"idle" | "copied" | "failed">("idle");
  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setState("copied");
    } catch {
      setState("failed");
    }
    setTimeout(() => setState("idle"), 2500);
  }
  return <div className="kit-block">
    <div className="kit-block-head"><p className="mini-label">{label}</p><button type="button" className="kit-copy" onClick={copy} aria-live="polite">{state === "copied" ? "Skopiowano" : state === "failed" ? "Zaznacz i skopiuj ręcznie" : "Kopiuj"}</button></div>
    <p className="kit-text">{text}</p>
  </div>;
}
