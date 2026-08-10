import type { LocalizedText, Provenance, Relationship, SourceType } from "./models";

export type SignalCategory="RESEARCH"|"PATENTS"|"STARTUPS"|"CAPITAL"|"POLICY"|"TALENT"|"MARKET"|"TECHNOLOGY_MATURITY"|"ECOSYSTEM_ACTIVITY";
export type TechnologyStage="FRONTIER_RESEARCH"|"EMERGING"|"EARLY_COMMERCIALIZATION"|"SCALING"|"ESTABLISHED";
export type TrendDirection="ACCELERATING"|"RISING"|"STABLE"|"COOLING"|"UNCERTAIN";
export type ConfidenceLevel="HIGH"|"MEDIUM"|"LOW"|"INSUFFICIENT";
export type DataStatus="OBSERVED_PUBLIC"|"DERIVED"|"COMPOSITE"|"AI_INTERPRETATION"|"DEMO";
export type OpportunityDimensionKey="research"|"patents"|"startups"|"capital"|"policy"|"talent"|"marketReadiness"|"technologyMaturity"|"ecosystemStrength";
export interface EmergingIndustry {id:string;name:LocalizedText;description:LocalizedText;sectorIndex:number;}
export interface TimeSeriesPoint {period:string;value:number|null;isDemo:boolean;}
export interface EvidenceRecord {id:string;sourceId:string;sourceName:string;sourceType:Uppercase<SourceType>|"PUBLIC_DATABASE"|"OTHER_PUBLIC_SOURCE";sourceUrl:string;title:LocalizedText;publishedAt?:string;retrievedAt:string;geography:string;timePeriod:string;metricKey?:string;observationType:"OBSERVED"|"DERIVED"|"MODELED";methodology?:string;confidence:ConfidenceLevel;isDerived:boolean;isDemo:boolean;}
export interface SignalObservation {id:string;technologyId:string;title:LocalizedText;category:SignalCategory;region:string;observationPeriod:string;direction:TrendDirection;confidence:ConfidenceLevel;dataStatus:DataStatus;evidence:EvidenceRecord[];isDemo:boolean;}
export interface MomentumMetric {key:OpportunityDimensionKey;label:LocalizedText;value:number|null;direction:TrendDirection;provenance:Provenance;}
export interface OpportunityDimension {key:OpportunityDimensionKey;label:LocalizedText;weight:number;}
export interface OpportunityScoreConfig {version:string;dimensions:OpportunityDimension[];missingData:"RENORMALIZE_AVAILABLE";precision:number;}
export interface OpportunityContribution {key:OpportunityDimensionKey;rawValue:number;effectiveWeight:number;weightedValue:number;}
export interface OpportunityScore {value:number|null;contributions:OpportunityContribution[];missing:OpportunityDimensionKey[];availableWeight:number;isComposite:true;isDemo:true;}
export interface ConfidenceAssessment {level:ConfidenceLevel;completeness:number;sourceDiversity:number;recency:number;consistency:number;isDemoConfigured:boolean;}
export interface EmergingTechnology {id:string;name:LocalizedText;industryId:string;summary:LocalizedText;stage:TechnologyStage;direction:TrendDirection;change:number|null;primarySignal:SignalCategory;confidence:ConfidenceAssessment;regions:string[];metrics:MomentumMetric[];timeSeries:Record<"1Y"|"3Y"|"5Y",TimeSeriesPoint[]>;related:Relationship[];risks:LocalizedText[];evidence:EvidenceRecord[];}
export type IndustryRegionRelationship={industryId:string;regionId:string;strength:number|null;confidence:ConfidenceLevel;isDemo:boolean;};
export interface RadarSnapshot {id:string;capturedAt:string;methodologyVersion:string;technologyIds:string[];dataStatus:DataStatus;}
export interface RadarMethodology {version:string;radialEncoding:"MATURITY_CENTER_TO_FRONTIER";scoreConfig:OpportunityScoreConfig;confidenceFactors:(keyof Omit<ConfidenceAssessment,"level"|"isDemoConfigured">)[];}
