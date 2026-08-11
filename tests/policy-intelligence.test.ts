import assert from "node:assert/strict";
import test from "node:test";
import type { PolicyRecord } from "../domain/policy.ts";
import { policyComparisonConfig, policyComparisonValues, policyIndustries, policyJurisdictions, policyRecords, policySources, policyTechnologies } from "../data/demo/policy.ts";
import { comparisonRows, filterPolicies, orderTimeline, parsePolicyQuery, policyInstrumentMix, sortPolicies, validatePolicyData } from "../lib/policy-intelligence.ts";

test("ships 28 bilingual demo records across eight jurisdictions and nine industries",()=>{
 assert.equal(policyRecords.length,28);assert.equal(new Set(policyRecords.map(p=>p.jurisdictionId)).size,8);assert.equal(policyIndustries.length,9);assert.ok(policyRecords.every(p=>p.localizedTitle.en&&p.localizedTitle.zh&&p.isDemo));
});
test("validates policy records, sources, dates, funding and references",()=>{
 const result=validatePolicyData(policyRecords,new Set(policyJurisdictions.map(j=>j.id)),new Set(policyIndustries.map(i=>i.id)),new Set(policyTechnologies.map(t=>t.id)),new Map(policySources.map(s=>[s.id,s.sourceUrl])));assert.equal(result.valid,true);
 const broken:{record:PolicyRecord}={record:{...policyRecords[0],id:"broken",funding:{...policyRecords[0].funding,amount:10,currency:null},effectiveFrom:"2020-01-01",industryIds:["unknown"],technologyIds:["unknown"]}};const invalid=validatePolicyData([broken.record],new Set(policyJurisdictions.map(j=>j.id)),new Set(policyIndustries.map(i=>i.id)),new Set(policyTechnologies.map(t=>t.id)),new Map(policySources.map(s=>[s.id,s.sourceUrl])));assert.equal(invalid.valid,false);assert.deepEqual(invalid.invalidFundingPolicyIds,["broken"]);assert.deepEqual(invalid.invalidDatePolicyIds,["broken"]);
});
test("filters jurisdiction, industry, technology, status, type, mechanism evidence and search",()=>{
 assert.ok(filterPolicies(policyRecords,{jurisdictionId:"california"}).every(p=>p.jurisdictionId==="california"));assert.ok(filterPolicies(policyRecords,{industryId:"ai"}).every(p=>p.industryIds.includes("ai")));assert.ok(filterPolicies(policyRecords,{technologyId:"humanoid-robotics"}).every(p=>p.technologyIds.includes("humanoid-robotics")));assert.ok(filterPolicies(policyRecords,{status:"ACTIVE",policyType:"RESEARCH_PROGRAM"}).every(p=>p.status==="ACTIVE"&&p.policyType==="RESEARCH_PROGRAM"));assert.ok(filterPolicies(policyRecords,{effectType:"FUND",evidenceStatus:"DEMO_RECORD",search:"research"}).length>0);
});
test("sorts records and orders timeline chronologically",()=>{const newest=sortPolicies(policyRecords,"NEWEST"),oldest=sortPolicies(policyRecords,"OLDEST"),timeline=orderTimeline(policyRecords);assert.ok(newest[0].publishedAt>=newest.at(-1)!.publishedAt);assert.ok(oldest[0].publishedAt<=oldest.at(-1)!.publishedAt);assert.ok(timeline[0].date<=timeline.at(-1)!.date);});
test("preserves funding nullability and original currencies",()=>{assert.ok(policyRecords.some(p=>p.funding.amount===null&&p.funding.currency===null));assert.ok(policyRecords.some(p=>p.funding.stage==="AUTHORIZED"));assert.ok(policyRecords.filter(p=>p.funding.amount!==null).every(p=>p.funding.currency!==null));});
test("parses cross-module query state",()=>{assert.deepEqual(parsePolicyQuery("?jurisdiction=california&industry=ai&technology=ai-agents&policy=ca-ai-procurement"),{jurisdictionId:"california",industryId:"ai",technologyId:"ai-agents",policyId:"ca-ai-procurement"});});
test("computes descriptive instrument mix and comparison rows without one quality score",()=>{const mix=policyInstrumentMix(policyRecords);assert.ok(mix.length>4);const rows=comparisonRows(policyComparisonValues["united-states"],policyComparisonValues["european-union"],policyComparisonConfig);assert.equal(rows.length,8);assert.ok(rows.every(r=>typeof r.left==="number"&&typeof r.right==="number"));});
test("keeps source attribution and evidence state explicit",()=>{assert.ok(policyRecords.every(p=>p.sourceIds.length>0&&p.evidenceStatus==="DEMO_RECORD"));assert.ok(policySources.every(s=>s.sourceName&&s.retrievedAt&&s.notes.zh));});
