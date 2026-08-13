export type EvidenceClass="OBSERVED"|"DERIVED"|"ASSUMPTION"|"UNAVAILABLE";
export type ModelStatus="CONCEPTUAL"|"PARTIALLY_CALIBRATED"|"EMPIRICALLY_CALIBRATED";
export type PolicyTarget="research"|"talent"|"infrastructure"|"commercialization"|"collaboration"|"adoption";

export interface ResearchVariable {id:string;layer:"observed"|"derived"|"analytical"|"simulation";kind:"stock"|"flow"|"auxiliary"|"policy-input"|"output";unit:string;definition:{en:string;zh:string};evidence:EvidenceClass;range:[number,number];sourceIds:string[]}
export interface PolicyInstrument {id:string;target:PolicyTarget;intensity:[number,number];startYear:[number,number];duration:[number,number];lag:[number,number];status:EvidenceClass;description:{en:string;zh:string}}

export const researchVariables:ResearchVariable[]=[
 {id:"research_capacity",layer:"simulation",kind:"stock",unit:"bounded index",definition:{en:"Capacity to produce relevant research.",zh:"产出相关研究的系统能力"},evidence:"DERIVED",range:[0,120],sourceIds:["openalex","ncses"]},
 {id:"knowledge_stock",layer:"simulation",kind:"stock",unit:"bounded index",definition:{en:"Accumulated model-relevant knowledge.",zh:"模型所描述的累积知识存量"},evidence:"ASSUMPTION",range:[0,120],sourceIds:[]},
 {id:"talent_pool",layer:"simulation",kind:"stock",unit:"bounded index",definition:{en:"Available relevant skills capacity.",zh:"可用相关技能与人才能力"},evidence:"DERIVED",range:[0,120],sourceIds:["bls","ipeds"]},
 {id:"collaboration_connectivity",layer:"analytical",kind:"stock",unit:"bounded index",definition:{en:"Strength and diversity of institutional links.",zh:"机构联系的强度与多样性"},evidence:"DERIVED",range:[0,120],sourceIds:["openalex"]},
 {id:"commercialization_capacity",layer:"simulation",kind:"stock",unit:"bounded index",definition:{en:"Capacity to translate knowledge into deployable activity.",zh:"将知识转化为可部署活动的能力"},evidence:"ASSUMPTION",range:[0,120],sourceIds:[]},
 {id:"venture_pipeline",layer:"simulation",kind:"stock",unit:"bounded index",definition:{en:"Aggregate pipeline of new ventures or initiatives.",zh:"新创企业或创新项目的聚合储备"},evidence:"ASSUMPTION",range:[0,120],sourceIds:["census-bfs"]},
 {id:"commercialization_flow",layer:"simulation",kind:"flow",unit:"index/year",definition:{en:"Annual knowledge-to-commercialization flow.",zh:"年度知识向商业化能力的转化流量"},evidence:"ASSUMPTION",range:[0,120],sourceIds:[]},
 {id:"value_creation",layer:"simulation",kind:"output",unit:"simulated index",definition:{en:"Conditional composite output; not GDP or welfare.",zh:"条件性综合输出，并非 GDP 或福利指标"},evidence:"ASSUMPTION",range:[0,120],sourceIds:[]},
];

export const policyInstruments:PolicyInstrument[]=[
 {id:"public_research_support",target:"research",intensity:[0,1],startYear:[0,15],duration:[1,15],lag:[0,4],status:"ASSUMPTION",description:{en:"Competitive or institutional public research support.",zh:"竞争性或机构性公共科研支持"}},
 {id:"workforce_development",target:"talent",intensity:[0,1],startYear:[0,15],duration:[1,15],lag:[1,6],status:"ASSUMPTION",description:{en:"Education, training and workforce instruments.",zh:"教育、培训与人才发展工具"}},
 {id:"research_infrastructure",target:"infrastructure",intensity:[0,1],startYear:[0,15],duration:[1,15],lag:[1,6],status:"ASSUMPTION",description:{en:"Shared facilities, compute and research infrastructure.",zh:"共享设施、算力与科研基础设施"}},
 {id:"translation_support",target:"commercialization",intensity:[0,1],startYear:[0,15],duration:[1,15],lag:[0,5],status:"ASSUMPTION",description:{en:"Technology transfer and commercialization support.",zh:"技术转移与商业化支持"}},
 {id:"coordination_support",target:"collaboration",intensity:[0,1],startYear:[0,15],duration:[1,15],lag:[0,4],status:"ASSUMPTION",description:{en:"Intermediaries, consortia and network coordination.",zh:"中介机构、联盟与网络协调支持"}},
 {id:"public_procurement",target:"adoption",intensity:[0,1],startYear:[0,15],duration:[1,15],lag:[0,3],status:"ASSUMPTION",description:{en:"Demand-side procurement or demonstration support.",zh:"需求侧采购或示范应用支持"}},
];

export const modelV2={
 id:"innovation-ecosystem-policy-model",version:"2.0.0-research-design",status:"CONCEPTUAL" as ModelStatus,timeStep:"ANNUAL",horizons:[5,10,15],
 loops:[
  {id:"R1",type:"REINFORCING",path:["research_capacity","knowledge_stock","research_capacity"],lag:1},
  {id:"R2",type:"REINFORCING",path:["collaboration_connectivity","knowledge_stock","collaboration_connectivity"],lag:1},
  {id:"R3",type:"REINFORCING",path:["knowledge_stock","commercialization_capacity","venture_pipeline","collaboration_connectivity"],lag:2},
  {id:"B1",type:"BALANCING",path:["research_capacity","talent_pool","research_capacity"],lag:2},
  {id:"B2",type:"BALANCING",path:["policy_intensity","implementation_capacity","effective_support"],lag:1},
  {id:"B3",type:"BALANCING",path:["accumulated_capacity","saturation","capacity_growth"],lag:0},
 ],
 equations:[
  {id:"stock-update",expression:"S(t+1) = bound(S(t) + inflows(t) - outflows(t), 0, 120)",status:"MODEL_ASSUMPTION"},
  {id:"effective-policy",expression:"effective(t) = instrument_intensity(t-lag) * implementation_efficiency * saturation",status:"MODEL_ASSUMPTION"},
  {id:"research-creation",expression:"research_creation = research_capacity * productivity * policy_factor * infrastructure_factor * talent_factor * saturation",status:"PARTIALLY_CALIBRATED"},
  {id:"commercialization",expression:"commercialization_flow = lag(knowledge_stock) * transfer_rate * implementation_capacity * connectivity_factor",status:"MODEL_ASSUMPTION"},
 ],
 uncertainty:["DATA","PARAMETER","STRUCTURAL","SCENARIO"],
 warning:"Simulation is not prediction, causal proof, or policy advice.",
} as const;

export const fnv1a=(text:string)=>{let h=2166136261;for(const c of text){h^=c.charCodeAt(0);h=Math.imul(h,16777619)}return (h>>>0).toString(16).padStart(8,"0")};
export const modelV2Fingerprint=fnv1a(JSON.stringify({modelV2,researchVariables,policyInstruments}));
export function validateModelV2(){const errors:string[]=[];const ids=new Set<string>();for(const v of researchVariables){if(ids.has(v.id))errors.push(`DUPLICATE_VARIABLE:${v.id}`);ids.add(v.id);if(v.range[0]>=v.range[1])errors.push(`INVALID_RANGE:${v.id}`)}for(const p of policyInstruments){if(p.intensity[0]<0||p.intensity[1]>1)errors.push(`INVALID_INTENSITY:${p.id}`);if(p.duration[0]<1)errors.push(`INVALID_DURATION:${p.id}`)}if(modelV2.status==="EMPIRICALLY_CALIBRATED")errors.push("UNSUPPORTED_CALIBRATION_STATUS");return {valid:errors.length===0,errors,fingerprint:modelV2Fingerprint}}
