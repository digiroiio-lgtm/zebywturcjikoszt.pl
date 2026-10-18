import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CampaignPopup } from "@/components/campaign-popup";
import { MobileAssessmentBar } from "@/components/mobile-assessment-bar";
import { AiReferralTracker } from "@/components/ai-referral-tracker";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { indexableRobots } from "@/lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Leczenie zębów w Turcji – Ceny, implanty i korony", template: `%s | ${SITE_NAME}` },
  description: "Poznaj ceny implantów, koron cyrkonowych i innych zabiegów w Turcji. Leczenie w klinice Akdeniz Dental w Antalyi. Zaplanuj wizytę i uzyskaj wycenę.",
  robots: indexableRobots,
  openGraph: { type: "website", locale: "pl_PL", siteName: SITE_NAME, title: "Leczenie zębów w Turcji – Ceny, implanty i korony", description: "Poznaj ceny implantów, koron cyrkonowych i innych zabiegów w Turcji. Leczenie w klinice Akdeniz Dental w Antalyi. Zaplanuj wizytę i uzyskaj wycenę.", url: SITE_URL },
  twitter: { card: "summary_large_image", title: "Leczenie zębów w Turcji – Ceny, implanty i korony", description: "Koszty, leczenie i świadomy wybór kliniki w Turcji." },
  applicationName: SITE_NAME,
  category: "health"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="pl-PL"><head><link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="Tekst przewodników i źródeł" /><link rel="alternate" type="application/rss+xml" href={`${SITE_URL}/feed.xml`} title="Poradniki: Zęby w Turcji" /></head><body><a className="skip-link" href="#main-content">Przejdź do treści</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /><MobileAssessmentBar /><CampaignPopup /><AiReferralTracker /><Analytics /><SpeedInsights /><Script src="https://www.googletagmanager.com/gtag/js?id=G-CJN49C9YJJ" strategy="afterInteractive" /><Script id="gtag-init" strategy="afterInteractive">{`window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag("js", new Date());gtag("config", "G-CJN49C9YJJ");`}</Script></body></html>;
}
