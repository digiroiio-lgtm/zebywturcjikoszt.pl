import Link from "next/link";

export function Breadcrumbs({ current }: { current: string }) {
  return <nav className="breadcrumbs" aria-label="Okruszki"><Link href="/">Strona główna</Link><span aria-hidden="true">/</span><span aria-current="page">{current}</span></nav>;
}
