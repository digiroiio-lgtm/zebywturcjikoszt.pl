import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { CampaignPopup } from "@/components/campaign-popup";
import { MobileAssessmentBar } from "@/components/mobile-assessment-bar";
import { AiReferralTracker } from "@/components/ai-referral-tracker";
import { ConsentBanner } from "@/components/consent-banner";
import { CONSENT_STORAGE_KEY } from "@/lib/consent";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { SITE_NAME, SITE_URL } from "@/lib/site";
import { indexableRobots } from "@/lib/seo";
import "./globals.css";

const GA_ID = "G-CJN49C9YJJ";
/** Consent Mode v2: every storage type starts denied; a stored "granted" choice is restored before the first config call. */
const GTAG_INIT = `window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag("consent","default",{ad_storage:"denied",ad_user_data:"denied",ad_personalization:"denied",analytics_storage:"denied",wait_for_update:500});try{if(localStorage.getItem("${CONSENT_STORAGE_KEY}")==="granted")gtag("consent","update",{analytics_storage:"granted"});}catch(e){}gtag("js",new Date());gtag("config","${GA_ID}");`;

export const viewport: Viewport = { themeColor: "#fdfcfc" };

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "Leczenie zębów w Turcji – Ceny, implanty i korony", template: `%s | ${SITE_NAME}` },
  description: "Leczenie zębów w Turcji dla pacjentów z Polski: ceny, implanty, korony i licówki oraz organizacja wyjazdu do Antalyi. Klinika operatora: Akdeniz Dental.",
  robots: indexableRobots,
  openGraph: { type: "website", locale: "pl_PL", siteName: SITE_NAME, title: "Leczenie zębów w Turcji – Ceny, implanty i korony", description: "Leczenie zębów w Turcji dla pacjentów z Polski: ceny, implanty, korony i licówki oraz organizacja wyjazdu do Antalyi. Klinika operatora: Akdeniz Dental.", url: SITE_URL },
  twitter: { card: "summary_large_image", title: "Leczenie zębów w Turcji – Ceny, implanty i korony", description: "Koszty, leczenie i świadomy wybór kliniki w Turcji." },
  applicationName: SITE_NAME,
  category: "health"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return <html lang="pl-PL"><head><link rel="alternate" type="text/plain" href={`${SITE_URL}/llms-full.txt`} title="Tekst przewodników i źródeł" /><link rel="alternate" type="application/rss+xml" href={`${SITE_URL}/feed.xml`} title="Poradniki: Zęby w Turcji" /><script dangerouslySetInnerHTML={{ __html: GTAG_INIT }} /><script async src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} /></head><body><a className="skip-link" href="#main-content">Przejdź do treści</a><SiteHeader /><div id="main-content">{children}</div><SiteFooter /><MobileAssessmentBar /><CampaignPopup /><AiReferralTracker /><Analytics /><SpeedInsights /><ConsentBanner /></body></html>;
}
