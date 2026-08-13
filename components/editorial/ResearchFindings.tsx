import styles from "./research-findings.module.css";
import type { ReactNode } from "react";

export type EvidenceState = "OBSERVED" | "DERIVED" | "PROXY" | "DEMO" | "SIMULATED" | "INTERPRETATION" | "UNAVAILABLE";

type FindingProps = {
  number: string;
  headline: string;
  body: string;
  status: EvidenceState;
  metric?: string;
};

export function ResearchFinding({ number, headline, body, status, metric }: FindingProps) {
  return <article className={styles.finding} data-state={status}>
    <div><span>{number}</span><small>{status}</small></div>
    {metric && <strong>{metric}</strong>}
    <h3>{headline}</h3>
    <p>{body}</p>
  </article>;
}

export function EvidenceFinding(props: FindingProps) {
  return <ResearchFinding {...props} />;
}

export function BoundaryNote({ title, children }: { title: string; children: ReactNode }) {
  return <aside className={styles.boundary}><span>BOUNDARY</span><h3>{title}</h3><div>{children}</div></aside>;
}

export function ChartExplanation({ shows, matters, boundary }: { shows: string; matters: string; boundary: string }) {
  return <aside className={styles.explanation} aria-label="Chart interpretation">
    <div><span>WHAT THIS SHOWS</span><p>{shows}</p></div>
    <div><span>WHY IT MATTERS</span><p>{matters}</p></div>
    <div><span>WHAT NOT TO INFER</span><p>{boundary}</p></div>
  </aside>;
}
