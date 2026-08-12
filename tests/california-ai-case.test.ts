import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { californiaAIRegistry, californiaAIAnnual, californiaAIThemes, californiaAIThreeYearGrowth, californiaAICompletePeriodCagr, californiaAIThreeYearRolling } from "../data/cases/california-ai/case.ts";
import { californiaAIOrganizations } from "../data/cases/california-ai/organizations.ts";
import { californiaAIRelationships } from "../data/cases/california-ai/relationships.ts";
import { californiaAICoverage, californiaAIDataQualityReport } from "../data/cases/california-ai/coverage.ts";
import { californiaAIFindings } from "../data/cases/california-ai/findings.ts";
import { californiaAISources } from "../data/cases/california-ai/sources.ts";
import { CaliforniaAIFlagshipSnapshot } from "../data/cases/california-ai/snapshot.ts";
import { californiaAIFundingAwards, californiaAIFundingSnapshot } from "../data/cases/california-ai/funding.ts";
import { californiaAITalentIndicators, californiaAITalentSource } from "../data/cases/california-ai/talent.ts";
import { californiaAIPatentStatus, californiaAIPatentTaxonomy } from "../data/cases/california-ai/patents.ts";
import { californiaAICapitalFeasibility } from "../data/cases/california-ai/capital.ts";
import { californiaAIEntrepreneurship } from "../data/cases/california-ai/entrepreneurship.ts";
import { californiaAICrossLayerAnalysis, californiaAIEvidenceLayers, californiaAINetworkMetrics, californiaAIRadarProfile } from "../data/cases/california-ai/empirical.ts";
import { californiaAIAlignedPanel, californiaAIAnalysisPolicy, californiaAIEmpiricalAlignment, californiaAIGeographyCrosswalk, californiaAITimeAlignment } from "../data/cases/california-ai/alignment.ts";
import { understandQuery, NexoraQueryPlanner } from "../services/ai/query.ts";
import { NexoraRetrievalService } from "../services/ai/retrieval.ts";
import { scenarioById } from "../simulation/scenarios/scenarios.ts";

test("California AI v2 registry and expanded snapshot are stable", () => {
  assert.equal(californiaAIRegistry.version, "ca-ai-case-v2.0");
  assert.equal(californiaAIRegistry.snapshotDate, "2026-08-11");
  assert.equal(californiaAIRegistry.snapshot.totals.uniqueWorks, 37499);
  assert.equal(californiaAIRegistry.snapshot.totals.institutionCount, 16);
  assert.equal(californiaAIRegistry.snapshot.totals.relationshipCount, 112);
  assert.equal(CaliforniaAIFlagshipSnapshot.organizationCount, 31);
  assert.equal(CaliforniaAIFlagshipSnapshot.relationshipCount, 40);
  assert.equal(CaliforniaAIFlagshipSnapshot.talentIndicatorCount, 5);
});

test("OpenAlex frame is reproducible and coverage tiers are not quality ranks", () => {
  assert.equal(californiaAIRegistry.snapshot.scope.candidateFrameSize, 200);
  assert.match(californiaAIRegistry.snapshot.scope.institutionSelection, /top 200/i);
  assert.deepEqual([...new Set(californiaAIRegistry.snapshot.scope.institutions.map(x => x.coverageTier))].sort(), ["A","B","C"]);
  assert.ok(californiaAIRegistry.snapshot.scope.institutions.every(x => x.city && x.completePeriodWorkCount > 0));
});

test("complete-year trends exclude partial 2026 and retain missing rolling values", () => {
  assert.deepEqual(californiaAIAnnual.map(x => x.year), [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025,2026]);
  assert.equal(californiaAIAnnual.at(-1)?.incomplete, true);
  assert.equal(californiaAIThreeYearGrowth, 14.6);
  assert.equal(californiaAICompletePeriodCagr, 7.2);
  assert.equal(californiaAIThreeYearRolling[0].average, null);
  assert.ok(californiaAIThreeYearRolling.filter(x => x.average !== null).every(x => x.status === "DERIVED_METRIC"));
});

test("theme taxonomy remains explicit and duplicate-free", () => {
  const sourceTopics = new Set(californiaAIRegistry.snapshot.topics.map(x => x.topicId));
  const mapped = californiaAIThemes.flatMap(x => x.topicIds);
  assert.equal(new Set(mapped).size, mapped.length);
  assert.ok(mapped.every(id => sourceTopics.has(id)));
  assert.equal(californiaAIThemes.length, 7);
});

test("NSF funding layer is deduplicated, title-qualified and nominal", () => {
  assert.equal(new Set(californiaAIFundingAwards.map(x => x.id)).size, californiaAIFundingAwards.length);
  assert.equal(californiaAIFundingAwards.length, californiaAIFundingSnapshot.totals.awardCount);
  assert.ok(californiaAIFundingAwards.length >= 40);
  assert.ok(californiaAIFundingAwards.every(x => x.recipientStateCode === "CA" && x.fundsObligatedUSD >= 0 && x.sourceUrl.startsWith("https://www.nsf.gov/")));
  assert.match(californiaAIFundingSnapshot.amountBasis, /Nominal/);
});

test("BLS talent layer is AI-adjacent and geography-explicit", () => {
  assert.equal(californiaAITalentIndicators.length, 5);
  assert.equal(californiaAITalentSource.geography.crosswalkStatus, "PARTIAL_OVERLAP");
  assert.equal(californiaAITalentSource.geography.nexoraRegionId, "san-jose-sunnyvale-santa-clara-msa");
  assert.ok(californiaAITalentIndicators.every(x => x.geographyId === "san-jose-sunnyvale-santa-clara-msa"));
  assert.ok(californiaAITalentIndicators.every(x => x.construct === "AI_ADJACENT_TECHNICAL_WORKFORCE" && x.period === "2025-05"));
  assert.ok(californiaAITalentIndicators.every(x => x.employment > 0 && x.locationQuotient > 0 && x.annualMeanWageUSD > 0));
});

test("patent adapter fails closed and taxonomy fixtures do not become evidence", () => {
  assert.equal(californiaAIPatentStatus.status, "NOT_CONFIGURED");
  assert.equal(californiaAIPatentStatus.recordCount, null);
  assert.equal(californiaAIPatentTaxonomy.status, "FIXTURE_TESTED_NOT_LIVE");
  assert.ok(californiaAIPatentTaxonomy.include.includes("G06N20/00"));
});

test("entrepreneurship and capital preserve honest feasibility states", () => {
  assert.equal(californiaAIEntrepreneurship.status, "LIMITED");
  assert.equal(californiaAIEntrepreneurship.productionMetric, null);
  assert.equal(californiaAICapitalFeasibility.status, "UNAVAILABLE");
  assert.equal(californiaAICapitalFeasibility.productionMetric, null);
});

test("verified organizations cover every selected OpenAlex endpoint", () => {
  const mapped = new Set(californiaAIOrganizations.filter(x => x.openAlexId).map(x => x.openAlexId));
  assert.ok(californiaAIRegistry.snapshot.scope.institutions.every(x => mapped.has(x.id)));
  assert.equal(new Set(californiaAIOrganizations.map(x => x.id)).size, californiaAIOrganizations.length);
  assert.ok(californiaAIOrganizations.every(x => x.status === "VERIFIED_PUBLIC_ENTITY" && x.officialUrl.startsWith("https://")));
});

test("promoted relationships retain valid endpoints and reproducible AND filters", () => {
  const ids = new Set(californiaAIOrganizations.map(x => x.id));
  assert.equal(californiaAIRelationships.length, 40);
  for (const edge of californiaAIRelationships) {
    assert.ok(ids.has(edge.fromOrganizationId) && ids.has(edge.toOrganizationId));
    assert.ok(edge.workCount > 0);
    assert.match(edge.sourceUrl, /authorships\.institutions\.id%3A[^,]+%2Cauthorships\.institutions\.id%3A/);
  }
});

test("Radar, network and cross-layer methods expose their boundaries", () => {
  assert.equal(californiaAIRadarProfile.status, "CONTEXT_ONLY");
  assert.equal(californiaAIRadarProfile.comparabilityStatus, "NOT_COMPARABLE");
  assert.equal(californiaAIRadarProfile.composite, null);
  assert.equal(californiaAIRadarProfile.sensitivity, null);
  assert.equal(californiaAINetworkMetrics.length, 16);
  assert.ok(californiaAINetworkMetrics.every(x => x.scopeLabel === "within current verified dataset"));
  assert.equal(californiaAICrossLayerAnalysis.status, "INSUFFICIENT_FOR_CORRELATION");
  assert.equal(californiaAICrossLayerAnalysis.commonCrossLayerLongitudinalPanelAvailable, false);
});

test("03A time alignment excludes partial 2026 and does not invent a common cross-layer panel", () => {
  assert.deepEqual(californiaAIAnalysisPolicy.commonCompleteYearWindow, {firstYear: 2015, lastYear: 2025});
  assert.equal(californiaAIAnalysisPolicy.commonCrossLayerLongitudinalPanelAvailable, false);
  assert.deepEqual(californiaAIAlignedPanel.map(x => x.year), [2015,2016,2017,2018,2019,2020,2021,2022,2023,2024,2025]);
  assert.ok(californiaAIAlignedPanel.every(x => x.geographyId === "california-selected-institution-frame" && x.comparabilityStatus === "DIRECTLY_COMPARABLE"));
  assert.ok(californiaAITimeAlignment.find(x => x.provider === "OpenAlex")?.partialYears.includes(2026));
});

test("03A geography crosswalk distinguishes Bay Area, BLS MSA and NSF recipient state", () => {
  const bay = californiaAIGeographyCrosswalk.find(x => x.id === "sf-bay-area")!;
  const msa = californiaAIGeographyCrosswalk.find(x => x.id === "san-jose-sunnyvale-santa-clara-msa")!;
  const nsf = californiaAIGeographyCrosswalk.find(x => x.id === "california-nsf-recipient-state")!;
  assert.equal(bay.counties.length, 9);
  assert.deepEqual(msa.counties, ["Santa Clara", "San Benito"]);
  assert.notEqual(bay.id, msa.id);
  assert.equal(nsf.comparability, "CONTEXT_ONLY");
  assert.ok(californiaAIFundingAwards.every(x => x.recipientStateCode === "CA" && x.recipientCity));
});

test("03A construct classifications are explicit", () => {
  assert.deepEqual([...new Set(californiaAIEmpiricalAlignment.map(x => x.comparabilityStatus))].sort(), ["COMPARABLE_AFTER_AGGREGATION","CONTEXT_ONLY","DIRECTLY_COMPARABLE","NOT_COMPARABLE"]);
});

test("coverage and findings keep missingness and confidence explicit", () => {
  const byId = new Map(californiaAICoverage.map(x => [x.id, x.level]));
  assert.equal(byId.get("talent"), "PARTIAL");
  assert.equal(byId.get("public-funding"), "PARTIAL");
  assert.equal(byId.get("patents"), "UNAVAILABLE");
  assert.equal(byId.get("capital"), "UNAVAILABLE");
  assert.equal(californiaAIDataQualityReport.status, "PASS_WITH_LIMITATIONS");
  assert.deepEqual([...new Set(californiaAIFindings.map(x => x.confidence))].sort(), ["DATA_GAP","EXPLORATORY","MODERATE","STRONG"]);
});

test("source registry, route and social asset contain no Demo dependency", () => {
  assert.equal(new Set(californiaAISources.map(x => x.id)).size, californiaAISources.length);
  assert.ok(californiaAISources.every(x => x.url.startsWith("https://") || x.url.startsWith("/")));
  assert.doesNotMatch(readFileSync("components/california-ai-flagship.tsx", "utf8"), /data\/demo/);
  assert.ok(readFileSync("public/california-ai-og.png").byteLength > 100_000);
});

test("AI retrieval grounds v2 talent and funding while preserving gaps", () => {
  const query = understandQuery("Generate an evidence-based research brief on the California AI ecosystem.", { caseIds: ["california-ai"], allowDemoEvidence: false });
  const pack = new NexoraRetrievalService().retrieve(query, new NexoraQueryPlanner().plan(query));
  assert.ok(pack.snapshotIds.some(x => x.startsWith("ca-ai-case-v2.0")));
  assert.ok(pack.items.every(x => !x.isDemo));
  assert.ok(pack.items.some(x => x.sourceTitle.includes("BLS")));
  assert.ok(pack.items.some(x => x.sourceTitle.includes("NSF")));
  assert.ok(pack.missingData.some(x => x.key === "patents"));
  assert.ok(!pack.missingData.some(x => x.key === "talent"));
});

test("simulator exposes empirical v2 without forecast language", () => {
  const preset = scenarioById("california-ai-baseline");
  assert.equal(preset.isDemo, false);
  assert.equal(preset.baseSnapshotId, "ca-ai-case-v2.0-2026-08-11");
  assert.match(preset.description.en, /not forecast/i);
});

test("evidence layers have semantic statuses and no false zero", () => {
  assert.equal(californiaAIEvidenceLayers.find(x => x.id === "patents")?.records, null);
  assert.equal(californiaAIEvidenceLayers.find(x => x.id === "patents")?.status, "NOT_CONFIGURED");
  assert.equal(californiaAIEvidenceLayers.find(x => x.id === "capital")?.status, "UNAVAILABLE");
});
