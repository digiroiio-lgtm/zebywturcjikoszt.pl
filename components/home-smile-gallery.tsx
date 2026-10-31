"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { SECTION_CTA } from "@/lib/cta";
import { SMILE_GALLERY_HEIGHT, SMILE_GALLERY_INSTAGRAM_URL, SMILE_GALLERY_WIDTH, smileGalleryImages } from "@/lib/smile-gallery";
import { SectionCta } from "./section-cta";
import { trackEvent } from "./tracked-link";

/**
 * Five vertical Instagram screenshots side by side. On wide screens all five fit in one row; on narrower ones the row scrolls
 * (native scroll-snap, arrows for mouse users). The track is a keyboard stop only while it actually scrolls.
 */
export function HomeSmileGallery() {
  const track = useRef<HTMLUListElement>(null);
  const [scrollable, setScrollable] = useState(false);
  const measure = useCallback(() => {
    const el = track.current;
    setScrollable(Boolean(el) && el!.scrollWidth > el!.clientWidth + 1);
  }, []);
  useEffect(() => {
    measure();
    const el = track.current;
    if (!el || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(measure);
    observer.observe(el);
    return () => observer.disconnect();
  }, [measure]);
  const move = (direction: 1 | -1) => {
    const el = track.current; const card = el?.querySelector<HTMLElement>("li");
    if (el && card) el.scrollBy({ left: direction * (card.offsetWidth + 14) * 2, behavior: "smooth" });
  };
  const onKey = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  };
  return <section className="shell section-space home-smile-gallery" aria-labelledby="home-smile-gallery-title" data-scrollable={scrollable ? "true" : undefined}>
    <div className="section-heading">
      <div><p className="eyebrow">Smile Gallery · Akdeniz Dental</p><h2 id="home-smile-gallery-title">Galeria uśmiechów pacjentów</h2></div>
      <p>Tak wygląda profil kliniki na Instagramie: metamorfozy uśmiechu przed i po oraz pacjenci tuż po zakończeniu leczenia. Pacjenci wyrazili zgodę na publikację swoich zdjęć w mediach społecznościowych kliniki.</p>
    </div>
    <div className="smile-gallery-stage">
      <button type="button" className="home-gallery-arrow home-gallery-prev smile-gallery-arrow" aria-label="Poprzednie zdjęcia" onClick={() => move(-1)}><span aria-hidden="true">‹</span></button>
      <ul className="smile-gallery-track" ref={track} {...(scrollable ? { tabIndex: 0, role: "region", "aria-label": "Galeria uśmiechów pacjentów, przewijana poziomo" } : {})} onKeyDown={onKey}>
        {smileGalleryImages.map((image) => <li key={image.n}>
          <Image src={`/images/smile-galeria/smile-gallery-${image.n}.webp`} alt={image.alt} width={SMILE_GALLERY_WIDTH} height={SMILE_GALLERY_HEIGHT} sizes="(max-width: 760px) 62vw, (max-width: 1100px) 30vw, 224px" loading="lazy" unoptimized />
        </li>)}
      </ul>
      <button type="button" className="home-gallery-arrow home-gallery-next smile-gallery-arrow" aria-label="Następne zdjęcia" onClick={() => move(1)}><span aria-hidden="true">›</span></button>
    </div>
    <div className="smile-gallery-foot">
      <SectionCta location="home_smile_gallery" event="home_smile_gallery_cta">{SECTION_CTA.visualProof}</SectionCta>
      {SMILE_GALLERY_INSTAGRAM_URL && <a className="text-link" href={SMILE_GALLERY_INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" aria-label="Zobacz profil kliniki na Instagramie (otwiera się w nowej karcie)" onClick={() => trackEvent("home_smile_gallery_instagram_click", { cta_location: "home_smile_gallery" })}>Zobacz profil kliniki na Instagramie →</a>}
    </div>
    <p className="microcopy">Efekty leczenia są indywidualne, a zdjęcia nie gwarantują takiego samego rezultatu. Plan leczenia ustala lekarz po badaniu i diagnostyce.</p>
  </section>;
}
