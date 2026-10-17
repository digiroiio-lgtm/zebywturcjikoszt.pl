"use client";

import Image from "next/image";
import { useRef, type KeyboardEvent } from "react";
import { magdelenaPhotos } from "@/lib/magdelena-gallery";
import { SectionCta } from "./section-cta";

/** Single horizontal strip of vertical photos under the header. Native scroll-snap, no auto-scroll; arrows on desktop. */
export function HomeMagdelenaGallery() {
  const track = useRef<HTMLUListElement>(null);
  const move = (direction: 1 | -1) => {
    const el = track.current; const card = el?.querySelector<HTMLElement>("li");
    if (el && card) el.scrollBy({ left: direction * (card.offsetWidth + 14) * 3, behavior: "smooth" });
  };
  const onKey = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  };
  return <section className="home-gallery" aria-labelledby="home-gallery-title">
    <div className="shell">
      <div className="home-gallery-head">
        <div><p className="eyebrow">Akdeniz Dental · Antalya</p><h2 id="home-gallery-title">Uśmiech, który przyciąga spojrzenia.</h2></div>
        <p>Zainspiruj się sesją MAGDELENY i poznaj możliwości dla swojego uśmiechu.</p>
      </div>
      <div className="home-gallery-stage">
        <button type="button" className="home-gallery-arrow home-gallery-prev" aria-label="Poprzednie zdjęcia" onClick={() => move(-1)}><span aria-hidden="true">‹</span></button>
        <ul className="home-gallery-track" ref={track} tabIndex={0} aria-label="Zdjęcia MAGDELENY, przewijane poziomo" onKeyDown={onKey}>
          {magdelenaPhotos.map((photo, index) => <li key={photo.n}>
            <Image src={`/images/magdelena/magdelena-${photo.n}.webp`} alt={photo.alt} width={720} height={1063} sizes="(max-width: 760px) 132px, 216px" style={{ objectPosition: photo.position }} priority={index < 6} loading={index < 6 ? undefined : "lazy"} />
          </li>)}
        </ul>
        <button type="button" className="home-gallery-arrow home-gallery-next" aria-label="Następne zdjęcia" onClick={() => move(1)}><span aria-hidden="true">›</span></button>
      </div>
      <div className="home-gallery-foot">
        <SectionCta location="home_gallery" event="home_gallery_cta">Poproś o bezpłatną wstępną ocenę</SectionCta>
        <p>Sesja promocyjna z udziałem modelki MAGDELENY.</p>
      </div>
    </div>
  </section>;
}
