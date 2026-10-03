import type { Metadata } from "next";
import { PageTemplate } from "@/components/page-template";
import { ukHub } from "@/lib/uk";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata(ukHub);

export default function UkHubPage() {
  return <PageTemplate page={ukHub} formEnabled={process.env.CONTACT_FORM_ENABLED !== "false"} />;
}
