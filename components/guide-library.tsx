"use client";
import { useState } from "react";
import { TrackedLink, trackEvent } from "./tracked-link";
export type GuideCardView = { category: string; href: string; title: string; description: string; updated: string; review: string; number: number };
export function GuideLibrary({ cards, categories }: { cards: GuideCardView[]; categories: { id: string; label: string }[] }) {
  const [category, setCategory] = useState("all");
  const visibleCount = cards.filter((card) => category === "all" || card.category === category).length;
  return <section id="guide-library" className="shell section-space">
    <h2>Wybierz poradnik dla siebie</h2>
    <nav className="guide-filters" aria-label="Kategorie poradników">{[{ id: "all", label: "Wszystkie poradniki" }, ...categories].map((item) => <a key={item.id} href={item.id === "all" ? "#guide-library" : `#guides-${item.id}`} aria-current={category === item.id ? "true" : undefined} onClick={(event) => { event.preventDefault(); setCategory(item.id); trackEvent("guide_category_filter", { category: item.id }); }}>{item.label}</a>)}</nav>
    <p role="status" aria-live="polite">Poradniki: {visibleCount} z {cards.length}</p>
    {categories.map((group) => <section key={group.id} id={`guides-${group.id}`} className="guide-category" hidden={category !== "all" && category !== group.id}><h3>{group.label}</h3><div className="guide-card-grid">{cards.filter((card) => card.category === group.id).map((card) => <article className="info-card guide-card" key={card.href}><p className="mini-label">{String(card.number).padStart(2, "0")} · {group.label}</p><h4>{card.title}</h4><p>{card.description}</p><p className="guide-card-meta">Aktualizacja: <time dateTime={card.updated}>{new Intl.DateTimeFormat("pl-PL", { day: "numeric", month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${card.updated}T00:00:00Z`))}</time><br />{card.review}</p><TrackedLink href={`${card.href}?guide_source=%2Fporadniki`} event={card.href === "/koszt" ? "guide_to_pricing" : ["/implanty", "/korony-cyrkonowe", "/licowki", "/cala-szczeka", "/all-on-4"].includes(card.href) ? "guide_to_treatment" : "guide_open"} tracking={{ guide_source: "/poradniki", destination_path: card.href, category: group.id }} className="text-link">Przeczytaj poradnik →</TrackedLink></article>)}</div></section>)}
  </section>;
}
