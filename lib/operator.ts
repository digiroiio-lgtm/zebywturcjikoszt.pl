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

export const OPERATOR: OperatorDetails = {};

export const operatorIsPublished = Boolean(OPERATOR.legalName);

export function operatorRows(operator: OperatorDetails = OPERATOR): { label: string; value: string }[] {
  const address = [operator.streetAddress, [operator.postalCode, operator.locality].filter(Boolean).join(" "), operator.region, operator.country].filter(Boolean).join(", ");
  return [
    { label: "Nazwa prawna", value: operator.legalName },
    { label: "Adres", value: address },
    { label: "Telefon", value: operator.phone },
    { label: "E-mail", value: operator.email },
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
    ...(operator.taxId ? { taxID: operator.taxId } : {})
  };
}
