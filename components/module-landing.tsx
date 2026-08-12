import Link from "@/components/safe-link";
import styles from "./module-landing.module.css";

type ModuleLandingProps = {
  image: string;
  eyebrow: string;
  title: string;
  subtitle: string;
  description: string;
  enterLabel: string;
  insightLabel: string;
  lang: "en" | "zh";
};

export function ModuleLanding({image,eyebrow,title,subtitle,description,enterLabel,insightLabel,lang}:ModuleLandingProps){
 return <section className={`${styles.hero} ${lang==="zh"?styles.zh:""}`} aria-labelledby="module-landing-title">
  <img src={image} alt="" className={styles.visual}/><div className={styles.shade}/><div className={styles.grid}/>
  <div className={styles.copy}><span>{eyebrow}</span><h1 id="module-landing-title">{title}</h1><h2>{subtitle}</h2><p>{description}</p><div><a href="#workspace">{enterLabel} ↓</a><Link href="/methodology">{insightLabel} →</Link></div></div>
  <aside><span>01</span><b>{lang==="zh"?"主题概览":"THEME OVERVIEW"}</b><i/><span>02</span><b>{lang==="zh"?"数据可视化":"DATA VISUALIZATION"}</b><i/><span>03</span><b>{lang==="zh"?"分析结论":"ANALYTICAL INSIGHTS"}</b></aside>
 </section>
}
