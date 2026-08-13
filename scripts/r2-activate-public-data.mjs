import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const YEARS = Array.from({ length: 9 }, (_, index) => 2015 + index);
const RETRIEVAL_DATE = new Date().toISOString().slice(0, 10);
const PRIVATE_FLAG = "--private-output";
const privateIndex = process.argv.indexOf(PRIVATE_FLAG);
const privateOutput = privateIndex >= 0 ? path.resolve(process.argv[privateIndex + 1]) : null;
const publicOutput = path.resolve("data/exports/research/r2-operational-coverage.json");
const publicMirror = path.resolve("public/research/r2-operational-coverage.json");

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const sha256 = (value) => createHash("sha256").update(typeof value === "string" ? value : JSON.stringify(value)).digest("hex");

async function fetchText(url, attempts = 3) {
  for (let attempt = 1; attempt <= attempts; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 45_000);
    try {
      const response = await fetch(url, { headers: { "user-agent": "NEXORA-R2-public-research/1.0" }, signal: controller.signal });
      if (!response.ok) throw new Error(`HTTP_${response.status}`);
      return await response.text();
    } catch (error) {
      if (attempt === attempts) throw error;
      await sleep(500 * 2 ** (attempt - 1));
    } finally {
      clearTimeout(timeout);
    }
  }
}

const csvRows = (text) => {
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
};

async function fetchNsfYear(year) {
  const fields = "id,fundsObligatedAmt,startDate,awardeeName,awardeeCity,awardeeStateCode,perfStateCode,agency,program";
  const base = new URL("https://api.nsf.gov/services/v1/awards.json");
  Object.entries({ startDateStart:`01/01/${year}`, startDateEnd:`12/31/${year}`, awardeeStateCode:"CA", printFields:fields, rpp:"1000" }).forEach(([key,value]) => base.searchParams.set(key,value));
  base.searchParams.set("rpp","5"); base.searchParams.set("offset","1");
  const payload = JSON.parse(await fetchText(base));
  const records = payload.response?.award ?? [];
  return {
    year,
    awardCount: Number(payload.response?.metadata?.totalCount ?? records.length),
    sampleRecordCount: records.length,
    paginationStatus:"NONDETERMINISTIC_ORDER_BLOCKS_FULL_SNAPSHOT",
    records,
  };
}

async function fetchQcewYear(year) {
  const url = `https://data.bls.gov/cew/data/api/${year}/a/area/06000.csv`;
  const text = await fetchText(url);
  const rows = csvRows(text), header = rows[0];
  const get = (row, name) => row[header.indexOf(name)];
  const total = rows.slice(1).find((row) => get(row,"own_code") === "0" && get(row,"industry_code") === "10" && get(row,"size_code") === "0" && get(row,"qtr") === "A");
  if (!total) throw new Error(`QCEW_TOTAL_ROW_MISSING_${year}`);
  return { year, annualAverageEmployment:Number(get(total,"annual_avg_emplvl")), annualAverageEstablishments:Number(get(total,"annual_avg_estabs")), averageAnnualPay:Number(get(total,"avg_annual_pay")), rawChecksum:sha256(text), raw:text };
}

async function fetchFederalRegisterYear(year) {
  const url = new URL("https://www.federalregister.gov/api/v1/documents.json");
  url.searchParams.set("conditions[publication_date][gte]",`${year}-01-01`);
  url.searchParams.set("conditions[publication_date][lte]",`${year}-12-31`);
  url.searchParams.append("conditions[agencies][]","energy-department");
  url.searchParams.append("conditions[agencies][]","national-science-foundation");
  url.searchParams.append("conditions[agencies][]","commerce-department");
  url.searchParams.set("per_page","1");
  const raw = await fetchText(url), payload = JSON.parse(raw);
  return { year, documentCount:Number(payload.count), query:url.toString(), raw };
}

async function fetchOpenAlexInstitution() {
  const url = "https://api.openalex.org/institutions?filter=country_code:US&search=Stanford%20University&per-page=2";
  const raw = await fetchText(url), payload = JSON.parse(raw);
  const exact = payload.results.find((item) => item.display_name === "Stanford University");
  if (!exact?.id || !exact?.ror || exact.geo?.region !== "California") throw new Error("OPENALEX_INSTITUTION_QA_FAILED");
  const worksUrl = `https://api.openalex.org/works?filter=institutions.id:${exact.id.split("/").at(-1)},from_publication_date:2015-01-01,to_publication_date:2023-12-31&group_by=publication_year`;
  const worksRaw = await fetchText(worksUrl), worksPayload = JSON.parse(worksRaw);
  const annualWorks = worksPayload.group_by.map((row)=>({year:Number(row.key),worksCount:Number(row.count)})).sort((a,b)=>a.year-b.year);
  return { openAlexId:exact.id, ror:exact.ror, name:exact.display_name, city:exact.geo.city, region:exact.geo.region, countryCode:exact.country_code, annualWorks, raw, worksRaw };
}

const toManifest = (providerId, query, records, coverage, geography, sourceVintage) => ({
  providerId, retrievalDate:RETRIEVAL_DATE, query, recordCount:records.length,
  checksum:sha256(records), schemaVersion:"r2.0.0", pipelineVersion:"r2.0.0",
  geography, coverage, sourceVintage, revisionStatus:"INITIAL",
});

async function main() {
  const nsf = [], qcew = [], federalRegister = [];
  for (const year of YEARS) {
    nsf.push(await fetchNsfYear(year));
    qcew.push(await fetchQcewYear(year));
    federalRegister.push(await fetchFederalRegisterYear(year));
  }
  const openAlex = await fetchOpenAlexInstitution();
  const publicData = {
    release:"NEXORA_RESEARCH_DATA_R2", retrievalDate:RETRIEVAL_DATE,
    boundaries:["Descriptive public aggregates only","Business and policy signals are not causal effects","Federal Register publication is not implementation or outcome"],
    series:{
      nsfCaliforniaAccessDiagnostic:nsf.map((row)=>({year:row.year,awardCount:row.awardCount,sampleRecordCount:row.sampleRecordCount,paginationStatus:row.paginationStatus})),
      qcewCalifornia:qcew.map((row)=>({year:row.year,annualAverageEmployment:row.annualAverageEmployment,annualAverageEstablishments:row.annualAverageEstablishments,averageAnnualPay:row.averageAnnualPay})),
      federalRegisterTechnologyAgencies:federalRegister.map((row)=>({year:row.year,documentCount:row.documentCount})),
      openAlexStanfordAnnualWorks:openAlex.annualWorks,
    },
    manifests:[
      {...toManifest("NSF_AWARDS","California awardee-state access diagnostic; not a research snapshot",nsf.map((row)=>({year:row.year,awardCount:row.awardCount,paginationStatus:row.paginationStatus})),"2015-2023","STATE:06","live API retrieval"),readiness:"STAGED",blockingIssue:"Full-result pagination lacks deterministic ordering and returns overlaps"},
      toManifest("BLS","QCEW annual California total, all ownerships, industry 10",qcew.map((row)=>({year:row.year,annualAverageEmployment:row.annualAverageEmployment,annualAverageEstablishments:row.annualAverageEstablishments,averageAnnualPay:row.averageAnnualPay,rawChecksum:row.rawChecksum})),"2015-2023","STATE:06","annual files"),
      toManifest("FEDERAL_REGISTER","Annual document counts for DOE, NSF, and Commerce",federalRegister.map((row)=>({year:row.year,documentCount:row.documentCount,query:row.query})),"2015-2023","COUNTRY:US","live API retrieval"),
      toManifest("OPENALEX","Exact public-ID institution resolution and annual works aggregation",openAlex.annualWorks,"2015-2023","INSTITUTION","live API retrieval"),
    ],
  };
  await mkdir(path.dirname(publicOutput),{recursive:true});
  await mkdir(path.dirname(publicMirror),{recursive:true});
  const formatted = `${JSON.stringify(publicData,null,2)}\n`;
  await writeFile(publicOutput,formatted); await writeFile(publicMirror,formatted);
  if (privateOutput) {
    await mkdir(privateOutput,{recursive:true});
    const privateSnapshots = { nsf:nsf.map(({records,...summary})=>({summary,records})), qcew:qcew.map(({raw,...summary})=>({summary,raw})), federalRegister, openAlex };
    await writeFile(path.join(privateOutput,"r2-source-snapshots.json"),`${JSON.stringify(privateSnapshots,null,2)}\n`);
    await writeFile(path.join(privateOutput,"r2-source-snapshots.sha256"),`${sha256(privateSnapshots)}  r2-source-snapshots.json\n`);
  }
  console.log(JSON.stringify({years:YEARS,providers:4,manifests:publicData.manifests,privateOutput},null,2));
}

main().catch((error)=>{console.error(error);process.exitCode=1;});
