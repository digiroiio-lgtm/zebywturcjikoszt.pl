import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Zęby w Turcji – koszt i leczenie w Antalyi", template: `%s | ${SITE_NAME}` },
  description: "Rzetelny przewodnik po leczeniu zębów w Turcji: koszty, implanty, licówki, pełna odbudowa i plan wyjazdu do Antalyi.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", locale: "pl_PL", siteName: SITE_NAME, title: "Zęby w Turcji – koszt i leczenie w Antalyi", description: "Sprawdź możliwości leczenia, koszty i zasady bezpiecznego wyboru kliniki.", url: SITE_URL },
  twitter: { card: "summary", title: "Zęby w Turcji", description: "Koszty, leczenie i świadomy wybór kliniki w Turcji." }
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  const websiteSchema = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: SITE_URL, inLanguage: "pl-PL" };
  return <html lang="pl-PL"><body><a className="skip-link" href="#main-content">Przejdź do treści</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} /></body></html>;
}
