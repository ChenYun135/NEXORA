import type { MissingValueStatus, RegionYearObservation } from "../../domain/research-data.ts";

export interface HarmonizedMetricInput {
  geographyType: RegionYearObservation["regionType"];
  geographyId: string;
  year: number;
  constructId: string;
  metricId: string;
  value: number | null;
  unit: string;
  status: MissingValueStatus;
  provider: string;
  snapshotId: string;
  vintage: string;
  transformationId: string;
}

export const buildCanonicalPanel = (rows:HarmonizedMetricInput[]) => {
  const keys = new Set<string>();
  return [...rows].sort((a,b)=>`${a.geographyType}:${a.geographyId}:${a.year}:${a.constructId}:${a.metricId}`.localeCompare(`${b.geographyType}:${b.geographyId}:${b.year}:${b.constructId}:${b.metricId}`)).map((row)=>{
    const key=`${row.geographyType}:${row.geographyId}:${row.year}:${row.constructId}:${row.metricId}`;
    if(keys.has(key)) throw new Error(`DUPLICATE_PANEL_CELL:${key}`); keys.add(key);
    if(row.value===null&&["OBSERVED","OBSERVED_ZERO"].includes(row.status)) throw new Error(`INVALID_MISSINGNESS:${key}`);
    if(row.value!==null&&["MISSING","SUPPRESSED","UNAVAILABLE","NOT_APPLICABLE"].includes(row.status)) throw new Error(`INVALID_VALUE_STATUS:${key}`);
    return row;
  });
};

export const panelCoverage = (rows:HarmonizedMetricInput[]) => {
  const years=[...new Set(rows.map(r=>r.year))].sort();
  const constructs=[...new Set(rows.map(r=>r.constructId))].sort();
  const geographies=[...new Set(rows.map(r=>`${r.geographyType}:${r.geographyId}`))].sort();
  const observed=rows.filter(r=>["OBSERVED","OBSERVED_ZERO"].includes(r.status)).length;
  return {years,constructs,geographies,rows:rows.length,observed,missing:rows.length-observed,coverage:rows.length?observed/rows.length:0};
};

export const normalizePer = (value:number,denominator:number,scale=1) => {
  if(!Number.isFinite(value)||!Number.isFinite(denominator)||denominator<=0||scale<=0) throw new Error("INVALID_NORMALIZATION");
  return value/denominator*scale;
};
