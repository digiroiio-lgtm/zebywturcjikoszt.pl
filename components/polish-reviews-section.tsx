import { SectionCta } from "./section-cta";
import { TrackedLink } from "./tracked-link";
import { PRIMARY_CTA } from "@/lib/cta";
import config from "@/data/trustpilot-reviews.json";
import { sourceVerifiedReviews } from "@/lib/trustpilot-reviews.mjs";
import { PolishReviewsCarousel } from "./polish-reviews-carousel";

/** `embedded` renders inside an article column (no outer .shell) with its own heading id and wording, so the page keeps a single h2 per topic. */
export function PolishReviewsSection({ embedded = false }: { embedded?: boolean }) {
  const reviews = sourceVerifiedReviews(config);
  if (!reviews.length) return null;
  const headingId = embedded ? "opinie-polish-reviews-title" : "polish-reviews-title";
  return <section className={embedded ? "home-polish-reviews polish-reviews-embedded" : "shell home-polish-reviews"} aria-labelledby={headingId}>
    <div className="section-heading"><div><p className="eyebrow">Opinie pacjentów · Akdeniz Dental</p><h2 id={headingId}>{embedded ? "Opinie pacjentów po polsku z Trustpilot" : "Opinie napisane po polsku"}</h2></div><p>Wybraliśmy pozytywne opinie w języku polskim. Przeczytaj także opinie krytyczne i pełne wypowiedzi na zewnętrznym profilu kliniki.</p></div>
    <PolishReviewsCarousel reviews={reviews} />
    <p className="polish-reviews-cta">{embedded ? <TrackedLink href="/kontakt" event="opinie_reviews_cta" tracking={{ cta_location: "opinie_reviews" }} className="button">{PRIMARY_CTA}</TrackedLink> : <SectionCta location="home_reviews">{PRIMARY_CTA}</SectionCta>}</p>
    <div className="polish-reviews-footer"><p>Opinie opisują indywidualne doświadczenia i nie gwarantują wyniku leczenia. Sprawdziliśmy publikację u źródła, nie przebieg leczenia. Odczyt źródeł: 17.10.2026.</p><a className="text-link" href="https://pl.trustpilot.com/review/akdenizdental.com" target="_blank" rel="noopener noreferrer">Zobacz wszystkie opinie na Trustpilot →<span className="sr-only"> (nowa karta)</span></a></div>
  </section>;
}
