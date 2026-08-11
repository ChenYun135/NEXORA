import Link from "@/components/safe-link";
import styles from "./production-evidence-strip.module.css";

const content={
 home:["HYBRID DATA MODE","Production pilots are partial; existing home KPIs remain Demo.","生产试点覆盖有限；首页 KPI 仍为演示数据。"],
 atlas:["OBSERVED PUBLIC CONTEXT","World Bank R&D series · 34 country-year observations · country level only.","World Bank 研发序列 · 34 条国家年度观测 · 仅限国家层面。"],
 radar:["PRODUCTION EVIDENCE PILOT","OpenAlex · 4 mapped topics · 24 annual research observations · Demo composite remains separate.","OpenAlex · 4 个映射主题 · 24 条年度科研观测 · 演示综合分保持独立。"],
 ecosystems:["VERIFIED ENTITY PILOT","3 OpenAlex institution identities + 1 official MIT–IBM program relationship; other graph edges remain Demo.","3 个 OpenAlex 机构身份 + 1 条 MIT–IBM 官方项目关系；其他图关系仍为演示。"],
 policy:["VERIFIED OFFICIAL SOURCES","8 official program / standards records; separate from Demo policy records.","8 条官方计划 / 标准记录；与演示政策记录分开。"],
 companies:["VERIFIED IDENTITY PILOT","15 official identities; research, patents and Demo relationships retain their own status.","15 个官方组织身份；科研、专利与演示关系保留各自状态。"]
} as const;

export function ProductionEvidenceStrip({module}:{module:keyof typeof content}){
 const [label,en,zh]=content[module];
 return <aside className={styles.strip} data-module={module} aria-label="Production data status"><span><i/>{label}</span><p>{en}<small>{zh}</small></p><Link prefetch={false} href="/data-status">Data Status / 数据状态 →</Link></aside>;
}
