import type { LocalizedText } from "./models";

export type PublicDataStatus="DEMO"|"OBSERVED"|"NORMALIZED"|"DERIVED"|"COMPOSITE"|"CURATED"|"AI_INTERPRETATION"|"STALE"|"UNAVAILABLE";
export type DataMode="DEMO"|"PRODUCTION"|"HYBRID";
export type ProviderId="OPENALEX"|"USPTO"|"WORLD_BANK"|"DATA_GOV"|"FEDERAL_REGISTER"|"OFFICIAL_POLICY"|"OFFICIAL_ORGANIZATION"|"PUBLIC_FUNDING";
export type SourceTier=1|2|3|4|5;
export type LicenseStatus="DOCUMENTED"|"REVIEW_REQUIRED"|"RESTRICTED";
export type ProviderHealthStatus="HEALTHY"|"DEGRADED"|"STALE"|"UNAVAILABLE"|"NOT_CONFIGURED";
export type IngestionStatus="PENDING"|"RUNNING"|"SUCCESS"|"PARTIAL"|"FAILED"|"CANCELLED";
export type RecordLifecycle="ACTIVE"|"STALE"|"DEPRECATED"|"REMOVED_AT_SOURCE"|"UNKNOWN";
export type ResolutionConfidence="EXACT"|"HIGH"|"MEDIUM"|"LOW"|"UNRESOLVED";
export type ConflictStatus="RESOLVED"|"UNRESOLVED"|"SOURCE_PRIORITY_APPLIED";

export interface LicenseMetadata {licenseName:string|null;licenseUrl:string|null;status:LicenseStatus;reuseNotes:string;attributionRequirement:string|null;redistributionAllowed:boolean|null;rawDataRedistributionAllowed:boolean|null;derivedDataAllowed:boolean|null;reviewedAt:string;}
export interface CanonicalSource {id:string;provider:ProviderId;name:string;publisher:string;sourceType:string;tier:SourceTier;url:string;retrievedAt:string;sourceUpdatedAt:string|null;license:LicenseMetadata;attributionText:string;}
export interface CanonicalRecordIdentity {provider:ProviderId;providerRecordId:string;canonicalEntityId:string;sourceId:string;sourceUrl:string;retrievedAt:string;sourceUpdatedAt:string|null;effectiveDate:string|null;validFrom:string|null;validTo:string|null;checksum:string;schemaVersion:string;parserVersion:string;ingestionRunId:string;lifecycle:RecordLifecycle;}
export interface FieldProvenance {entityId:string;fieldPath:string;sourceId:string;sourceRecordId:string;observedValue:string|number|boolean|null;retrievedAt:string;confidence:ResolutionConfidence;transformationId:string|null;}
export interface CanonicalGeography {id:string;type:"COUNTRY"|"STATE_PROVINCE"|"METRO_ECOSYSTEM"|"CITY";name:LocalizedText;countryCode:string;parentId:string|null;latitude:number|null;longitude:number|null;sourceIds:string[];}
export interface CanonicalObservation {id:string;datasetId:string;metricKey:string;entityId:string|null;geographyType:CanonicalGeography["type"]|null;geographyId:string|null;period:string;value:number|null;unit:string;scale:number;currency:string|null;status:PublicDataStatus;sourceRecordIds:string[];observedAt:string|null;retrievedAt:string;}
export interface CanonicalDataset {id:string;provider:ProviderId;title:LocalizedText;description:LocalizedText;status:PublicDataStatus;schemaVersion:string;recordCount:number;coverage:LocalizedText;sourceIds:string[];snapshotId:string;}
export interface CanonicalRelationship {id:string;fromEntityId:string;toEntityId:string;relationshipType:string;status:PublicDataStatus;sourceRecordIds:string[];validFrom:string|null;validTo:string|null;}
export interface TransformationRecord {id:string;name:string;formulaVersion:string;inputDatasetVersion:string;calculatedAt:string;methodologyReference:string;inputRecordIds:string[];outputRecordIds:string[];}
export interface MetricDerivation {metricId:string;transformationId:string;inputSnapshotId:string;taxonomyVersion:string;timeWindow:string;missingInputs:string[];confidence:ResolutionConfidence;}
export interface DataLineage {id:string;outputId:string;steps:{kind:"SOURCE"|"NORMALIZATION"|"TRANSFORMATION"|"METRIC";recordId:string;label:string}[];}
export interface DatasetSnapshot {id:string;datasetId:string;provider:ProviderId;snapshotDate:string;recordCount:number;version:string;checksum:string;createdAt:string;promotedAt:string|null;}
export interface IngestionRun {id:string;provider:ProviderId;startedAt:string;completedAt:string|null;status:IngestionStatus;recordsFetched:number;recordsAccepted:number;recordsRejected:number;recordsUpdated:number;recordsUnchanged:number;errors:string[];warnings:string[];schemaVersion:string;parserVersion:string;dryRun:boolean;}
export interface RejectedRecord {id:string;provider:ProviderId;sourceId:string|null;reason:string;retrievedAt:string;rawMetadataSummary:string;}
export interface DataQualityReport {id:string;datasetId:string;provider:ProviderId;calculatedAt:string;recordCount:number;completeness:number;validity:number;consistency:number;freshness:number;uniqueness:number;provenanceCoverage:number;taxonomyCoverage:number;geographyCoverage:number;missingRequired:number;duplicateRate:number;unmappedTaxonomyRate:number;unresolvedOrganizations:number;staleRecords:number;rejectedRecords:number;warnings:string[];promotionAllowed:boolean;}
export interface FreshnessPolicy {provider:ProviderId;dataset:string;expectedCadence:"DAILY"|"WEEKLY"|"MONTHLY"|"QUARTERLY"|"ANNUAL"|"MANUAL";staleAfterDays:number;criticalAfterDays:number;refreshStrategy:string;}
export interface ProviderHealth {provider:ProviderId;status:ProviderHealthStatus;lastSuccessAt:string|null;lastFailureAt:string|null;lastLatencyMs:number|null;errorSummary:string|null;recordCount:number;freshness:string;coverage:LocalizedText;licenseStatus:LicenseStatus;}
export interface ConflictRecord {id:string;entityId:string;fieldPath:string;sourceRecordIds:string[];values:(string|number|null)[];status:ConflictStatus;resolutionNotes:string|null;}
export interface OrganizationIdentityCandidate {provider:ProviderId;providerRecordId:string;officialName:string;officialDomain:string|null;countryCode:string|null;city:string|null;externalIds:Record<string,string>;}
export interface OrganizationIdentityMatch {candidateId:string;canonicalOrganizationId:string|null;confidence:ResolutionConfidence;signals:string[];requiresReview:boolean;}
export interface ProviderRequest {path:string;query:Record<string,string|number|undefined>;timeoutMs?:number;}
export interface ProviderPage<T> {records:T[];nextCursor:string|null;total:number|null;retrievedAt:string;}
