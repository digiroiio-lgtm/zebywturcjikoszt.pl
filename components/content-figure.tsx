import { getImageProps } from "next/image";

export type ContentFigureData = {
  /** H2 title of the section after which the figure is rendered. */
  after: string;
  src: string;
  alt: string;
  width: number;
  height: number;
  caption: string;
  kind: "photo" | "diagram";
};

/** Editorial figure placed between sections. Lazy by design: never the LCP element. */
export function ContentFigure({ figure }: { figure: ContentFigureData }) {
  // WebP photos are precompressed below 100KB; serve them directly to avoid
  // recompression to a larger JPEG for clients without an image Accept header.
  const { props } = getImageProps({ src: figure.src, alt: figure.alt, width: figure.width, height: figure.height, sizes: "(max-width: 760px) calc(100vw - 28px), 720px", loading: "lazy", unoptimized: figure.src.endsWith(".webp") });
  // Next's default responsive candidates reach 3840px. Keep optimized variants
  // within the source resolution instead of upscaling these editorial photos.
  const candidates = props.srcSet?.split(", ").filter((candidate) => Number(candidate.match(/ (\d+)w$/)?.[1]) <= figure.width);
  const srcSet = candidates?.length ? candidates.join(", ") : props.srcSet;
  const src = candidates?.length ? candidates[candidates.length - 1].replace(/ \d+w$/, "") : props.src;
  return <figure className={`content-figure content-figure-${figure.kind}`}>
    {/* eslint-disable-next-line @next/next/no-img-element -- retains Next-optimized props with candidates capped to the source resolution */}
    <img {...props} alt={figure.alt} src={src} srcSet={srcSet} />
    <figcaption>{figure.caption}</figcaption>
  </figure>;
}
