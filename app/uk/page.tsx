import type { Metadata } from "next";
import { PageTemplate } from "@/components/page-template";
import { ukHub } from "@/lib/uk";
import { buildMetadata } from "@/lib/seo";
import { activeCampaignForPath } from "@/lib/campaigns";
import { CampaignFigure } from "@/components/campaign-figure";

export const metadata: Metadata = buildMetadata(ukHub);

export default function UkHubPage() {
  const campaign = activeCampaignForPath("/uk");
  return <>
    <PageTemplate page={ukHub} formEnabled={process.env.CONTACT_FORM_ENABLED !== "false"} />
    {campaign && <section className="shell section-space" aria-label="Oferta świąteczna dla Polaków w UK"><CampaignFigure initial={campaign} /></section>}
  </>;
}
