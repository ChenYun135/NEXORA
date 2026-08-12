import assert from "node:assert/strict";
import test from "node:test";
import type { EcosystemEdge, EcosystemGraph, EcosystemHealthConfig, EcosystemNode } from "../domain/ecosystems.ts";
import { ecosystemGraphs, ecosystemRegions } from "../data/demo/ecosystems.ts";
import { betweennessCentrality, calculateHealth, degreeCentrality, filterGraph, neighborhood, parseEcosystemQuery, validateEcosystemGraph } from "../lib/ecosystem-graph.ts";

const node=(id:string,regionId="sf"):EcosystemNode=>({id,name:{en:id,zh:`节点 ${id}`},nodeType:id==="a"?"UNIVERSITY":"STARTUP",regionId,industryIds:["ai"],technologyIds:["ai-agents"],description:{en:"Fixture",zh:"测试夹具"},publicSources:[],evidenceStatus:"DEMO_RELATIONSHIP",isDemo:true,x:0,y:0});
const edge=(id:string,sourceNodeId:string,targetNodeId:string,overrides:Partial<EcosystemEdge>={}):EcosystemEdge=>({id,sourceNodeId,targetNodeId,relationshipType:"RESEARCH_COLLABORATION",direction:"UNDIRECTED",strength:"MEDIUM",confidence:"MEDIUM",evidenceIds:[`ev-${id}`],layers:["RESEARCH"],timePeriod:"2026",isDerived:false,isDemo:true,...overrides});
const graph=(nodes:EcosystemNode[],edges:EcosystemEdge[]):EcosystemGraph=>({context:{id:"sf-ai",regionId:"sf",industryId:"ai",snapshotId:"s1",name:{en:"SF AI",zh:"旧金山 AI"}},snapshotDate:"2026-08-10",nodes,edges,clusters:[],evidence:[]});

test("ships six valid bilingual demo ecosystem graphs",()=>{
 const regions=new Set(ecosystemRegions.map(r=>r.id));assert.equal(ecosystemGraphs.length,6);
 for(const item of ecosystemGraphs){assert.equal(item.nodes.length,12);assert.equal(item.edges.length,18);assert.equal(validateEcosystemGraph(item,regions).valid,true);assert.ok(item.context.name.en);assert.ok(item.context.name.zh);assert.ok(item.nodes.every(n=>n.name.en&&n.name.zh));}
});

test("validates graph integrity failures",()=>{
 const invalid=graph([node("a"),node("b","unknown")],[edge("self","a","a"),edge("orphan","a","z"),edge("first","a","b"),edge("duplicate","a","b"),edge("no-evidence","b","a",{relationshipType:"INVESTMENT",isDemo:false,evidenceIds:[]})]);
 const result=validateEcosystemGraph(invalid,new Set(["sf"]));
 assert.equal(result.valid,false);assert.deepEqual(result.selfEdgeIds,["self"]);assert.deepEqual(result.orphanEdgeIds,["orphan"]);assert.deepEqual(result.duplicateEdgeIds,["duplicate"]);assert.deepEqual(result.missingEvidenceEdgeIds,["no-evidence"]);assert.deepEqual(result.invalidRegionNodeIds,["b"]);
});

test("computes normalized degree and Brandes bridge centrality",()=>{
 const nodes=[node("a"),node("b"),node("c"),node("d")],edges=[edge("ab","a","b"),edge("bc","b","c"),edge("cd","c","d")];
 const degree=degreeCentrality(nodes,edges),between=betweennessCentrality(nodes,edges);
 assert.equal(degree.get("b"),2/3);assert.equal(degree.get("a"),1/3);assert.equal(between.get("b"),2/3);assert.equal(between.get("c"),2/3);assert.equal(between.get("a"),0);
});

test("filters nodes, relation layers, confidence and search",()=>{
 const nodes=[node("a"),node("b"),{...node("c"),nodeType:"CORPORATION" as const,technologyIds:["robotics"]}],edges=[edge("ab","a","b"),edge("bc","b","c",{relationshipType:"INVESTMENT",layers:["CAPITAL"],confidence:"HIGH"})],fixture=graph(nodes,edges);
 assert.deepEqual(filterGraph(fixture,{layers:[],nodeType:"CORPORATION"}).nodes.map(n=>n.id),["c"]);
 assert.deepEqual(filterGraph(fixture,{layers:["CAPITAL"],relationshipType:"INVESTMENT",confidence:"HIGH"}).edges.map(e=>e.id),["bc"]);
 assert.deepEqual(filterGraph(fixture,{layers:[],technologyId:"ai-agents",search:"节点"}).nodes.map(n=>n.id),["a","b"]);
});

test("returns one and two hop focus neighborhoods",()=>{
 const edges=[edge("ab","a","b"),edge("bc","b","c"),edge("cd","c","d")];
 assert.deepEqual([...neighborhood("a",edges,1)].sort(),["a","b"]);assert.deepEqual([...neighborhood("a",edges,2)].sort(),["a","b","c"]);
});

test("parses cross-product URL state",()=>{assert.deepEqual(parseEcosystemQuery("?region=sf&industry=ai&technology=ai-agents&layer=RESEARCH&node=a"),{regionId:"sf",industryId:"ai",technologyId:"ai-agents",layer:"RESEARCH",nodeId:"a"});});

test("renormalizes health only across available dimensions",()=>{
 const config:EcosystemHealthConfig={version:"test",missingData:"RENORMALIZE_AVAILABLE",dimensions:[{key:"researchConnectivity",name:{en:"Research",zh:"科研"},description:{en:"",zh:""},dataRequirement:"fixture",weight:.6},{key:"networkResilience",name:{en:"Resilience",zh:"韧性"},description:{en:"",zh:""},dataRequirement:"fixture",weight:.4}]};
 const result=calculateHealth({researchConnectivity:80,networkResilience:null},config);assert.equal(result.value,80);assert.equal(result.availableWeight,.6);assert.deepEqual(result.missing,["networkResilience"]);assert.equal(result.contributions[0].effectiveWeight,1);
 assert.equal(calculateHealth({researchConnectivity:null,networkResilience:null},config).value,null);
});
