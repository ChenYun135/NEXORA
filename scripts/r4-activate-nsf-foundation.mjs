import { createHash } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname } from "node:path";

const years = Array.from({length: 8}, (_, index) => 2018 + index);
const base = "https://www.research.gov/awardapi-service/v1/awards.json";
const retrievalDate = "2026-08-13";

const queryFor = (year) => {
  const params = new URLSearchParams({
    keyword: '"artificial intelligence"',
    agency: "NSF",
    awardeeStateCode: "CA",
    dateStart: `01/01/${year}`,
    dateEnd: `12/31/${year}`,
    rpp: "1",
    offset: "0",
    sortKey: "awardNumber",
  });
  return `${base}?${params}`;
};

const observations = [];
for (const year of years) {
  const url = queryFor(year);
  const response = await fetch(url, {headers:{"user-agent":"NEXORA-public-data-foundation/4.0"}});
  if (!response.ok) throw new Error(`NSF_API_${response.status}_${year}`);
  const payload = await response.json();
  const metadata = payload?.response?.metadata;
  if (!metadata || !Number.isInteger(Number(metadata.totalCount))) throw new Error(`NSF_SCHEMA_${year}`);
  observations.push({
    geography: "California",
    geographyCode: "CA",
    year,
    metricId: "nsf_awards_exact_phrase_ai_count",
    value: Number(metadata.totalCount),
    unit: "award records",
    status: "OBSERVED",
    providerId: "NSF_AWARDS",
    sourceUrl: url,
    sourceField: "response.metadata.totalCount",
    note: "Count of official award records returned by the bounded query; keyword matching is an information-retrieval proxy, not a complete technology taxonomy.",
  });
}

const canonical = JSON.stringify(observations);
const checksum = createHash("sha256").update(canonical).digest("hex");
const artifact = {
  release: "NEXORA_R4_PUBLIC_DATA_FOUNDATION",
  generatedAt: `${retrievalDate}T00:00:00Z`,
  provider: "U.S. National Science Foundation Award Search API",
  officialDocumentation: "https://resources.research.gov/common/webapi/awardapisearch-v1.htm",
  scope: {
    geography: "California awardee state",
    years: [years[0], years.at(-1)],
    query: "exact phrase artificial intelligence; agency NSF; annual award date; sort awardNumber",
    recordLevelDataRetained: false,
  },
  status: "READY_WITHIN_DECLARED_PRODUCT_BOUNDARY",
  checksum: {algorithm:"SHA-256", value:checksum, covers:"observations canonical JSON"},
  observations,
  limitations: [
    "Metadata counts describe records returned by the official search service, not research quality, impact, commercialization, causality, or future performance.",
    "Awardee state is not necessarily the location of every research activity or collaborator.",
    "Exact-phrase keyword retrieval is intentionally narrow and does not form a complete artificial-intelligence award census.",
    "No principal-investigator contact details, abstracts, unpublished analyses, or record-level award data are redistributed.",
  ],
};

for (const target of ["data/exports/research/r4-nsf-public-foundation.json","public/research/r4-nsf-public-foundation.json"]) {
  await mkdir(dirname(target), {recursive:true});
  await writeFile(target, `${JSON.stringify(artifact,null,2)}\n`, "utf8");
}
console.log(JSON.stringify({status:artifact.status, observations:observations.length, checksum}, null, 2));
