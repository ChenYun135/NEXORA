import type { EcosystemEdgeType } from "./ecosystems";
import type { LocalizedText } from "./models";

export type OrganizationType="STARTUP"|"CORPORATION"|"UNIVERSITY"|"RESEARCH_INSTITUTION"|"INVESTOR"|"GOVERNMENT_AGENCY"|"PUBLIC_PROGRAM"|"NONPROFIT"|"INDUSTRY_ASSOCIATION"|"PUBLIC_LAB"|"OTHER_ORGANIZATION";
export type OrganizationRole="RESEARCH"|"TECHNOLOGY_DEVELOPMENT"|"COMMERCIALIZATION"|"MANUFACTURING"|"INVESTMENT"|"POLICY"|"PUBLIC_FUNDING"|"INFRASTRUCTURE"|"EDUCATION"|"STANDARDIZATION"|"SUPPLY_CHAIN"|"MARKET_DEVELOPMENT"|"ECOSYSTEM_COORDINATION";
export type OrganizationStatus="ACTIVE"|"ACQUIRED"|"MERGED"|"INACTIVE"|"PUBLIC"|"PRIVATE"|"UNKNOWN";
export type OrganizationStage="EARLY"|"GROWTH"|"SCALE"|"PUBLIC"|"ACQUIRED"|"UNKNOWN";
export type OrganizationEntityStatus="VERIFIED_PUBLIC_ENTITY"|"DEMO_ENTITY";
export type OrganizationEvidenceStatus="VERIFIED_PUBLIC_SOURCE"|"PARTIAL_PUBLIC_EVIDENCE"|"DERIVED_CLASSIFICATION"|"DEMO_RECORD"|"INSUFFICIENT_EVIDENCE";
export type OrganizationConfidenceLevel="HIGH"|"MEDIUM"|"LOW"|"UNKNOWN";
export type OrganizationRoleClassification="OBSERVED_PUBLIC_CLASSIFICATION"|"DERIVED_ROLE"|"DEMO_CONFIGURED";
export type OrganizationIndustryRelevance="PRIMARY"|"SECONDARY"|"EMERGING";
export type OrganizationRegionPresence="HEADQUARTERS"|"RESEARCH_SITE"|"OPERATING_SITE"|"PROGRAM_SITE"|"ECOSYSTEM_ASSOCIATION"|"OTHER";
export type OrganizationPolicyRelationship="ELIGIBLE_UNDER"|"FUNDED_BY"|"PARTICIPATES_IN"|"REGULATED_BY"|"SUPPORTED_BY"|"PUBLIC_PROGRAM_PARTNER";
export type OrganizationSourceType="COMPANY_OFFICIAL"|"UNIVERSITY_OFFICIAL"|"RESEARCH_INSTITUTION_OFFICIAL"|"GOVERNMENT_OFFICIAL"|"PUBLIC_PROGRAM"|"OFFICIAL_FILING"|"PATENT_DATABASE"|"RESEARCH_DATABASE"|"PUBLIC_DATABASE"|"OTHER_PUBLIC_SOURCE";
export type OrganizationSignalType="NEW_RESEARCH_PROGRAM"|"NEW_PATENT_ACTIVITY"|"NEW_PUBLIC_FUNDING"|"NEW_PARTNERSHIP"|"NEW_TECHNOLOGY_LAUNCH"|"NEW_POLICY_PARTICIPATION"|"NEW_REGIONAL_EXPANSION";
export type OrganizationSignalDirection="NEW"|"EXPANDING"|"ACCELERATING"|"STABLE"|"DECLINING"|"UNKNOWN";
export type OrganizationSort="NAME"|"TYPE"|"REGION"|"FOUNDED_YEAR"|"EVIDENCE_COVERAGE"|"CONNECTIVITY";

export interface OrganizationConfidence {level:OrganizationConfidenceLevel;sourceAuthority:number;sourceCompleteness:number;crossSourceConsistency:number;recency:number;isDemoConfigured:boolean;}
export interface OrganizationRoleEvidence {role:OrganizationRole;classificationType:OrganizationRoleClassification;evidenceIds:string[];confidence:OrganizationConfidenceLevel;isDerived:boolean;isDemo:boolean;}
export interface OrganizationIndustryLink {industryId:string;relevance:OrganizationIndustryRelevance;evidenceIds:string[];isDemo:boolean;}
export interface OrganizationTechnologyLink {technologyId:string;evidenceIds:string[];isDemo:boolean;}
export interface OrganizationRegionLink {regionId:string;presenceType:OrganizationRegionPresence;validFrom:string|null;validTo:string|null;evidenceIds:string[];isDemo:boolean;}
export interface OrganizationPolicyLink {policyId:string;relationshipType:OrganizationPolicyRelationship;evidenceIds:string[];isDemo:boolean;}
export interface OrganizationResearchLink {id:string;title:LocalizedText;url:string|null;observedAt:string|null;evidenceIds:string[];isDemo:boolean;}
export interface OrganizationPatentLink {id:string;title:LocalizedText;publicationNumber:string|null;url:string|null;observedAt:string|null;evidenceIds:string[];isDemo:boolean;}
export interface OrganizationSource {id:string;sourceName:string;sourceUrl:string|null;sourceType:OrganizationSourceType;publisher:string;publishedAt:string|null;retrievedAt:string;organizationId:string|null;relationshipClaim:LocalizedText|null;activityClaim:LocalizedText|null;timePeriod:string|null;isDerived:boolean;isDemo:boolean;confidence:OrganizationConfidenceLevel;}
export interface OrganizationEvidence {id:string;organizationId:string;sourceIds:string[];claim:LocalizedText;status:OrganizationEvidenceStatus;isDerived:boolean;isDemo:boolean;confidence:OrganizationConfidenceLevel;}
export interface OrganizationProfile {id:string;name:string;localizedName:LocalizedText;organizationType:OrganizationType;roles:OrganizationRoleEvidence[];description:string;localizedDescription:LocalizedText;country:string|null;region:string|null;city:string|null;foundedYear:number|null;website:string|null;status:OrganizationStatus|null;stage:OrganizationStage|null;industryLinks:OrganizationIndustryLink[];technologyLinks:OrganizationTechnologyLink[];regionLinks:OrganizationRegionLink[];ecosystemIds:string[];publicProgramIds:string[];policyLinks:OrganizationPolicyLink[];researchLinks:OrganizationResearchLink[];patentLinks:OrganizationPatentLink[];relationshipIds:string[];sourceIds:string[];evidenceStatus:OrganizationEvidenceStatus;entityStatus:OrganizationEntityStatus;confidence:OrganizationConfidence;isDemo:boolean;observedAt:string|null;validFrom:string|null;validTo:string|null;lastUpdated:string;limitations:LocalizedText[];}
export interface OrganizationRelationship {id:string;sourceOrganizationId:string;targetOrganizationId:string;relationshipType:EcosystemEdgeType;category:"RESEARCH"|"CAPITAL"|"POLICY"|"COMMERCIALIZATION"|"TECHNOLOGY";evidenceIds:string[];confidence:OrganizationConfidenceLevel;validFrom:string|null;validTo:string|null;isDerived:boolean;isDemo:boolean;}
export interface OrganizationSignal {id:string;date:string;organizationId:string;signalType:OrganizationSignalType;direction:OrganizationSignalDirection;title:LocalizedText;industryId:string|null;technologyId:string|null;regionId:string|null;sourceId:string|null;confidence:OrganizationConfidenceLevel;evidenceStatus:OrganizationEvidenceStatus;isDemo:boolean;}
export interface OrganizationMetric {organizationId:string;connectivity:number;relationshipDiversity:number;evidenceCoverage:number;isDerived:true;isDemo:boolean;}
export interface OrganizationSnapshot {id:string;capturedAt:string;organizationIds:string[];relationshipIds:string[];dataStatus:"DEMO";}
export interface OrganizationFilter {type?:OrganizationType;role?:OrganizationRole;industryId?:string;technologyId?:string;regionId?:string;country?:string;city?:string;ecosystemId?:string;evidenceStatus?:OrganizationEvidenceStatus;confidence?:OrganizationConfidenceLevel;search?:string;}
export interface OrganizationQuery {organizationId?:string;industryId?:string;technologyId?:string;regionId?:string;type?:OrganizationType;ecosystemId?:string;}
export interface OrganizationComparisonRow {key:string;label:LocalizedText;left:string|number|null;right:string|number|null;appliesTo:string;}
export interface OrganizationValidationResult {valid:boolean;duplicateIds:string[];invalidTypeIds:string[];invalidRoleIds:string[];invalidIndustryIds:string[];invalidTechnologyIds:string[];invalidRegionIds:string[];duplicateRelationshipIds:string[];orphanRelationshipIds:string[];invalidSourceIds:string[];verifiedWithoutSourceIds:string[];futureUpdatedIds:string[];invalidFoundedYearIds:string[];}
export interface OrganizationInsight {id:string;title:LocalizedText;description:LocalizedText;organizationIds:string[];isDerived:boolean;isDemo:boolean;}
