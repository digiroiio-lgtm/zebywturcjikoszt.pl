"use client";

import { useEffect, useState } from "react";
import { activeCampaign, type Campaign } from "@/lib/campaigns";

/**
 * Pages are prerendered, so the campaign window is re-checked in the browser. The first render (server and client)
 * carries `initial`; the live check follows right after hydration, so an expired campaign never lingers until the next deploy.
 */
export function useActiveCampaign(initial: Campaign | undefined = undefined): Campaign | undefined {
  const [campaign, setCampaign] = useState(initial);
  useEffect(() => {
    const frame = requestAnimationFrame(() => setCampaign(activeCampaign()));
    return () => cancelAnimationFrame(frame);
  }, []);
  return campaign;
}
