export type ProviderReadiness = "READY" | "STAGED" | "REVIEW_REQUIRED" | "NOT_CONFIGURED" | "UNAVAILABLE" | "DEGRADED";
export type ProviderTier = "A" | "B" | "C";
export type PublicDataLayer = "RAW" | "NORMALIZED" | "HARMONIZED" | "DERIVED" | "RESEARCH_INPUT" | "PUBLIC_EXPORT";
export type MissingValueStatus = "OBSERVED" | "OBSERVED_ZERO" | "MISSING" | "NOT_APPLICABLE" | "SUPPRESSED" | "UNAVAILABLE";
export type GeographyLevel = "COUNTRY" | "STATE" | "COUNTY" | "CBSA" | "CITY" | "INSTITUTION";
export type ResearchConstruct = "RESEARCH" | "PUBLIC_R&D" | "TALENT" | "ENTREPRENEURSHIP" | "COMMERCIALIZATION" | "PATENTS" | "COLLABORATION" | "POLICY" | "ECONOMIC_CONTEXT" | "PRIVATE_CAPITAL";

export interface PublicProviderDefinition {
  providerId: string;
  officialName: string;
  officialUrl: string;
  sourceType: "API" | "BULK_DOWNLOAD" | "OFFICIAL_REGISTER" | "OFFICIAL_PROGRAM_LIBRARY";
  accessMethod: string;
  authentication: "NONE" | "OPTIONAL_KEY" | "REQUIRED_KEY" | "MANUAL_OFFICIAL_DOWNLOAD";
  licenseReuse: string;
  updateFrequency: string;
  earliestYear: string | null;
  latestYear: string | null;
  geographies: GeographyLevel[];
  keyEntities: string[];
  constructsSupported: ResearchConstruct[];
  redistributionRule: "RAW_ALLOWED" | "DERIVED_ONLY" | "LINK_ONLY" | "REVIEW_REQUIRED";
  citation: string;
  status: ProviderReadiness;
  tier: ProviderTier;
  lastVerified: string;
  limitation: string;
}

export interface SnapshotManifest {
  providerId: string;
  query: string;
  parameters: Record<string, string | number | boolean>;
  retrievalDate: string;
  snapshotDate: string;
  sourcePeriod: string;
  recordCount: number;
  checksum: string;
  schemaVersion: string;
  pipelineVersion: string;
  transformationHash: string | null;
  sourceVintage: string;
  revisionStatus: "INITIAL" | "REVISED" | "UNCHANGED";
}

export interface RegionYearObservation {
  regionType: GeographyLevel;
  regionId: string;
  year: number;
  metricId: string;
  value: number | null;
  unit: string;
  status: MissingValueStatus;
  providerId: string;
  snapshotId: string;
  sourcePeriod: string;
  retrievalDate: string;
  observationYear: number;
}

export interface PublicPolicyProgramRecord {
  programId: string;
  officialName: string;
  agency: string;
  jurisdiction: string;
  startDate: string | null;
  status: "ACTIVE" | "PUBLISHED" | "COMPLETED" | "UNKNOWN";
  policyInstrument: "R&D_SUPPORT" | "ENTREPRENEURSHIP_SUPPORT" | "HUMAN_CAPITAL" | "FINANCE" | "KNOWLEDGE_TRANSFER" | "PROCUREMENT" | "INFRASTRUCTURE" | "STANDARDS" | "REGULATION" | "PUBLIC_PRIVATE_COORDINATION";
  targetTechnology: string[];
  targetActor: string[];
  fundingIfObserved: number | null;
  fundingUnit: string | null;
  geography: string;
  commercializationRole: string;
  technologyTransferRole: string;
  officialUrl: string;
  sourceStatus: "OBSERVED" | "STAGED";
  objective: string;
  observedOutcome: string | null;
}

export const validateRegionYearObservation = (row: RegionYearObservation) => {
  const errors: string[] = [];
  if (!row.regionId || !row.metricId || !row.providerId || !row.snapshotId) errors.push("MISSING_KEY");
  if (!Number.isInteger(row.year) || row.year < 1900 || row.year > 2100 || row.observationYear !== row.year) errors.push("INVALID_YEAR");
  if (row.value === null && ["OBSERVED", "OBSERVED_ZERO"].includes(row.status)) errors.push("NULL_OBSERVED_VALUE");
  if (row.value !== null && !Number.isFinite(row.value)) errors.push("INVALID_VALUE");
  if (row.status === "OBSERVED_ZERO" && row.value !== 0) errors.push("ZERO_STATUS_MISMATCH");
  if (row.status === "SUPPRESSED" && row.value !== null) errors.push("SUPPRESSED_VALUE_MUST_BE_NULL");
  return errors;
};

export const validateSnapshotManifest = (snapshot: SnapshotManifest) => {
  const errors: string[] = [];
  if (!snapshot.providerId || !snapshot.schemaVersion || !snapshot.pipelineVersion) errors.push("MISSING_VERSION");
  if (!/^\d{4}-\d{2}-\d{2}$/.test(snapshot.retrievalDate) || !/^\d{4}-\d{2}-\d{2}$/.test(snapshot.snapshotDate)) errors.push("INVALID_DATE");
  if (snapshot.recordCount < 0 || !Number.isInteger(snapshot.recordCount)) errors.push("INVALID_RECORD_COUNT");
  if (!/^[a-f0-9]{8,64}$/i.test(snapshot.checksum)) errors.push("INVALID_CHECKSUM");
  return errors;
};
