import { createHash } from "node:crypto";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";

const YEARS = Array.from({ length: 9 }, (_, index) => 2015 + index);
const privateIndex = process.argv.indexOf("--private-root");
if (privateIndex < 0 || !process.argv[privateIndex + 1]) throw new Error("--private-root is required");
const privateRoot = path.resolve(process.argv[privateIndex + 1]);
const rawRoot = path.join(privateRoot, "raw");
const extractedRoot = path.join(privateRoot, "extracted");
const retrievalDate = new Date().toISOString().slice(0, 10);
const out = path.resolve("data/exports/research/r3-empirical-foundation.json");
const mirror = path.resolve("public/research/r3-empirical-foundation.json");
const publicReportSource = path.resolve("docs/NEXORA_RESEARCH_DATA_R3_PUBLIC_REPORT.md");
const publicReportMirror = path.resolve("public/docs/NEXORA_RESEARCH_DATA_R3_PUBLIC_REPORT.md");

const sha256 = (value) => createHash("sha256").update(value).digest("hex");
const number = (value) => value === "" || value == null || value === "X" || value === "(NA)" ? null : Number(value);
const sum = (values) => values.reduce((total, value) => total + (value ?? 0), 0);

function csvRows(text) {
  const rows = [];
  let row = [], field = "", quoted = false;
  for (let index = 0; index < text.length; index += 1) {
    const char = text[index];
    if (char === '"' && quoted && text[index + 1] === '"') { field += '"'; index += 1; }
    else if (char === '"') quoted = !quoted;
    else if (char === "," && !quoted) { row.push(field); field = ""; }
    else if ((char === "\n" || char === "\r") && !quoted) {
      if (char === "\r" && text[index + 1] === "\n") index += 1;
      row.push(field); if (row.some(Boolean)) rows.push(row); row = []; field = "";
    } else field += char;
  }
  if (field || row.length) { row.push(field); rows.push(row); }
  return rows;
}

function records(text) {
  const rows = csvRows(text), header = rows.shift();
  return rows.map((row) => Object.fromEntries(header.map((key, index) => [key.replace(/^\uFEFF/, ""), row[index] ?? ""])));
}

async function readRecords(file) { return records(await readFile(file, "utf8")); }
async function fileManifest(file, providerId, sourceUrl) {
  const buffer = await readFile(file);
  return { providerId, file: path.basename(file), sourceUrl, bytes: buffer.byteLength, sha256: sha256(buffer) };
}

function annualBfs(rows) {
  const months = ["jan","feb","mar","apr","may","jun","jul","aug","sep","oct","nov","dec"];
  return YEARS.map((year) => {
    const selected = rows.filter((row) => row.geo === "CA" && row.sa === "A" && row.naics_sector === "TOTAL" && Number(row.year) === year);
    const get = (series) => selected.find((row) => row.series === series);
    const annual = (series) => sum(months.map((month) => number(get(series)?.[month])));
    return { year, businessApplications: annual("BA_BA"), highPropensityApplications: annual("BA_HBA"), businessApplicationsWithPlannedWages: annual("BA_WBA"), applicationsFromCorporations: annual("BA_CBA") };
  });
}

function annualBds(state, age) {
  return YEARS.map((year) => {
    const row = state.find((item) => item.st === "06" && Number(item.year) === year);
    const startup = age.find((item) => item.st === "06" && Number(item.year) === year && item.fage.startsWith("a) 0"));
    if (!row || !startup) throw new Error(`BDS California row missing for ${year}`);
    return {
      year, firms:number(row.firms), establishments:number(row.estabs), employment:number(row.emp),
      establishmentBirths:number(row.estabs_entry), establishmentDeaths:number(row.estabs_exit),
      jobCreation:number(row.job_creation), jobDestruction:number(row.job_destruction),
      firmDeaths:number(row.firmdeath_firms), startupFirms:number(startup.firms), startupEmployment:number(startup.emp),
    };
  });
}

async function annualHerd() {
  const output = [];
  for (const year of YEARS) {
    const rows = await readRecords(path.join(extractedRoot, "herd-full", `herd${year}.csv`));
    const california = rows.filter((row) => row.inst_state_code === "CA");
    const sourceRows = california.filter((row) => row.question === "Source" && row.questionnaire_no?.startsWith("01."));
    const byRow = (label) => sum(sourceRows.filter((row) => row.row === label).map((row) => number(row.data)));
    output.push({
      year,
      institutionCount:new Set(california.map((row) => row.inst_id)).size,
      totalResearchAndDevelopmentThousands:byRow("Total"),
      federalThousands:byRow("Federal government"),
      stateAndLocalThousands:byRow("State and local government"),
      businessThousands:byRow("Business"),
      institutionFundsThousands:byRow("Institution funds"),
    });
  }
  return output;
}

function annualSbir(rows) {
  return YEARS.map((year) => {
    const selected = rows.filter((row) => row.State === "California" && Number(row["Award Year"]) === year);
    const phase = (program, phaseName) => selected.filter((row) => row.Program === program && row.Phase === phaseName);
    const block = (program, phaseName) => ({ count:phase(program, phaseName).length, amount:Number(sum(phase(program, phaseName).map((row) => number(row["Award Amount"]))).toFixed(2)) });
    return { year, sbirPhaseI:block("SBIR","Phase I"), sbirPhaseII:block("SBIR","Phase II"), sttrPhaseI:block("STTR","Phase I"), sttrPhaseII:block("STTR","Phase II") };
  });
}

async function annualBea() {
  const rows = await readRecords(path.join(extractedRoot, "bea-sagdp", "SAGDP1__ALL_AREAS_1997_2025.csv"));
  const california = rows.find((row) => row.GeoFIPS.replaceAll('"', "").trim() === "06000" && row.LineCode === "1");
  if (!california) throw new Error("BEA California SAGDP1 line 1 missing");
  return YEARS.map((year) => ({ year, realGdpMillionsChained2017Dollars:number(california[String(year)]) }));
}

async function main() {
  const bfsFile = path.join(rawRoot, "census-bfs-monthly.csv");
  const bdsStateFile = path.join(rawRoot, "census-bds2023-state.csv");
  const bdsAgeFile = path.join(rawRoot, "census-bds2023-state-firm-age.csv");
  const bdsMsaFile = path.join(rawRoot, "census-bds2023-msa.csv");
  const sbirFile = path.join(rawRoot, "sbir-award-data-no-abstract.csv");
  const beaFile = path.join(rawRoot, "bea-sagdp.zip");
  const [bfs, bdsState, bdsAge, bdsMsa, sbir] = await Promise.all([readRecords(bfsFile), readRecords(bdsStateFile), readRecords(bdsAgeFile), readRecords(bdsMsaFile), readRecords(sbirFile)]);
  const msaCoverage = new Set(bdsMsa.filter((row) => YEARS.includes(Number(row.year))).map((row) => row.msa)).size;
  const herd = await annualHerd();
  const series = { bfsCalifornia:annualBfs(bfs), bdsCalifornia:annualBds(bdsState,bdsAge), herdCalifornia:herd, sbirSttrCalifornia:annualSbir(sbir), beaCalifornia:await annualBea() };
  const herdManifests = await Promise.all(YEARS.map((year) => fileManifest(path.join(rawRoot, `ncses-herd-${year}.zip`), "NCSES_HERD", `https://ncses.nsf.gov/821/assets/0/files/higher_education_r_and_d_${year}.zip`)));
  const manifests = [
    await fileManifest(bfsFile,"CENSUS_BFS","https://www.census.gov/econ/bfs/csv/bfs_monthly.csv"),
    await fileManifest(bdsStateFile,"CENSUS_BDS","https://www2.census.gov/programs-surveys/bds/tables/time-series/2023/bds2023_st.csv"),
    await fileManifest(bdsAgeFile,"CENSUS_BDS","https://www2.census.gov/programs-surveys/bds/tables/time-series/2023/bds2023_st_fa.csv"),
    await fileManifest(bdsMsaFile,"CENSUS_BDS","https://www2.census.gov/programs-surveys/bds/tables/time-series/2023/bds2023_msa.csv"),
    ...herdManifests,
    await fileManifest(sbirFile,"SBIR_STTR","https://data.www.sbir.gov/mod_awarddatapublic_no_abstract/award_data_no_abstract.csv"),
    await fileManifest(beaFile,"BEA_REGIONAL","https://apps.bea.gov/regional/zip/SAGDP.zip"),
  ];
  const publicData = {
    release:"NEXORA_RESEARCH_DATA_R3", retrievalDate, geography:"California", coverage:"2015-2023",
    boundaries:["Descriptive official aggregates only","BFS applications are not realized startups","SBIR/STTR awards are public support, not commercialization outcomes","BDS establishment entry is distinct from firm startup cohorts","Policy candidates are excluded until official timing review is complete"],
    diagnostics:{yearCount:YEARS.length, bdsMsaSeriesAvailable:msaCoverage, providerFamiliesActivated:["CENSUS_BFS","CENSUS_BDS","NCSES_HERD","SBIR_STTR","BEA_REGIONAL"]},
    series,
    manifests,
  };
  const formatted = `${JSON.stringify(publicData,null,2)}\n`;
  await mkdir(path.dirname(out),{recursive:true}); await mkdir(path.dirname(mirror),{recursive:true});
  await writeFile(out,formatted); await writeFile(mirror,formatted);
  await mkdir(path.dirname(publicReportMirror),{recursive:true});
  await writeFile(publicReportMirror,await readFile(publicReportSource,"utf8"));
  console.log(JSON.stringify({providers:publicData.diagnostics.providerFamiliesActivated,years:YEARS,msaCoverage,outputChecksum:sha256(formatted)},null,2));
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
