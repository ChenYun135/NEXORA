import type { CoverageLevel } from "./case.ts";
import openAlexSnapshot from "./openalex-snapshot.json" with { type: "json" };
import fundingSnapshot from "./funding-snapshot.json" with { type: "json" };

export const californiaAICoverage: { id: string; label: { en: string; zh: string }; level: CoverageLevel; note: { en: string; zh: string } }[] = [
  { id: "research", label: { en: "Research", zh: "科研" }, level: "STRONG", note: { en: `2015–2026 OpenAlex aggregates for a reproducible ${openAlexSnapshot.totals.institutionCount}-institution coverage frame; 2026 is incomplete.`, zh: `覆盖可复现的 ${openAlexSnapshot.totals.institutionCount} 个机构框架的 2015—2026 年 OpenAlex 聚合；2026 年尚不完整。` } },
  { id: "patents", label: { en: "Patents", zh: "专利" }, level: "UNAVAILABLE", note: { en: "USPTO_API_KEY is not configured; adapter status is NOT_CONFIGURED and no Demo count is used.", zh: "未配置 USPTO_API_KEY；适配器状态为 NOT_CONFIGURED，未使用 Demo 计数。" } },
  { id: "organizations", label: { en: "Organizations", zh: "组织" }, level: "PARTIAL", note: { en: "31 verified public identities; roles and coverage tiers are descriptive, not rankings.", zh: "31 个已核验公开身份；角色与覆盖层级均不构成排名。" } },
  { id: "policy", label: { en: "Policy", zh: "政策" }, level: "PARTIAL", note: { en: "12 official California instruments; presence does not prove impact.", zh: "12 项加州官方政策工具；政策存在不等于产生影响。" } },
  { id: "public-funding", label: { en: "Public Funding", zh: "公共资金" }, level: "PARTIAL", note: { en: `${fundingSnapshot.totals.awardCount} deduplicated, title-qualified 2025 NSF awards; nominal obligations, not total California AI funding.`, zh: `${fundingSnapshot.totals.awardCount} 个去重且标题级筛选的 2025 年 NSF 奖项；名义已拨付金额，不代表加州 AI 资金总额。` } },
  { id: "talent", label: { en: "Talent", zh: "人才" }, level: "PARTIAL", note: { en: "Five May 2025 BLS OEWS indicators for the San Jose MSA; AI-adjacent technical workforce, not AI workers.", zh: "五项 2025 年 5 月 San Jose 都会区 BLS OEWS 指标；表示 AI 邻近技术劳动力，不是 AI 从业人数。" } },
  { id: "entrepreneurship", label: { en: "Entrepreneurship", zh: "创业" }, level: "LIMITED", note: { en: "Census BFS is suitable for general formation context but cannot identify California AI startups.", zh: "Census BFS 适合一般企业形成背景，但无法识别加州 AI 初创企业。" } },
  { id: "capital", label: { en: "Capital", zh: "资本" }, level: "UNAVAILABLE", note: { en: "No open transaction-level venture-capital source passed the legal and measurement feasibility gate.", zh: "没有开放的交易级风险资本来源通过法律与测量可行性门槛。" } },
  { id: "market", label: { en: "Market", zh: "市场" }, level: "UNAVAILABLE", note: { en: "No production market-size series is available.", zh: "没有可用的生产级市场规模序列。" } },
  { id: "relationships", label: { en: "Ecosystem Relationships", zh: "生态关系" }, level: "PARTIAL", note: { en: `${openAlexSnapshot.totals.relationshipCount} positive verified co-authorship pairs in-frame; 40 highest-count edges are promoted for display.`, zh: `框架内有 ${openAlexSnapshot.totals.relationshipCount} 对正值核验共著关系；展示其中计数最高的 40 条。` } },
];

export const californiaAIDataQualityReport = {
  id: "ca-ai-quality-v2.0", status: "PASS_WITH_LIMITATIONS", checkedAt: "2026-08-11",
  checks: [
    { id: "annual-completeness", status: "PASS", detail: "12 source-native annual observations; 2026 explicitly partial and excluded from complete-year trends." },
    { id: "institution-frame", status: "PASS", detail: `${openAlexSnapshot.totals.institutionCount} California institutions resolved from the top-200 U.S. activity candidate frame.` },
    { id: "relationship-evidence", status: "PASS", detail: `${openAlexSnapshot.totals.relationshipCount} positive in-frame pairs retain reproducible explicit AND-filter URLs.` },
    { id: "funding-deduplication", status: "PASS", detail: `${fundingSnapshot.totals.awardCount} NSF awards deduplicated by award ID after title-taxonomy qualification.` },
    { id: "talent-construct", status: "PASS", detail: "BLS metrics are labeled AI-adjacent and retain SOC, MSA crosswalk, period, employment, LQ and wage units." },
    { id: "missingness", status: "PASS", detail: "Patents and capital remain unavailable; no zero fill or Demo substitution." },
    { id: "secrets", status: "PASS", detail: "No provider key, PI contact, personal profile or raw-work payload is stored." },
  ],
  rejectedRecords: fundingSnapshot.candidateRows - fundingSnapshot.totals.awardCount,
  rejectedReasons: ["NSF candidate rows failing the title-level AI taxonomy were excluded.", "Duplicate NSF award IDs were collapsed.", "Zero-count OpenAlex pairs were not promoted.", "2026 was excluded from complete-year growth and calibration trends."],
} as const;
