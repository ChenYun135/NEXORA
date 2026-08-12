import { californiaAIAnnual } from "./case.ts";

export type CaliforniaAIComparabilityStatus =
  | "DIRECTLY_COMPARABLE"
  | "COMPARABLE_AFTER_AGGREGATION"
  | "CONTEXT_ONLY"
  | "NOT_COMPARABLE";

export const californiaAIAnalysisPolicy = {
  version: "ca-ai-alignment-v1.0",
  commonCompleteYearWindow: { firstYear: 2015, lastYear: 2025 },
  commonCrossLayerReferenceYear: 2025,
  commonCrossLayerLongitudinalPanelAvailable: false,
  partialYearPolicy: "OpenAlex 2026 is PARTIAL_YEAR and is excluded from complete-year growth, CAGR, and aligned-panel comparisons.",
  crossLayerPolicy: "OpenAlex, NSF and BLS may be described together only as context. Their geography, unit and time coverage do not support a direct combined index, correlation or lag analysis.",
} as const;

export const californiaAITimeAlignment = [
  { provider: "OpenAlex", metricId: "openalex-ai-subfield-unique-works", firstYear: 2015, lastCompleteYear: 2025, partialYears: [2026], updateCadence: "ONGOING / snapshot refresh", recommendedComparisonWindow: "2015-2025", notes: "Annual unique works within the reproducible 16-institution coverage frame; 2026 excluded from complete-year comparisons." },
  { provider: "U.S. National Science Foundation Award Search API", metricId: "nsf-title-qualified-awards", firstYear: 2025, lastCompleteYear: 2025, partialYears: [], updateCadence: "ONGOING / award-record updates", recommendedComparisonWindow: "2025 award dates only", notes: "One agency and one award year; recipient state is California and amounts are nominal obligations." },
  { provider: "U.S. Bureau of Labor Statistics OEWS", metricId: "bls-ai-adjacent-workforce", firstYear: 2025, lastCompleteYear: 2025, partialYears: [], updateCadence: "ANNUAL", recommendedComparisonWindow: "May 2025 cross-section only", notes: "San Jose-Sunnyvale-Santa Clara MSA; occupation proxies, not statewide AI-worker counts." },
] as const;

export const californiaAIGeographyCrosswalk = [
  { id: "california", level: "STATE", label: "California", definition: "Official State of California boundary.", sourceUse: "NSF awardeeStateCode=CA; policy jurisdiction.", counties: [] as string[], msaNames: [] as string[], comparability: "CONTEXT_ONLY" as CaliforniaAIComparabilityStatus },
  { id: "california-selected-institution-frame", level: "INSTITUTION_FRAME", label: "California selected-institution research frame", definition: "Sixteen individually resolved California campuses, laboratories and companies selected by the documented OpenAlex frame.", sourceUse: "OpenAlex research activity and co-authorship.", counties: [] as string[], msaNames: [] as string[], comparability: "DIRECTLY_COMPARABLE" as CaliforniaAIComparabilityStatus },
  { id: "sf-bay-area", level: "METRO_ECOSYSTEM", label: "San Francisco Bay Area", definition: "NEXORA nine-county ecosystem: Alameda, Contra Costa, Marin, Napa, San Francisco, San Mateo, Santa Clara, Solano and Sonoma.", sourceUse: "Institution-to-region mapping and ecosystem navigation only; not a BLS statistical area.", counties: ["Alameda", "Contra Costa", "Marin", "Napa", "San Francisco", "San Mateo", "Santa Clara", "Solano", "Sonoma"], msaNames: ["San Francisco-Oakland-Berkeley MSA", "San Jose-Sunnyvale-Santa Clara MSA", "Napa MSA", "Santa Rosa-Petaluma MSA", "Vallejo MSA"], comparability: "COMPARABLE_AFTER_AGGREGATION" as CaliforniaAIComparabilityStatus },
  { id: "san-jose-sunnyvale-santa-clara-msa", level: "MSA", label: "San Jose-Sunnyvale-Santa Clara, CA MSA", definition: "BLS OEWS source area 0041940; retained exactly as published.", sourceUse: "May 2025 occupational employment, wage and location-quotient context.", counties: ["Santa Clara", "San Benito"], msaNames: ["San Jose-Sunnyvale-Santa Clara MSA"], comparability: "CONTEXT_ONLY" as CaliforniaAIComparabilityStatus },
  { id: "los-angeles", level: "INSTITUTION_GROUP", label: "Los Angeles institution group", definition: "Selected institutions canonically located in Los Angeles County, including Pasadena; not a complete MSA aggregate.", sourceUse: "OpenAlex selected-institution context.", counties: ["Los Angeles"], msaNames: ["Los Angeles-Long Beach-Anaheim MSA (context only)"], comparability: "COMPARABLE_AFTER_AGGREGATION" as CaliforniaAIComparabilityStatus },
  { id: "san-diego", level: "INSTITUTION_GROUP", label: "San Diego institution group", definition: "Selected institutions canonically located in San Diego County; not a complete MSA census.", sourceUse: "OpenAlex selected-institution context.", counties: ["San Diego"], msaNames: ["San Diego-Chula Vista-Carlsbad MSA (context only)"], comparability: "COMPARABLE_AFTER_AGGREGATION" as CaliforniaAIComparabilityStatus },
  { id: "orange-county", level: "INSTITUTION_GROUP", label: "Orange County / Irvine institution group", definition: "Selected institutions canonically located in Orange County; not a standalone official MSA.", sourceUse: "OpenAlex selected-institution context.", counties: ["Orange"], msaNames: ["Los Angeles-Long Beach-Anaheim MSA (context only)"], comparability: "COMPARABLE_AFTER_AGGREGATION" as CaliforniaAIComparabilityStatus },
  { id: "sacramento", level: "POLICY_CONTEXT", label: "Sacramento policy context", definition: "State-government location used for policy context, not an empirical research, funding or talent aggregate.", sourceUse: "California policy context only.", counties: ["Sacramento"], msaNames: ["Sacramento-Roseville-Folsom MSA (context only)"], comparability: "NOT_COMPARABLE" as CaliforniaAIComparabilityStatus },
  { id: "california-nsf-recipient-state", level: "RECIPIENT_STATE", label: "California NSF recipient-state aggregation", definition: "Awards returned with official awardeeStateCode=CA; recipient city is retained but not converted into award-impact geography.", sourceUse: "2025 NSF title-qualified award count and nominal obligations.", counties: [] as string[], msaNames: [] as string[], comparability: "CONTEXT_ONLY" as CaliforniaAIComparabilityStatus },
] as const;

export const californiaAIEmpiricalAlignment = [
  { construct: "Research activity / research-capacity proxy", metric: "Annual unique AI-subfield works", provider: "OpenAlex", measurementType: "OBSERVED", geographyLevel: "California selected-institution frame", timeCoverage: "2015-2025 complete; 2026 partial", unit: "unique works", aggregationMethod: "Provider year group-by within fixed institution frame", comparabilityStatus: "DIRECTLY_COMPARABLE", researchUse: "Primary descriptive trend", simulatorUse: "Research-capacity proxy", limitations: "Activity volume is not quality, impact, competitiveness or a statewide census." },
  { construct: "Institution participation", metric: "Complete-period institution work count", provider: "OpenAlex", measurementType: "OBSERVED", geographyLevel: "Canonical institution location", timeCoverage: "2015-2025", unit: "institution-associated works", aggregationMethod: "Institution group-by; overlapping affiliations allowed", comparabilityStatus: "COMPARABLE_AFTER_AGGREGATION", researchUse: "Secondary descriptive participation", simulatorUse: "None", limitations: "Counts overlap and cannot be summed as unique statewide output." },
  { construct: "Network structure", metric: "Positive co-authorship pairs and degree", provider: "OpenAlex", measurementType: "DERIVED", geographyLevel: "Sixteen-institution frame", timeCoverage: "2015-2025 recommended", unit: "pairs / co-authored works", aggregationMethod: "Repeated institution filters; within-frame derivation", comparabilityStatus: "COMPARABLE_AFTER_AGGREGATION", researchUse: "Secondary network description", simulatorUse: "Connectivity proxy", limitations: "Not the complete California innovation network." },
  { construct: "AI-adjacent workforce / talent proxy", metric: "Employment, location quotient and mean wage by SOC", provider: "BLS OEWS", measurementType: "PROXY", geographyLevel: "San Jose-Sunnyvale-Santa Clara MSA", timeCoverage: "May 2025", unit: "jobs / LQ / nominal USD", aggregationMethod: "Source-published occupation estimates", comparabilityStatus: "CONTEXT_ONLY", researchUse: "Selected workforce context", simulatorUse: "Regional contextual proxy only", limitations: "Not AI-worker counts, not Bay Area aggregate and not statewide talent." },
  { construct: "Public research funding / public R&D support", metric: "Award count and nominal funds obligated", provider: "NSF Award Search API", measurementType: "OBSERVED", geographyLevel: "California recipient state", timeCoverage: "2025 award dates", unit: "awards / nominal USD", aggregationMethod: "Deduplicated title taxonomy; sum of obligations", comparabilityStatus: "CONTEXT_ONLY", researchUse: "Secondary public-funding evidence", simulatorUse: "Public-funding input context", limitations: "One agency/year; recipient location is not award-impact geography or innovation effectiveness." },
  { construct: "Patent activity", metric: "CPC-qualified application records", provider: "USPTO ODP Patent File Wrapper", measurementType: "OBSERVED", geographyLevel: "Source-record assignee/applicant address rule", timeCoverage: "Unavailable until activation", unit: "applications / grants", aggregationMethod: "Credential-ready adapter; no production promotion", comparabilityStatus: "NOT_COMPARABLE", researchUse: "Not ready", simulatorUse: "Unavailable", limitations: "Production access is not configured; no production patent data." },
] as const;

export const californiaAIAlignedPanel = californiaAIAnnual
  .filter((row) => row.year >= californiaAIAnalysisPolicy.commonCompleteYearWindow.firstYear && row.year <= californiaAIAnalysisPolicy.commonCompleteYearWindow.lastYear && !row.incomplete)
  .map((row) => ({
    year: row.year,
    geographyId: "california-selected-institution-frame",
    metricId: "openalex-ai-subfield-unique-works",
    value: row.workCount,
    unit: "unique works",
    provider: "OpenAlex",
    status: "OBSERVED_PUBLIC_DATA" as const,
    comparabilityStatus: "DIRECTLY_COMPARABLE" as const,
    construct: "RESEARCH_ACTIVITY_PROXY" as const,
  }));
