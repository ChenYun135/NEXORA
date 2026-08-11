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
 radar:{en:"Real OpenAlex research activity is available for seven mapped themes; prototype Opportunity Scores below remain Demo.",zh:"七类映射主题已有真实 OpenAlex 科研活动；下方原型机会分数仍为 Demo。"},
 ecosystems:{en:"20 verified OpenAlex co-authorship edges are available within the selected ten-institution subset.",zh:"选定十所机构子集中已有 20 条核验 OpenAlex 共著边。"},
 policy:{en:"12 official California AI instruments cover adoption, procurement, transparency, workforce and sector mechanisms.",zh:"12 项加州官方 AI 政策工具覆盖采用、采购、透明度、劳动力与行业机制。"},
 companies:{en:"25 verified public organization identities; descriptive roles are not an importance ranking.",zh:"25 个已核验公开组织身份；描述性角色不构成重要性排名。"},
 ai:{en:"Case retrieval defaults to production California AI evidence and excludes Demo evidence.",zh:"案例检索默认使用加州 AI 生产证据，并排除 Demo 证据。"},
 simulator:{en:"California AI evidence-informed baseline: observed and derived inputs stay separate from assumptions and unavailable inputs.",zh:"加州 AI 证据知情基线：观测与衍生输入同假设及不可用输入分离。"},
} as const;

export function CaliforniaAIContextBanner({module}:{module:Module}){
 const [lang]=useNexoraLanguage();
 const visible=useSyncExternalStore(()=>()=>{},()=>{const p=new URLSearchParams(window.location.search);return p.get("case")==="california-ai"||p.get("industry")==="artificial-intelligence"||p.get("jurisdiction")==="california"||["california","sf-bay-area"].includes(p.get("region")??"")},()=>false);
 if(!visible)return null;
 const patents=californiaAICoverage.find(x=>x.id==="patents")!;
 return <aside className={styles.banner} aria-label="California AI flagship case context"><div><span>FLAGSHIP CASE · {californiaAIRegistry.snapshotDate}</span><h2>{californiaAIRegistry.title[lang]}</h2><p>{details[module][lang]}</p></div><dl><div><dt>CASE STATUS</dt><dd>PRIVATE RESEARCH READY</dd></div><div><dt>PATENTS</dt><dd>{patents.level}</dd></div></dl><Link href="/cases/california-ai">{lang==="en"?"Open guided case":"打开引导式案例"} →</Link></aside>
}
