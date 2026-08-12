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
 async requestJson<T>(provider:RemoteProvider,request:ProviderRequest,options:{ttlMs:number;maxRetries?:number;headers?:Record<string,string>;method?:"GET"|"POST";body?:unknown}):Promise<T>{
  if(!request.path.startsWith("/")||request.path.includes(".."))throw new Error("INVALID_PROVIDER_PATH");
  const circuit=this.failures.get(provider);if(circuit&&circuit.count>=3&&this.now()-circuit.openedAt<60_000)throw new Error("PROVIDER_CIRCUIT_OPEN");
  const url=new URL(request.path,PROVIDER_ORIGINS[provider]);for(const [key,value] of Object.entries(request.query))if(value!==undefined)url.searchParams.set(key,String(value));
  if(url.origin!==PROVIDER_ORIGINS[provider])throw new Error("PROVIDER_ORIGIN_REJECTED");
  const method=options.method??"GET";const serializedBody=options.body===undefined?"":JSON.stringify(options.body);
  const cacheKey=`${provider}:${method}:${url.pathname}:${[...url.searchParams.entries()].sort().map(x=>x.join("=")).join("&")}:${serializedBody}`;const hit=this.cache.get(cacheKey);if(hit&&hit.expiresAt>this.now())return hit.value as T;
  const attempts=(options.maxRetries??2)+1;let last:unknown;
  for(let attempt=0;attempt<attempts;attempt++){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),request.timeoutMs??10_000);let retryAfterMs=0;try{const response=await this.transport(url.toString(),{method,headers:{accept:"application/json",...(serializedBody?{"content-type":"application/json"}:{}),...options.headers},body:serializedBody||undefined,signal:controller.signal});if(!response.ok){const error=new Error(`UPSTREAM_${response.status}`);if(response.status===429){const retryAfter=response.headers.get("retry-after");retryAfterMs=retryAfter&&/^\d+$/.test(retryAfter)?Math.min(Number(retryAfter)*1000,30_000):0;}if(response.status<500&&response.status!==429)throw error;last=error;}else{const value=await response.json() as T;this.cache.set(cacheKey,{expiresAt:this.now()+options.ttlMs,value});this.failures.delete(provider);return value;}}catch(error){last=error;}finally{clearTimeout(timer)}if(attempt<attempts-1)await new Promise(resolve=>setTimeout(resolve,retryAfterMs||Math.min(50*2**attempt,250)+attempt*7));}
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

export interface USPTOApplicationSearchInput {cpcCodes:string[];filingDateFrom?:string;filingDateTo?:string;offset?:number;limit?:number;}
export interface USPTOApplicationRecord {applicationNumber:string;inventionTitle:string|null;filingDate:string|null;grantDate:string|null;publicationDate:string|null;patentNumber:string|null;cpcCodes:string[];applicants:{name:string|null;city:string|null;state:string|null;country:string|null}[];assignees:{name:string|null;city:string|null;state:string|null;country:string|null}[];inventors:{name:string|null;city:string|null;state:string|null;country:string|null}[];geographyRule:"SOURCE_RECORD_ADDRESS_ONLY";}
interface USPTOApplicationResponse {count:number;patentFileWrapperDataBag:unknown[];}
const usptoFields=["applicationNumberText","applicationMetaData.inventionTitle","applicationMetaData.filingDate","applicationMetaData.grantDate","applicationMetaData.earliestPublicationDate","applicationMetaData.patentNumber","applicationMetaData.cpcClassificationBag","applicationMetaData.applicantBag","applicationMetaData.assignmentBag","applicationMetaData.inventorBag"];
const asText=(value:unknown)=>typeof value==="string"&&value.trim()?value.trim():null;
const addressRows=(value:unknown)=>Array.isArray(value)?value.map((entry)=>{const row=(entry&&typeof entry==="object"?entry:{}) as Record<string,unknown>,address=(row.addressBag??row.address) as Record<string,unknown>|undefined;return {name:asText(row.applicantName??row.assigneeName??row.inventorName??row.name),city:asText(address?.cityName??row.cityName),state:asText(address?.geographicRegionName??row.geographicRegionName??row.stateCode),country:asText(address?.countryCode??row.countryCode)};}):[];
const cpcRows=(value:unknown)=>Array.isArray(value)?[...new Set(value.flatMap((entry)=>{if(typeof entry==="string")return [entry];if(entry&&typeof entry==="object"){const row=entry as Record<string,unknown>;return [asText(row.cpcClassificationText??row.cpcSymbol??row.classificationCode)].filter((x):x is string=>Boolean(x));}return []}))]:[];

export class USPTOProvider {
 private client:ControlledProviderClient;private apiKey?:string;private lastKnownGood:{records:USPTOApplicationRecord[];total:number;retrievedAt:string}|null=null;
 constructor(client:ControlledProviderClient,apiKey?:string){this.client=client;this.apiKey=apiKey}
 async searchProducts(term:string){if(!this.apiKey)throw new Error("USPTO_NOT_CONFIGURED");if(!/^[\w\s-]{2,80}$/.test(term))throw new Error("INVALID_USPTO_QUERY");return this.client.requestJson<unknown>("USPTO",{path:"/api/v1/datasets/products/search",query:{q:term},timeoutMs:15_000},{ttlMs:30*24*60*60*1000,headers:{"X-API-KEY":this.apiKey}});}
 async searchApplications(input:USPTOApplicationSearchInput):Promise<{records:USPTOApplicationRecord[];total:number;nextOffset:number|null;status:"STAGED_NOT_PROMOTED";quality:{schemaValid:true;unique:boolean;taxonomyCoverage:number;geographyCoverage:number;promotionAllowed:false}}>{
  if(!this.apiKey)throw new Error("USPTO_NOT_CONFIGURED");
  const codes=[...new Set(input.cpcCodes.map(x=>x.trim().toUpperCase()))];if(!codes.length||codes.some(x=>!/^[A-HY]\d{2}[A-Z]\d+(?:\/\d+)?$/.test(x)))throw new Error("INVALID_USPTO_CPC_QUERY");
  const offset=input.offset??0,limit=input.limit??100;if(offset<0||limit<1||limit>100)throw new Error("INVALID_USPTO_PAGINATION");
  for(const date of [input.filingDateFrom,input.filingDateTo])if(date&&!/^\d{4}-\d{2}-\d{2}$/.test(date))throw new Error("INVALID_USPTO_DATE");
  const body={q:codes.map(code=>`applicationMetaData.cpcClassificationBag:${code}`).join(" OR "),filters:[],rangeFilters:input.filingDateFrom||input.filingDateTo?[{field:"applicationMetaData.filingDate",from:input.filingDateFrom,to:input.filingDateTo}]:[],sort:[{field:"applicationMetaData.filingDate",order:"asc"}],fields:usptoFields,pagination:{offset,limit}};
  const response=await this.client.requestJson<USPTOApplicationResponse>("USPTO",{path:"/api/v1/patent/applications/search",query:{},timeoutMs:20_000},{method:"POST",body,ttlMs:7*24*60*60*1000,maxRetries:3,headers:{"X-API-KEY":this.apiKey}});
  if(!response||typeof response.count!=="number"||!Array.isArray(response.patentFileWrapperDataBag))throw new Error("USPTO_SCHEMA_INVALID");
  const records=response.patentFileWrapperDataBag.map((entry)=>{if(!entry||typeof entry!=="object")throw new Error("USPTO_SCHEMA_INVALID");const row=entry as Record<string,unknown>,meta=((row.applicationMetaData&&typeof row.applicationMetaData==="object")?row.applicationMetaData:{}) as Record<string,unknown>;const applicationNumber=asText(row.applicationNumberText??meta.applicationNumberText);if(!applicationNumber)throw new Error("USPTO_SCHEMA_INVALID");return {applicationNumber,inventionTitle:asText(meta.inventionTitle),filingDate:asText(meta.filingDate),grantDate:asText(meta.grantDate),publicationDate:asText(meta.earliestPublicationDate),patentNumber:asText(meta.patentNumber),cpcCodes:cpcRows(meta.cpcClassificationBag),applicants:addressRows(meta.applicantBag),assignees:addressRows(meta.assignmentBag),inventors:addressRows(meta.inventorBag),geographyRule:"SOURCE_RECORD_ADDRESS_ONLY" as const};});
  const unique=new Set(records.map(x=>x.applicationNumber)).size===records.length;
  const taxonomyCoverage=records.length?records.filter(x=>x.cpcCodes.some(code=>codes.some(requested=>code.startsWith(requested.replace(/\/00$/,"").replace(/\/$/,""))))).length/records.length:0;
  const hasSourceGeography=(record:USPTOApplicationRecord)=>[...record.applicants,...record.assignees,...record.inventors].some(x=>Boolean(x.city||x.state||x.country));
  const geographyCoverage=records.length?records.filter(hasSourceGeography).length/records.length:0;
  if(!unique)throw new Error("USPTO_DUPLICATE_APPLICATION_NUMBER");
  this.lastKnownGood={records,total:response.count,retrievedAt:new Date().toISOString()};
  return {records,total:response.count,nextOffset:offset+records.length<response.count?offset+records.length:null,status:"STAGED_NOT_PROMOTED",quality:{schemaValid:true,unique,taxonomyCoverage,geographyCoverage,promotionAllowed:false}};
 }
 getLastKnownGood(){return this.lastKnownGood;}
}
export class OfficialPolicyProvider {async getPolicies(){return verifiedPolicies}async getPolicyById(id:string){return verifiedPolicies.find(x=>x.id===id)??null}}
export class OfficialOrganizationProvider {async getOrganizations(){return verifiedOrganizations}async getOrganizationById(id:string){return verifiedOrganizations.find(x=>x.id===id)??null}}
