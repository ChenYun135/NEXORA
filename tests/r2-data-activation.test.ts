import assert from "node:assert/strict";
import test from "node:test";
import coverage from "../data/exports/research/r2-operational-coverage.json" with {type:"json"};
import { canonicalGeographyArchitecture, commonTechnologyTaxonomy, institutionMatch, normalizeCompanyName } from "../data/mappings/r2-harmonization.ts";
import { buildCanonicalPanel, normalizePer, panelCoverage } from "../services/public-data/longitudinal-harmonization.ts";

test("R2 public aggregates have frozen 2015-2023 coverage and manifests",()=>{
  assert.equal(coverage.release,"NEXORA_RESEARCH_DATA_R2");
  assert.equal(coverage.series.qcewCalifornia.length,9);
  assert.equal(coverage.series.openAlexStanfordAnnualWorks.length,9);
  assert.equal(coverage.series.federalRegisterTechnologyAgencies.length,9);
  assert.ok(coverage.manifests.every(item=>/^[a-f0-9]{64}$/.test(item.checksum)&&item.recordCount===9));
  assert.equal(coverage.manifests.find(item=>item.providerId==="NSF_AWARDS")?.readiness,"STAGED");
});

test("R2 harmonizer preserves missing states and rejects duplicate panel cells",()=>{
  const row={geographyType:"STATE" as const,geographyId:"06",year:2023,constructId:"ECONOMIC_CONTEXT",metricId:"qcew_employment",value:18002893,unit:"persons",status:"OBSERVED" as const,provider:"BLS",snapshotId:"qcew-ca-2023",vintage:"2023 annual",transformationId:"identity-v1"};
  assert.deepEqual(panelCoverage(buildCanonicalPanel([row])),{years:[2023],constructs:["ECONOMIC_CONTEXT"],geographies:["STATE:06"],rows:1,observed:1,missing:0,coverage:1});
  assert.throws(()=>buildCanonicalPanel([row,row]),/DUPLICATE_PANEL_CELL/);
  assert.throws(()=>buildCanonicalPanel([{...row,value:null}]),/INVALID_MISSINGNESS/);
});

test("R2 crosswalks remain conservative and versioned",()=>{
  assert.ok(canonicalGeographyArchitecture.levels.includes("CBSA"));
  assert.deepEqual(commonTechnologyTaxonomy.mappingStates,["DIRECT","MAPPED","PROXY","UNMAPPED"]);
  assert.equal(institutionMatch({openAlexId:"I97018004",ror:"00f54p054"}).manualReview,false);
  assert.equal(institutionMatch({herdId:"123"}).manualReview,true);
  assert.equal(normalizeCompanyName("Example Technologies, Inc."),"EXAMPLE TECHNOLOGIES");
  assert.equal(normalizePer(100,50,1000),2000);
});
