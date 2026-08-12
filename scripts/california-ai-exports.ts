import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import openAlex from "../data/cases/california-ai/openalex-snapshot.json" with { type: "json" };
import funding from "../data/cases/california-ai/funding-snapshot.json" with { type: "json" };
import { californiaAITalentIndicators } from "../data/cases/california-ai/talent.ts";
import { californiaAIEvidenceLayers } from "../data/cases/california-ai/empirical.ts";
import { californiaAIAlignedPanel } from "../data/cases/california-ai/alignment.ts";

const target = resolve("data/exports/california-ai");
const cell = (value: unknown) => `"${String(value ?? "").replaceAll('"', '""')}"`;
const csv = (headers: string[], rows: unknown[][]) => `${headers.map(cell).join(",")}\n${rows.map((row) => row.map(cell).join(",")).join("\n")}\n`;
async function promote(name: string, content: string) { const path = resolve(target, name); const next = `${path}.next`; await writeFile(next, content, "utf8"); await rm(path, { force: true }); await rename(next, path); }

await mkdir(target, { recursive: true });
await promote("research_annual.csv", csv(["case_version","year","work_count","incomplete","status","source"], openAlex.annual.map((row) => [openAlex.caseVersion,row.year,row.workCount,row.year === 2026,"OBSERVED_PUBLIC_DATA",openAlex.sourceQueries.annual])));
await promote("institutions.csv", csv(["institution_id","name","type","city","region_id","coverage_tier","complete_period_work_count","ror","homepage"], openAlex.scope.institutions.map((row) => [row.id,row.name,row.type,row.city,row.regionId,row.coverageTier,row.completePeriodWorkCount,row.ror,row.homepageUrl])));
await promote("relationships.csv", csv(["from_institution_id","to_institution_id","work_count","period","status","source"], openAlex.relationships.map((row) => [row.fromInstitutionId,row.toInstitutionId,row.workCount,"2015-2025 complete; 2026 partial","VERIFIED_RELATIONSHIP",row.sourceUrl])));
await promote("talent_oews.csv", csv(["indicator_id","soc","label_en","geography_id","period","employment","location_quotient","annual_mean_wage_usd","construct","status","source_id"], californiaAITalentIndicators.map((row) => [row.id,row.soc,row.label.en,row.geographyId,row.period,row.employment,row.locationQuotient,row.annualMeanWageUSD,row.construct,row.status,row.sourceId])));
await promote("nsf_awards_2025.csv", csv(["award_id","title","recipient_name","recipient_city","award_date","start_date","expiration_date","funds_obligated_usd","estimated_total_usd","program","transaction_type","active","source"], funding.awards.map((row) => [row.id,row.title,row.recipientName,row.recipientCity,row.awardDate,row.startDate,row.expirationDate,row.fundsObligatedUSD,row.estimatedTotalUSD,row.program,row.transactionType,row.active,row.sourceUrl])));
await promote("evidence_layers.csv", csv(["layer_id","status","provider","records","period"], californiaAIEvidenceLayers.map((row) => [row.id,row.status,row.provider,row.records,row.period])));
await promote("ca-ai-aligned-panel.csv", csv(["year","geography_id","metric_id","value","unit","provider","status","comparability_status","construct"], californiaAIAlignedPanel.map((row) => [row.year,row.geographyId,row.metricId,row.value,row.unit,row.provider,row.status,row.comparabilityStatus,row.construct])));
console.log(JSON.stringify({ status: "PASS", directory: target, files: 7, caseVersion: openAlex.caseVersion, snapshotDate: openAlex.snapshotDate }, null, 2));
