import { OPERATOR, operatorIsPublished, operatorRows } from "@/lib/operator";

/** Renders nothing until the operator's legal name has been verified and entered in lib/operator.ts. */
export function OperatorDetails({ showContact = true }: { showContact?: boolean }) {
  if (!operatorIsPublished) return null;
  return <section className="content-section" id="operator">
    <h2>Dane operatora serwisu</h2>
    <dl>{operatorRows(OPERATOR, showContact).map((row) => <div key={row.label}><dt>{row.label}</dt><dd>{row.value}</dd></div>)}</dl>
  </section>;
}
