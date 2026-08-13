import assert from "node:assert/strict";
import test from "node:test";
import { readFile } from "node:fs/promises";
import { publicProviderRegistry, providerSummary } from "../data/providers/registry.ts";

test("R4 promotes only the bounded NSF Award Search product", async () => {
  assert.equal(publicProviderRegistry.find((provider)=>provider.providerId==="NSF_AWARDS")?.status,"READY");
  assert.equal(publicProviderRegistry.find((provider)=>provider.providerId==="CENSUS_ACS")?.status,"NOT_CONFIGURED");
  assert.equal(publicProviderRegistry.find((provider)=>provider.providerId==="USPTO")?.status,"NOT_CONFIGURED");
  assert.equal(publicProviderRegistry.find((provider)=>provider.providerId==="CALIFORNIA_LEGINFO")?.status,"STAGED");
  assert.equal(providerSummary().tierAReady,10);
  const artifact=JSON.parse(await readFile("data/exports/research/r4-nsf-public-foundation.json","utf8"));
  assert.equal(artifact.status,"READY_WITHIN_DECLARED_PRODUCT_BOUNDARY");
  assert.equal(artifact.scope.recordLevelDataRetained,false);
  assert.equal(artifact.observations.length,8);
  assert.ok(artifact.observations.every((row:{value:number})=>Number.isInteger(row.value)&&row.value>=0));
});
