/**
 * Legal operator of the site. The operator confirmed it is the same company as the partner clinic.
 * Fill a field ONLY with a value verified from an official document (MERSIS / Trade Registry Gazette / tax certificate).
 * Empty fields are never rendered or added to structured data.
 */
export type OperatorDetails = {
  legalName?: string;
  streetAddress?: string;
  postalCode?: string;
  locality?: string;
  region?: string;
  country?: string;
  phone?: string;
  email?: string;
  taxId?: string;
  mersisNo?: string;
};

// Tax and MERSIS numbers are intentionally left empty until verified from an official document (they could not be
// confirmed from a public registry). Phone and e-mail were confirmed by the operator. Address follows the form shown
// in Google Maps and Trustpilot. Licences and authorisations live in lib/credentials.ts.
export const OPERATOR: OperatorDetails = {
  legalName: "DENT AKDENİZ AĞIZ VE DİŞ SAĞLIĞI HİZMETLERİ LİMİTED ŞİRKETİ",
  streetAddress: "Çaybaşı, 1358. Sk. Premier Plaza D:1 B Blok",
  postalCode: "07100",
  locality: "Muratpaşa",
  region: "Antalya",
  country: "Turcja",
  phone: "+90 541 248 35 62",
  email: "info@akdenizdental.com"
};

export const operatorIsPublished = Boolean(OPERATOR.legalName);

/** One-sentence disclosure used in the footer, llms.txt and FAQ answers. */
export const OPERATOR_DISCLOSURE = OPERATOR.legalName
  ? `Serwis prowadzi spółka ${OPERATOR.legalName}, która prowadzi także klinikę Akdeniz Dental w Antalyi.`
  : "";

export function operatorRows(operator: OperatorDetails = OPERATOR, includeContact = true): { label: string; value: string }[] {
  const address = [operator.streetAddress, [operator.postalCode, operator.locality].filter(Boolean).join(" "), operator.region, operator.country].filter(Boolean).join(", ");
  return [
    { label: "Nazwa prawna", value: operator.legalName },
    { label: "Adres", value: address },
    { label: "Telefon", value: includeContact ? operator.phone : undefined },
    { label: "E-mail", value: includeContact ? operator.email : undefined },
    { label: "Numer podatkowy", value: operator.taxId },
    { label: "Numer MERSIS", value: operator.mersisNo }
  ].filter((row): row is { label: string; value: string } => Boolean(row.value));
}

/** Extra schema.org properties for the clinic/operator entity; empty when nothing is verified. */
export function operatorSchemaFields(operator: OperatorDetails = OPERATOR) {
  return {
    ...(operator.legalName ? { legalName: operator.legalName } : {}),
    ...(operator.phone ? { telephone: operator.phone } : {}),
    ...(operator.email ? { email: operator.email } : {}),
    ...(operator.taxId ? { taxID: operator.taxId } : {}),
    ...(operator.mersisNo ? { identifier: { "@type": "PropertyValue", propertyID: "MERSIS", value: operator.mersisNo } } : {})
  };
}
