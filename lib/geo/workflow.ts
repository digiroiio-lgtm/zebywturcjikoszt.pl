import workflow from "@/data/geo/uk/workflow.json";
import pagesFile from "@/data/geo/uk/pages.json";
import claimsFile from "@/data/geo/uk/census-claims.json";
import { gateProblems as gate } from "./gate.mjs";
import type { CensusClaim, GeoPageRecord, Stage } from "./types";

export const STAGES = workflow.stages as Stage[];
export { claimIsPublishable } from "./gate.mjs";
const claims = claimsFile.claims as CensusClaim[];
export const gateProblems = (record: GeoPageRecord) => gate(record, workflow, claims);

/** Only fully gated, published records are visible to routes, the sitemap, llms files and internal links. */
export const publishedGeoPages: GeoPageRecord[] = (pagesFile.pages as GeoPageRecord[]).filter((record) => record.stage === "published" && gateProblems(record).length === 0);

/** Local preview of drafts: never in production and never on Vercel. */
export const geoPreviewEnabled = process.env.GEO_PREVIEW === "1" && process.env.NODE_ENV !== "production" && !process.env.VERCEL;
export const previewGeoPages: GeoPageRecord[] = geoPreviewEnabled ? (pagesFile.pages as GeoPageRecord[]).filter((record) => record.stage !== "published" && !!record.content) : [];
