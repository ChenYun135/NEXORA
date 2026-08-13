"use client";

import { useMemo, useState } from "react";
import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import { publicProviderRegistry, providerSummary } from "@/data/providers/registry";
import type { ProviderReadiness, ResearchConstruct } from "@/domain/research-data";
import { ResearchModuleShell } from "./editorial/ResearchModuleShell";
import styles from "./data-status.module.css";

const constructs: Array<{id:"ALL"|ResearchConstruct;en:string;zh:string}> = [
  {id:"ALL",en:"All sources",zh:"全部来源"},{id:"RESEARCH",en:"Research",zh:"科研"},{id:"PUBLIC_R&D",en:"Public R&D",zh:"公共研发"},{id:"TALENT",en:"Talent",zh:"人才"},{id:"ENTREPRENEURSHIP",en:"Entrepreneurship",zh:"创业"},{id:"COMMERCIALIZATION",en:"Commercialization",zh:"成果转化"},{id:"PATENTS",en:"Patents",zh:"专利"},{id:"COLLABORATION",en:"Collaboration",zh:"协作"},{id:"POLICY",en:"Policy",zh:"政策"},{id:"ECONOMIC_CONTEXT",en:"Economy",zh:"经济"},
];

const statusText: Record<ProviderReadiness,{en:string;zh:string}> = {
  READY:{en:"Ready",zh:"已就绪"},STAGED:{en:"Staged",zh:"待验证"},REVIEW_REQUIRED:{en:"Review required",zh:"需复核"},NOT_CONFIGURED:{en:"Not configured",zh:"未配置"},UNAVAILABLE:{en:"Unavailable",zh:"不可用"},DEGRADED:{en:"Degraded",zh:"服务降级"},
};

export function DataStatus(){
  const [lang,setLang]=useNexoraLanguage();
  const [construct,setConstruct]=useState<(typeof constructs)[number]["id"]>("ALL");
  const [query,setQuery]=useState("");
  const summary=providerSummary();
  const rows=useMemo(()=>publicProviderRegistry.filter(provider=>{
    const matchesConstruct=construct==="ALL"||provider.constructsSupported.includes(construct);
    const search=query.trim().toLowerCase();
    const matchesSearch=!search||[provider.providerId,provider.officialName,provider.constructsSupported.join(" "),provider.geographies.join(" ")].join(" ").toLowerCase().includes(search);
    return matchesConstruct&&matchesSearch;
  }),[construct,query]);
  const t=lang==="en"?{
    title:"Public data sources",lead:"Inspect what each official source measures, its coverage, access state, reuse boundary and current limitation.",filter:"Filter by evidence domain",search:"Search providers",coverage:"Public foundation",tierA:"Tier A providers",ready:"Tier A ready",staged:"Tier A staged",registry:"Provider registry",architecture:"Data architecture",limitations:"Limitations",source:"Official source",method:"Access",geo:"Geography",period:"Coverage",reuse:"Redistribution",measures:"Supports",empty:"No provider matches this view",boundary:"A provider being listed does not mean its data are production-ready. READY is reserved for public snapshots or controlled records that have passed the current quality boundary.",pipeline:"Source → raw snapshot → normalized → harmonized → derived → public export",foot:"PUBLIC SOURCES · EXPLICIT STATUS · TRACEABLE PROVENANCE"}:
    {title:"公共数据来源",lead:"查看各官方来源的测量内容、覆盖范围、接入状态、复用边界与当前局限",filter:"按证据领域筛选",search:"搜索数据来源",coverage:"公共数据基础",tierA:"Tier A 来源",ready:"Tier A 已就绪",staged:"Tier A 待验证",registry:"数据源注册表",architecture:"数据架构",limitations:"局限说明",source:"官方来源",method:"获取方式",geo:"地理层级",period:"时间覆盖",reuse:"公开复用",measures:"支持领域",empty:"当前筛选条件下没有数据来源",boundary:"被列入注册表并不代表数据已经达到生产要求。只有通过当前质量边界的公共快照或受控官方记录才标记为“已就绪”",pipeline:"官方来源 → 原始快照 → 规范化 → 协调统一 → 指标衍生 → 公开导出",foot:"公共来源 · 明确状态 · 可追溯来源链"};
  return <main className={styles.page}>
    <ResearchModuleShell image="/data-status-og.png" eyebrow="NEXORA / PUBLIC DATA FOUNDATION" title={lang==="en"?"NEXORA DATA STATUS":"NEXORA 数据状态"} subtitle={lang==="en"?"Public data. Provenance. Quality. Freshness":"公共数据、来源链、质量与时效"} description={lang==="en"?"Follow every public evidence stream from official provider to bounded analytical use.":"追踪每条公共证据从官方来源到边界明确的分析用途"} enterLabel={lang==="en"?"Explore data sources":"浏览数据来源"} insightLabel={lang==="en"?"Methods & evidence":"方法与证据"} lang={lang}/>
    <div id="workspace"/>
    <header className={styles.bar}><Link href="/">NEXORA / DATA</Link><nav aria-label="Language"><button className={lang==="en"?styles.on:""} onClick={()=>setLang("en")}>EN</button><button className={lang==="zh"?styles.on:""} onClick={()=>setLang("zh")}>中文</button></nav></header>
    <section className={styles.intro}><span>PUBLIC DATA FOUNDATION / R2</span><h1>{t.title}</h1><p>{t.lead}</p><div className={styles.summary}><article><b>{summary.total}</b><span>{t.coverage}</span></article><article><b>{summary.tierA}</b><span>{t.tierA}</span></article><article><b>{summary.tierAReady}</b><span>{t.ready}</span></article><article><b>{summary.byStatus.STAGED}</b><span>{t.staged}</span></article></div><p className={styles.boundary}>{t.boundary}</p><p><a href="/research/r2-operational-coverage.json">{lang==="en"?"Download R2 operational coverage":"下载 R2 运营覆盖数据"} →</a></p></section>
    <section className={styles.explorer} aria-labelledby="provider-explorer"><div className={styles.heading}><span>01 / SOURCE EXPLORER</span><h2 id="provider-explorer">{t.registry}</h2><p>{t.pipeline}</p></div><div className={styles.controls}><label><span>{t.filter}</span><select value={construct} onChange={event=>setConstruct(event.target.value as typeof construct)}>{constructs.map(item=><option key={item.id} value={item.id}>{item[lang]}</option>)}</select></label><label><span>{t.search}</span><input value={query} onChange={event=>setQuery(event.target.value)} placeholder={lang==="en"?"BLS, policy, state…":"BLS、政策、州…"}/></label></div><div className={styles.providers}>{rows.map(provider=><article key={provider.providerId} data-status={provider.status}><div className={styles.providerTop}><span>TIER {provider.tier} · {provider.providerId}</span><b>{statusText[provider.status][lang]}</b></div><h3>{provider.officialName}</h3><p>{provider.limitation}</p><dl><Fact label={t.measures} value={provider.constructsSupported.join(" · ")}/><Fact label={t.method} value={`${provider.sourceType} · ${provider.authentication}`}/><Fact label={t.geo} value={provider.geographies.join(" · ")}/><Fact label={t.period} value={[provider.earliestYear,provider.latestYear].filter(Boolean).join(" — ")||"provider dependent"}/><Fact label={t.reuse} value={provider.redistributionRule.replaceAll("_"," ")}/></dl><a href={provider.officialUrl} rel="noreferrer">{t.source} ↗</a></article>)}</div>{rows.length===0&&<p className={styles.empty}>{t.empty}</p>}</section>
    <section className={styles.methods}><div><span>02 / DATA CONTRACT</span><h2>{t.architecture}</h2></div><ol>{[lang==="en"?"Every record keeps observation year, source period, retrieval date and snapshot date":"每条记录保留观测年份、来源期间、获取日期与快照日期",lang==="en"?"City, county, CBSA, state and country are never silently mixed":"城市、县、都市统计区、州与国家层级绝不静默混用",lang==="en"?"Missing, suppressed and observed-zero values remain different states":"缺失、抑制与明确观测为零始终保持不同状态",lang==="en"?"BFS applications remain separate from BDS realized firm dynamics":"BFS 申请与 BDS 实际企业动态始终分开",lang==="en"?"Derived metrics retain snapshot, transformation and code versions":"衍生指标保留快照、转换规则与代码版本"].map((item,index)=><li key={item}><span>0{index+1}</span><p>{item}</p></li>)}</ol><div className={styles.links}><a href="/research/provider-registry.json" download>{t.registry} JSON ↓</a><a href="/docs/PUBLIC_DATA_ARCHITECTURE.md" download>{t.architecture} ↓</a><a href="/docs/PUBLIC_DATA_LIMITATIONS.md" download>{t.limitations} ↓</a><Link href="/methodology">{lang==="en"?"Methodology":"方法说明"} →</Link></div></section>
    <footer>{t.foot}</footer>
  </main>;
}

function Fact({label,value}:{label:string;value:string}){return <div><dt>{label}</dt><dd>{value}</dd></div>}
