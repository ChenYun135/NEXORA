import type { DataMode, PublicDataStatus, ProviderHealthStatus, ResolutionConfidence } from "./public-data";

export type AILanguage="en"|"zh";
export type AIQueryIntent="GENERAL_RESEARCH"|"TECHNOLOGY_OVERVIEW"|"TREND_EXPLANATION"|"REGIONAL_COMPARISON"|"TECHNOLOGY_COMPARISON"|"ORGANIZATION_RESEARCH"|"ECOSYSTEM_ANALYSIS"|"POLICY_ANALYSIS"|"POLICY_COMPARISON"|"SIGNAL_EXPLANATION"|"EVIDENCE_SUMMARY"|"SOURCE_VERIFICATION"|"METRIC_EXPLANATION"|"RESEARCH_BRIEF"|"DATA_AVAILABILITY"|"METHODOLOGY"|"CROSS_DOMAIN_SYNTHESIS"|"UNSUPPORTED";
export type AIAnswerType="QUICK_ANSWER"|"EVIDENCE_SUMMARY"|"COMPARISON"|"RESEARCH_BRIEF"|"METHODOLOGY_EXPLANATION"|"SOURCE_VERIFICATION"|"DATA_AVAILABILITY"|"TREND_EXPLANATION"|"ECOSYSTEM_ANALYSIS"|"POLICY_ANALYSIS";
export type AIPlanOperationType="GET_ENTITY"|"GET_METRICS"|"GET_TIMESERIES"|"GET_SIGNALS"|"GET_POLICIES"|"GET_ORGANIZATIONS"|"GET_ECOSYSTEM"|"GET_RELATIONSHIPS"|"GET_SOURCES"|"GET_PROVENANCE"|"GET_LINEAGE"|"GET_DATA_STATUS"|"GET_METHODOLOGY"|"COMPARE_ENTITIES";
export type EvidenceKind="RESEARCH"|"PATENT"|"POLICY"|"ORGANIZATION"|"RELATIONSHIP"|"REGIONAL_CONTEXT"|"METHODOLOGY"|"DATA_STATUS";
export type EvidenceSufficiency="SUFFICIENT"|"PARTIAL"|"WEAK"|"INSUFFICIENT";
export type EvidenceCoverageLevel="STRONG"|"PARTIAL"|"WEAK"|"UNAVAILABLE"|"DEGRADED";
export type ClaimType="OBSERVED"|"DERIVED"|"SYNTHESIS"|"INTERPRETATION";
export type GroundingStatus="VALID"|"FALLBACK"|"REJECTED";

export interface AIEntityReference {type:"TECHNOLOGY"|"REGION"|"ORGANIZATION"|"POLICY"|"INDUSTRY";id:string;name:{en:string;zh:string};confidence:ResolutionConfidence;matchedAlias:string;}
export interface AIQueryContext {technologyIds:string[];regionIds:string[];organizationIds:string[];policyIds:string[];industryIds:string[];timeWindow:"1Y"|"3Y"|"5Y"|"ALL";dataMode:DataMode;allowDemoEvidence:boolean;}
export interface AIQuery {id:string;text:string;normalizedText:string;language:AILanguage;intent:AIQueryIntent;answerType:AIAnswerType;context:AIQueryContext;resolvedEntities:AIEntityReference[];ambiguity:string|null;safetyFlags:string[];createdAt:string;}
export interface AIPlanOperation {id:string;type:AIPlanOperationType;entityIds:string[];metricKeys:string[];timeWindow:AIQueryContext["timeWindow"];required:boolean;limit:number;}
export interface AIQueryPlan {id:string;queryId:string;intent:AIQueryIntent;operations:AIPlanOperation[];retrievalVersion:string;maxEvidenceItems:number;}
export interface EvidenceItem {id:string;kind:EvidenceKind;status:PublicDataStatus;title:{en:string;zh:string};summary:{en:string;zh:string};entityIds:string[];geographyId:string|null;period:string|null;value:number|null;unit:string|null;sourceId:string;sourceTitle:string;publisher:string;sourceUrl:string;sourceType:string;publishedAt:string|null;retrievedAt:string;authority:number;freshness:number;directness:number;provenanceCompleteness:number;relevance:number;providerStatus?:ProviderHealthStatus;isDemo:boolean;}
export interface EvidenceGroup {kind:EvidenceKind;items:EvidenceItem[];coverage:EvidenceCoverageLevel;}
export interface EvidenceCoverage {research:EvidenceCoverageLevel;patents:EvidenceCoverageLevel;policy:EvidenceCoverageLevel;organizations:EvidenceCoverageLevel;relationships:EvidenceCoverageLevel;regionalContext:EvidenceCoverageLevel;methodology:EvidenceCoverageLevel;}
export interface EvidenceConflict {id:string;field:string;itemIds:string[];description:{en:string;zh:string};resolved:boolean;}
export interface EvidenceSufficiencyAssessment {state:EvidenceSufficiency;score:number;directEvidenceCount:number;sourceTypeCount:number;missingCriticalDimensions:string[];reasons:{en:string[];zh:string[]};}
export interface EvidencePack {id:string;query:AIQuery;plan:AIQueryPlan;items:EvidenceItem[];groups:EvidenceGroup[];coverage:EvidenceCoverage;conflicts:EvidenceConflict[];missingData:{key:string;en:string;zh:string}[];limitations:{en:string;zh:string}[];snapshotIds:string[];sufficiency:EvidenceSufficiencyAssessment;createdAt:string;}
export interface GroundedClaim {id:string;claim:{en:string;zh:string};supportIds:string[];claimType:ClaimType;confidence:"HIGH"|"MEDIUM"|"LOW";}
export interface AICitation {id:string;sourceId:string;title:string;publisher:string;url:string;sourceType:string;publishedAt:string|null;retrievedAt:string;relatedClaimIds:string[];dataStatus:PublicDataStatus;}
export interface AIAnswerSection {id:string;title:{en:string;zh:string};body:{en:string;zh:string};claimIds:string[];}
export interface AIUncertainty {code:string;severity:"INFO"|"WARNING"|"CRITICAL";message:{en:string;zh:string};}
export interface AIFollowUpSuggestion {id:string;text:{en:string;zh:string};query:string;context:Partial<AIQueryContext>;}
export interface AIResponseMetadata {queryId:string;intent:AIQueryIntent;answerType:AIAnswerType;createdAt:string;provider:string;modelIdentifier:string|null;promptVersion:string;dataSnapshotIds:string[];retrievalVersion:string;evidenceCount:number;evidenceSufficiency:EvidenceSufficiency;dataCoverage:EvidenceCoverage;groundingStatus:GroundingStatus;generationMode:"EVIDENCE_FIRST"|"LIVE_MODEL"|"SAFE_FALLBACK";cacheKey:string;}
export interface AIAnswer {id:string;language:AILanguage;title:{en:string;zh:string};summary:{en:string;zh:string};sections:AIAnswerSection[];claims:GroundedClaim[];citations:AICitation[];limitations:{en:string;zh:string}[];dataGaps:{en:string;zh:string}[];uncertainties:AIUncertainty[];followUps:AIFollowUpSuggestion[];metadata:AIResponseMetadata;}
export interface AIValidationResult {valid:boolean;errors:string[];unsupportedClaimIds:string[];invalidCitationIds:string[];demoLeakageIds:string[];}
export interface AIProviderRequest {query:AIQuery;plan:AIQueryPlan;evidencePack:EvidencePack;promptVersion:string;maxAnswerLength:number;}
export interface AIProviderResponse {answer:AIAnswer;rawProviderMetadata:{provider:string;modelIdentifier:string|null;latencyMs:number};}
export interface DataGapObservation {id:string;queryId:string;dimension:string;entityIds:string[];description:string;severity:"INFO"|"WARNING"|"CRITICAL";requiresHumanReview:boolean;}
