"use client";

import { useMemo, useState } from "react";
import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";
import { californiaAIRegistry, californiaAIAnnual, californiaAIThemes, californiaAIThreeYearGrowth, californiaAICompletePeriodCagr } from "@/data/cases/california-ai/case";
import { californiaAIOrganizations } from "@/data/cases/california-ai/organizations";
import { californiaAIPolicies } from "@/data/cases/california-ai/policies";
import { californiaAIRelationships } from "@/data/cases/california-ai/relationships";
import { californiaAICoverage, californiaAIDataQualityReport } from "@/data/cases/california-ai/coverage";
import { californiaAIFindings } from "@/data/cases/california-ai/findings";
import { californiaAICalibration, californiaAIScenarioPreset } from "@/data/cases/california-ai/calibration";
import { californiaAISources } from "@/data/cases/california-ai/sources";
import { californiaAIFundingAwards, californiaAIFundingSnapshot } from "@/data/cases/california-ai/funding";
import { californiaAITalentIndicators, californiaAITalentLimitations } from "@/data/cases/california-ai/talent";
import { californiaAIPatentStatus } from "@/data/cases/california-ai/patents";
import { californiaAIEntrepreneurship } from "@/data/cases/california-ai/entrepreneurship";
import { californiaAICapitalFeasibility } from "@/data/cases/california-ai/capital";
import { californiaAICrossLayerAnalysis, californiaAIEvidenceLayers, californiaAINetworkMetrics, californiaAIRadarProfile } from "@/data/cases/california-ai/empirical";
import styles from "./california-ai-flagship.module.css";
import empiricalStyles from "./california-ai-empirical.module.css";

const copy = {
  en: {
    private: "PRIVATE RESEARCH SITE", case: "FLAGSHIP CASE", evidence: "EVIDENCE-BASED CASE", snapshot: "DATA SNAPSHOT", updated: "Fresh",
    rq: "Research question", coverage: "Evidence coverage", coverageIntro: "Coverage describes what this case can support—not California's performance.",
    geography: "01 / Geography", geographySub: "A bounded California research view with the deepest evidence in the Bay Area.",
    research: "02 / Research momentum", researchSub: "Observed OpenAlex publication activity, separated from quality and impact.",
    formula: "Transparent metric", formulaText: "Three-year change = ((2025 works − 2022 works) ÷ 2022 works) × 100.",
    themes: "03 / Technology signals", themesSub: "Curated theme subtotals from explicit OpenAlex primary-topic mappings.",
    orgs: "04 / Organization landscape", orgsSub: "Verified public identities and descriptive roles—never an importance ranking.",
    network: "07 / Verified research network", networkSub: "Co-authorship within the reproducible 16-institution coverage frame.",
    policies: "06 / Policy context", policiesSub: "Official instruments and intended mechanisms; policy presence does not prove impact.",
    findings: "09 / Evidence-backed findings", gaps: "What this case does not yet measure", scenario: "10 / Evidence-informed scenario lab",
    sources: "Sources & methodology", built: "How this case was built", methods: "Methodology", provenance: "Provenance", dictionary: "Data dictionary", reproduce: "Reproducibility",
    explore: "Continue through NEXORA", unavailable: "Unavailable", observed: "Observed Public Data", derived: "Derived from Public Data", verified: "Verified Public Entity", relationship: "Verified Relationship", officialPolicy: "Verified Official Policy", simulated: "Partially Calibrated Scenario Model",
    works: "unique works", institutions: "research institutions", organizations: "verified organizations", policiesCount: "official policies", edges: "promoted relationships", incomplete: "incomplete year", complete: "last complete year", sourceNative: "source-native years only",
    quality: "Data quality", rejected: "Rejected or excluded records", openSources: "Open source registry", print: "Print research view", ask: "Generate Evidence-Based Research Brief",
    warning2026: "2026 is incomplete and is not used in the complete-year growth calculation.", graphCaution: "Edge counts are evidence of co-authorship, not organizational importance or the complete innovation network.",
  },
  zh: {
    private: "私有研究站点", case: "旗舰案例", evidence: "循证案例", snapshot: "数据快照", updated: "数据新鲜",
    rq: "核心研究问题", coverage: "证据覆盖", coverageIntro: "覆盖程度说明本案例能够支持什么，不代表加州的表现水平。",
    geography: "01 / 地理格局", geographySub: "以加州为边界的科研视图，其中湾区证据最为深入。",
    research: "02 / 科研动能", researchSub: "OpenAlex 公开观测的科研成果活动，与科研质量和影响严格区分。",
    formula: "透明指标", formulaText: "三年变化 =（2025 年成果数 − 2022 年成果数）÷ 2022 年成果数 × 100。",
    themes: "03 / 技术信号", themesSub: "依据明确的 OpenAlex 主主题映射形成的策划主题小计。",
    orgs: "04 / 组织格局", orgsSub: "核验公开身份并描述角色，绝不构成重要性排名。",
    network: "07 / 已核验科研网络", networkSub: "可复现的 16 机构覆盖框架中的共著关系。",
    policies: "06 / 政策语境", policiesSub: "官方政策工具及其预期机制；政策存在不等于产生影响。",
    findings: "09 / 证据支持的发现", gaps: "本案例尚未测量什么", scenario: "10 / 证据知情情景实验室",
    sources: "来源与方法", built: "本案例如何构建", methods: "方法说明", provenance: "来源追溯", dictionary: "数据字典", reproduce: "可复现性",
    explore: "继续探索 NEXORA", unavailable: "不可用", observed: "公开观测数据", derived: "源自公共数据的衍生指标", verified: "已核验公开组织", relationship: "已核验关系", officialPolicy: "已核验官方政策", simulated: "部分校准情景模型",
    works: "唯一科研成果", institutions: "科研机构", organizations: "已核验组织", policiesCount: "官方政策", edges: "纳入关系", incomplete: "未完整年份", complete: "最近完整年份", sourceNative: "仅采用来源原生年份",
    quality: "数据质量", rejected: "拒绝或排除的记录", openSources: "打开来源登记", print: "打印研究视图", ask: "生成循证研究简报",
    warning2026: "2026 年尚不完整，不用于完整年度的三年变化计算。", graphCaution: "边的计数仅证明共著活动，不代表组织重要性，也不是完整创新网络。",
  },
} as const;

const regionNames: Record<string, { en: string; zh: string }> = {
  "sf-bay-area": { en: "San Francisco Bay Area", zh: "旧金山湾区" }, "los-angeles": { en: "Los Angeles", zh: "洛杉矶" }, "san-diego": { en: "San Diego", zh: "圣迭戈" }, "orange-county": { en: "Orange County / Irvine", zh: "橙县／尔湾" }, california: { en: "Statewide context (UC Davis)", zh: "全州背景（加州大学戴维斯分校）" },
};

const statusLabel: Record<string, { en: string; zh: string }> = {
  STRONG: { en: "STRONG", zh: "较强" }, PARTIAL: { en: "PARTIAL", zh: "部分" }, LIMITED: { en: "LIMITED", zh: "有限" }, UNAVAILABLE: { en: "UNAVAILABLE", zh: "不可用" },
};

export function CaliforniaAIFlagship() {
  const [lang, setLang] = useNexoraLanguage();
  const [orgFilter, setOrgFilter] = useState("ALL");
  const t = copy[lang];
  const snapshot = californiaAIRegistry.snapshot;
  const maxAnnual = Math.max(...californiaAIAnnual.map((item) => item.workCount));
  const maxRegion = Math.max(...snapshot.regions.map((item) => item.workCount));
  const orgs = useMemo(() => orgFilter === "ALL" ? californiaAIOrganizations : californiaAIOrganizations.filter((item) => item.category === orgFilter), [orgFilter]);
  const orgById = new Map(californiaAIOrganizations.map((item) => [item.id, item]));

  return <main className={styles.page}>
    <header className={styles.topbar}>
      <Link href="/" className={styles.brand}><span>N</span>NEXORA</Link>
      <nav aria-label={lang === "en" ? "Case navigation" : "案例导航"}><a href="#evidence">{t.coverage}</a><a href="#findings">{t.findings}</a><a href="#sources">{t.sources}</a></nav>
      <div className={styles.actions}><span>{t.private}</span><button onClick={() => setLang("en")} aria-pressed={lang === "en"}>EN</button><button onClick={() => setLang("zh")} aria-pressed={lang === "zh"}>中文</button></div>
    </header>

    <section className={styles.hero}>
      <div className={styles.heroCopy}>
        <div className={styles.badges}><span>{t.case}</span><span>{t.evidence}</span></div>
        <p className={styles.kicker}>NEXORA / CALIFORNIA / ARTIFICIAL INTELLIGENCE</p>
        <h1>{californiaAIRegistry.title[lang]}</h1><p className={styles.subtitle}>{californiaAIRegistry.subtitle[lang]}</p>
        <p className={styles.support}>{californiaAIRegistry.support[lang]}</p>
        <div className={styles.heroActions}><a href="#evidence" className={styles.primary}>{t.coverage} ↓</a><Link href="/ai?case=california-ai" className={styles.secondary}>{t.ask} →</Link></div>
      </div>
      <div className={styles.caseMap} aria-label={lang === "en" ? "Abstract evidence network across California; Bay Area is the densest selected research region" : "加州抽象证据网络；湾区是选定科研范围内最密集的区域"}>
        <div className={styles.state}><i className={styles.bay}/><i className={styles.la}/><i className={styles.sd}/><i className={styles.oc}/><i className={styles.sac}/></div>
        <p>SELECTED-INSTITUTION<br/>EVIDENCE NETWORK</p>
      </div>
      <dl className={styles.heroMeta}><div><dt>{t.snapshot}</dt><dd>{snapshot.snapshotDate}</dd></div><div><dt>CASE VERSION</dt><dd>{californiaAIRegistry.version}</dd></div><div><dt>STATUS</dt><dd>{californiaAIRegistry.status.replaceAll("_", " ")}</dd></div><div><dt>FRESHNESS</dt><dd>{t.updated}</dd></div></dl>
    </section>

    <section className={styles.question} aria-labelledby="rq-title"><span>RESEARCH QUESTION / 研究问题</span><h2 id="rq-title">{t.rq}</h2><p>{californiaAIRegistry.researchQuestion[lang]}</p></section>

    <section id="evidence" className={styles.section}>
      <SectionHead eyebrow="EVIDENCE COVERAGE / 证据覆盖" title={t.coverage} subtitle={t.coverageIntro}/>
      <div className={styles.stats}>
        <Metric value={snapshot.totals.uniqueWorks.toLocaleString("en-US")} label={t.works} status={t.observed}/><Metric value={String(snapshot.totals.institutionCount)} label={t.institutions} status={t.verified}/><Metric value={String(californiaAIOrganizations.length)} label={t.organizations} status={t.verified}/><Metric value={String(californiaAIPolicies.length)} label={t.policiesCount} status={t.officialPolicy}/><Metric value={String(californiaAIRelationships.length)} label={t.edges} status={t.relationship}/>
      </div>
      <div className={styles.coverageGrid}>{californiaAICoverage.map((item) => <article key={item.id} className={item.level === "UNAVAILABLE" ? styles.mutedCard : ""}><header><h3>{item.label[lang]}</h3><span data-level={item.level}>{statusLabel[item.level][lang]}</span></header><p>{item.note[lang]}</p></article>)}</div>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="EMPIRICAL LAYERS / 实证证据层" title={lang === "en" ? "Evidence layers" : "证据层"} subtitle={lang === "en" ? "Observed, derived, not configured and unavailable states remain distinct at every point of use." : "观测、衍生、未配置与不可用状态在每个使用点都保持区分。"}/>
      <div className={empiricalStyles.layerGrid}>{californiaAIEvidenceLayers.map((layer) => <article key={layer.id}><span>{layer.status.replaceAll("_", " ")}</span><h3>{layer.id.replaceAll("-", " ")}</h3><strong>{layer.records === null ? "—" : layer.records.toLocaleString("en-US")}</strong><p>{layer.provider ?? (lang === "en" ? "No provider passed" : "无来源通过")}</p><small>{layer.period ?? (lang === "en" ? "No period" : "无时间范围")}</small></article>)}</div>
      <p className={styles.warning}>△ {californiaAIPatentStatus.note[lang]}</p>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="ATLAS / REAL-DATA CONTEXT" title={t.geography} subtitle={t.geographySub}/>
      <div className={styles.split}>
        <article className={styles.panel}><h3>{lang === "en" ? "Selected-institution regional coverage" : "选定机构的区域覆盖"}</h3><div className={styles.regionBars}>{snapshot.regions.map((region) => <div key={region.regionId}><span>{regionNames[region.regionId]?.[lang] ?? region.regionId}</span><b>{region.workCount.toLocaleString("en-US")}</b><i><em style={{ width: `${Math.max(4, region.workCount / maxRegion * 100)}%` }}/></i></div>)}</div><p className={styles.caution}>{lang === "en" ? "Unique works within each selected regional institution grouping. Regions are not directly comparable to all California institutions." : "各选定区域机构组合内的唯一成果数；不能解释为加州所有机构的完整区域比较。"}</p></article>
        <article className={styles.panel}><h3>{lang === "en" ? "Canonical geography" : "规范地理"}</h3><ul className={styles.geoList}><li><b>California</b><span>PRIMARY / 州级边界</span></li><li><b>San Francisco Bay Area</b><span>DEEPEST / 最深证据</span></li><li><b>Los Angeles · San Diego · Orange County</b><span>SECONDARY / 次级背景</span></li><li><b>Sacramento</b><span>POLICY CONTEXT / 政策语境</span></li></ul><p className={styles.caution}>“Silicon Valley” → <code>sf-bay-area</code> ({lang === "en" ? "semantic alias only" : "仅作语义别名"})</p></article>
      </div>
      <ContextLinks links={[["/atlas?region=california&industry=artificial-intelligence", lang === "en" ? "Explore California in Atlas" : "在图谱中探索加州"],["/atlas?region=sf-bay-area&industry=artificial-intelligence", lang === "en" ? "Open Bay Area evidence view" : "打开湾区证据视图"]]}/>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="OPENALEX / OBSERVED PUBLIC DATA" title={t.research} subtitle={t.researchSub}/>
      <div className={styles.researchGrid}>
        <article className={styles.chartPanel}><header><h3>2015—2026</h3><span>{t.sourceNative}</span></header><div className={styles.annualChart} role="img" aria-label={lang === "en" ? "Annual OpenAlex work counts from 2015 through incomplete 2026" : "2015 年至尚未完整的 2026 年 OpenAlex 年度成果数"}>{californiaAIAnnual.map((row) => <div key={row.year} className={row.incomplete ? styles.incomplete : ""}><i style={{ height: `${Math.max(6, row.workCount / maxAnnual * 100)}%` }}/><b>{row.workCount.toLocaleString("en-US")}</b><span>{row.year}</span></div>)}</div><p className={styles.warning}>△ {t.warning2026}</p></article>
        <article className={styles.metricPanel}><span>{t.derived}</span><strong>{californiaAIThreeYearGrowth}%</strong><h3>{lang === "en" ? "2022 → 2025 observed-work change" : "2022 → 2025 观测成果变化"}</h3><p>{t.formulaText}</p><dl><div><dt>2022</dt><dd>{californiaAIAnnual.find(row => row.year === 2022)?.workCount.toLocaleString("en-US")}</dd></div><div><dt>2025</dt><dd>{californiaAIAnnual.find(row => row.year === 2025)?.workCount.toLocaleString("en-US")}</dd></div><div><dt>2015—2025 CAGR</dt><dd>{californiaAICompletePeriodCagr}%</dd></div></dl><p className={styles.caution}>{lang === "en" ? "Activity volume ≠ research quality, citation impact or economic impact." : "活动规模 ≠ 科研质量、引用影响或经济影响。"}</p></article>
      </div>
      <ContextLinks links={[["/radar?industry=artificial-intelligence&region=california", lang === "en" ? "Explore real research signals in Radar" : "在雷达中探索真实科研信号"]]}/>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="BLS OEWS + NSF AWARDS" title={lang === "en" ? "05 / Talent & public funding" : "05 / 人才与公共资金"} subtitle={lang === "en" ? "Two new official evidence layers with deliberately narrow constructs and periods." : "两个新增官方证据层，构念与时间范围均被刻意限定。"}/>
      <div className={empiricalStyles.empiricalGrid}>
        <article className={styles.panel}><h3>{lang === "en" ? "AI-adjacent technical workforce" : "AI 邻近技术劳动力"}</h3><p className={styles.caution}>{californiaAITalentLimitations[lang]}</p>{californiaAITalentIndicators.map((item) => <div className={empiricalStyles.empiricalRow} key={item.id}><div><b>{item.label[lang]}</b><small>{item.soc} · MAY 2025</small></div><strong>{item.employment.toLocaleString("en-US")}</strong><span>LQ {item.locationQuotient}</span></div>)}</article>
        <article className={styles.panel}><h3>{lang === "en" ? "NSF 2025 title-qualified awards" : "NSF 2025 标题级筛选奖项"}</h3><div className={empiricalStyles.fundingSummary}><strong>${(californiaAIFundingSnapshot.totals.obligatedUSD / 1_000_000).toFixed(1)}M</strong><span>{californiaAIFundingSnapshot.totals.awardCount} {lang === "en" ? "awards" : "个奖项"} · {californiaAIFundingSnapshot.totals.recipientCount} {lang === "en" ? "recipients" : "个受资助主体"}</span></div>{californiaAIFundingAwards.slice(0, 5).map((award) => <a className={empiricalStyles.awardRow} key={award.id} href={award.sourceUrl} target="_blank" rel="noreferrer"><b>{award.title}</b><small>{award.recipientName} · ${award.fundsObligatedUSD.toLocaleString("en-US")}</small></a>)}<p className={styles.warning}>△ {lang === "en" ? "Nominal obligations from one agency and one award year; not total California AI funding." : "仅为一个机构、一个奖项年度的名义已拨付金额；不代表加州 AI 资金总额。"}</p></article>
      </div>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="RADAR + ECOSYSTEMS / CASE-SPECIFIC" title={lang === "en" ? "06 / Empirical signal profile" : "06 / 实证信号画像"} subtitle={lang === "en" ? "A bounded evidence index and within-dataset network metrics; never a forecast or importance ranking." : "有边界的证据指数与数据集内网络指标；绝不是预测或重要性排名。"}/>
      <div className={empiricalStyles.signalGrid}><article className={styles.metricPanel}><span>{californiaAIRadarProfile.status.replaceAll("_", " ")}</span><strong>{californiaAIRadarProfile.composite}</strong><h3>{lang === "en" ? "California AI evidence index" : "加州 AI 证据指数"}</h3><p>{lang === "en" ? californiaAIRadarProfile.warning : "不同地理与参考期限制了可比性；这是证据指数摘要，不是预测或排名。"}</p><small>SENSITIVITY {californiaAIRadarProfile.sensitivity.range.join("—")}</small></article><article className={styles.panel}>{californiaAIRadarProfile.signals.map((signal) => <div className={empiricalStyles.signalRow} key={signal.id}><span>{signal.id.replaceAll("-", " ")}</span><i><em style={{width:`${signal.score}%`}}/></i><b>{signal.score}</b><small>W {signal.weight}</small></div>)}</article><article className={styles.panel}><h3>{lang === "en" ? "Network centrality" : "网络中心性"}</h3>{californiaAINetworkMetrics.slice(0, 6).map((metric) => <div className={empiricalStyles.empiricalRow} key={metric.institutionId}><div><b>{metric.name}</b><small>{metric.scopeLabel}</small></div><strong>{metric.degree}</strong><span>Σ {metric.weightedDegree}</span></div>)}</article></div>
      <p className={styles.warning}>△ {californiaAICrossLayerAnalysis.note[lang]}</p>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="CURATED TAXONOMY / DERIVED METRIC" title={t.themes} subtitle={t.themesSub}/>
      <div className={styles.themeGrid}>{californiaAIThemes.map((theme, i) => <article key={theme.id}><span>0{i + 1}</span><h3>{theme.name[lang]}</h3><strong>{theme.workCount.toLocaleString("en-US")}</strong><small>{t.derived}</small><p>{theme.topicIds.length} OpenAlex primary-topic IDs</p></article>)}</div>
      <p className={styles.caution}>{lang === "en" ? "Theme subtotals exclude unmapped source topics and must not be summed to infer total AI activity." : "主题小计不含未映射的来源主题，不能将其相加后解释为 AI 活动总量。"}</p>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="VERIFIED PUBLIC ENTITIES" title={t.orgs} subtitle={t.orgsSub}/>
      <div className={styles.filters} aria-label={lang === "en" ? "Organization categories" : "组织类别"}>{["ALL","UNIVERSITY","RESEARCH_INSTITUTION","AI_COMPANY","TECHNOLOGY_COMPANY","SEMICONDUCTOR_HARDWARE","GOVERNMENT_PUBLIC_PROGRAM"].map((category) => <button key={category} onClick={() => setOrgFilter(category)} aria-pressed={orgFilter === category}>{category.replaceAll("_", " ")}</button>)}</div>
      <div className={styles.orgGrid}>{orgs.map((org) => <article key={org.id}><header><span>{org.category.replaceAll("_", " ")}</span><b>{t.verified}</b></header><h3>{org.name[lang]}</h3><p>{org.city} · {regionNames[org.regionId]?.[lang] ?? org.regionId}</p><strong>{org.roleLabel[lang]}</strong><a href={org.officialUrl} target="_blank" rel="noreferrer">{lang === "en" ? "Official identity" : "官方身份来源"} ↗</a></article>)}</div>
      <ContextLinks links={[["/companies?region=california&industry=artificial-intelligence", lang === "en" ? "Explore organizations" : "探索组织智能"]]}/>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="OPENALEX / VERIFIED SUBSET" title={t.network} subtitle={t.networkSub}/>
      <div className={styles.networkGrid}>{californiaAIRelationships.slice(0, 12).map((edge, i) => { const from = orgById.get(edge.fromOrganizationId)!; const to = orgById.get(edge.toOrganizationId)!; return <a href={edge.sourceUrl} target="_blank" rel="noreferrer" key={edge.id}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{from.name[lang]}</h3><i>↕ {lang === "en" ? "Research Collaboration" : "科研协作"}</i><h3>{to.name[lang]}</h3></div><strong>{edge.workCount}<small>{lang === "en" ? " co-authored works" : " 项共著成果"}</small></strong></a>; })}</div>
      <p className={styles.warning}>△ {t.graphCaution}</p>
      <ContextLinks links={[["/ecosystems?region=sf-bay-area&industry=artificial-intelligence", lang === "en" ? "Explore verified network subset" : "探索已核验网络子集"]]}/>
    </section>

    <section className={styles.section}>
      <SectionHead eyebrow="OFFICIAL CALIFORNIA SOURCES" title={t.policies} subtitle={t.policiesSub}/>
      <div className={styles.policyGrid}>{californiaAIPolicies.map((policy) => <article key={policy.id}><header><span>{policy.type.replaceAll("_", " ")}</span><b>{policy.status}</b></header><h3>{policy.title[lang]}</h3><p>{policy.agency} · {policy.publishedAt}</p><dl><dt>{lang === "en" ? "Intended mechanism" : "预期机制"}</dt><dd>{policy.mechanism.replaceAll("_", " ")}</dd><dt>{lang === "en" ? "Target" : "目标对象"}</dt><dd>{policy.target}</dd></dl><a href={policy.officialUrl} target="_blank" rel="noreferrer">{t.officialPolicy} ↗</a></article>)}</div>
      <ContextLinks links={[["/policy?jurisdiction=california&industry=artificial-intelligence", lang === "en" ? "Explore California policy intelligence" : "探索加州政策智能"]]}/>
    </section>

    <section id="findings" className={styles.section}>
      <SectionHead eyebrow="GROUNDED SYNTHESIS" title={t.findings} subtitle={lang === "en" ? "Every finding carries a confidence class, support IDs, evidence status and a limitation." : "每项发现均包含置信类别、支持 ID、证据状态与限制。"}/>
      <div className={styles.findings}>{californiaAIFindings.map((finding, i) => <article key={finding.id}><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{finding.title[lang]}</h3><p>{finding.claim[lang]}</p><small>{finding.confidence} · {finding.status.replaceAll("_", " ")} · {finding.supportIds.join(" · ")}</small><aside>△ {finding.limitation[lang]}</aside></div></article>)}</div>
    </section>

    <section className={`${styles.section} ${styles.gaps}`}><SectionHead eyebrow="EVIDENCE GAPS / 证据缺口" title={t.gaps} subtitle={lang === "en" ? "Unavailable means not measured in this snapshot—not absent in California." : "不可用表示本快照尚未测量，并不代表加州不存在相应活动。"}/><div>{californiaAICoverage.filter((item) => item.level === "UNAVAILABLE" || item.level === "LIMITED").map((item) => <article key={item.id}><span>{statusLabel[item.level][lang]}</span><h3>{item.label[lang]}</h3><p>{item.note[lang]}</p></article>)}</div><p className={styles.caution}>{californiaAIEntrepreneurship.note[lang]} {californiaAICapitalFeasibility.reason[lang]}</p></section>

    <section className={styles.section}>
      <SectionHead eyebrow="SIMULATOR / SCENARIO ≠ FORECAST" title={t.scenario} subtitle={californiaAIScenarioPreset.warning[lang]}/>
      <div className={styles.calibration}><article><span>{t.simulated}</span><h3>{californiaAIScenarioPreset.name[lang]}</h3><p>{lang === "en" ? "Observed and derived inputs are kept separate from assumptions and missing inputs." : "观测与衍生输入同假设及缺失输入严格分离。"}</p><div>{californiaAIScenarioPreset.scenarios.map((scenario) => <span key={scenario}>{scenario}</span>)}</div><Link href="/simulator?case=california-ai">{lang === "en" ? "Run evidence-informed scenario" : "运行证据知情情景"} →</Link></article><div>{californiaAICalibration.map((row) => <article key={row.variable}><header><h3>{row.variable}</h3><span data-status={row.status}>{row.status}</span></header><p>{row.source ?? t.unavailable}</p><small>{row.note}</small></article>)}</div></div>
    </section>

    <section id="sources" className={styles.section}>
      <SectionHead eyebrow="TRACEABILITY / 可追溯性" title={t.sources} subtitle={lang === "en" ? `${californiaAISources.length} canonical source entries; official links only, no model-generated URLs.` : `${californiaAISources.length} 条规范来源登记；仅使用官方链接，不使用模型生成网址。`}/>
      <div className={styles.methodGrid}><Link href="/docs/CA_AI_EMPIRICAL_DATA_PLAN.md"><span>01</span><h3>{t.methods}</h3><p>{lang === "en" ? "Constructs, providers, coverage gates and empirical roadmap." : "构念、来源、覆盖门槛与实证路线。"}</p></Link><Link href="/docs/CA_AI_PROVENANCE.md"><span>02</span><h3>{t.provenance}</h3><p>{lang === "en" ? "Provider, retrieval, transformation and case use." : "提供方、检索、转换与案例用途。"}</p></Link><Link href="/docs/CA_AI_DATA_DICTIONARY.md"><span>03</span><h3>{t.dictionary}</h3><p>{lang === "en" ? "Fields, units, status, nullability and transformations." : "字段、单位、状态、可空性与转换。"}</p></Link><Link href="/docs/CA_AI_REPRODUCIBILITY.md"><span>04</span><h3>{t.reproduce}</h3><p>{lang === "en" ? "Provider-specific refresh, atomic promotion and deterministic exports." : "按来源刷新、原子晋级与确定性导出。"}</p></Link></div>
      <details className={styles.quality}><summary>{t.quality} · {californiaAIDataQualityReport.status}</summary><div>{californiaAIDataQualityReport.checks.map((check) => <p key={check.id}><b>{check.status}</b> {check.detail}</p>)}<h3>{t.rejected}: {californiaAIDataQualityReport.rejectedRecords}</h3>{californiaAIDataQualityReport.rejectedReasons.map((reason) => <p key={reason}>△ {reason}</p>)}</div></details>
    </section>

    <section className={styles.explore}><span>NEXORA RESEARCH PATH</span><h2>{t.explore}</h2><div><Link href="/atlas?region=california&industry=artificial-intelligence">ATLAS</Link><Link href="/radar?industry=artificial-intelligence&region=california">RADAR</Link><Link href="/ecosystems?region=sf-bay-area&industry=artificial-intelligence">ECOSYSTEMS</Link><Link href="/policy?jurisdiction=california&industry=artificial-intelligence">POLICY</Link><Link href="/companies?region=california&industry=artificial-intelligence">ORGANIZATIONS</Link><Link href="/ai?case=california-ai">ASK NEXORA</Link><Link href="/simulator?case=california-ai">RUN SCENARIO</Link></div></section>
    <footer className={styles.footer}><div><b>NEXORA</b><span>CALIFORNIA AI FLAGSHIP · {californiaAIRegistry.version}</span></div><p>{lang === "en" ? "Private research site · Scenario result, not forecast · Evidence status shown at point of use" : "私有研究站点 · 情景结果而非预测 · 证据状态在使用处标明"}</p><button onClick={() => window.print()}>{t.print}</button></footer>
  </main>;
}

function SectionHead({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle: string }) { return <header className={styles.sectionHead}><span>{eyebrow}</span><div><h2>{title}</h2><p>{subtitle}</p></div></header>; }
function Metric({ value, label, status }: { value: string; label: string; status: string }) { return <article><strong>{value}</strong><h3>{label}</h3><span>{status}</span></article>; }
function ContextLinks({ links }: { links: string[][] }) { return <nav className={styles.contextLinks} aria-label="Contextual case links">{links.map(([href, label]) => <Link key={href} href={href}>{label} →</Link>)}</nav>; }
