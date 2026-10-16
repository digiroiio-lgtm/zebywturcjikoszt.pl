import Link from "next/link";
import { OPERATOR_DISCLOSURE } from "@/lib/operator";

/** The one-line commercial-ownership disclosure shown under the hero of content pages (same markup as page-template.tsx). */
export function CommercialNote() {
  if (!OPERATOR_DISCLOSURE) return null;
  return <p className="commercial-note"><strong>Informacja komercyjna.</strong> {OPERATOR_DISCLOSURE} <Link href="/wlasciciel-serwisu">Właściciel serwisu</Link></p>;
}
