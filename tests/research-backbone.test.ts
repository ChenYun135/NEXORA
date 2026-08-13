import test from "node:test";
import assert from "node:assert/strict";
import {modelV2,modelV2Fingerprint,policyInstruments,researchVariables,validateModelV2} from "../simulation/model-v2/specification.ts";

test("model v2 research specification is valid and deterministic",()=>{const a=validateModelV2(),b=validateModelV2();assert.equal(a.valid,true);assert.equal(a.fingerprint,b.fingerprint);assert.equal(a.fingerprint,modelV2Fingerprint);assert.match(a.fingerprint,/^[0-9a-f]{8}$/)});
test("model v2 keeps evidence and interpretation boundaries explicit",()=>{assert.equal(modelV2.status,"CONCEPTUAL");assert.match(modelV2.warning,/not prediction/i);assert.ok(researchVariables.every(v=>v.evidence&&v.definition.en&&v.definition.zh));assert.ok(researchVariables.some(v=>v.evidence==="ASSUMPTION"));assert.equal(researchVariables.some(v=>v.evidence==="OBSERVED"&&v.sourceIds.length===0),false)});
test("policy instruments expose intensity, timing, duration, lag and target",()=>{assert.equal(policyInstruments.length,6);for(const p of policyInstruments){assert.equal(p.intensity.length,2);assert.equal(p.startYear.length,2);assert.equal(p.duration.length,2);assert.equal(p.lag.length,2);assert.ok(p.target)}});
