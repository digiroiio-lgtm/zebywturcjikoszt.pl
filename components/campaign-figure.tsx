"use client";

import Image from "next/image";
import type { Campaign } from "@/lib/campaigns";
import { useActiveCampaign } from "./use-active-campaign";

/** Home-page campaign photo; prerendered while the campaign is live and removed in the browser once it ends. */
export function CampaignFigure({ initial }: { initial: Campaign }) {
  const campaign = useActiveCampaign(initial);
  if (!campaign) return null;
  return <figure className="home-campaign"><Image src={campaign.image} alt={campaign.imageAlt} width={800} height={1069} sizes="(max-width: 760px) 220px, 260px" loading="lazy" unoptimized /><figcaption>{campaign.name}</figcaption></figure>;
}
