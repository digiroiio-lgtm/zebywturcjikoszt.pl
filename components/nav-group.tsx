"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import type { NavLink } from "@/lib/site";

/** Desktop dropdown built on <details>: keyboard and screen-reader semantics come from the platform; this only adds Escape, outside click and close-on-navigation. */
export function NavGroup({ label, items }: { label: string; items: NavLink[] }) {
  const pathname = usePathname();
  const group = useRef<HTMLDetailsElement>(null);
  useEffect(() => { group.current?.removeAttribute("open"); }, [pathname]);
  useEffect(() => {
    const close = (event: Event) => { if (group.current?.open && !group.current.contains(event.target as Node)) group.current.removeAttribute("open"); };
    const escape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && group.current?.open) { group.current.removeAttribute("open"); group.current.querySelector("summary")?.focus(); }
    };
    document.addEventListener("click", close);
    document.addEventListener("keydown", escape);
    return () => { document.removeEventListener("click", close); document.removeEventListener("keydown", escape); };
  }, []);
  const active = items.some((item) => pathname === item.href);
  return (
    <details className="nav-group" ref={group}>
      <summary data-active={active ? "true" : undefined}>{label}</summary>
      <div className="nav-group-menu">{items.map((item) => <Link key={item.href} href={item.href}>{item.label}</Link>)}</div>
    </details>
  );
}
