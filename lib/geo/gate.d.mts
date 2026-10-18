import type { CensusClaim, GeoPageRecord } from "./types";
export function claimIsPublishable(claim: CensusClaim | undefined): boolean;
export function gateProblems(record: GeoPageRecord, workflow: { stages: string[]; requiredBefore: Record<string, string[]>; waivable?: string[] }, claims: CensusClaim[]): string[];
