import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { publicProviderRegistry, providerSummary } from "../data/providers/registry.ts";

const r3 = JSON.parse(readFileSync(new URL("../data/exports/research/r3-empirical-foundation.json", import.meta.url), "utf8"));

test("R3 exposes nine bounded California years without paper artifacts", () => {
  assert.equal(r3.release, "NEXORA_RESEARCH_DATA_R3");
  assert.equal(r3.coverage, "2015-2023");
  for (const series of Object.values(r3.series) as Array<Array<{year:number}>>) {
    assert.deepEqual(series.map((row) => row.year), [2015,2016,2017,2018,2019,2020,2021,2022,2023]);
  }
  assert.doesNotMatch(JSON.stringify(r3), /paper[-_ ]?0[123]|manuscript|calibration|scenario/i);
});

test("applications, startups, support and outcomes remain semantically separate", () => {
  assert.ok(r3.boundaries.includes("BFS applications are not realized startups"));
  assert.ok(r3.boundaries.includes("SBIR/STTR awards are public support, not commercialization outcomes"));
  assert.ok(r3.series.bfsCalifornia.every((row:{businessApplications:number}) => row.businessApplications > 0));
  assert.ok(r3.series.bdsCalifornia.every((row:{startupFirms:number}) => row.startupFirms > 0));
});

test("the five R3 bulk activations are READY within explicit product boundaries", () => {
  const ready = new Set(publicProviderRegistry.filter((provider) => provider.status === "READY").map((provider) => provider.providerId));
  for (const id of ["CENSUS_BFS","CENSUS_BDS","NCSES_HERD","SBIR_STTR","BEA_REGIONAL"]) assert.ok(ready.has(id));
  assert.ok(providerSummary().tierAReady >= 9);
});
