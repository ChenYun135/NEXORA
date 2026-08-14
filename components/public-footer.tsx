"use client";

import Link from "@/components/safe-link";
import { useNexoraLanguage } from "@/hooks/use-nexora-language";

const copy = {
  en: { statement: "Evidence-based future-industry intelligence", data: "Data Status", method: "Methodology", privacy: "Privacy", terms: "Disclaimer", note: "Data checked August 2026. Latest source updates vary by provider. Public data, derived indicators, AI interpretation and simulation remain explicitly separated." },
  zh: { statement: "基于证据的未来产业情报", data: "数据状态", method: "方法与局限", privacy: "隐私", terms: "免责声明", note: "数据检查时间：2026 年 8 月。不同来源按各自官方周期更新。公共数据、衍生指标、AI 解读与模拟结果始终明确区分。" },
} as const;

export function PublicFooter() {
  const [lang] = useNexoraLanguage();
  const t = copy[lang];
  return <footer className="public-footer"><div><Link href="/" className="public-footer-brand"><span>N</span><b>NEXORA</b></Link><p>{t.statement}</p></div><nav aria-label={lang === "en" ? "Public information" : "公共信息"}><Link href="/data-status">{t.data}</Link><Link href="/methodology">{t.method}</Link><Link href="/privacy">{t.privacy}</Link><Link href="/terms">{t.terms}</Link></nav><small>{t.note}<br />NEXORA PUBLIC RC 1.0 · 2026</small></footer>;
}
