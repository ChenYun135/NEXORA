export type LocalizedText = { en: string; zh: string };
export type ProvenanceKind = "observed_public_data" | "derived_metric" | "nexora_composite_score" | "ai_interpretation";
export type SourceType = "research" | "patent" | "economic" | "government" | "university" | "company" | "methodology";
export interface Source { id:string; name:string; url:string; sourceType:SourceType; publisher?:string; accessedAt:string; license?:string; }
export interface Provenance { kind:ProvenanceKind; sources:Source[]; methodology?:string; }
export interface Entity { id:string; name:LocalizedText; description?:LocalizedText; sources?:Source[]; }
export interface Industry extends Entity { maturity:"emerging"|"scaling"|"established"; technologies:string[]; }
export interface Technology extends Entity { industryIds:string[]; readinessLevel?:number; }
export interface Company extends Entity { technologyIds:string[]; cityId?:string; foundedYear?:number; }
export interface University extends Entity { cityId?:string; technologyIds:string[]; }
export interface ResearchPaper extends Entity { doi?:string; publishedAt:string; technologyIds:string[]; }
export interface Patent extends Entity { publicationNumber:string; filedAt:string; technologyIds:string[]; }
export interface Policy extends Entity { jurisdictionId:string; officialUrl:string; industryIds:string[]; }
export interface Investor extends Entity { companyIds:string[]; }
export interface Organization extends Entity { organizationType:string; cityId?:string; }
export interface City extends Entity { regionId:string; countryId:string; }
export interface Region extends Entity { countryId:string; }
export interface Country extends Entity { isoCode:string; }
export interface Metric { id:string; name:LocalizedText; value:number; unit:string; observedAt:string; geography:string; timePeriod:string; methodology:string; isDerived:boolean; confidence:number; notes?:LocalizedText; provenance:Provenance; }
export interface Signal extends Entity { strength:number; momentum:number; metricIds:string[]; }
export type RelationshipType = "belongs_to"|"develops"|"researches"|"relates_to"|"supports"|"regulates"|"invests_in"|"located_in";
export interface Relationship { id:string; fromId:string; toId:string; type:RelationshipType; provenance:Provenance; }
