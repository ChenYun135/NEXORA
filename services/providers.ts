import type { Patent, Policy, ResearchPaper, Source } from "@/domain/models";
import type { PolicyRecord, PolicySignal, PolicySource, PolicyTimelineEvent } from "@/domain/policy";
import type { OrganizationProfile, OrganizationRelationship, OrganizationSignal, OrganizationSource, OrganizationType } from "@/domain/organizations";
import type { CanonicalObservation, OrganizationIdentityCandidate, ProviderHealth, ProviderId, ProviderPage } from "@/domain/public-data";
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
export interface OrganizationDataProvider {
 getOrganizations():Promise<OrganizationProfile[]>;
 getOrganizationById(id:string):Promise<OrganizationProfile|null>;
 searchOrganizations(query:string):Promise<OrganizationProfile[]>;
 getOrganizationsByIndustry(industryId:string):Promise<OrganizationProfile[]>;
 getOrganizationsByTechnology(technologyId:string):Promise<OrganizationProfile[]>;
 getOrganizationsByRegion(regionId:string):Promise<OrganizationProfile[]>;
 getOrganizationsByType(type:OrganizationType):Promise<OrganizationProfile[]>;
 getOrganizationRelationships(organizationId?:string):Promise<OrganizationRelationship[]>;
 getOrganizationSignals(organizationId?:string):Promise<OrganizationSignal[]>;
 getOrganizationSources(organizationId?:string):Promise<OrganizationSource[]>;
}

/** Additive Sprint 7 contracts; legacy demo providers above remain unchanged. */
export interface PublicDataProvider { readonly provider:ProviderId; health():Promise<ProviderHealth>; }
export interface CanonicalResearchDataProvider extends PublicDataProvider { getTopicActivity(topicId:string,fromYear:number,toYear:number):Promise<ProviderPage<CanonicalObservation>>; }
export interface CanonicalEconomicDataProvider extends PublicDataProvider { getIndicator(indicator:string,countryCodes:string[],fromYear:number,toYear:number):Promise<ProviderPage<CanonicalObservation>>; }
export interface CanonicalOrganizationIdentityProvider extends PublicDataProvider { getIdentities():Promise<ProviderPage<OrganizationIdentityCandidate>>; }
