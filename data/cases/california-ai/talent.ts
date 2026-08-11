export const californiaAITalentSource = {
  id: "source-bls-oews-san-jose-2025",
  title: "Occupational Employment and Wages in San Jose-Sunnyvale-Santa Clara — May 2025",
  publisher: "U.S. Bureau of Labor Statistics",
  releaseDate: "2026-07-09",
  referencePeriod: "2025-05",
  retrievedAt: "2026-08-11",
  url: "https://www.bls.gov/regions/west/news-release/occupationalemploymentandwages_sanjose.htm",
  geography: { sourceAreaCode: "0041940", sourceName: "San Jose-Sunnyvale-Santa Clara, CA Metropolitan Statistical Area", nexoraRegionId: "sf-bay-area", crosswalkStatus: "PARTIAL_OVERLAP" },
} as const;

export const californiaAITalentIndicators = [
  { id: "bls-sj-computer-math", soc: "15-0000", label: { en: "Computer & mathematical occupations", zh: "计算机与数学职业" }, employment: 149970, locationQuotient: 3.91, annualMeanWageUSD: 202060 },
  { id: "bls-sj-research-scientists", soc: "15-1221", label: { en: "Computer & information research scientists", zh: "计算机与信息研究科学家" }, employment: 2210, locationQuotient: 8.14, annualMeanWageUSD: 216560 },
  { id: "bls-sj-software-developers", soc: "15-1252", label: { en: "Software developers", zh: "软件开发人员" }, employment: 87350, locationQuotient: 7.09, annualMeanWageUSD: 221710 },
  { id: "bls-sj-data-scientists", soc: "15-2051", label: { en: "Data scientists", zh: "数据科学家" }, employment: 6060, locationQuotient: 3.16, annualMeanWageUSD: 212760 },
  { id: "bls-sj-information-security", soc: "15-1212", label: { en: "Information security analysts", zh: "信息安全分析师" }, employment: 2280, locationQuotient: 1.64, annualMeanWageUSD: 196700 },
].map((indicator) => ({ ...indicator, period: "2025-05", geographyId: "sf-bay-area", status: "OBSERVED_PUBLIC_DATA" as const, construct: "AI_ADJACENT_TECHNICAL_WORKFORCE" as const, sourceId: californiaAITalentSource.id }));

export const californiaAITalentLimitations = {
  en: "OEWS measures wage-and-salary employment by occupation, excludes self-employed workers, and does not identify AI workers. NEXORA treats these as AI-adjacent technical-workforce indicators for one MSA cross-section.",
  zh: "OEWS 按职业测量工资薪金就业，不含自雇人员，也不识别 AI 从业者。NEXORA 仅将其作为单一都会区横截面的 AI 邻近技术劳动力指标。",
};
