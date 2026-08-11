export type ProductModuleId = "data-status" | "atlas" | "radar" | "ecosystems" | "policy" | "companies" | "ai" | "simulator";

export const integrationRelease = {
  label: "NEXORA Integration Audit 1",
  version: "Post-Sprint Integration v1",
  date: "2026-08-10",
} as const;

export const productJourney = [
  { id: "data-status", href: "/data-status", action: { en: "SOURCE", zh: "溯源" }, name: { en: "Public Data", zh: "公共数据" }, description: { en: "Verified sources, freshness and provenance", zh: "核验来源、新鲜度与可追溯性" } },
  { id: "atlas", href: "/atlas", action: { en: "MAP", zh: "绘制" }, name: { en: "Atlas", zh: "产业图谱" }, description: { en: "Map emerging-industry geography", zh: "绘制新兴产业地理" } },
  { id: "radar", href: "/radar", action: { en: "DETECT", zh: "识别" }, name: { en: "Radar", zh: "机会雷达" }, description: { en: "Detect momentum and weak signals", zh: "识别动能与早期信号" } },
  { id: "ecosystems", href: "/ecosystems", action: { en: "CONNECT", zh: "连接" }, name: { en: "Ecosystems", zh: "创新生态" }, description: { en: "Connect institutions and relationships", zh: "连接机构与创新关系" } },
  { id: "policy", href: "/policy", action: { en: "UNDERSTAND", zh: "理解" }, name: { en: "Policy", zh: "政策智能" }, description: { en: "Understand public-policy forces", zh: "理解公共政策驱动力" } },
  { id: "companies", href: "/companies", action: { en: "DISCOVER", zh: "发现" }, name: { en: "Organizations", zh: "组织智能" }, description: { en: "Discover organizations shaping the frontier", zh: "发现塑造产业前沿的组织" } },
  { id: "ai", href: "/ai", action: { en: "EXPLAIN", zh: "解释" }, name: { en: "NEXORA AI", zh: "NEXORA AI" }, description: { en: "Explain evidence across modules", zh: "基于跨模块证据进行解释" } },
  { id: "simulator", href: "/simulator", action: { en: "SIMULATE", zh: "模拟" }, name: { en: "Simulator", zh: "情景模拟器" }, description: { en: "Explore scenarios, not predictions", zh: "探索情景，而非作出预测" } },
] as const satisfies ReadonlyArray<{ id: ProductModuleId; href: string; action: { en: string; zh: string }; name: { en: string; zh: string }; description: { en: string; zh: string } }>;

export const canonicalDataStates = [
  "Public Data",
  "Normalized Data",
  "Derived Metric",
  "Composite Score",
  "Demo Data",
  "Stale Data",
  "Unavailable",
  "Simulated",
  "AI Interpretation",
] as const;
