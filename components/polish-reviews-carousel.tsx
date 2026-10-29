"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import type { ReviewItem } from "@/lib/trustpilot-reviews.mjs";

export function PolishReviewsCarousel({ reviews }: { reviews: ReviewItem[] }) {
  const track = useRef<HTMLUListElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const update = () => setEdges({ start: el.scrollLeft <= 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2 });
    update();
    el.addEventListener("scroll", update, { passive: true });
    const observer = new ResizeObserver(update);
    observer.observe(el);
    return () => { el.removeEventListener("scroll", update); observer.disconnect(); };
  }, []);
  const move = (direction: number) => {
    const el = track.current;
    const card = el?.querySelector<HTMLElement>(".polish-review-card");
    if (!el || !card) return;
    const gap = Number.parseFloat(getComputedStyle(el).columnGap) || 0;
    const behavior = matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
    el.scrollBy({ left: direction * (card.offsetWidth + gap), behavior });
  };
  const onKeyDown = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1); }
    if (event.key === "Home" || event.key === "End") { event.preventDefault(); track.current?.scrollTo({ left: event.key === "Home" ? 0 : track.current.scrollWidth, behavior: "auto" }); }
  };
  return <div className="polish-reviews-carousel">
    <p id="polish-reviews-help" className="polish-reviews-help">Przesuń karty lub użyj strzałek. Klawiatura: lewo/prawo, Home i End.</p>
    <ul className="polish-reviews-track" id="polish-reviews-track" ref={track} tabIndex={0} aria-label="Odnośniki do opinii napisanych po polsku" aria-describedby="polish-reviews-help" onKeyDown={onKeyDown}>
      {reviews.map((review) => <li className="polish-review-card" key={review.id}>
        <div className="polish-review-top"><span className="polish-review-stars" role="img" aria-label="Ocena autora: 5 na 5"><span aria-hidden="true">★★★★★</span></span><span className="mini-label">Trustpilot</span></div>
        <div className="polish-review-copy">{review.excerpt ? (review.excerpt.length > 160 ? <details><summary>Przeczytaj fragment opinii</summary><blockquote>{review.excerpt}</blockquote></details> : <blockquote>„{review.excerpt}”</blockquote>) : <p>Przeczytaj pełną opinię tej osoby bezpośrednio na Trustpilot.</p>}</div>
        <div className="polish-review-author"><p className="card-title">{review.author}</p><p><span className="sr-only">Data publikacji: </span><time dateTime={review.publishedAt}>{new Date(review.publishedAt).toLocaleDateString("pl-PL", { timeZone: "Europe/Warsaw" })}</time></p></div>
        <a href={review.sourceUrl} className="text-link" target="_blank" rel="noopener noreferrer">Zobacz opinię u źródła →<span className="sr-only">: {review.author} (nowa karta)</span></a>
      </li>)}
    </ul>
    <div className="polish-reviews-controls" role="group" aria-label="Przewijanie opinii"><button type="button" aria-label="Poprzednie opinie" aria-controls="polish-reviews-track" disabled={edges.start} onClick={() => move(-1)}>←</button><button type="button" aria-label="Następne opinie" aria-controls="polish-reviews-track" disabled={edges.end} onClick={() => move(1)}>→</button></div>
  </div>;
}
