import type { CanonicalObservation, ProviderPage, ProviderRequest } from "../../domain/public-data.ts";
import { dataGovCatalogRecords, verifiedOrganizations, verifiedPolicies } from "../../data/production/pilot.ts";

type FetchLike=(input:string,init?:RequestInit)=>Promise<Response>;
const PROVIDER_ORIGINS={OPENALEX:"https://api.openalex.org",WORLD_BANK:"https://api.worldbank.org",DATA_GOV:"https://catalog.data.gov",USPTO:"https://api.uspto.gov"} as const;
type RemoteProvider=keyof typeof PROVIDER_ORIGINS;
interface CacheEntry {expiresAt:number;value:unknown;}

export class ControlledProviderClient {
 private cache=new Map<string,CacheEntry>(); private failures=new Map<RemoteProvider,{count:number;openedAt:number}>();
 private readonly transport:FetchLike;private readonly now:()=>number;
 constructor(transport:FetchLike=fetch,now=()=>Date.now()){this.transport=transport;this.now=now}
 async requestJson<T>(provider:RemoteProvider,request:ProviderRequest,options:{ttlMs:number;maxRetries?:number;headers?:Record<string,string>}):Promise<T>{
  if(!request.path.startsWith("/")||request.path.includes(".."))throw new Error("INVALID_PROVIDER_PATH");
  const circuit=this.failures.get(provider);if(circuit&&circuit.count>=3&&this.now()-circuit.openedAt<60_000)throw new Error("PROVIDER_CIRCUIT_OPEN");
  const url=new URL(request.path,PROVIDER_ORIGINS[provider]);for(const [key,value] of Object.entries(request.query))if(value!==undefined)url.searchParams.set(key,String(value));
  if(url.origin!==PROVIDER_ORIGINS[provider])throw new Error("PROVIDER_ORIGIN_REJECTED");
  const cacheKey=`${provider}:${url.pathname}:${[...url.searchParams.entries()].sort().map(x=>x.join("=")).join("&")}`;const hit=this.cache.get(cacheKey);if(hit&&hit.expiresAt>this.now())return hit.value as T;
  const attempts=(options.maxRetries??2)+1;let last:unknown;
  for(let attempt=0;attempt<attempts;attempt++){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),request.timeoutMs??10_000);try{const response=await this.transport(url.toString(),{headers:{accept:"application/json",...options.headers},signal:controller.signal});if(!response.ok){const error=new Error(`UPSTREAM_${response.status}`);if(response.status<500&&response.status!==429)throw error;last=error;}else{const value=await response.json() as T;this.cache.set(cacheKey,{expiresAt:this.now()+options.ttlMs,value});this.failures.delete(provider);return value;}}catch(error){last=error;}finally{clearTimeout(timer)}if(attempt<attempts-1)await new Promise(resolve=>setTimeout(resolve,Math.min(50*2**attempt,250)+attempt*7));}
  const state=this.failures.get(provider)??{count:0,openedAt:this.now()};this.failures.set(provider,{count:state.count+1,openedAt:state.openedAt});throw last instanceof Error?last:new Error("PROVIDER_REQUEST_FAILED");
 }
}

interface OpenAlexGroupResponse {meta:{count:number};group_by:{key:string;count:number}[];}
export class OpenAlexProvider {
 private client:ControlledProviderClient;private apiKey?:string;
 constructor(client:ControlledProviderClient,apiKey?:string){this.client=client;this.apiKey=apiKey}
 async getTopicActivity(topicId:string,fromYear:number,toYear:number):Promise<ProviderPage<CanonicalObservation>>{if(!/^T\d+$/.test(topicId)||fromYear<1900||toYear>new Date().getUTCFullYear()||fromYear>toYear)throw new Error("INVALID_OPENALEX_QUERY");const response=await this.client.requestJson<OpenAlexGroupResponse>("OPENALEX",{path:"/works",query:{filter:`topics.id:${topicId},publication_year:${fromYear}-${toYear}`,group_by:"publication_year",per_page:100,api_key:this.apiKey},timeoutMs:12_000},{ttlMs:30*24*60*60*1000});const retrievedAt=new Date().toISOString();return {records:response.group_by.map(x=>({id:`oa-${topicId}-${x.key}`,datasetId:"openalex-topic-activity",metricKey:"publication_count",entityId:`openalex-topic-${topicId}`,geographyType:null,geographyId:null,period:x.key,value:x.count,unit:"works",scale:1,currency:null,status:"OBSERVED",sourceRecordIds:[`openalex-group-${topicId}-${x.key}`],observedAt:`${x.key}-12-31`,retrievedAt})),nextCursor:null,total:response.meta.count,retrievedAt};}
}

type WorldBankResponse=[{page:number;pages:number;total:number},Array<{countryiso3code:string;date:string;value:number|null}>];
export class WorldBankProvider {
 private client:ControlledProviderClient;constructor(client:ControlledProviderClient){this.client=client}
 async getIndicator(indicatorId:string,countries:string[],fromYear:number,toYear:number):Promise<ProviderPage<CanonicalObservation>>{if(!/^[A-Z0-9.]+$/.test(indicatorId)||!countries.length||countries.some(x=>!/^[A-Z]{2}$/.test(x)))throw new Error("INVALID_WORLD_BANK_QUERY");const response=await this.client.requestJson<WorldBankResponse>("WORLD_BANK",{path:`/v2/country/${countries.join(";")}/indicator/${indicatorId}`,query:{format:"json",date:`${fromYear}:${toYear}`,per_page:1000},timeoutMs:12_000},{ttlMs:90*24*60*60*1000});const retrievedAt=new Date().toISOString(),rows=Array.isArray(response?.[1])?response[1]:[];return {records:rows.map(x=>({id:`wb-${indicatorId}-${x.countryiso3code}-${x.date}`,datasetId:`world-bank-${indicatorId}`,metricKey:indicatorId,entityId:null,geographyType:"COUNTRY",geographyId:x.countryiso3code,period:x.date,value:x.value,unit:"provider-defined",scale:1,currency:null,status:"OBSERVED",sourceRecordIds:[`wb-${indicatorId}-${x.countryiso3code}-${x.date}`],observedAt:`${x.date}-12-31`,retrievedAt})),nextCursor:null,total:response?.[0]?.total??null,retrievedAt};}
}

interface CkanResponse {success:boolean;result:{count:number;results:{id:string;title:string;metadata_modified?:string;organization?:{title?:string}}[]};}
export class DataGovProvider {
 private client:ControlledProviderClient;constructor(client:ControlledProviderClient){this.client=client}
 async searchCatalog(query:string,rows=10){if(!/^[\w\s-]{2,80}$/.test(query)||rows<1||rows>50)throw new Error("INVALID_DATA_GOV_QUERY");const response=await this.client.requestJson<CkanResponse>("DATA_GOV",{path:"/api/3/action/package_search",query:{q:query,rows},timeoutMs:10_000},{ttlMs:7*24*60*60*1000,maxRetries:1});if(!response.success)throw new Error("DATA_GOV_SCHEMA_INVALID");return response.result.results;}
 getLastKnownGood(){return dataGovCatalogRecords;}
}

export class USPTOProvider {
 private client:ControlledProviderClient;private apiKey?:string;
 constructor(client:ControlledProviderClient,apiKey?:string){this.client=client;this.apiKey=apiKey}
 async searchProducts(term:string){if(!this.apiKey)throw new Error("USPTO_NOT_CONFIGURED");if(!/^[\w\s-]{2,80}$/.test(term))throw new Error("INVALID_USPTO_QUERY");return this.client.requestJson<unknown>("USPTO",{path:"/api/v1/datasets/products/search",query:{q:term},timeoutMs:15_000},{ttlMs:30*24*60*60*1000,headers:{"X-API-KEY":this.apiKey}});}
}
export class OfficialPolicyProvider {async getPolicies(){return verifiedPolicies}async getPolicyById(id:string){return verifiedPolicies.find(x=>x.id===id)??null}}
export class OfficialOrganizationProvider {async getOrganizations(){return verifiedOrganizations}async getOrganizationById(id:string){return verifiedOrganizations.find(x=>x.id===id)??null}}
