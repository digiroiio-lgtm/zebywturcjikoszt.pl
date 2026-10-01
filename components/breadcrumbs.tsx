import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return <nav className="breadcrumbs" aria-label="Okruszki"><ol style={{ display: "contents", listStyle: "none", margin: 0, padding: 0 }}><li style={{ display: "contents" }}><Link href="/">Strona główna</Link></li><li style={{ display: "contents" }}><span aria-hidden="true">/</span><span aria-current="page">{current}</span></li></ol></nav>;
}
