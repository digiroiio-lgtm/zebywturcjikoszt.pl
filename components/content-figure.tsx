import Image from "next/image";

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
  // Precompressed WebP photos are already below 100 KB. Serve them directly:
  // the optimizer can otherwise re-encode them as larger JPEGs for crawlers.
  const precompressed = figure.src.endsWith(".webp");
  return <figure className={`content-figure content-figure-${figure.kind}`}>
    <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} unoptimized={precompressed} sizes="(max-width: 760px) calc(100vw - 28px), (max-width: 1150px) calc(100vw - 40px), (max-width: 1220px) calc(100vw - 390px), 830px" loading="lazy" />
    <figcaption>{figure.caption}</figcaption>
  </figure>;
}
