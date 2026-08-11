import type { CoverageLevel } from "./case.ts";

export const californiaAICoverage: { id: string; label: { en: string; zh: string }; level: CoverageLevel; note: { en: string; zh: string } }[] = [
  { id: "research", label: { en: "Research", zh: "科研" }, level: "STRONG", note: { en: "2015–2026 OpenAlex aggregates for a verified ten-institution subset; 2026 is incomplete.", zh: "覆盖十所已核验机构的 2015—2026 年 OpenAlex 聚合；2026 年尚不完整。" } },
  { id: "patents", label: { en: "Patents", zh: "专利" }, level: "UNAVAILABLE", note: { en: "USPTO_API_KEY is not configured; no Demo patent signal is used.", zh: "未配置 USPTO_API_KEY；未使用任何 Demo 专利信号。" } },
  { id: "organizations", label: { en: "Organizations", zh: "组织" }, level: "PARTIAL", note: { en: "25 verified public identities; roles are descriptive, not a ranking.", zh: "25 个经核验的公开组织身份；角色为描述性信息，不构成排名。" } },
  { id: "policy", label: { en: "Policy", zh: "政策" }, level: "PARTIAL", note: { en: "12 official California instruments; presence does not prove impact.", zh: "12 项加州官方政策工具；政策存在不等于产生影响。" } },
  { id: "public-funding", label: { en: "Public Funding", zh: "公共资金" }, level: "LIMITED", note: { en: "Program and authorization context only; no aggregate California AI award total.", zh: "仅有项目与授权背景；没有加州 AI 奖励总额。" } },
  { id: "talent", label: { en: "Talent", zh: "人才" }, level: "UNAVAILABLE", note: { en: "No comparable official California AI talent series is integrated.", zh: "尚未接入可比的加州 AI 官方人才时间序列。" } },
  { id: "capital", label: { en: "Capital", zh: "资本" }, level: "UNAVAILABLE", note: { en: "No legally reusable public venture-capital series is integrated.", zh: "尚未接入可合法复用的公共风险资本时间序列。" } },
  { id: "market", label: { en: "Market", zh: "市场" }, level: "UNAVAILABLE", note: { en: "No production market-size series is available.", zh: "没有可用的生产级市场规模序列。" } },
  { id: "relationships", label: { en: "Ecosystem Relationships", zh: "生态关系" }, level: "PARTIAL", note: { en: "Top 20 OpenAlex co-authorship edges from the selected research subset.", zh: "选定科研子集中的 20 条 OpenAlex 共著关系。" } },
];

export const californiaAIDataQualityReport = {
  id: "ca-ai-quality-v1.0", status: "PASS_WITH_LIMITATIONS", checkedAt: "2026-08-10",
  checks: [
    { id: "annual-completeness", status: "PASS", detail: "12 source-native annual observations from 2015 through 2026." },
    { id: "institution-resolution", status: "PASS", detail: "10/10 research institutions resolve to verified OpenAlex IDs and official identities." },
    { id: "relationship-evidence", status: "PASS", detail: "20/20 promoted edges retain reproducible OpenAlex AND-filter URLs." },
    { id: "topic-mapping", status: "PASS", detail: "7 curated themes map to explicit OpenAlex primary-topic IDs; unmapped topics remain outside theme subtotals." },
    { id: "demo-leakage", status: "PASS", detail: "No Demo metrics are referenced by the flagship narrative." },
    { id: "secrets", status: "PASS", detail: "No provider key is stored in the snapshot or source URLs." },
  ], rejectedRecords: 3,
  rejectedReasons: ["Three zero-count co-authorship pairs were not promoted.", "Documented plus-operator relationship results were rejected after runtime parsing showed a single-token filter.", "Citation totals were excluded because the grouped endpoint did not provide a defensible aggregate."],
} as const;
