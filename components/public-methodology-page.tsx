"use client";

import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import styles from "./public-information-page.module.css";

const content = {
  en: {
    eyebrow: "PUBLIC METHODOLOGY",
    title: "Evidence before interpretation.",
    intro: "NEXORA separates observed records, normalization, derived metrics, AI synthesis, and scenarios so every claim carries the right boundary.",
    sections: [
      ["Observed evidence", "Provider facts retain source, geography, construct, period, coverage, and freshness. Different providers are not assumed to be directly comparable."],
      ["Derived and composite metrics", "Deterministic transformations disclose inputs and scope. Demo composites are product constructs—not official statistics, universal rankings, or causal estimates."],
      ["AI interpretation", "The evidence-first workspace reports sufficiency, cites configured support, and qualifies or refuses when evidence is inadequate. It does not imply a configured live general-purpose model."],
      ["Scenarios", "Simulation explores trajectories under explicit assumptions, sensitivity, and uncertainty. It is not prediction, a forecast, or proof of policy impact."],
      ["California AI case", "The flagship is a selected evidence panel, not a statewide census. Complete research-year analysis uses 2015–2025; 2026 partial-year records are excluded from complete-year growth."],
      ["Missing evidence", "Unavailable, degraded, stale, and not configured remain visible states. Unsupported indicators are never filled with Demo, fabricated, or zero values."],
    ],
  },
  zh: {
    eyebrow: "公开方法说明",
    title: "先有证据，再做解读。",
    intro: "NEXORA 将观测记录、标准化、衍生指标、AI 综合与情景模拟分开，使每项主张都具有适当边界。",
    sections: [
      ["观测证据", "来源事实保留提供方、地理、构念、时期、覆盖与新鲜度；不同提供方不被默认视为可直接比较。"],
      ["衍生与复合指标", "确定性转换披露输入与范围。演示复合指标是产品构念，不是官方统计、普适排名或因果估计。"],
      ["AI 解读", "循证工作区报告证据充分性、引用已配置支持，并在证据不足时限定或拒答；它不暗示已配置通用实时模型。"],
      ["情景模拟", "模拟在明确假设、敏感性与不确定性下探索轨迹；它不是预测、预报或政策效果证明。"],
      ["加州 AI 案例", "旗舰案例是精选证据面板，而非全州普查。完整研究年度分析使用 2015–2025；2026 部分年度排除在完整年度增长之外。"],
      ["缺失证据", "不可用、降级、陈旧与未配置均保留为可见状态；不受支持指标绝不以演示、虚构或零值填补。"],
    ],
  },
} as const;

export function PublicMethodologyPage() {
  const [lang, setLang] = useNexoraLanguage();
  const page = content[lang];
  return <main className={styles.page}><header><Link href="/"><span>N</span>NEXORA</Link><nav aria-label="Language"><button className={lang === "en" ? styles.on : ""} onClick={() => setLang("en")}>EN</button><button className={lang === "zh" ? styles.on : ""} onClick={() => setLang("zh")}>中文</button></nav></header><section className={styles.hero}><p>{page.eyebrow}</p><h1>{page.title}</h1><h2>{page.intro}</h2><div><Link href="/data-status">{lang === "en" ? "Open Data Status" : "打开数据状态"} →</Link><Link href="/terms">{lang === "en" ? "Public disclaimer" : "公开免责声明"} →</Link></div></section><section className={styles.content}>{page.sections.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}</section></main>;
}
