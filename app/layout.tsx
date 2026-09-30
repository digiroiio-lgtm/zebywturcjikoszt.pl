import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { MobileAssessmentBar } from "@/components/mobile-assessment-bar";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Leczenie zębów w Turcji – Ceny, implanty i korony", template: `%s | ${SITE_NAME}` },
  description: "Poznaj ceny implantów, koron cyrkonowych i innych zabiegów w Turcji. Leczenie w klinice Akdeniz Dental w Antalyi. Zaplanuj wizytę i uzyskaj wycenę.",
  robots: { index: true, follow: true },
  openGraph: { type: "website", locale: "pl_PL", siteName: SITE_NAME, title: "Leczenie zębów w Turcji – Ceny, implanty i korony", description: "Poznaj ceny implantów, koron cyrkonowych i innych zabiegów w Turcji. Leczenie w klinice Akdeniz Dental w Antalyi. Zaplanuj wizytę i uzyskaj wycenę.", url: SITE_URL },
  twitter: { card: "summary", title: "Zęby w Turcji", description: "Koszty, leczenie i świadomy wybór kliniki w Turcji." }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "pl-PL"
  };
  const organizationSchema = { "@context": "https://schema.org", "@type": "Organization", "@id": `${SITE_URL}/#organization`, name: "Redakcja serwisu Zęby w Turcji", url: SITE_URL };
  return <html lang="pl-PL"><body><a className="skip-link" href="#main-content">Przejdź do treści</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /><MobileAssessmentBar /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} /></body></html>;
}
