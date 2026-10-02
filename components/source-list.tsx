import Link from "next/link";

export type SourceItem = { label: string; href: string };

/** Visible source list with a consistent heading. Internal links stay in the same tab. */
export function SourceList({ sources, intro, className = "content-section sources" }: { sources: SourceItem[]; intro?: string; className?: string }) {
  return <section className={className} id="zrodla">
    <h2>Źródła i podstawa informacji</h2>
    {intro && <p>{intro}</p>}
    <ul>{sources.map((source) => <li key={source.href}>{source.href.startsWith("/") ? <Link className="text-link" href={source.href}>{source.label}</Link> : <a href={source.href} target="_blank" rel="noopener noreferrer">{source.label}</a>}</li>)}</ul>
  </section>;
}
