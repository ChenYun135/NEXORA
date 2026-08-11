import type { Patent, Policy, ResearchPaper, Source } from "@/domain/models";
import type { PolicyRecord, PolicySignal, PolicySource, PolicyTimelineEvent } from "@/domain/policy";
export interface ResearchDataProvider { search(query:string):Promise<ResearchPaper[]>; }
export interface PatentDataProvider { search(query:string):Promise<Patent[]>; }
export interface LegacyPolicyDataProvider { search(query:string):Promise<Policy[]>; }
export interface PolicyDataProvider {
 getPolicies():Promise<PolicyRecord[]>;
 getPolicyById(id:string):Promise<PolicyRecord|null>;
 searchPolicies(query:string):Promise<PolicyRecord[]>;
 getPoliciesByIndustry(industryId:string):Promise<PolicyRecord[]>;
 getPoliciesByTechnology(technologyId:string):Promise<PolicyRecord[]>;
 getPoliciesByJurisdiction(jurisdictionId:string):Promise<PolicyRecord[]>;
 getPolicySignals():Promise<PolicySignal[]>;
 getPolicyTimeline(policyId?:string):Promise<PolicyTimelineEvent[]>;
 getPolicySources(policyId?:string):Promise<PolicySource[]>;
}
export interface EconomicDataProvider { getIndicator(code:string, region:string):Promise<{value:number;sources:Source[]}>; }
export interface AIProvider { interpret(prompt:string, context:unknown):Promise<{text:string; model:string}>; }
export interface AtlasGeographyProvider { getRegions(industryId?:string):Promise<{id:string;latitude:number;longitude:number;sources:Source[]}[]>; }
export interface InstitutionDataProvider { searchByRegion(regionId:string):Promise<{id:string;name:string;sources:Source[]}[]>; }
