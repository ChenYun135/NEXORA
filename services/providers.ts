import type { Patent, Policy, ResearchPaper, Source } from "@/domain/models";
export interface ResearchDataProvider { search(query:string):Promise<ResearchPaper[]>; }
export interface PatentDataProvider { search(query:string):Promise<Patent[]>; }
export interface PolicyDataProvider { search(query:string):Promise<Policy[]>; }
export interface EconomicDataProvider { getIndicator(code:string, region:string):Promise<{value:number;sources:Source[]}>; }
export interface AIProvider { interpret(prompt:string, context:unknown):Promise<{text:string; model:string}>; }
export interface AtlasGeographyProvider { getRegions(industryId?:string):Promise<{id:string;latitude:number;longitude:number;sources:Source[]}[]>; }
export interface InstitutionDataProvider { searchByRegion(regionId:string):Promise<{id:string;name:string;sources:Source[]}[]>; }
