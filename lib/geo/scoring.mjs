// Internal prioritisation model (brief §5). It ranks research candidates; it is NOT a measured patient-demand forecast.
// A component without verified input is null. A total exists only when every component has a verified input; otherwise the result is
// "yetersiz veri" with the share of weight that is covered. No keyword volume, competition or lead figure is ever generated here.
export const WEIGHTS = { demographic: 25, searchDemand: 25, commercialIntent: 20, existingOrganic: 15, logistics: 10, differentiation: 5 };
export const MODEL_LABEL = "Wewnętrzny model priorytetyzacji; nie jest zmierzoną prognozą popytu pacjentów.";

/** @param {Record<string, number | null | undefined>} inputs each 0–100 or null/undefined when no verified input exists */
export function score(inputs) {
  let covered = 0; let sum = 0; const missing = [];
  for (const [name, weight] of Object.entries(WEIGHTS)) {
    const value = inputs[name];
    if (value === null || value === undefined) { missing.push(name); continue; }
    if (!(value >= 0 && value <= 100)) throw new RangeError(`${name} must be 0–100, got ${value}`);
    covered += weight; sum += (value * weight) / 100;
  }
  const complete = missing.length === 0;
  return { total: complete ? Math.round(sum * 10) / 10 : null, status: complete ? "scored" : "yetersiz veri", coveragePercent: covered, missing, label: MODEL_LABEL };
}
