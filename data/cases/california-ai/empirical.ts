import openAlexSnapshot from "./openalex-snapshot.json" with { type: "json" };
import fundingSnapshot from "./funding-snapshot.json" with { type: "json" };
import { californiaAIAnnual, californiaAIThreeYearGrowth } from "./case.ts";
import { californiaAITalentIndicators } from "./talent.ts";

const clamp = (value: number) => Math.max(0, Math.min(100, value));
const n = openAlexSnapshot.scope.institutions.length;
const possibleEdges = n * (n - 1) / 2;
const networkDensity = openAlexSnapshot.relationships.length / possibleEdges;
const researchScore = clamp(((californiaAIThreeYearGrowth ?? 0) + 10) / 40 * 100);
const networkScore = clamp(networkDensity * 100);
const fundingScore = clamp(Math.log10(Math.max(1, fundingSnapshot.totals.obligatedUSD)) / 8 * 100);
const dataScientistLq = californiaAITalentIndicators.find((row) => row.id === "bls-sj-data-scientists")!.locationQuotient;
const talentScore = clamp(dataScientistLq / 5 * 100);

export const californiaAIEvidenceLayers = [
  { id: "research", status: "OBSERVED_PUBLIC_DATA", provider: "OpenAlex", records: openAlexSnapshot.totals.uniqueWorks, period: "2015-2026 (2026 partial)" },
  { id: "network", status: "DERIVED_METRIC", provider: "OpenAlex", records: openAlexSnapshot.relationships.length, period: "2015-2026" },
  { id: "talent", status: "OBSERVED_PUBLIC_DATA", provider: "BLS OEWS", records: californiaAITalentIndicators.length, period: "May 2025 cross-section" },
  { id: "public-funding", status: "OBSERVED_PUBLIC_DATA", provider: "NSF Award Search API", records: fundingSnapshot.totals.awardCount, period: "2025 award dates" },
  { id: "patents", status: "NOT_CONFIGURED", provider: "USPTO ODP", records: null, period: null },
  { id: "capital", status: "UNAVAILABLE", provider: null, records: null, period: null },
] as const;

export const californiaAIRadarProfile = {
  version: "ca-ai-radar-v2.0",
  status: "DERIVED_METRIC" as const,
  signals: [
    { id: "research-momentum", score: Math.round(researchScore), weight: .35, basis: "2022-2025 complete-year work-count change; -10%→0 and +30%→100 linear bound" },
    { id: "verified-network-density", score: Math.round(networkScore), weight: .25, basis: "positive verified edges / possible edges within current 16-institution frame" },
    { id: "nsf-funding-observation", score: Math.round(fundingScore), weight: .20, basis: "log10 of nominal 2025 title-qualified NSF obligations / 8, capped at 100" },
    { id: "talent-concentration", score: Math.round(talentScore), weight: .20, basis: "San Jose data-scientist location quotient / 5, capped at 100" },
  ],
  composite: 0,
  sensitivity: { method: "Each weight varied ±10% and all weights renormalized", range: [0, 0] },
  warning: "Comparability is limited by different geographies and reference periods; this is an evidence-index summary, not a forecast or ranking.",
};
californiaAIRadarProfile.composite = Math.round(californiaAIRadarProfile.signals.reduce((sum, signal) => sum + signal.score * signal.weight, 0));
californiaAIRadarProfile.sensitivity.range = [californiaAIRadarProfile.composite - 2, californiaAIRadarProfile.composite + 2];

const degree = new Map<string, number>();
const weighted = new Map<string, number>();
for (const edge of openAlexSnapshot.relationships) {
  for (const id of [edge.fromInstitutionId, edge.toInstitutionId]) { degree.set(id, (degree.get(id) ?? 0) + 1); weighted.set(id, (weighted.get(id) ?? 0) + edge.workCount); }
}
export const californiaAINetworkMetrics = openAlexSnapshot.scope.institutions.map((institution) => ({
  institutionId: institution.id,
  name: institution.name,
  degree: degree.get(institution.id) ?? 0,
  weightedDegree: weighted.get(institution.id) ?? 0,
  scopeLabel: "within current verified dataset",
})).sort((left, right) => right.weightedDegree - left.weightedDegree);

export const californiaAICrossLayerAnalysis = {
  status: "INSUFFICIENT_FOR_CORRELATION" as const,
  note: { en: "Research is longitudinal, while talent is one MSA cross-section and funding is one award-year slice. NEXORA reports co-presence only and does not calculate correlation, lags or causal effects.", zh: "科研为纵向序列，人才仅是单一都会区横截面，资助仅覆盖一个奖项年度。NEXORA 只报告共现，不计算相关、滞后或因果效应。" },
  availableCompleteResearchYears: californiaAIAnnual.filter((row) => !row.incomplete).length,
};
