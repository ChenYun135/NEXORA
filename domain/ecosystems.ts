import type { LocalizedText } from "./models";
import type { ConfidenceLevel, EvidenceRecord, OpportunityDimensionKey } from "./radar";

export type EcosystemNodeType="UNIVERSITY"|"RESEARCH_INSTITUTION"|"STARTUP"|"CORPORATION"|"INVESTOR"|"GOVERNMENT_AGENCY"|"TECHNOLOGY"|"PUBLIC_PROGRAM";
export type EcosystemEdgeType="RESEARCH_COLLABORATION"|"TECHNOLOGY_TRANSFER"|"INVESTMENT"|"PUBLIC_FUNDING"|"POLICY_SUPPORT"|"JOINT_PROGRAM"|"ACADEMIC_INDUSTRY_COLLABORATION"|"COMMERCIAL_PARTNERSHIP"|"PATENT_RELATIONSHIP"|"KNOWLEDGE_FLOW"|"SUPPLY_RELATIONSHIP"|"ECOSYSTEM_MEMBERSHIP";
export type EcosystemLayer="RESEARCH"|"TECHNOLOGY"|"CAPITAL"|"POLICY"|"COMMERCIALIZATION"|"TALENT_KNOWLEDGE"|"REGIONAL";
export type FlowType="KNOWLEDGE"|"CAPITAL"|"POLICY_SUPPORT"|"TECHNOLOGY_TRANSFER";
export type FlowDirection="DIRECTED"|"UNDIRECTED";
export type RelationshipStrength="STRONG"|"MEDIUM"|"WEAK";
export type RelationshipConfidence=ConfidenceLevel;
export type EvidenceStatus="VERIFIED_PUBLIC"|"DEMO_RELATIONSHIP"|"INSUFFICIENT";
export interface EcosystemContext {id:string;regionId:string;industryId:string;snapshotId:string;name:LocalizedText;}
export interface EcosystemNode {id:string;name:LocalizedText;nodeType:EcosystemNodeType;regionId:string;industryIds:string[];technologyIds:string[];description:LocalizedText;publicSources:string[];evidenceStatus:EvidenceStatus;isDemo:boolean;x:number;y:number;}
export interface EcosystemEvidence extends EvidenceRecord {relationshipClaim:LocalizedText;evidenceType:"OFFICIAL"|"PUBLIC_DATABASE"|"MODELED_DEMO";}
export interface EcosystemEdge {id:string;sourceNodeId:string;targetNodeId:string;relationshipType:EcosystemEdgeType;direction:FlowDirection;strength:RelationshipStrength;confidence:RelationshipConfidence;evidenceIds:string[];layers:EcosystemLayer[];flowType?:FlowType;validFrom?:string;validTo?:string;timePeriod:string;isDerived:boolean;isDemo:boolean;}
export interface EcosystemCluster {id:string;name:LocalizedText;nodeIds:string[];method:"CURATED_PROTOTYPE"|"ALGORITHMIC";description:LocalizedText;}
export type NetworkMetricType="DEGREE_CENTRALITY"|"BETWEENNESS_CENTRALITY"|"CONNECTIVITY"|"RELATIONSHIP_DIVERSITY"|"EVIDENCE_DENSITY";
export interface NetworkMetric {nodeId:string;metricType:NetworkMetricType;value:number|null;technicalName:string;isDerived:true;}
export interface EcosystemGraph {context:EcosystemContext;snapshotDate:string;nodes:EcosystemNode[];edges:EcosystemEdge[];clusters:EcosystemCluster[];evidence:EcosystemEvidence[];}
export interface EcosystemSnapshot {id:string;contextId:string;snapshotDate:string;observationPeriod:string;nodeIds:string[];edgeIds:string[];isDemo:boolean;}
export interface EcosystemFilter {regionId?:string;industryId?:string;technologyId?:string;nodeType?:EcosystemNodeType;relationshipType?:EcosystemEdgeType;layers:EcosystemLayer[];confidence?:RelationshipConfidence;evidenceStatus?:EvidenceStatus;search?:string;}
export type EcosystemHealthDimensionKey="researchConnectivity"|"commercializationConnectivity"|"capitalConnectivity"|"policyConnectivity"|"technologyDiversity"|"institutionalDiversity"|"knowledgeFlow"|"networkResilience";
export interface EcosystemHealthDimension {key:EcosystemHealthDimensionKey;name:LocalizedText;weight:number;description:LocalizedText;dataRequirement:string;}
export interface EcosystemHealthConfig {version:string;dimensions:EcosystemHealthDimension[];missingData:"RENORMALIZE_AVAILABLE";}
export interface EcosystemHealthResult {value:number|null;contributions:{key:EcosystemHealthDimensionKey;value:number;effectiveWeight:number;weightedValue:number;}[];missing:EcosystemHealthDimensionKey[];availableWeight:number;isDemoComposite:true;}
export interface EcosystemComparison {leftContextId:string;rightContextId:string;dimensions:Record<EcosystemHealthDimensionKey,number|null>;}
export interface EcosystemInsight {id:string;title:LocalizedText;description:LocalizedText;kind:"COMPUTED"|"DERIVED_DEMO";evidenceNodeIds:string[];}
export interface EcosystemGraphValidation {valid:boolean;orphanEdgeIds:string[];selfEdgeIds:string[];duplicateEdgeIds:string[];missingEvidenceEdgeIds:string[];invalidRegionNodeIds:string[];}
export type EcosystemMetricDimension=OpportunityDimensionKey|EcosystemHealthDimensionKey;
