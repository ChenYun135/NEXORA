import type { GeographyLevel, MissingValueStatus, RegionYearObservation } from "../../domain/research-data.ts";

export interface ProviderRequestPlan {providerId:string;officialOrigin:string;path:string;query:Record<string,string>;authentication:"NONE"|"OPTIONAL_KEY"|"REQUIRED_KEY";responseFormat:"JSON"|"CSV"|"ZIP";}

const requireCode=(value:string,pattern:RegExp,label:string)=>{if(!pattern.test(value))throw new Error(`INVALID_${label}`);return value};
export const providerRequestPlans={
  nsfAwards:(state:string,year:number):ProviderRequestPlan=>({providerId:"NSF_AWARDS",officialOrigin:"https://api.nsf.gov",path:"/services/v1/awards.json",query:{awardeeStateCode:requireCode(state,/^[A-Z]{2}$/,"STATE"),startDateStart:`01/01/${year}`,startDateEnd:`12/31/${year}`,rpp:"1000",offset:"1"},authentication:"NONE",responseFormat:"JSON"}),
  censusBfs:(year:number,state="*"):ProviderRequestPlan=>({providerId:"CENSUS_BFS",officialOrigin:"https://api.census.gov",path:"/data/timeseries/eits/bfs",query:{get:"data_type_code,time_slot_id,seasonally_adj,category_code,cell_value,error_data",for:`state:${requireCode(state,/^(?:\*|\d{2})$/,"STATE_FIPS")}`,time:String(year)},authentication:"REQUIRED_KEY",responseFormat:"JSON"}),
  censusBds:(year:number,state="*"):ProviderRequestPlan=>({providerId:"CENSUS_BDS",officialOrigin:"https://api.census.gov",path:"/data/timeseries/bds",query:{get:"FIRM,FIRMDEATH_FIRMS,ESTABS_ENTRY,JOB_CREATION",for:`state:${requireCode(state,/^(?:\*|\d{2})$/,"STATE_FIPS")}`,YEAR:String(year)},authentication:"REQUIRED_KEY",responseFormat:"JSON"}),
  censusAcs:(year:number,variables:string[],state="*"):ProviderRequestPlan=>({providerId:"CENSUS_ACS",officialOrigin:"https://api.census.gov",path:`/data/${year}/acs/acs5`,query:{get:variables.map(value=>requireCode(value,/^[A-Z]\d{5}_\d{3}[EM]$/,"ACS_VARIABLE")).join(","),for:`state:${requireCode(state,/^(?:\*|\d{2})$/,"STATE_FIPS")}`},authentication:"REQUIRED_KEY",responseFormat:"JSON"}),
  federalRegister:(from:string,to:string):ProviderRequestPlan=>({providerId:"FEDERAL_REGISTER",officialOrigin:"https://www.federalregister.gov",path:"/api/v1/documents.json",query:{"conditions[publication_date][gte]":requireCode(from,/^\d{4}-\d{2}-\d{2}$/,"DATE"),"conditions[publication_date][lte]":requireCode(to,/^\d{4}-\d{2}-\d{2}$/,"DATE"),per_page:"1000"},authentication:"NONE",responseFormat:"JSON"}),
  beaRegional:(tableName:string,lineCode:number,year:number):ProviderRequestPlan=>({providerId:"BEA_REGIONAL",officialOrigin:"https://apps.bea.gov",path:"/api/data",query:{method:"GetData",datasetname:"Regional",TableName:requireCode(tableName,/^[A-Z0-9_]{2,30}$/,"BEA_TABLE"),LineCode:String(lineCode),GeoFIPS:"STATE",Year:String(year),ResultFormat:"JSON"},authentication:"REQUIRED_KEY",responseFormat:"JSON"}),
};

const semanticValue=(raw:string|null,flag:string|null):{value:number|null;status:MissingValueStatus}=>{
  if(flag&&["D","N","S","X"].includes(flag))return {value:null,status:"SUPPRESSED"};
  if(raw===null||raw===""||raw==="null")return {value:null,status:"MISSING"};
  const value=Number(String(raw).replaceAll(",",""));if(!Number.isFinite(value))return {value:null,status:"UNAVAILABLE"};
  return {value,status:value===0?"OBSERVED_ZERO":"OBSERVED"};
};

export const parseCensusRows=(input:{providerId:"CENSUS_BFS"|"CENSUS_BDS"|"CENSUS_ACS";metricId:string;year:number;rows:string[][];valueColumn:string;flagColumn?:string;geographyLevel?:GeographyLevel;snapshotId:string;retrievalDate:string}):RegionYearObservation[]=>{
  const [header,...data]=input.rows;if(!header)throw new Error("CENSUS_SCHEMA_EMPTY");
  const valueIndex=header.indexOf(input.valueColumn),flagIndex=input.flagColumn?header.indexOf(input.flagColumn):-1,stateIndex=header.indexOf("state");
  if(valueIndex<0||stateIndex<0||input.flagColumn&&flagIndex<0)throw new Error("CENSUS_SCHEMA_INVALID");
  return data.map(row=>{const parsed=semanticValue(row[valueIndex]??null,flagIndex>=0?row[flagIndex]??null:null);return {regionType:input.geographyLevel??"STATE",regionId:row[stateIndex],year:input.year,metricId:input.metricId,value:parsed.value,unit:"provider-defined",status:parsed.status,providerId:input.providerId,snapshotId:input.snapshotId,sourcePeriod:String(input.year),retrievalDate:input.retrievalDate,observationYear:input.year};});
};

export const validateAwardRecord=(record:Record<string,unknown>,kind:"NSF_AWARD"|"SBIR_STTR")=>{
  const id=String(record.awardId??record.id??"").trim();const amount=Number(record.awardAmount??record.amount??NaN);const state=String(record.state??record.awardeeStateCode??"").trim();
  const errors:string[]=[];if(!id)errors.push("MISSING_AWARD_ID");if(!Number.isFinite(amount)||amount<0)errors.push("INVALID_AWARD_AMOUNT");if(state&&!/^[A-Z]{2}$/.test(state))errors.push("INVALID_STATE");
  return {kind,id,errors,valid:errors.length===0};
};

export const validateInstitutionRecord=(record:Record<string,unknown>)=>{const id=String(record.institutionId??"").trim(),year=Number(record.year),total=Number(record.totalRd);const errors:string[]=[];if(!id)errors.push("MISSING_INSTITUTION_ID");if(!Number.isInteger(year))errors.push("INVALID_YEAR");if(!Number.isFinite(total)||total<0)errors.push("INVALID_TOTAL_RD");return {id,year,errors,valid:errors.length===0};};
