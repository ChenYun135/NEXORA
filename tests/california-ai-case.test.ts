import test from "node:test";
import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { californiaAIRegistry, californiaAIAnnual, californiaAIThemes, californiaAIThreeYearGrowth } from "../data/cases/california-ai/case.ts";
import { californiaAIOrganizations } from "../data/cases/california-ai/organizations.ts";
import { californiaAIPolicies } from "../data/cases/california-ai/policies.ts";
import { californiaAIRelationships } from "../data/cases/california-ai/relationships.ts";
import { californiaAICoverage, californiaAIDataQualityReport } from "../data/cases/california-ai/coverage.ts";
import { californiaAIFindings } from "../data/cases/california-ai/findings.ts";
import { californiaAISources } from "../data/cases/california-ai/sources.ts";
import { CaliforniaAIFlagshipSnapshot } from "../data/cases/california-ai/snapshot.ts";
import { californiaAICanonicalGeographies, californiaAISemanticAliases } from "../data/mappings/geographies.ts";
import { understandQuery, NexoraQueryPlanner } from "../services/ai/query.ts";
import { NexoraRetrievalService } from "../services/ai/retrieval.ts";
import { scenarioById, scenarios } from "../simulation/scenarios/scenarios.ts";

test("California AI registry and snapshot are stable and reproducible", () => {
  assert.equal(californiaAIRegistry.id, "california-ai");
  assert.equal(californiaAIRegistry.version, "ca-ai-case-v1.0");
  assert.equal(californiaAIRegistry.status, "PRIVATE_RESEARCH_READY");
  assert.equal(CaliforniaAIFlagshipSnapshot.snapshotDate, "2026-08-10");
  assert.equal(CaliforniaAIFlagshipSnapshot.organizationCount, 25);
  assert.equal(CaliforniaAIFlagshipSnapshot.policyCount, 12);
  assert.equal(CaliforniaAIFlagshipSnapshot.relationshipCount, 20);
  assert.equal(CaliforniaAIFlagshipSnapshot.researchObservationCount, 12);
  assert.equal(CaliforniaAIFlagshipSnapshot.freshness, "FRESH");
});

test("OpenAlex annual series and growth calculation match deterministic snapshot", () => {
  assert.deepEqual(californiaAIAnnual.map(x => x.year), [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026]);
  assert.equal(californiaAIAnnual.find(x => x.year === 2026)?.incomplete, true);
  assert.equal(californiaAIAnnual.find(x => x.year === 2022)?.workCount, 2240);
  assert.equal(californiaAIAnnual.find(x => x.year === 2025)?.workCount, 2606);
  assert.equal(californiaAIThreeYearGrowth, 16.3);
  assert.equal(californiaAIRegistry.snapshot.totals.uniqueWorks, 26780);
});

test("theme taxonomy maps only explicit source topic IDs without duplicates", () => {
  const sourceTopics = new Set(californiaAIRegistry.snapshot.topics.map(x => x.topicId));
  const mapped = californiaAIThemes.flatMap(x => x.topicIds);
  assert.equal(new Set(mapped).size, mapped.length);
  assert.ok(mapped.every(id => sourceTopics.has(id)));
  assert.equal(californiaAIThemes.length, 7);
  assert.ok(californiaAIThemes.every(x => x.workCount > 0 && x.status === "DERIVED_METRIC"));
});

test("California geography and semantic alias are canonical", () => {
  const ids = new Set(californiaAICanonicalGeographies.map(x => x.id));
  for (const id of ["california","sf-bay-area","los-angeles","san-diego","orange-county","sacramento"]) assert.ok(ids.has(id));
  assert.equal(californiaAISemanticAliases["silicon-valley"], "sf-bay-area");
  assert.equal(californiaAICanonicalGeographies.find(x => x.id === "sf-bay-area")?.parentId, "california");
});

test("organization identities are unique, official and bounded", () => {
  assert.equal(californiaAIOrganizations.length, 25);
  assert.equal(new Set(californiaAIOrganizations.map(x => x.id)).size, 25);
  assert.equal(californiaAIOrganizations.filter(x => x.openAlexId).length, 10);
  assert.ok(californiaAIOrganizations.every(x => x.status === "VERIFIED_PUBLIC_ENTITY" && x.officialUrl.startsWith("https://")));
  assert.ok(californiaAIOrganizations.every(x => !/person|email|profile/i.test(x.category)));
});

test("official policy registry retains source, status and intended mechanism", () => {
  assert.equal(californiaAIPolicies.length, 12);
  assert.equal(new Set(californiaAIPolicies.map(x => x.id)).size, 12);
  assert.ok(californiaAIPolicies.every(x => x.jurisdiction === "California" && x.officialUrl.startsWith("https://") && x.mechanism));
  assert.ok(californiaAIPolicies.some(x => x.id === "ca-sb-53" && x.status === "CHAPTERED"));
  assert.ok(californiaAIPolicies.every(x => /does not establish|并不能证明/.test(`${x.limitation.en}${x.limitation.zh}`)));
});

test("promoted relationships have valid endpoints and reproducible AND-filter evidence", () => {
  const orgs = new Set(californiaAIOrganizations.map(x => x.id));
  assert.equal(californiaAIRelationships.length, 20);
  assert.equal(new Set(californiaAIRelationships.map(x => x.id)).size, 20);
  for (const edge of californiaAIRelationships) {
    assert.ok(orgs.has(edge.fromOrganizationId) && orgs.has(edge.toOrganizationId));
    assert.ok(edge.workCount > 0);
    assert.equal(edge.evidenceStatus, "VERIFIED_RELATIONSHIP");
    assert.match(edge.sourceUrl, /authorships\.institutions\.id%3A[^,]+%2Cauthorships\.institutions\.id%3A/);
  }
});

test("coverage preserves unavailable as unavailable, never zero", () => {
  const byId = new Map(californiaAICoverage.map(x => [x.id, x]));
  for (const id of ["patents","talent","capital","market"]) assert.equal(byId.get(id)?.level, "UNAVAILABLE");
  assert.equal(byId.get("public-funding")?.level, "LIMITED");
  assert.equal(californiaAIDataQualityReport.status, "PASS_WITH_LIMITATIONS");
  assert.equal(californiaAIDataQualityReport.rejectedRecords, 3);
});

test("every finding support ID resolves to canonical case evidence", () => {
  const support = new Set<string>([
    ...californiaAIAnnual.map(x => x.evidenceId),
    ...californiaAIRegistry.snapshot.regions.map(x => `ca-ai-openalex-region-${x.regionId}`),
    ...californiaAIRelationships.map(x => x.id),
    ...californiaAIPolicies.map(x => x.id),
    ...californiaAICoverage.map(x => `coverage-${x.id}`),
    "ca-ai-taxonomy-v1.0",
  ]);
  assert.ok(californiaAIFindings.every(x => x.supportIds.length > 0 && x.supportIds.every(id => support.has(id))));
});

test("case source registry and social image are present", () => {
  assert.ok(californiaAISources.length >= 40);
  assert.equal(new Set(californiaAISources.map(x => x.id)).size, californiaAISources.length);
  assert.ok(californiaAISources.every(x => x.url.startsWith("https://") || x.url.startsWith("/")));
  assert.ok(existsSync("public/california-ai-og.png"));
  assert.ok((readFileSync("public/california-ai-og.png").byteLength) > 100_000);
});

test("flagship route and cross-module case links exist without Demo imports", () => {
  const route = readFileSync("components/california-ai-flagship.tsx", "utf8");
  assert.doesNotMatch(route, /data\/demo/);
  for (const path of ["/atlas?region=california&industry=artificial-intelligence","/radar?industry=artificial-intelligence&region=california","/ecosystems?region=sf-bay-area&industry=artificial-intelligence","/policy?jurisdiction=california&industry=artificial-intelligence","/companies?region=california&industry=artificial-intelligence","/ai?case=california-ai","/simulator?case=california-ai"]) assert.ok(route.includes(path));
  assert.ok(existsSync("app/cases/california-ai/page.tsx"));
});

test("AI case retrieval uses only production case evidence", () => {
  const query = understandQuery("Generate an evidence-based research brief on the California AI ecosystem.", { caseIds: ["california-ai"], allowDemoEvidence: false });
  const pack = new NexoraRetrievalService().retrieve(query, new NexoraQueryPlanner().plan(query));
  assert.equal(query.context.caseIds[0], "california-ai");
  assert.ok(pack.snapshotIds.some(x => x.startsWith("ca-ai-case-v1.0")));
  assert.ok(pack.items.length >= 12 && pack.items.every(x => !x.isDemo));
  assert.ok(pack.items.some(x => x.kind === "RESEARCH"));
  assert.ok(pack.items.some(x => x.kind === "POLICY"));
  assert.ok(pack.items.some(x => x.kind === "ORGANIZATION"));
  assert.ok(pack.items.some(x => x.kind === "RELATIONSHIP"));
  assert.ok(pack.missingData.some(x => x.key === "patents"));
});

test("simulator exposes a non-Demo, partially calibrated California AI preset", () => {
  const preset = scenarioById("california-ai-baseline");
  assert.equal(preset.isDemo, false);
  assert.equal(preset.baseSnapshotId, "ca-ai-case-v1.0-2026-08-10");
  assert.match(preset.description.en, /scenario result, not forecast/i);
  assert.equal(scenarios.at(-1)?.id, "california-ai-baseline");
});

