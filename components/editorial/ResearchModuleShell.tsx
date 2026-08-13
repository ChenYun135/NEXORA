import Link from "@/components/safe-link";
import styles from "./research-module-shell.module.css";
import { displayHeading } from "@/lib/display-text";
import { ChartExplanation, ResearchFinding, type EvidenceState } from "./ResearchFindings";

type Localized = { en: string; zh: string };
type ResearchModuleShellProps = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  enterLabel: string;
  insightLabel: string;
  lang: "en" | "zh";
};

const evidenceSummary: Record<string, { metrics: Array<[string, Localized, string]>; findings: Array<[Localized, Localized, string]> }> = {
  atlas:{metrics:[["18",{en:"prototype ecosystems",zh:"个原型创新生态"},"DEMO"],["9",{en:"industry domains",zh:"个产业领域"},"DEMO"],["34",{en:"country-year observations",zh:"条国家年度观测"},"OBSERVED"]],findings:[[{en:"Innovation capacity appears geographically concentrated",zh:"创新能力呈现明显的区域集聚"},{en:"The prototype comparison highlights a limited set of strong multi-dimensional ecosystems; it is not a complete census.",zh:"原型比较突出了一组多维能力较强的生态系统，但并非完整普查"},"DEMO"],[{en:"Specialization matters more than a single total",zh:"产业专长比单一总分更具解释力"},{en:"Technology layers reveal regional differences that an aggregate score would obscure.",zh:"技术图层揭示了会被综合分掩盖的区域差异"},"DERIVED"],[{en:"Country context and ecosystem evidence are not interchangeable",zh:"国家背景与生态证据不可相互替代"},{en:"Observed macro context remains country-level and separate from prototype ecosystem indicators.",zh:"宏观观测保持在国家层面，并与原型生态指标分开标注"},"OBSERVED"]]},
  radar:{metrics:[["18",{en:"technology profiles",zh:"项技术画像"},"DEMO"],["6",{en:"signal dimensions",zh:"个信号维度"},"DERIVED"],["4",{en:"mapped research topics",zh:"个科研主题"},"OBSERVED"]],findings:[[{en:"Momentum is multi-dimensional",zh:"发展动能来自多维证据"},{en:"Research, patents, startups, capital, policy and talent can move in different directions.",zh:"科研、专利、创业、资本、政策与人才可能呈现不同方向"},"DERIVED"],[{en:"Missing evidence is not zero momentum",zh:"缺失证据并不等于零动能"},{en:"Unavailable dimensions remain explicit rather than becoming invented values.",zh:"不可用维度保持明确状态，不会被转化为虚构数值"},"DERIVED"],[{en:"Rankings are exploratory, not predictive",zh:"排序用于探索而非预测"},{en:"The configured opportunity field does not forecast adoption or recommend investment.",zh:"机会视图不预测技术采用，也不构成投资建议"},"DEMO"]]},
  ecosystems:{metrics:[["6",{en:"ecosystem contexts",zh:"个生态情境"},"DEMO"],["3",{en:"verified identities",zh:"个已核验身份"},"OBSERVED"],["1",{en:"verified relationship",zh:"条已核验关系"},"OBSERVED"]],findings:[[{en:"Bridge relationships shape the readable network",zh:"桥接关系决定网络的可读结构"},{en:"Major nodes and cross-cluster links reveal more than an undifferentiated hairball.",zh:"主要节点与跨群组连接比无差别的关系堆叠更能揭示结构"},"DERIVED"],[{en:"Identity evidence does not prove activity",zh:"身份核验并不能证明具体活动"},{en:"Verified identities remain separate from illustrative relationships.",zh:"已核验身份与演示性关系保持分离"},"OBSERVED"],[{en:"Network position describes role, not quality",zh:"网络位置描述角色而非质量"},{en:"Connectivity measures are descriptive properties of the configured graph.",zh:"连接指标是配置网络的描述性属性"},"DERIVED"]]},
  policy:{metrics:[["28",{en:"policy records",zh:"条政策记录"},"DEMO"],["8",{en:"jurisdictions",zh:"个司法辖区"},"DEMO"],["8",{en:"official records",zh:"条官方记录"},"OBSERVED"]],findings:[[{en:"Instrument mixes differ across policy landscapes",zh:"不同政策图景具有不同工具组合"},{en:"Funding, standards, procurement and regulation should not collapse into one score.",zh:"资助、标准、采购与监管不应被压缩为单一分数"},"DEMO"],[{en:"Mechanisms are conceptual, not causal proof",zh:"作用机制属于概念路径而非因果证明"},{en:"Implementation uncertainty remains explicit.",zh:"实施不确定性始终保持明确"},"INTERPRETATION"],[{en:"Official records remain distinct from demo coverage",zh:"官方记录与演示覆盖保持分离"},{en:"Verified evidence is labeled independently from illustrative records.",zh:"已核验证据与演示记录独立标注"},"OBSERVED"]]},
  organizations:{metrics:[["65",{en:"organization profiles",zh:"个组织画像"},"DEMO"],["15",{en:"verified identities",zh:"个已核验身份"},"OBSERVED"],["9",{en:"industry domains",zh:"个产业领域"},"DEMO"]],findings:[[{en:"Organizations occupy different ecosystem roles",zh:"组织承担不同的生态角色"},{en:"Research, capital, policy and commercialization require contextual comparison.",zh:"科研、资本、政策与产业化需要在各自语境中比较"},"DEMO"],[{en:"Public identity is the evidence floor",zh:"公共身份是当前证据基础"},{en:"Identity verification does not silently imply activity.",zh:"身份核验不会被静默扩展为具体活动"},"OBSERVED"],[{en:"Relationships require their own provenance",zh:"组织关系需要独立来源"},{en:"Illustrative links remain separate from source-backed relationships.",zh:"演示连接与有来源支持的关系保持分离"},"INTERPRETATION"]]},
  "data-status":{metrics:[["24",{en:"research observations",zh:"条科研观测"},"OBSERVED"],["34",{en:"macro observations",zh:"条宏观观测"},"OBSERVED"],["15",{en:"verified identities",zh:"个已核验身份"},"OBSERVED"]],findings:[[{en:"Coverage is intentionally uneven",zh:"当前数据覆盖并不均衡"},{en:"Research and macro context are stronger than patents, capital and market evidence.",zh:"科研与宏观背景强于专利、资本与市场证据"},"OBSERVED"],[{en:"Unavailable never becomes zero",zh:"不可用状态不会被转换为零"},{en:"Missing fields retain semantic states throughout the pipeline.",zh:"缺失字段在整个流程中保留语义状态"},"OBSERVED"],[{en:"Trust depends on provenance and freshness",zh:"可信度同时依赖来源与时效"},{en:"Evidence needs attributable sources, transformations and refresh context.",zh:"证据需要可归属来源、转换过程与更新时间背景"},"INTERPRETATION"]]},
  ai:{metrics:[["6",{en:"research domains",zh:"个研究领域"},"OBSERVED"],["3",{en:"explicit data modes",zh:"种明确数据模式"},"DERIVED"],["0",{en:"hidden substitutions",zh:"项隐藏替换"},"OBSERVED"]],findings:[[{en:"Evidence comes before synthesis",zh:"先有证据，再形成综合解读"},{en:"A bounded evidence pack precedes every structured response.",zh:"每项结构化回答之前都有边界明确的证据包"},"DERIVED"],[{en:"Gaps are part of the answer",zh:"证据缺口也是回答的一部分"},{en:"Insufficient evidence is surfaced rather than filled.",zh:"证据不足会被明确呈现而不是被填补"},"OBSERVED"],[{en:"Interpretation remains separately labeled",zh:"分析解读始终单独标注"},{en:"Facts, derived measures and interpretation retain distinct roles.",zh:"事实、衍生指标与解读保持不同角色"},"INTERPRETATION"]]},
  simulator:{metrics:[["9",{en:"stock concepts",zh:"项存量概念"},"SIMULATED"],["11.1%",{en:"observed calibration",zh:"观测校准覆盖"},"OBSERVED"],["77.8%",{en:"assumption-led share",zh:"假设主导比例"},"SIMULATED"]],findings:[[{en:"The model is a mechanism, not a forecast",zh:"模型用于理解机制而非预测"},{en:"Scenario paths show outcomes under configured assumptions.",zh:"情景路径展示配置假设下的结果"},"SIMULATED"],[{en:"Assumptions currently dominate calibration",zh:"当前校准仍以假设为主"},{en:"Observed calibration covers a minority of initial concepts.",zh:"观测校准只覆盖少数初始概念"},"SIMULATED"],[{en:"Sensitivity reveals leverage, not causality",zh:"敏感性揭示影响幅度而非因果关系"},{en:"Parameter response inspects model behavior without claiming causal evidence.",zh:"参数响应用于检查模型行为，不宣称因果证据"},"INTERPRETATION"]]},
};

const questions: Record<string, { question: Localized; dimensions: Array<{ title: Localized; body: Localized }> }> = {
  atlas: { question: { en: "Where are emerging industries concentrating — and what distinguishes their ecosystems?", zh: "新兴产业正在何处集聚，又是什么塑造了不同区域的创新能力" }, dimensions: [
    { title: { en: "Geography", zh: "空间集聚" }, body: { en: "Where activity concentrates.", zh: "识别创新活动的区域分布" } },
    { title: { en: "Specialization", zh: "产业专长" }, body: { en: "What each ecosystem does differently.", zh: "理解各生态系统的差异化能力" } },
    { title: { en: "Connectivity", zh: "区域连接" }, body: { en: "How capabilities connect across regions.", zh: "观察能力如何跨区域连接" } },
  ]},
  radar: { question: { en: "Which technologies are gaining momentum — and what evidence supports that signal?", zh: "哪些技术正在积蓄动能，哪些证据支持这一判断" }, dimensions: [
    { title: { en: "Momentum", zh: "发展动能" }, body: { en: "Read change across evidence streams.", zh: "从多类证据中识别变化" } },
    { title: { en: "Maturity", zh: "技术成熟度" }, body: { en: "Separate frontier research from scaling.", zh: "区分前沿探索与规模化阶段" } },
    { title: { en: "Evidence", zh: "证据基础" }, body: { en: "Trace every signal to its source state.", zh: "追溯每项信号的来源状态" } },
  ]},
  ecosystems: { question: { en: "How are the institutions behind innovation connected?", zh: "创新背后的机构如何连接并形成生态结构" }, dimensions: [
    { title: { en: "Actors", zh: "关键主体" }, body: { en: "See who participates in the ecosystem.", zh: "识别生态系统的参与者" } },
    { title: { en: "Bridges", zh: "桥接关系" }, body: { en: "Find the relationships joining clusters.", zh: "发现连接不同群组的关系" } },
    { title: { en: "Flows", zh: "知识流动" }, body: { en: "Follow knowledge, capital and policy support.", zh: "追踪知识、资本与政策支持" } },
  ]},
  policy: { question: { en: "How do public institutions shape the conditions for emerging industries?", zh: "公共机构如何塑造未来产业的发展条件" }, dimensions: [
    { title: { en: "Instruments", zh: "政策工具" }, body: { en: "Compare funding, rules and standards.", zh: "比较资助、监管与标准" } },
    { title: { en: "Mechanisms", zh: "作用机制" }, body: { en: "Understand how policy may act.", zh: "理解政策可能发挥作用的路径" } },
    { title: { en: "Jurisdictions", zh: "区域差异" }, body: { en: "Read variation without partisan ranking.", zh: "识别差异而不进行立场排名" } },
  ]},
  organizations: { question: { en: "Which organizations shape emerging industries — and what roles do they play?", zh: "哪些组织正在塑造未来产业，它们分别扮演什么角色" }, dimensions: [
    { title: { en: "Landscape", zh: "组织图景" }, body: { en: "See the institutions in each domain.", zh: "观察各领域的机构构成" } },
    { title: { en: "Roles", zh: "生态角色" }, body: { en: "Distinguish research, capital and delivery.", zh: "区分科研、资本与产业化角色" } },
    { title: { en: "Relationships", zh: "组织关系" }, body: { en: "Trace verified and illustrative links.", zh: "追踪已核验与演示性关系" } },
  ]},
  "data-status": { question: { en: "What evidence can NEXORA support — and where are the limits?", zh: "NEXORA 当前能够支持哪些证据，边界又在哪里" }, dimensions: [
    { title: { en: "Provenance", zh: "数据来源" }, body: { en: "Know where every record originates.", zh: "了解每条记录的来源" } },
    { title: { en: "Quality", zh: "数据质量" }, body: { en: "Inspect validation and coverage states.", zh: "检查验证与覆盖状态" } },
    { title: { en: "Freshness", zh: "数据时效" }, body: { en: "See when evidence was refreshed.", zh: "了解证据的更新时间" } },
  ]},
  ai: { question: { en: "How can evidence become interpretation without losing its source boundaries?", zh: "如何在不越过证据边界的前提下形成研究解读" }, dimensions: [
    { title: { en: "Question", zh: "研究问题" }, body: { en: "Begin with a bounded research intent.", zh: "从边界清晰的研究问题出发" } },
    { title: { en: "Evidence", zh: "证据组合" }, body: { en: "Retrieve only relevant public evidence.", zh: "只检索相关公共证据" } },
    { title: { en: "Interpretation", zh: "审慎解读" }, body: { en: "Separate sources, gaps and analysis.", zh: "分开呈现来源、缺口与分析" } },
  ]},
  simulator: { question: { en: "How might innovation ecosystems evolve under different assumptions?", zh: "在不同假设下，创新生态可能呈现怎样的演化路径" }, dimensions: [
    { title: { en: "Mechanism", zh: "系统机制" }, body: { en: "Understand stocks, flows and feedback.", zh: "理解存量、流量与反馈" } },
    { title: { en: "Scenario", zh: "情景比较" }, body: { en: "Compare configured possible futures.", zh: "比较不同配置下的可能未来" } },
    { title: { en: "Uncertainty", zh: "不确定性" }, body: { en: "Keep assumptions visible and testable.", zh: "让假设保持可见并可检验" } },
  ]},
};

export function ResearchModuleShell({ image, eyebrow, title, subtitle, description, enterLabel, insightLabel, lang }: ResearchModuleShellProps) {
  const moduleKey = image.replace("-og.png", "").replace("/", "");
  const displaySubtitle = moduleKey === "simulator" && lang === "zh" ? "创新生态情景推演" : subtitle;
  const content = questions[moduleKey] ?? questions.atlas;
  const art = `/hero/${moduleKey}-hero-art.webp`;
  const editorial = evidenceSummary[moduleKey] ?? evidenceSummary.atlas;
  const evidence = lang === "zh" ? "公共数据 · 衍生指标 · 透明方法" : "Public data · Derived indicators · Transparent methodology";
  return <>
    <section className={`${styles.hero} ${styles[moduleKey]} ${lang === "zh" ? styles.zh : ""}`} aria-labelledby={`${moduleKey}-cover-title`}>
      <div className={styles.copy}>
        <span className={styles.eyebrow}>{eyebrow}</span>
        <p className={styles.moduleName}>{displayHeading(title)}</p>
        <h1 id={`${moduleKey}-cover-title`}>{displayHeading(displaySubtitle)}</h1>
        <p className={styles.description}>{description}</p>
        <div className={styles.actions}><a className={styles.primary} href="#workspace">{enterLabel} ↓</a><Link href="/methodology">{insightLabel} →</Link></div>
        <p className={styles.evidence}>{evidence}</p>
      </div>
      <div className={styles.art} aria-hidden="true"><img src={art} alt="" /></div>
    </section>
    <section className={`${styles.question} ${lang === "zh" ? styles.zh : ""}`} aria-labelledby={`${moduleKey}-question`}>
      <span>{lang === "zh" ? "研究问题" : "RESEARCH QUESTION"}</span>
      <h2 id={`${moduleKey}-question`}>{displayHeading(content.question[lang])}</h2>
      <div className={styles.dimensions}>{content.dimensions.map((item, index)=><article key={item.title.en}><span>0{index + 1}</span><h3>{item.title[lang]}</h3><p>{item.body[lang]}</p></article>)}</div>
      <aside className={styles.takeaway} aria-label={lang === "zh" ? "核心结论" : "Key takeaway"}>
        <span>{lang === "zh" ? "核心结论" : "KEY TAKEAWAY"}</span>
        <strong>{editorial.findings[0][0][lang]}</strong>
        <small>{editorial.findings[0][2]}</small>
      </aside>
    </section>
    <section className={`${styles.findings} ${lang === "zh" ? styles.zh : ""}`} aria-labelledby={`${moduleKey}-findings`}>
      <div className={styles.metrics}>{editorial.metrics.map(([value,label,state])=><article key={label.en}><strong>{value}</strong><span>{label[lang]}</span><small>{state}</small></article>)}</div>
      <div className={styles.findingsHead}><span>{lang === "zh" ? "数据揭示了什么" : "WHAT THE DATA SUGGESTS"}</span><h2 id={`${moduleKey}-findings`}>{lang === "zh" ? "三条需要审慎解读的研究发现" : "Three findings to interpret with care"}</h2></div>
      <div className={styles.findingsGrid}>{editorial.findings.map(([title,body,state],index)=><ResearchFinding key={title.en} number={`0${index+1}`} headline={displayHeading(title[lang])} body={body[lang]} status={state as EvidenceState}/>)}</div>
      <ChartExplanation
        shows={lang === "zh" ? "主要可视化呈现当前公共数据与已声明转换能够支持的结构" : "The primary visualization presents structures supported by current public data and declared transformations."}
        matters={lang === "zh" ? "它将研究问题、证据状态与可探索的分析对象连接起来" : "It connects the research question, evidence state and analytical objects available for exploration."}
        boundary={lang === "zh" ? "不可据此推断因果、预测、质量排名或投资建议" : "Do not infer causality, forecasts, quality rankings or investment advice."}
      />
    </section>
    <section className={styles.deeperIntro} aria-labelledby={`${moduleKey}-deeper`}>
      <span>{lang === "zh" ? "深入探索" : "EXPLORE DEEPER"}</span>
      <h2 id={`${moduleKey}-deeper`}>{lang === "zh" ? "按需展开比较、实体与详细证据" : "Comparisons, entities and detailed evidence — when you need them"}</h2>
      <p>{lang === "zh" ? "以下研究工作区保留完整的分析能力，并将次要视图置于主要可视化与研究结论之后。" : "The research workspace below retains the full analytical toolkit while keeping secondary views behind the primary visualization and findings."}</p>
    </section>
    <details className={styles.methods}>
      <summary>{lang === "zh" ? "方法与来源说明" : "Methods & provenance"}</summary>
      <p>{lang === "zh" ? "NEXORA 将公共观测、衍生指标、演示内容、模拟结果与分析解读分开标注。缺失证据不会被转换为零，也不会以隐藏替代值填补。" : "NEXORA labels public observations, derived indicators, demo material, simulated outputs and interpretation separately. Missing evidence is never converted to zero or filled by hidden substitutes."}</p>
      <div className={styles.stateLegend} aria-label={lang === "zh" ? "证据状态图例" : "Evidence state legend"}>
        {["OBSERVED","DERIVED","DEMO","SIMULATED","INTERPRETATION"].map((state)=><span key={state}>{state}</span>)}
      </div>
      <Link href="/methodology">{lang === "zh" ? "阅读完整方法说明 →" : "Read the full methodology →"}</Link>
    </details>
  </>;
}
