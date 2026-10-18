import { SITE_NAME, SITE_URL } from "@/lib/site";
import { clinicSchema } from "@/lib/seo";

const websiteNode = {
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  name: SITE_NAME,
  url: SITE_URL,
  inLanguage: "pl-PL",
  publisher: { "@id": `${SITE_URL}/#organization` }
};

const organizationNode = {
  "@type": "Organization",
  "@id": `${SITE_URL}/#organization`,
  name: "Redakcja serwisu Zęby w Turcji",
  url: SITE_URL,
  logo: { "@type": "ImageObject", url: `${SITE_URL}/apple-icon`, width: 180, height: 180 },
  sameAs: ["https://akdenizdental.com"],
  parentOrganization: { "@id": clinicSchema["@id"] },
  areaServed: { "@type": "Country", name: "Polska" },
  knowsAbout: ["Leczenie zębów w Turcji", "Implanty zębowe", "Korony cyrkonowe", "Licówki", "All-on-4"]
};

/** Full entity definitions: WebSite, Organization and the clinic. Rendered once on the home page and on /kontakt. */
export const fullEntityGraph = { "@context": "https://schema.org", "@graph": [websiteNode, organizationNode, clinicSchema] };

/** Compact references so every other page stays self-consistent while the full definitions live on the home page. */
export const entityReferenceGraph = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "WebSite", "@id": websiteNode["@id"], name: SITE_NAME, url: SITE_URL },
    { "@type": "Organization", "@id": organizationNode["@id"], name: organizationNode.name, url: SITE_URL },
    { "@type": clinicSchema["@type"], "@id": clinicSchema["@id"], name: clinicSchema.name, url: clinicSchema.url }
  ]
};

/** `omitClinic` is for pages that define the clinic themselves (/nasi-lekarze). `full` on the home page and /kontakt (hours and languages must stay machine readable there); `reference` elsewhere. */
export function EntitySchema({ mode = "reference", omitClinic = false }: { mode?: "full" | "reference"; omitClinic?: boolean }) {
  const graph = mode === "full" ? fullEntityGraph : omitClinic ? { ...entityReferenceGraph, "@graph": entityReferenceGraph["@graph"].slice(0, 2) } : entityReferenceGraph;
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }} />;
}
