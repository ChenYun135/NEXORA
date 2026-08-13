"use client";

import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import styles from "./public-information-page.module.css";

const content={
  en:{eyebrow:"PUBLIC METHODOLOGY",title:"Evidence before interpretation",intro:"NEXORA separates official records, normalization, derived metrics, synthesis and scenarios so every claim carries the right boundary.",sections:[
    ["Observed evidence","Provider facts retain source, geography, construct, period, coverage and freshness. Different providers are not assumed to be directly comparable."],
    ["Derived and composite metrics","Deterministic transformations disclose inputs and scope. Product constructs are not official statistics, universal rankings or causal estimates."],
    ["Provider status","READY means a verified public snapshot or controlled official record has passed the current quality boundary. Other states remain visible and never become production evidence."],
    ["Geography and time","City, county, CBSA, state and country remain distinct. Every record retains observation year, source period, retrieval date, snapshot date and source vintage."],
    ["Semantic missingness","Observed zero, missing, not applicable, suppressed and unavailable are different states. Government suppression flags never become measured zero."],
    ["AI interpretation","The evidence-first workspace reports sufficiency, cites configured support, and qualifies or refuses when evidence is inadequate."],
    ["Scenarios","Simulation explores trajectories under explicit assumptions and uncertainty. It is not prediction, a forecast or proof of policy impact."],
    ["Public data boundary","Public provider metadata, generic indicators and public aggregates remain separate from all private research inputs, calibration and unpublished outputs."],
  ]},
  zh:{eyebrow:"公开方法说明",title:"先有证据，再做解读",intro:"NEXORA 将官方记录、规范化、衍生指标、综合解读与情景模拟分开，使每项判断都有清晰边界",sections:[
    ["观测证据","数据保留官方来源、地理层级、测量构念、时期、覆盖范围与时效。不同来源不会被默认视为可以直接比较"],
    ["衍生与复合指标","确定性转换公开输入与适用范围。产品构念不是官方统计、普遍排名或因果估计"],
    ["数据源状态","“已就绪”表示经过验证的公共快照或受控官方记录已经通过当前质量边界。其他状态保持可见，绝不作为生产证据呈现"],
    ["地理与时间","城市、县、都市统计区、州与国家观测保持分离。每条记录保留观测年份、来源期间、获取日期、快照日期与来源版本"],
    ["缺失值语义","明确观测为零、缺失、不适用、受抑制与不可用属于不同状态。政府数据中的抑制标记不会被转换为测量零值"],
    ["AI 解读","循证工作区会报告证据充分性、引用已配置支持，并在证据不足时限定回答或拒绝推断"],
    ["情景模拟","模拟在明确假设与不确定性下探索轨迹，不是预测、预报或政策效果证明"],
    ["公共数据边界","公共数据源元数据、通用指标与公共汇总和所有私人研究输入、校准及未发表输出保持分离"],
  ]},
} as const;

export function PublicMethodologyPage(){const [lang,setLang]=useNexoraLanguage();const page=content[lang];return <main className={styles.page}><header><Link href="/"><span>N</span>NEXORA</Link><nav aria-label="Language"><button className={lang==="en"?styles.on:""} onClick={()=>setLang("en")}>EN</button><button className={lang==="zh"?styles.on:""} onClick={()=>setLang("zh")}>中文</button></nav></header><section className={styles.hero}><p>{page.eyebrow}</p><h1>{page.title}</h1><h2>{page.intro}</h2><div><Link href="/data-status">{lang==="en"?"Open Data Status":"打开数据状态"} →</Link><a href="/docs/PUBLIC_DATA_ARCHITECTURE.md" download>{lang==="en"?"Public data architecture":"公共数据架构"} ↓</a><a href="/research/provider-registry.json" download>{lang==="en"?"Provider registry":"数据源注册表"} ↓</a><Link href="/terms">{lang==="en"?"Public disclaimer":"公开免责声明"} →</Link></div></section><section className={styles.content}>{page.sections.map(([title,body],index)=><article key={title}><span>{String(index+1).padStart(2,"0")}</span><div><h2>{title}</h2><p>{body}</p></div></article>)}</section></main>}
