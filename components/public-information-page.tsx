"use client";

import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import styles from "./public-information-page.module.css";

const pages = {
  privacy: {
    en: { eyebrow: "PUBLIC PRIVACY NOTICE", title: "Privacy at NEXORA", intro: "A concise description of what this public release candidate does—and does not—collect.", sections: [
      ["No advertising or behavioral analytics", "NEXORA application code does not include advertising trackers, behavioral analytics, marketing pixels, or cross-site tracking."],
      ["Local language preference", "The English or Simplified Chinese preference is stored in your browser using localStorage. It is not an account and is not sent to a NEXORA database."],
      ["No application sign-in or personal profiles", "Public information routes do not require an application account. NEXORA does not build people profiles, collect private contacts, or infer sensitive personal attributes."],
      ["AI questions", "Questions submitted to NEXORA AI are processed by the server-side evidence-first service. The application does not persist prompt history to a database, and responses are sent with no-store cache controls. A live model provider is not configured."],
      ["External services and links", "Ordinary page views use packaged public-data snapshots and derived records. Source links may take you to external providers, whose privacy practices then apply. The hosting platform may process necessary network and security logs under its own terms."],
      ["Cookies", "NEXORA application code does not set analytics or advertising cookies. Hosting or access-control infrastructure may use strictly necessary cookies when enabled by the platform."],
    ]},
    zh: { eyebrow: "公开隐私说明", title: "NEXORA 隐私说明", intro: "简明说明本公开候选版本会收集什么，以及不会收集什么。", sections: [
      ["无广告或行为分析", "NEXORA 应用代码不包含广告追踪器、行为分析、营销像素或跨站追踪。"],
      ["本地语言偏好", "英文或简体中文偏好通过 localStorage 保存在您的浏览器中。它不是账户，也不会发送到 NEXORA 数据库。"],
      ["无应用登录或个人画像", "公共信息页面不要求应用账户。NEXORA 不建立人员画像、不收集私人联系方式，也不推断敏感个人属性。"],
      ["AI 问题", "提交给 NEXORA AI 的问题由服务器端证据优先服务处理。应用不会把提示历史持久化到数据库，响应使用 no-store 缓存控制。目前未配置实时模型供应商。"],
      ["外部服务与链接", "普通页面访问使用随产品提供的公共数据快照与衍生记录。来源链接可能带您前往外部提供方，届时适用其隐私规则。托管平台可能依据自身条款处理必要的网络与安全日志。"],
      ["Cookie", "NEXORA 应用代码不设置分析或广告 Cookie。托管或访问控制基础设施在平台启用时可能使用严格必要的 Cookie。"],
    ]},
  },
  terms: {
    en: { eyebrow: "PUBLIC USE DISCLAIMER", title: "Research information, not advice", intro: "NEXORA helps visitors examine evidence and assumptions. It does not replace professional judgment.", sections: [
      ["Informational and research use", "Content is provided for research, education, product demonstration, and exploratory analysis."],
      ["No investment, legal, or official policy advice", "Nothing on NEXORA is investment, financial, legal, regulatory, procurement, or official policy advice. Organization inclusion is not endorsement."],
      ["Coverage is bounded", "Public data may change, contain omissions, or reflect provider-specific classifications. NEXORA does not guarantee completeness, timeliness, accuracy, or fitness for a particular decision."],
      ["Derived indicators", "Scores, classifications, networks, and other derived indicators are methodological constructs. They are not official rankings, causal effects, or universal measures of quality."],
      ["AI interpretation", "AI-assisted or deterministic synthesis can be incomplete. Inspect cited sources, evidence gaps, status labels, and limitations before relying on an interpretation."],
      ["Simulation is not prediction", "Simulator outputs describe scenarios under explicit assumptions. They are not forecasts, guarantees, causal estimates, or recommendations."],
      ["Third-party material", "External data and links remain subject to the provider's applicable terms, attribution requirements, and disclaimers."],
    ]},
    zh: { eyebrow: "公开使用免责声明", title: "研究信息，不构成建议", intro: "NEXORA 帮助访问者审查证据与假设，但不能替代专业判断。", sections: [
      ["信息与研究用途", "内容仅用于研究、教育、产品演示与探索性分析。"],
      ["不构成投资、法律或官方政策建议", "NEXORA 的任何内容均不构成投资、金融、法律、监管、采购或官方政策建议。收录组织不代表认可或背书。"],
      ["覆盖范围有边界", "公共数据可能变化、存在遗漏，或依赖特定提供方的分类。NEXORA 不保证完整性、时效性、准确性或对特定决策的适用性。"],
      ["衍生指标", "评分、分类、网络及其他衍生指标属于方法构造，不是官方排名、因果效应或通用质量尺度。"],
      ["AI 解读", "AI 辅助或确定性综合可能不完整。依赖解读前，请检查引用来源、证据缺口、状态标签与局限性。"],
      ["模拟不是预测", "模拟器输出描述明确假设下的情景，不是预测、保证、因果估计或建议。"],
      ["第三方材料", "外部数据与链接仍受相应提供方的适用条款、署名要求和免责声明约束。"],
    ]},
  },
} as const;

export function PublicInformationPage({ kind }: { kind: keyof typeof pages }) {
  const [lang, setLang] = useNexoraLanguage();
  const page = pages[kind][lang];
  return <main className={styles.page}><header><Link href="/"><span>N</span>NEXORA</Link><nav aria-label="Language"><button className={lang === "en" ? styles.on : ""} onClick={() => setLang("en")}>EN</button><button className={lang === "zh" ? styles.on : ""} onClick={() => setLang("zh")}>中文</button></nav></header><section className={styles.hero}><p>{page.eyebrow}</p><h1>{page.title}</h1><h2>{page.intro}</h2><div><Link href="/data-status">{lang === "en" ? "Data Status & methodology" : "数据状态与方法"} →</Link><Link href="/terms">{lang === "en" ? "Public disclaimer" : "公开免责声明"} →</Link></div></section><section className={styles.content}>{page.sections.map(([title, body], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}</section><aside>{lang === "en" ? "This notice describes the NEXORA application release candidate as implemented. It is not generic legal boilerplate." : "本说明描述当前实际实现的 NEXORA 公开候选版本，并非通用法律模板。"}</aside></main>;
}
