import { californiaAICompletePeriodCagr } from "./case.ts";
import { californiaAIRadarProfile } from "./empirical.ts";

export const californiaAICalibration = [
  { variable: "Research capacity", status: "OBSERVED", source: "OpenAlex 2015–2025 complete-year aggregate", note: `16-institution coverage frame; complete-period CAGR ${californiaAICompletePeriodCagr}%.` },
  { variable: "Knowledge stock", status: "EMPIRICALLY_DERIVED", source: "Accumulated OpenAlex activity", note: "Proxy, not measured knowledge capital or quality." },
  { variable: "Network connectivity", status: "EMPIRICALLY_DERIVED", source: "112 verified positive co-authorship pairs", note: "Within current verified dataset only." },
  { variable: "Policy support", status: "PROXY_CALIBRATED", source: "12 official policy instruments", note: "Mechanism diversity proxy; no causal policy-effect coefficient." },
  { variable: "Talent capacity", status: "PROXY_CALIBRATED", source: "BLS OEWS San Jose MSA May 2025", note: "AI-adjacent occupational concentration; one cross-section." },
  { variable: "Commercialization", status: "ASSUMPTION", source: null, note: "No AI startup-formation series; Census BFS is not relabeled." },
  { variable: "Public funding", status: "OBSERVED", source: "NSF 2025 title-qualified awards", note: "Nominal obligations; one agency and one award year." },
  { variable: "Capital availability", status: "UNAVAILABLE", source: null, note: "No source passed feasibility gate." },
  { variable: "Patent activity", status: "UNAVAILABLE", source: null, note: "USPTO_API_KEY is not configured." },
] as const;

export const californiaAIScenarioPreset = {
  id: "california-ai-empirical-baseline-v2", caseId: "california-ai", name: { en: "California AI — Empirical Baseline v2", zh: "加州 AI——实证基线 v2" }, label: "Partially Calibrated Scenario Model v2",
  context: { regionId: "california", industryId: "artificial-intelligence", technologyId: "machine-learning", ecosystemId: "california-ai", policyId: null },
  scenarios: ["Research Expansion", "Commercialization Bridge", "Talent Expansion", "Infrastructure Support", "Balanced Innovation Package"],
  baselineEvidenceIndex: californiaAIRadarProfile.composite,
  warning: { en: "Scenario result, not forecast, causal estimate, or econometrically validated model.", zh: "这是情景结果，不是预测、因果估计或经过计量验证的模型。" },
} as const;
