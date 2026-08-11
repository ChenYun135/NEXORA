import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const API = "https://api.openalex.org";
const SNAPSHOT_DATE = "2026-08-10";
const AI_SUBFIELD_ID = "1702";
const PERIOD = "2015-2026";

const institutions = [
  { id: "I97018004", name: "Stanford University", regionId: "sf-bay-area" },
  { id: "I95457486", name: "University of California, Berkeley", regionId: "sf-bay-area" },
  { id: "I148283060", name: "Lawrence Berkeley National Laboratory", regionId: "sf-bay-area" },
  { id: "I161318765", name: "University of California, Los Angeles", regionId: "los-angeles" },
  { id: "I122411786", name: "California Institute of Technology", regionId: "los-angeles" },
  { id: "I1174212", name: "University of Southern California", regionId: "los-angeles" },
  { id: "I36258959", name: "University of California San Diego", regionId: "san-diego" },
  { id: "I26538001", name: "San Diego State University", regionId: "san-diego" },
  { id: "I204250578", name: "University of California, Irvine", regionId: "orange-county" },
  { id: "I84218800", name: "University of California, Davis", regionId: "california" },
] as const;

type Group = { key: string; key_display_name: string; count: number };
type OpenAlexResponse = { meta: { count: number; cost_usd?: number }; group_by?: Group[] };

const publicUrl = (filter: string, groupBy?: string, perPage = 200) => {
  const params = new URLSearchParams({ filter, per_page: String(perPage) });
  if (groupBy) params.set("group_by", groupBy);
  return `${API}/works?${params.toString()}`;
};

async function query(filter: string, groupBy?: string, perPage = 200): Promise<OpenAlexResponse> {
  const url = new URL(publicUrl(filter, groupBy, perPage));
  const key = process.env.OPENALEX_API_KEY?.trim();
  if (key) url.searchParams.set("api_key", key);
  const response = await fetch(url, { headers: { accept: "application/json", "user-agent": "NEXORA-California-AI-case/1.0" } });
  if (!response.ok) throw new Error(`OpenAlex ${response.status}: ${await response.text()}`);
  return response.json() as Promise<OpenAlexResponse>;
}

const institutionFilter = institutions.map((item) => item.id).join("|");
const baseFilter = `authorships.institutions.id:${institutionFilter},primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${PERIOD}`;

async function buildSnapshot() {
  const [annual, byInstitution, byTopic] = await Promise.all([
    query(baseFilter, "publication_year", 50),
    query(baseFilter, "authorships.institutions.id", 100),
    query(baseFilter, "primary_topic.id", 200),
  ]);

  const regionGroups = Object.entries(Object.groupBy(institutions, (item) => item.regionId));
  const regions = await Promise.all(regionGroups.map(async ([regionId, rows]) => {
    const ids = (rows ?? []).map((item) => item.id).join("|");
    const filter = `authorships.institutions.id:${ids},primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${PERIOD}`;
    const result = await query(filter, undefined, 1);
    return { regionId, workCount: result.meta.count, institutionIds: (rows ?? []).map((item) => item.id), sourceUrl: publicUrl(filter, undefined, 1) };
  }));

  const relationships: { fromInstitutionId: string; toInstitutionId: string; workCount: number; sourceUrl: string }[] = [];
  for (let i = 0; i < institutions.length; i += 1) {
    for (let j = i + 1; j < institutions.length; j += 1) {
      const left = institutions[i];
      const right = institutions[j];
      // Repeating the same filter field produces the current API's explicit AND
      // query. The documented `+` example was runtime-tested on 2026-08-10 and
      // parsed as a single ID token, so it is not used for this reproducible case.
      const filter = `authorships.institutions.id:${left.id},authorships.institutions.id:${right.id},primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${PERIOD}`;
      const result = await query(filter, undefined, 1);
      if (result.meta.count > 0) relationships.push({ fromInstitutionId: left.id, toInstitutionId: right.id, workCount: result.meta.count, sourceUrl: publicUrl(filter, undefined, 1) });
    }
  }

  const annualRows = (annual.group_by ?? []).map((row) => ({ year: Number(row.key), workCount: row.count })).sort((a, b) => a.year - b.year);
  const institutionRows = (byInstitution.group_by ?? [])
    .filter((row) => institutions.some((item) => row.key.endsWith(item.id)))
    .map((row) => ({ institutionId: row.key.split("/").at(-1)!, name: row.key_display_name, workCount: row.count }));
  const topicRows = (byTopic.group_by ?? []).map((row) => ({ topicId: row.key.split("/").at(-1)!, name: row.key_display_name, workCount: row.count }));
  const errors: string[] = [];
  if (annualRows.length < 10) errors.push("Annual series has fewer than 10 source-native observations.");
  if (institutionRows.length !== institutions.length) errors.push(`Expected ${institutions.length} institutions; received ${institutionRows.length}.`);
  if (!topicRows.length) errors.push("No AI topics returned.");
  if (relationships.length < 10) errors.push("Fewer than 10 co-authorship relationships returned.");
  if (errors.length) throw new Error(errors.join(" "));

  return {
    caseId: "california-ai",
    caseVersion: "ca-ai-case-v1.0",
    snapshotDate: SNAPSHOT_DATE,
    provider: "OpenAlex",
    providerUrl: "https://developers.openalex.org/",
    license: { name: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/" },
    apiBehavior: { verifiedAt: SNAPSHOT_DATE, endpoint: "/works", aiSubfieldId: AI_SUBFIELD_ID, publicationYears: PERIOD, aggregationOnly: true },
    scope: { institutionSelection: "Curated verified California institution subset; not a census of all California institutions.", institutions },
    totals: { uniqueWorks: annual.meta.count, annualObservationCount: annualRows.length, institutionCount: institutionRows.length, topicCount: topicRows.length, relationshipCount: relationships.length },
    annual: annualRows,
    institutions: institutionRows,
    topics: topicRows,
    regions,
    relationships: relationships.sort((a, b) => b.workCount - a.workCount),
    sourceQueries: {
      annual: publicUrl(baseFilter, "publication_year", 50),
      institutions: publicUrl(baseFilter, "authorships.institutions.id", 100),
      topics: publicUrl(baseFilter, "primary_topic.id", 200),
    },
    limitations: [
      "Counts cover a curated ten-institution California subset and are not a statewide census.",
      "A work is in scope when its primary OpenAlex topic is in the Artificial Intelligence subfield and at least one selected institution appears in its authorships.",
      "2026 is an incomplete source-native year and must not be compared with complete calendar years without a warning.",
      "Institution group counts can overlap when a work has multiple selected affiliations; the annual total is deduplicated by work.",
      "OpenAlex topic assignment is algorithmic and should be interpreted as a research classification proxy.",
      "Citation aggregates are not included in v1 because the grouped endpoint does not expose a defensible citation sum for this bounded query.",
    ],
  };
}

const write = process.argv.includes("--write");
const snapshot = await buildSnapshot();
const payload = `${JSON.stringify(snapshot, null, 2)}\n`;
if (write) {
  const target = resolve("data/cases/california-ai/openalex-snapshot.json");
  await mkdir(dirname(target), { recursive: true });
  await writeFile(target, payload, "utf8");
  console.log(`Promoted targeted aggregate snapshot: ${target}`);
} else {
  console.log(JSON.stringify({ mode: "DRY_RUN", totals: snapshot.totals, snapshotDate: snapshot.snapshotDate, validation: "PASS" }, null, 2));
}
