"use client";
import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import { ModuleShowcase } from "@/components/editorial/ModuleShowcase";
import Image from "next/image";
import styles from "./dashboard-v2.module.css";

const modules = [
  { id:"atlas", href:"/atlas", art:"atlas", name:{en:"Atlas",zh:"全球产业图谱"}, question:{en:"Where are tomorrow’s industries taking shape",zh:"未来产业正在何处形成"},body:{en:"Explore emerging industries, research hubs and innovation ecosystems across regions.",zh:"探索新兴产业、科研枢纽与区域创新生态"},highlights:{en:["Geography","Specialization","Comparison"],zh:["创新地理","专业化","区域比较"]}},
  { id:"radar", href:"/radar", art:"radar", name:{en:"Radar",zh:"未来产业雷达"}, question:{en:"Which technologies are gaining momentum",zh:"哪些技术正在加速涌现"},body:{en:"Trace emerging signals, momentum and the evidence behind them.",zh:"识别技术动能，追溯信号背后的证据"},highlights:{en:["Momentum","Signals","Evidence"],zh:["技术动能","前沿信号","证据链"]}},
  { id:"ecosystems", href:"/ecosystems", art:"ecosystems", name:{en:"Ecosystems",zh:"创新生态"}, question:{en:"How are innovation actors connected",zh:"创新主体如何连接"},body:{en:"Understand the institutions, bridges and knowledge flows behind innovation.",zh:"理解机构、桥接关系与知识流动"},highlights:{en:["Networks","Bridges","Knowledge flows"],zh:["网络结构","桥接关系","知识流动"]}},
  { id:"policy", href:"/policy", art:"policy", name:{en:"Policy",zh:"政策智能"}, question:{en:"How does policy shape emerging industries",zh:"政策如何塑造未来产业"},body:{en:"Study instruments, mechanisms, implementation pathways and evidence boundaries.",zh:"研究政策工具、作用机制与实施路径"},highlights:{en:["Instruments","Mechanisms","Implementation"],zh:["政策工具","作用机制","实施过程"]}},
  { id:"organizations", href:"/companies", art:"organizations", name:{en:"Organizations",zh:"组织智能"}, question:{en:"Who is shaping the innovation landscape",zh:"谁在塑造创新生态"},body:{en:"Explore institutional roles, relationships and public evidence.",zh:"探索机构角色、关系网络与公开证据"},highlights:{en:["Roles","Relationships","Evidence"],zh:["机构角色","关系网络","公开证据"]}},
  { id:"data", href:"/data-status", art:"data-status", name:{en:"Data Status",zh:"数据状态"}, question:{en:"What evidence can you trust",zh:"哪些证据值得信任"},body:{en:"Inspect provenance, quality, freshness and evidence limits.",zh:"审视来源、质量、时效与证据边界"},highlights:{en:["Provenance","Quality","Freshness"],zh:["数据来源","质量状态","更新时效"]}},
  { id:"ai", href:"/ai", art:"ai", name:{en:"NEXORA AI",zh:"NEXORA AI"}, question:{en:"What does the evidence actually support",zh:"现有证据支持什么结论"},body:{en:"Move from bounded questions to source-aware interpretation.",zh:"从清晰问题出发，形成有来源的审慎解读"},highlights:{en:["Questions","Evidence","Interpretation"],zh:["研究问题","证据检索","审慎解读"]}},
  { id:"simulator", href:"/simulator", art:"simulator", name:{en:"Simulator",zh:"情景模拟器"}, question:{en:"How might the system evolve",zh:"创新生态可能如何演化"},body:{en:"Explore mechanisms, delays and trajectories without treating simulation as prediction.",zh:"探索机制、时滞与可能轨迹，不将模拟视为预测"},highlights:{en:["Mechanisms","Delays","Trajectories"],zh:["作用机制","时间时滞","情景轨迹"]}},
] as const;

const principles = [
  {en:["PUBLIC DATA","Start from attributable public evidence."],zh:["公共数据","从可归属的公共证据出发"]},
  {en:["TRANSPARENT METHODS","Make derivations, states and limitations visible."],zh:["透明方法","让衍生过程、数据状态与局限保持可见"]},
  {en:["RESPONSIBLE AI","Separate evidence, interpretation and uncertainty."],zh:["负责任的 AI","明确区分证据、解读与不确定性"]},
  {en:["REPRODUCIBLE RESEARCH","Preserve versions, sources and research boundaries."],zh:["可复现研究","保留版本、来源与研究边界"]},
] as const;

export function Dashboard(){
 const [lang,setLang]=useNexoraLanguage();
 return <main className={`${styles.page} ${lang==="zh"?styles.zh:""}`}>
  <header className={styles.header}><Link href="/" className={styles.brand}><span>N</span>NEXORA</Link><nav><a href="#explore">{lang==="en"?"Explore":"探索"}</a><Link href="/methodology">{lang==="en"?"Methodology":"研究方法"}</Link><div><button className={lang==="en"?styles.on:""} onClick={()=>setLang("en")}>EN</button><button className={lang==="zh"?styles.on:""} onClick={()=>setLang("zh")}>中文</button></div></nav></header>
  <section className={styles.hero}>
   <div className={styles.heroCopy}><span>NEXORA / FUTURE INDUSTRY INTELLIGENCE</span><h1>NEXORA</h1><h2>{lang==="en"?<><b>Map what&apos;s emerging</b><b>Understand what drives it</b><b>See what comes next</b></>:<><b>识别新兴产业</b><b>解析关键驱动力</b><b>研判未来趋势</b></>}</h2><p>{lang==="en"?"An evidence-based future-industry intelligence platform for exploring emerging industries, innovation ecosystems and technological change.":"面向未来产业的循证情报平台，以公共数据与透明方法探索创新生态与技术变迁"}</p><div className={styles.actions}><a href="#explore" className={styles.primary}>{lang==="en"?"Explore NEXORA":"探索 NEXORA"} ↓</a><Link href="/methodology">{lang==="en"?"Research & methodology":"研究与方法"} →</Link></div></div>
   <div className={styles.heroArt} aria-hidden="true"><Image src="/hero/atlas-hero-art.webp" alt="" fill priority sizes="(max-width: 900px) 100vw, 56vw"/></div>
  </section>
  <section className={styles.explore} id="explore"><div className={styles.sectionHead}><span>01 / DISCOVER</span><h2>{lang==="en"?"Explore NEXORA":"探索 NEXORA"}</h2><p>{lang==="en"?"Eight connected research experiences. Begin with the question that matters to you.":"八个彼此连接的研究入口，从你真正关心的问题开始"}</p></div><ModuleShowcase items={modules} lang={lang}/></section>
  <section className={styles.feature}><div className={styles.featureArt}><img src="/california-ai-og.png" alt=""/></div><div><span>02 / FEATURED RESEARCH</span><h2>{lang==="en"?"California AI Innovation Ecosystem":"加州人工智能创新生态"}</h2><h3>{lang==="en"?"How do research, talent, public funding and institutions interact within California’s AI ecosystem?":"科研、人才、公共资助与机构如何共同塑造加州 AI 创新生态"}</h3><p>{lang==="en"?"A versioned public evidence case combining a selected OpenAlex research frame, BLS AI-adjacent talent, NSF awards, official policy and explicit evidence gaps.":"一个版本化公共证据案例，连接 OpenAlex 科研框架、BLS AI 邻近人才、NSF 奖项、官方政策与明确的证据缺口"}</p><dl><div><dt>2015–2025</dt><dd>{lang==="en"?"complete research years":"完整科研年度"}</dd></div><div><dt>31</dt><dd>{lang==="en"?"verified organizations":"已核验组织"}</dd></div><div><dt>63</dt><dd>{lang==="en"?"NSF award records":"NSF 奖项记录"}</dd></div></dl><Link href="/cases/california-ai">{lang==="en"?"Open the research case":"打开研究案例"} →</Link></div></section>
  <section className={styles.principles}><div className={styles.sectionHead}><span>03 / RESEARCH PRINCIPLES</span><h2>{lang==="en"?"Intelligence with visible boundaries":"边界清晰的研究情报"}</h2><p className={styles.trustLine}>{lang==="en"?"One evidence trail, nine connected views · NO LIVE GEOLOCATION · DEMO COMPOSITE MODEL":"一条证据链，九个相互连接的研究视图 · 不使用实时地理定位 · 综合模型为演示状态"}</p></div><div>{principles.map((item,i)=><article key={item.en[0]}><span>0{i+1}</span><h3>{item[lang][0]}</h3><p>{item[lang][1]}</p></article>)}</div></section>
 </main>;
}
