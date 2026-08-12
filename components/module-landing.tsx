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

export function ModuleLanding({ image, eyebrow, title, subtitle, description, enterLabel, insightLabel, lang }: ModuleLandingProps) {
  const steps = lang === "zh"
    ? [
        ["01", "先看主题", "先理解这一模块试图回答什么问题，而不是先读一整屏指标。"],
        ["02", "再看证据", "进入核心可视化，聚焦最有解释力的数据与关系。"],
        ["03", "最后解读", "把图表转化为有边界、有来源的分析结论。"],
      ]
    : [
        ["01", "Frame the question", "Understand what this module is trying to explain before reading a wall of metrics."],
        ["02", "Explore the evidence", "Move into the primary visualization and focus on the signals that matter most."],
        ["03", "Interpret carefully", "Translate patterns into bounded, source-aware analytical insights."],
      ];

  return (
    <>
      <section className={`${styles.hero} ${lang === "zh" ? styles.zh : ""}`} aria-labelledby="module-landing-title">
        <img src={image} alt="" className={styles.visual} />
        <div className={styles.shade} />
        <div className={styles.copy}>
          <span className={styles.eyebrow}>{eyebrow}</span>
          <h1 id="module-landing-title">{title}</h1>
          <h2>{subtitle}</h2>
          <div className={styles.actions}>
            <a href="#workspace" className={styles.primary}>{enterLabel} ↓</a>
            <Link href="/methodology">{insightLabel} →</Link>
          </div>
        </div>
        <div className={styles.caption}>{lang === "zh" ? "研究导向的主题入口" : "RESEARCH-ORIENTED MODULE"}</div>
      </section>

      <section className={`${styles.orientation} ${lang === "zh" ? styles.zh : ""}`} aria-label={lang === "zh" ? "模块阅读导引" : "Module orientation"}>
        <div className={styles.orientationLead}>
          <span>{lang === "zh" ? "阅读导引" : "HOW TO READ THIS MODULE"}</span>
          <p>{description}</p>
        </div>
        <div className={styles.steps}>
          {steps.map(([n, heading, body]) => (
            <article key={n}>
              <span>{n}</span>
              <h3>{heading}</h3>
              <p>{body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}
