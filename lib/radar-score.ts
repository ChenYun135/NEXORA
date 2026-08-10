import type { MomentumMetric, OpportunityContribution, OpportunityDimensionKey, OpportunityScore, OpportunityScoreConfig } from "../domain/radar";

export function normalizeWeights(config:OpportunityScoreConfig,available:Set<OpportunityDimensionKey>){
 const included=config.dimensions.filter(d=>available.has(d.key));
 const total=included.reduce((sum,d)=>sum+d.weight,0);
 if(total<=0)return [];
 return included.map(d=>({...d,effectiveWeight:d.weight/total}));
}

export function calculateOpportunityScore(metrics:MomentumMetric[],config:OpportunityScoreConfig):OpportunityScore{
 const availableValues=new Map(metrics.filter((m):m is MomentumMetric&{value:number}=>m.value!==null).map(m=>[m.key,m.value]));
 const available=new Set(availableValues.keys());
 const normalized=normalizeWeights(config,available);
 const missing=config.dimensions.filter(d=>!available.has(d.key)).map(d=>d.key);
 if(normalized.length===0)return {value:null,contributions:[],missing,availableWeight:0,isComposite:true,isDemo:true};
 const contributions:OpportunityContribution[]=normalized.map(d=>({key:d.key,rawValue:availableValues.get(d.key)!,effectiveWeight:d.effectiveWeight,weightedValue:availableValues.get(d.key)!*d.effectiveWeight}));
 const raw=contributions.reduce((sum,c)=>sum+c.weightedValue,0);
 const factor=10**config.precision;
 return {value:Math.round(raw*factor)/factor,contributions,missing,availableWeight:config.dimensions.filter(d=>available.has(d.key)).reduce((s,d)=>s+d.weight,0),isComposite:true,isDemo:true};
}

export function technologyMatchesFilters(technology:{industryId:string;stage:string;confidence:{level:string};regions:string[];metrics:MomentumMetric[]},filters:{industry?:string;stage?:string;confidence?:string;region?:string;categoryKey?:OpportunityDimensionKey;minimumMomentum?:number},config:OpportunityScoreConfig){
 if(filters.industry&&technology.industryId!==filters.industry)return false;
 if(filters.stage&&technology.stage!==filters.stage)return false;
 if(filters.confidence&&technology.confidence.level!==filters.confidence)return false;
 if(filters.region&&!technology.regions.includes(filters.region))return false;
 if(filters.categoryKey&&!technology.metrics.some(m=>m.key===filters.categoryKey&&m.value!==null))return false;
 const score=calculateOpportunityScore(technology.metrics,config).value;
 if(filters.minimumMomentum!==undefined&&(score===null||score<filters.minimumMomentum))return false;
 return true;
}
