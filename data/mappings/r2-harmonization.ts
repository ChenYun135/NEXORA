import type { GeographyLevel } from "../../domain/research-data.ts";

export const canonicalGeographyArchitecture = {
  version: "2.0.0",
  levels: ["STATE", "COUNTY", "CBSA", "CITY", "INSTITUTION"] as GeographyLevel[],
  identifiers: {
    STATE: "USPS + Census state FIPS",
    COUNTY: "Census state FIPS + county FIPS",
    CBSA: "OMB CBSA code with vintage",
    CITY: "Census place FIPS when available; source label retained",
    INSTITUTION: "OpenAlex ID + ROR; NCSES/IPEDS IDs retained separately",
  },
  rules: [
    "Never infer headquarters geography for a source-record event",
    "Retain the original geography and crosswalk vintage",
    "Do not merge low-confidence institution or company matches",
  ],
} as const;

export const commonTechnologyTaxonomy = {
  version: "2.0.0",
  domains: ["AI", "SEMICONDUCTORS", "QUANTUM", "ADVANCED_MANUFACTURING", "BIOTECHNOLOGY", "CLEAN_ENERGY", "ADVANCED_MATERIALS", "ROBOTICS", "CYBERSECURITY"],
  mappingStates: ["DIRECT", "MAPPED", "PROXY", "UNMAPPED"],
  warning: "OpenAlex topics, NSF programs, SBIR topics, CPC classes and policy subjects are distinct source concepts.",
} as const;

export const industryTaxonomy = {version:"NAICS-2022-v1",crossVintageRule:"Store the observed NAICS vintage; never silently recode across revisions."} as const;
export const occupationTaxonomy = {version:"SOC-2018-v1",crossVintageRule:"Store the observed SOC vintage and review split/merge changes."} as const;

export const normalizeCompanyName = (raw:string) => raw.normalize("NFKC").toUpperCase().replace(/[^A-Z0-9 ]/g," ").replace(/\b(INCORPORATED|INC|CORPORATION|CORP|LIMITED|LLC|LTD)\b/g,"").replace(/\s+/g," ").trim();

export const institutionMatch = (input:{openAlexId?:string;ror?:string;herdId?:string;ipedsUnitId?:string}) => ({
  ...input,
  matchMethod: input.openAlexId && input.ror ? "PUBLIC_ID_DIRECT" : "MANUAL_REVIEW_REQUIRED",
  confidence: input.openAlexId && input.ror ? 1 : null,
  manualReview: !(input.openAlexId && input.ror),
});
