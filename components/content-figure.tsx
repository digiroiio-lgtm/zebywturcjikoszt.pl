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
  return <figure className={`content-figure content-figure-${figure.kind}`}>
    <Image src={figure.src} alt={figure.alt} width={figure.width} height={figure.height} sizes="(max-width: 760px) 100vw, 720px" loading="lazy" />
    <figcaption>{figure.caption}</figcaption>
  </figure>;
}
