import type { LocalizedText } from "./models";
import type { ConfidenceLevel } from "./radar";

export type PolicyType = "STRATEGY"|"REGULATION"|"LEGISLATION"|"FUNDING_PROGRAM"|"TAX_INCENTIVE"|"GRANT"|"SUBSIDY"|"PROCUREMENT"|"RESEARCH_PROGRAM"|"INFRASTRUCTURE_PROGRAM"|"WORKFORCE_PROGRAM"|"STANDARDS"|"EXPORT_CONTROL"|"MARKET_RULE"|"PUBLIC_PRIVATE_INITIATIVE"|"OTHER_PUBLIC_POLICY";
export type PolicyInstrument = "DIRECT_FUNDING"|"TAX_INCENTIVE"|"LOAN_GUARANTEE"|"PROCUREMENT"|"REGULATORY_REQUIREMENT"|"RESEARCH_SUPPORT"|"INFRASTRUCTURE_INVESTMENT"|"WORKFORCE_DEVELOPMENT"|"STANDARDS_DEVELOPMENT"|"MARKET_ACCESS_RULE"|"PUBLIC_PRIVATE_COORDINATION";
export type PolicyStatus = "PROPOSED"|"ANNOUNCED"|"ENACTED"|"ACTIVE"|"AMENDED"|"SUPERSEDED"|"EXPIRED"|"SUSPENDED"|"UNKNOWN";
export type PolicyLevel = "INTERNATIONAL"|"NATIONAL"|"STATE_PROVINCE"|"REGIONAL"|"LOCAL_CITY";
export type PolicyEffectType = "ENABLE"|"SUPPORT"|"FUND"|"INCENTIVIZE"|"REGULATE"|"STANDARDIZE"|"RESTRICT"|"COORDINATE"|"PROCURE"|"BUILD_CAPACITY"|"DEVELOP_WORKFORCE"|"REDUCE_RISK"|"OTHER";
export type PolicyTarget = "INDUSTRY"|"TECHNOLOGY"|"RESEARCH"|"STARTUPS"|"CORPORATIONS"|"UNIVERSITIES"|"INVESTORS"|"PUBLIC_AGENCIES"|"INFRASTRUCTURE"|"TALENT"|"MANUFACTURING"|"COMMERCIALIZATION"|"SUPPLY_CHAINS"|"ENERGY_SYSTEMS"|"DATA_DIGITAL_INFRASTRUCTURE";
export type PolicyMechanism = PolicyInstrument;
export type PolicyFundingStage = "ANNOUNCED"|"AUTHORIZED"|"APPROPRIATED"|"AWARDED"|"UNKNOWN";
export type PolicyCurrency = "USD"|"EUR"|"CNY"|"GBP"|"JPY"|"KRW"|"SGD";
export type PolicyEvidenceStatus = "VERIFIED_PUBLIC_SOURCE"|"PARTIAL_PUBLIC_EVIDENCE"|"DERIVED_CLASSIFICATION"|"DEMO_RECORD"|"INSUFFICIENT_EVIDENCE";
export type PolicySourceType = "LEGISLATION"|"REGULATION"|"GOVERNMENT_AGENCY"|"PUBLIC_PROGRAM"|"PUBLIC_DATABASE"|"GOVERNMENT_REPORT"|"GOVERNMENT_PRESS_RELEASE"|"OFFICIAL_INSTITUTION"|"OTHER_PUBLIC_SOURCE";
export type PolicyTimelineEventType = "ANNOUNCEMENT"|"PROPOSAL"|"LEGISLATIVE_ACTION"|"ENACTMENT"|"IMPLEMENTATION"|"AMENDMENT"|"EXPIRATION";
export type PolicySignalType = "NEW_FUNDING_PROGRAM"|"REGULATORY_CHANGE"|"STANDARDS_INITIATIVE"|"STRATEGIC_PLAN"|"TAX_INCENTIVE"|"PUBLIC_PROCUREMENT"|"PROGRAM_EXPANSION";
export type PolicySignalDirection = "EXPANSION"|"NEW_INITIATIVE"|"IMPLEMENTATION"|"TIGHTENING"|"RELAXATION"|"CONTINUATION"|"UNCERTAIN";
export type PolicyImpactDimension = "fundingIntensity"|"researchSupport"|"commercializationSupport"|"regulatoryActivity"|"standardsActivity"|"workforceSupport"|"infrastructureSupport"|"publicProcurement";

export interface PolicyJurisdiction {id:string;name:LocalizedText;level:PolicyLevel;countryCode:string;atlasRegionIds:string[];}
export interface PolicyFundingMechanism {amount:number|null;currency:PolicyCurrency|null;stage:PolicyFundingStage;notes:LocalizedText;}
export interface PolicyConfidence {level:ConfidenceLevel;sourceAuthority:number;sourceCompleteness:number;recency:number;crossSourceConsistency:number;statusCertainty:number;isDemoConfigured:true;}
export interface PolicyEvidence {id:string;sourceId:string;claim:LocalizedText;status:PolicyEvidenceStatus;isDerived:boolean;isDemo:boolean;}
export interface PolicySource {id:string;sourceName:string;sourceUrl:string|null;sourceType:PolicySourceType;publisher:string;publishedAt:string|null;retrievedAt:string;jurisdictionId:string;documentTitle:LocalizedText;documentId:string|null;language:string;timePeriod:string;notes:LocalizedText;isDemo:boolean;}
export interface PolicyTimelineEvent {id:string;policyId:string;eventType:PolicyTimelineEventType;date:string;title:LocalizedText;description:LocalizedText;isDemo:boolean;}
export interface PolicyIndustryLink {policyId:string;industryId:string;}
export interface PolicyTechnologyLink {policyId:string;technologyId:string;}
export interface PolicyRegionLink {policyId:string;regionId:string;}
export interface PolicyOrganizationLink {policyId:string;organizationId:string;targetType:PolicyTarget;}
export interface PolicyRecord {
 id:string;title:string;localizedTitle:LocalizedText;jurisdictionId:string;policyLevel:PolicyLevel;agency:LocalizedText;policyType:PolicyType;status:PolicyStatus;
 effectTypes:PolicyEffectType[];industryIds:string[];technologyIds:string[];targetEntities:PolicyTarget[];organizationIds:string[];publishedAt:string;effectiveFrom:string|null;effectiveTo:string|null;
 sourceSummary:LocalizedText;nexoraSummary:LocalizedText;mechanisms:PolicyMechanism[];funding:PolicyFundingMechanism;officialSourceUrl:string|null;sourceIds:string[];evidenceStatus:PolicyEvidenceStatus;confidence:PolicyConfidence;
 timeline:PolicyTimelineEvent[];relatedPolicyIds:string[];ecosystemContextIds:string[];uncertainty:LocalizedText[];isDemo:boolean;notes:LocalizedText;
}
export interface PolicySignal {id:string;date:string;jurisdictionId:string;industryId:string;technologyId:string|null;signalType:PolicySignalType;direction:PolicySignalDirection;sourceId:string;confidence:ConfidenceLevel;evidenceStatus:PolicyEvidenceStatus;isDemo:boolean;title:LocalizedText;}
export interface PolicySnapshot {id:string;capturedAt:string;observationPeriod:string;policyIds:string[];signalIds:string[];isDemo:boolean;}
export interface PolicyFilter {jurisdictionId?:string;policyLevel?:PolicyLevel;industryId?:string;technologyId?:string;policyType?:PolicyType;status?:PolicyStatus;effectType?:PolicyEffectType;agency?:string;publishedYear?:string;effectiveDateState?:"HAS_DATE"|"NO_DATE";evidenceStatus?:PolicyEvidenceStatus;search?:string;}
export type PolicySort = "NEWEST"|"OLDEST"|"EFFECTIVE_DATE"|"JURISDICTION"|"POLICY_TYPE"|"STATUS";
export interface PolicyComparisonDimension {key:PolicyImpactDimension;name:LocalizedText;description:LocalizedText;input:string;normalization:"DEMO_0_100";missingData:"DISPLAY_NULL";}
export interface PolicyComparisonConfig {version:string;dimensions:PolicyComparisonDimension[];}
export type PolicyComparisonValues = Record<PolicyImpactDimension,number|null>;
export interface PolicyValidationResult {valid:boolean;duplicatePolicyIds:string[];invalidStatusPolicyIds:string[];invalidJurisdictionPolicyIds:string[];missingEvidencePolicyIds:string[];invalidDatePolicyIds:string[];invalidFundingPolicyIds:string[];missingVerifiedSourcePolicyIds:string[];invalidIndustryPolicyIds:string[];invalidTechnologyPolicyIds:string[];}
export interface PolicyInsight {id:string;kind:"OBSERVED_FACT"|"DERIVED_CLASSIFICATION"|"NEXORA_INTERPRETATION";text:LocalizedText;policyId:string;}
export interface PolicyProgram {id:string;policyId:string;name:LocalizedText;agency:LocalizedText;funding:PolicyFundingMechanism;}
export interface PolicyComparison {leftJurisdictionId:string;rightJurisdictionId:string;values:Record<string,PolicyComparisonValues>;isDemo:true;}
