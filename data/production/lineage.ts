import type { DataLineage, DatasetSnapshot, FreshnessPolicy, TransformationRecord } from "../../domain/public-data.ts";
import { openAlexResearchObservations, productionSnapshotDate, worldBankObservations } from "./pilot.ts";
import { openAlexTopicMappingVersion } from "../mappings/openalex-topics.ts";

export const pilotSnapshots: DatasetSnapshot[] = [
  { id:"snapshot-openalex-2026-08-10",datasetId:"openalex-topic-activity",provider:"OPENALEX",snapshotDate:productionSnapshotDate,recordCount:openAlexResearchObservations.length,version:"2026.08.10",checksum:"f13233f4",createdAt:`${productionSnapshotDate}T03:01:22Z`,promotedAt:`${productionSnapshotDate}T03:05:00Z` },
  { id:"snapshot-world-bank-2026-08-10",datasetId:"world-bank-rd-context",provider:"WORLD_BANK",snapshotDate:productionSnapshotDate,recordCount:worldBankObservations.length,version:"2026.08.10",checksum:"a36e06ec",createdAt:`${productionSnapshotDate}T00:00:00Z`,promotedAt:`${productionSnapshotDate}T00:02:00Z` },
];

export const pilotTransformations: TransformationRecord[] = [
  { id:"transform-openalex-topic-normalization-v1",name:"OpenAlex topic-to-NEXORA taxonomy normalization",formulaVersion:"1.0.0",inputDatasetVersion:"2026.08.10",calculatedAt:`${productionSnapshotDate}T03:03:00Z`,methodologyReference:`docs/TAXONOMY_MAPPING.md#${openAlexTopicMappingVersion}`,inputRecordIds:openAlexResearchObservations.map(x=>x.id),outputRecordIds:openAlexResearchObservations.map(x=>x.id) },
];

export const pilotLineage: DataLineage[] = [
  { id:"lineage-openalex-publication-count",outputId:"openalex-topic-activity",steps:[{kind:"SOURCE",recordId:"openalex-api",label:"OpenAlex works group_by publication_year"},{kind:"NORMALIZATION",recordId:"transform-openalex-topic-normalization-v1",label:`Curated topic mapping ${openAlexTopicMappingVersion}`},{kind:"METRIC",recordId:"publication_count",label:"Observed work count; not a NEXORA score"}] },
  { id:"lineage-world-bank-rd-share",outputId:"world-bank-rd-context",steps:[{kind:"SOURCE",recordId:"world-bank-indicators",label:"World Bank GB.XPD.RSDV.GD.ZS"},{kind:"NORMALIZATION",recordId:"geography-mapping-v1",label:"ISO3 country to canonical geography"},{kind:"METRIC",recordId:"rd_expenditure_gdp_share",label:"Observed annual percent of GDP; null years remain absent"}] },
];

export const freshnessPolicies: FreshnessPolicy[] = [
  {provider:"OPENALEX",dataset:"openalex-topic-activity",expectedCadence:"WEEKLY",staleAfterDays:14,criticalAfterDays:30,refreshStrategy:"Incremental yearly group-by refresh with last-known-good fallback"},
  {provider:"WORLD_BANK",dataset:"world-bank-rd-context",expectedCadence:"QUARTERLY",staleAfterDays:120,criticalAfterDays:400,refreshStrategy:"Refresh released annual observations; retain missing values as missing"},
  {provider:"DATA_GOV",dataset:"data-gov-catalog",expectedCadence:"MONTHLY",staleAfterDays:45,criticalAfterDays:120,refreshStrategy:"Retry catalog API; serve catalog last-known-good only"},
  {provider:"USPTO",dataset:"uspto-patent-adapter",expectedCadence:"WEEKLY",staleAfterDays:14,criticalAfterDays:30,refreshStrategy:"Remain NOT_CONFIGURED until a Sites secret is provided"},
  {provider:"OFFICIAL_POLICY",dataset:"official-policy-pilot",expectedCadence:"MONTHLY",staleAfterDays:45,criticalAfterDays:120,refreshStrategy:"Manual verification against controlled official URLs"},
  {provider:"OFFICIAL_ORGANIZATION",dataset:"official-organization-identities",expectedCadence:"QUARTERLY",staleAfterDays:120,criticalAfterDays:365,refreshStrategy:"Reverify official identity domain and external identifiers"},
];
