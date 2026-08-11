export const californiaAICalibration = [
  { variable: "Research capacity", status: "OBSERVED", source: "OpenAlex 2015–2025 complete-year aggregate", note: "Bounded ten-institution subset." },
  { variable: "Knowledge stock", status: "DERIVED", source: "Accumulated research activity proxy", note: "Proxy, not measured knowledge capital." },
  { variable: "Network connectivity", status: "DERIVED", source: "Verified OpenAlex co-authorship subset", note: "Coverage-limited network only." },
  { variable: "Policy support", status: "PARTIALLY_CALIBRATED", source: "Official policy evidence", note: "Policy count is not converted directly into policy strength." },
  { variable: "Talent capacity", status: "ASSUMPTION", source: null, note: "No production talent series is integrated." },
  { variable: "Commercialization", status: "ASSUMPTION", source: null, note: "No production startup-formation or market series is integrated." },
  { variable: "Capital availability", status: "UNAVAILABLE", source: null, note: "No public reusable venture-capital series." },
  { variable: "Patent activity", status: "UNAVAILABLE", source: null, note: "USPTO_API_KEY is not configured." },
] as const;

export const californiaAIScenarioPreset = {
  id: "california-ai-evidence-informed-baseline", caseId: "california-ai", name: { en: "California AI — Evidence-Informed Baseline", zh: "加州 AI——证据知情基线" }, label: "Partially Calibrated Scenario Model",
  context: { regionId: "california", industryId: "artificial-intelligence", technologyId: "machine-learning", ecosystemId: "california-ai", policyId: null },
  scenarios: ["Research Expansion", "Commercialization Bridge", "Talent Expansion", "Infrastructure Support", "Balanced Innovation Package"],
  warning: { en: "Scenario result, not forecast or causal estimate.", zh: "这是情景结果，不是预测或因果估计。" },
} as const;

