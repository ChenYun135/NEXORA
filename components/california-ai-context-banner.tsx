"use client";
import { useSyncExternalStore } from "react";
import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import { californiaAIRegistry } from "@/data/cases/california-ai/case";
import { californiaAICoverage } from "@/data/cases/california-ai/coverage";
import styles from "./california-ai-context-banner.module.css";

type Module = "atlas"|"radar"|"ecosystems"|"policy"|"companies"|"ai"|"simulator";
const details = {
 atlas:{en:"Canonical California geography · Bay Area deepest evidence · selected-institution research regions",zh:"规范加州地理 · 湾区证据最深 · 选定机构科研区域"},
 radar:{en:"Case-specific empirical signals combine research, verified network, NSF funding and AI-adjacent talent; global prototype scores remain Demo.",zh:"案例实证信号结合科研、核验网络、NSF 资助与 AI 邻近人才；全局原型分数仍为 Demo。"},
 ecosystems:{en:"40 promoted OpenAlex co-authorship edges are available within a reproducible 16-institution coverage frame.",zh:"可复现的 16 机构覆盖框架中已有 40 条纳入展示的 OpenAlex 共著边。"},
 policy:{en:"12 official California AI instruments cover adoption, procurement, transparency, workforce and sector mechanisms.",zh:"12 项加州官方 AI 政策工具覆盖采用、采购、透明度、劳动力与行业机制。"},
 companies:{en:"31 verified public organization identities; descriptive roles and coverage tiers are not importance rankings.",zh:"31 个已核验公开组织身份；描述性角色与覆盖层级不构成重要性排名。"},
 ai:{en:"Case retrieval includes production research, talent, NSF funding, policy and network evidence; Demo evidence is excluded.",zh:"案例检索纳入生产级科研、人才、NSF 资助、政策与网络证据，并排除 Demo。"},
 simulator:{en:"Empirical baseline v2 separates observed, empirically derived, proxy-calibrated, assumption and unavailable inputs.",zh:"实证基线 v2 区分观测、实证衍生、代理校准、假设与不可用输入。"},
} as const;

export function CaliforniaAIContextBanner({module}:{module:Module}){
 const [lang]=useNexoraLanguage();
 const visible=useSyncExternalStore(()=>()=>{},()=>{const p=new URLSearchParams(window.location.search);return p.get("case")==="california-ai"||p.get("industry")==="artificial-intelligence"||p.get("jurisdiction")==="california"||["california","sf-bay-area"].includes(p.get("region")??"")},()=>false);
 if(!visible)return null;
 const patents=californiaAICoverage.find(x=>x.id==="patents")!;
 return <aside className={styles.banner} aria-label="California AI flagship case context"><div><span>FLAGSHIP CASE · {californiaAIRegistry.snapshotDate}</span><h2>{californiaAIRegistry.title[lang]}</h2><p>{details[module][lang]}</p></div><dl><div><dt>CASE STATUS</dt><dd>PUBLIC EVIDENCE CASE</dd></div><div><dt>PATENTS</dt><dd>{patents.level}</dd></div></dl><Link href="/cases/california-ai">{lang==="en"?"Open guided case":"打开引导式案例"} →</Link></aside>
}
