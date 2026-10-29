"use client";

import { useRef, useState, type KeyboardEvent } from "react";
import { trackEvent } from "./tracked-link";

export type ShortsItem = { id: string; url: string; title: string; description: string; thumbnail?: string };

const embedSrc = (id: string) => `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&playsinline=1&rel=0&modestbranding=1`;
const thumbnailSrc = (item: ShortsItem) => item.thumbnail ?? `https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`;

function ShortCard({ item }: { item: ShortsItem }) {
  const [playing, setPlaying] = useState(false);
  const [thumbFailed, setThumbFailed] = useState(false);
  return <li className="shorts-card">
    <div className="shorts-frame">
      {playing
        ? <iframe src={embedSrc(item.id)} title={item.title} loading="lazy" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowFullScreen referrerPolicy="strict-origin-when-cross-origin" />
        : <>
          {thumbFailed
            ? <div className="shorts-fallback" aria-hidden="true" />
            // eslint-disable-next-line @next/next/no-img-element -- third-party or self-hosted thumbnail with a fixed 9:16 box; next/image would need remotePatterns and proxy YouTube images
            : <img src={thumbnailSrc(item)} alt={`Miniatura filmu: ${item.title}`} width={270} height={480} loading="lazy" decoding="async" referrerPolicy="no-referrer" onError={() => setThumbFailed(true)} />}
          <button type="button" className="shorts-play" aria-label={`Odtwórz film: ${item.title}`} onClick={() => { setPlaying(true); trackEvent("shorts_play", { cta_location: "home_shorts", topic: item.id }); }}>
            <svg viewBox="0 0 68 48" width="68" height="48" aria-hidden="true" focusable="false"><path d="M66.5 7.7A8.5 8.5 0 0 0 60.5 1.7C55.2.3 34 .3 34 .3S12.8.3 7.5 1.7A8.5 8.5 0 0 0 1.5 7.7C.1 13 .1 24 .1 24s0 11 1.4 16.3a8.5 8.5 0 0 0 6 6C12.8 47.7 34 47.7 34 47.7s21.2 0 26.5-1.4a8.5 8.5 0 0 0 6-6C67.9 35 67.9 24 67.9 24s0-11-1.4-16.3z" fill="#f00" /><path d="M45 24 27 14v20z" fill="#fff" /></svg>
          </button>
        </>}
    </div>
    <div className="shorts-caption"><p className="card-title">{item.title}</p><p>{item.description}</p><a className="text-link" href={item.url} target="_blank" rel="noopener noreferrer">Obejrzyj na YouTube<span className="sr-only"> (otwiera się w nowej karcie)</span></a></div>
  </li>;
}

/** Three columns on desktop; a native scroll-snap carousel below 760px. No iframe exists until the visitor presses Play. */
export function YouTubeShortsCarousel({ videos, label }: { videos: ShortsItem[]; label: string }) {
  const track = useRef<HTMLUListElement>(null);
  const move = (direction: 1 | -1) => {
    const el = track.current; const card = el?.querySelector<HTMLElement>(".shorts-card");
    if (el && card) el.scrollBy({ left: direction * (card.offsetWidth + 16), behavior: "smooth" });
  };
  const onKey = (event: KeyboardEvent<HTMLUListElement>) => {
    if (event.target !== event.currentTarget) return;
    if (event.key === "ArrowRight") { event.preventDefault(); move(1); }
    if (event.key === "ArrowLeft") { event.preventDefault(); move(-1); }
  };
  return <div className="shorts-carousel">
    <ul className="shorts-track" ref={track} tabIndex={0} aria-label={label} onKeyDown={onKey}>{videos.map((item) => <ShortCard item={item} key={item.id} />)}</ul>
    {videos.length > 1 && <div className="shorts-nav"><button type="button" onClick={() => move(-1)} aria-label="Poprzednie filmy">←</button><button type="button" onClick={() => move(1)} aria-label="Następne filmy">→</button></div>}
  </div>;
}
