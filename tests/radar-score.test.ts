import assert from "node:assert/strict";
import test from "node:test";
import {calculateOpportunityScore,normalizeWeights,technologyMatchesFilters} from "../lib/radar-score.ts";
import type {MomentumMetric,OpportunityScoreConfig} from "../domain/radar.ts";

const config:OpportunityScoreConfig={version:"test",missingData:"RENORMALIZE_AVAILABLE",precision:1,dimensions:[{key:"research",label:{en:"Research",zh:"科研"},weight:.5},{key:"patents",label:{en:"Patents",zh:"专利"},weight:.3},{key:"policy",label:{en:"Policy",zh:"政策"},weight:.2}]};
const p:MomentumMetric["provenance"]={kind:"nexora_composite_score",sources:[],methodology:"test"};
const metrics=(research:number|null,patents:number|null,policy:number|null):MomentumMetric[]=>[
 {key:"research",label:{en:"Research",zh:"科研"},value:research,direction:"RISING",provenance:p},{key:"patents",label:{en:"Patents",zh:"专利"},value:patents,direction:"RISING",provenance:p},{key:"policy",label:{en:"Policy",zh:"政策"},value:policy,direction:"STABLE",provenance:p}
];
test("normalizes configured weights across available evidence",()=>{const n=normalizeWeights(config,new Set(["research","patents"]));assert.equal(n.length,2);assert.ok(Math.abs(n.reduce((s,x)=>s+x.effectiveWeight,0)-1)<1e-9);});
test("calculates an explainable weighted score",()=>{const result=calculateOpportunityScore(metrics(80,60,100),config);assert.equal(result.value,78);assert.equal(result.contributions.length,3);assert.deepEqual(result.missing,[]);});
test("renormalizes missing evidence without converting it to zero",()=>{const result=calculateOpportunityScore(metrics(80,null,null),config);assert.equal(result.value,80);assert.equal(result.availableWeight,.5);assert.deepEqual(result.missing,["patents","policy"]);});
test("returns null when all evidence is missing",()=>{const result=calculateOpportunityScore(metrics(null,null,null),config);assert.equal(result.value,null);assert.equal(result.contributions.length,0);});
test("filter logic respects region, stage, confidence and minimum momentum",()=>{const tech={industryId:"ai",stage:"EMERGING",confidence:{level:"MEDIUM"},regions:["Boston"],metrics:metrics(80,60,100)};assert.equal(technologyMatchesFilters(tech,{industry:"ai",region:"Boston",stage:"EMERGING",confidence:"MEDIUM",minimumMomentum:75},config),true);assert.equal(technologyMatchesFilters(tech,{region:"Shenzhen"},config),false);assert.equal(technologyMatchesFilters(tech,{minimumMomentum:90},config),false);});
