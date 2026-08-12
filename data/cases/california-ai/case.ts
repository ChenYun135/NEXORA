import snapshot from "./openalex-snapshot.json" with { type: "json" };

export type CaseLanguage = "en" | "zh";
export type CaseText = { en: string; zh: string };
export type EvidenceStatus = "OBSERVED_PUBLIC_DATA" | "NORMALIZED_DATA" | "DERIVED_METRIC" | "VERIFIED_PUBLIC_ENTITY" | "VERIFIED_RELATIONSHIP" | "VERIFIED_CURATED_RELATIONSHIP" | "NOT_CONFIGURED" | "UNAVAILABLE" | "SIMULATED" | "AI_INTERPRETATION";
export type CoverageLevel = "STRONG" | "PARTIAL" | "LIMITED" | "UNAVAILABLE";

export const californiaAIResearchQuestion: CaseText = {
  en: "How do research capacity, organizational structure, innovation networks, technology momentum, and public policy interact in the evolution of California's AI innovation ecosystem?",
  zh: "科研能力、组织结构、创新网络、技术动能与公共政策如何共同作用于加州人工智能创新生态系统的演进？",
};

export const californiaAIGeographies = [
  { id: "california", name: { en: "California", zh: "加利福尼亚州" }, type: "STATE_PROVINCE", parentId: "country-us", focus: "PRIMARY" },
  { id: "sf-bay-area", name: { en: "San Francisco Bay Area", zh: "旧金山湾区" }, type: "METRO_ECOSYSTEM", parentId: "california", focus: "DEEPEST" },
  { id: "los-angeles", name: { en: "Los Angeles", zh: "洛杉矶" }, type: "METRO_ECOSYSTEM", parentId: "california", focus: "SECONDARY" },
  { id: "san-diego", name: { en: "San Diego", zh: "圣迭戈" }, type: "METRO_ECOSYSTEM", parentId: "california", focus: "SECONDARY" },
  { id: "orange-county", name: { en: "Orange County / Irvine", zh: "橙县／尔湾" }, type: "METRO_ECOSYSTEM", parentId: "california", focus: "SECONDARY" },
  { id: "sacramento", name: { en: "Sacramento / policy context", zh: "萨克拉门托／政策语境" }, type: "METRO_ECOSYSTEM", parentId: "california", focus: "POLICY" },
] as const;

export const californiaAIThemeDefinitions = [
  { id: "machine-learning", name: { en: "Machine Learning", zh: "机器学习" }, topicIds: ["T11689", "T10320", "T11612", "T11307", "T11273", "T12072", "T11303", "T12611", "T11512", "T12535", "T12814", "T11901", "T11652"] },
  { id: "natural-language-processing", name: { en: "Natural Language Processing", zh: "自然语言处理" }, topicIds: ["T10028", "T10181", "T10201", "T12031", "T10664", "T13083", "T11550", "T13629"] },
  { id: "robotics-embodied-ai", name: { en: "Robotics & Embodied AI", zh: "机器人与具身智能" }, topicIds: ["T10462", "T10711", "T14335", "T10820"] },
  { id: "ai-healthcare", name: { en: "AI for Healthcare", zh: "医疗人工智能" }, topicIds: ["T10862", "T13702", "T14381"] },
  { id: "responsible-secure-ai", name: { en: "Responsible & Secure AI", zh: "负责任与安全人工智能" }, topicIds: ["T12026", "T10764", "T10237", "T11424", "T13851"] },
  { id: "agents-reasoning", name: { en: "Agents & Reasoning", zh: "智能体与推理" }, topicIds: ["T10456", "T11010", "T10906", "T12128", "T11574"] },
  { id: "ai-for-science", name: { en: "AI for Science", zh: "科学智能" }, topicIds: ["T13018", "T13650", "T12157", "T11276", "T13734", "T14351"] },
] as const;

const topicCount = new Map(snapshot.topics.map((item) => [item.topicId, item.workCount]));
export const californiaAIThemes = californiaAIThemeDefinitions.map((theme) => ({
  ...theme,
  workCount: theme.topicIds.reduce((sum, id) => sum + (topicCount.get(id) ?? 0), 0),
  status: "DERIVED_METRIC" as const,
  method: "Sum of mutually exclusive OpenAlex primary-topic groups mapped to this case theme; unlisted topics remain outside the theme subtotal.",
}));

export const californiaAIAnnual = snapshot.annual.map((row) => ({ ...row, evidenceId: `ca-ai-openalex-year-${row.year}`, status: "OBSERVED_PUBLIC_DATA" as const, incomplete: row.year === 2026 }));
const y2022 = snapshot.annual.find((row) => row.year === 2022)?.workCount ?? null;
const y2025 = snapshot.annual.find((row) => row.year === 2025)?.workCount ?? null;
export const californiaAIThreeYearGrowth = y2022 && y2025 ? Math.round(((y2025 - y2022) / y2022) * 1000) / 10 : null;
const y2015 = snapshot.annual.find((row) => row.year === 2015)?.workCount ?? null;
export const californiaAICompletePeriodCagr = y2015 && y2025 ? Math.round((Math.pow(y2025 / y2015, 1 / 10) - 1) * 1000) / 10 : null;
export const californiaAIThreeYearRolling = californiaAIAnnual.filter((row) => row.year <= 2025).map((row, index, rows) => ({
  year: row.year,
  average: index < 2 ? null : Math.round(rows.slice(index - 2, index + 1).reduce((sum, item) => sum + item.workCount, 0) / 3),
  status: index < 2 ? "UNAVAILABLE" as const : "DERIVED_METRIC" as const,
}));

export const californiaAIRegistry = {
  id: "california-ai",
  version: "ca-ai-case-v2.0",
  status: "PRIVATE_RESEARCH_READY",
  snapshotDate: snapshot.snapshotDate,
  taxonomyVersion: "ca-ai-taxonomy-v2.0",
  timeRange: { from: 2015, to: 2026, completeThrough: 2025 },
  title: { en: "California AI Innovation Ecosystem", zh: "加州人工智能创新生态系统" },
  subtitle: { en: "A multi-layer empirical NEXORA flagship case.", zh: "NEXORA 多层实证旗舰案例。" },
  support: { en: "Research, verified networks, AI-adjacent workforce, NSF awards, policy, and explicit evidence gaps across California.", zh: "以公共证据连接加州科研、核验网络、AI 邻近劳动力、NSF 奖项、政策与明确证据缺口。" },
  researchQuestion: californiaAIResearchQuestion,
  snapshot,
} as const;
