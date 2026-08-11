import { mkdir, rename, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const SNAPSHOT_DATE = "2026-08-11";
const OPENALEX_API = "https://api.openalex.org";
const NSF_API = "https://api.nsf.gov/services/v1/awards.json";
const AI_SUBFIELD_ID = "1702";
const COMPLETE_PERIOD = "2015-2025";
const OBSERVED_PERIOD = "2015-2026";
const providerArg = process.argv.find((arg) => arg.startsWith("--provider="))?.split("=")[1] ?? "all";
const write = process.argv.includes("--write");

if (!new Set(["all", "openalex", "funding"]).has(providerArg)) {
  throw new Error(`Unsupported provider '${providerArg}'. Use all, openalex, or funding.`);
}

type Group = { key: string; key_display_name: string; count: number };
type OpenAlexResponse<T = unknown> = { meta: { count: number; cost_usd?: number }; group_by?: Group[]; results?: T[] };
type Institution = { id: string; display_name: string; type: string; homepage_url: string | null; ror: string | null; geo?: { city?: string; region?: string } };
type NSFAward = Record<string, string | undefined>;

const sleep = (milliseconds: number) => new Promise((resolveSleep) => setTimeout(resolveSleep, milliseconds));

function publicOpenAlexUrl(filter: string, groupBy?: string, perPage = 200) {
  const params = new URLSearchParams({ filter, per_page: String(perPage) });
  if (groupBy) params.set("group_by", groupBy);
  return `${OPENALEX_API}/works?${params.toString()}`;
}

async function requestJson<T>(url: URL, headers: HeadersInit): Promise<T> {
  for (let attempt = 1; attempt <= 4; attempt += 1) {
    const response = await fetch(url, { headers });
    if (response.ok) return response.json() as Promise<T>;
    if (attempt === 4 || ![429, 500, 502, 503, 504].includes(response.status)) {
      throw new Error(`${url.hostname} ${response.status}: ${(await response.text()).slice(0, 500)}`);
    }
    await sleep(attempt * 750);
  }
  throw new Error("Unreachable request retry state.");
}

async function queryOpenAlex(filter: string, groupBy?: string, perPage = 200): Promise<OpenAlexResponse> {
  const url = new URL(publicOpenAlexUrl(filter, groupBy, perPage));
  const key = process.env.OPENALEX_API_KEY?.trim();
  if (key) url.searchParams.set("api_key", key);
  url.searchParams.set("mailto", "research@nexora.local");
  return requestJson<OpenAlexResponse>(url, { accept: "application/json", "user-agent": "NEXORA-California-AI-case/2.0" });
}

async function listInstitutions(ids: string[]): Promise<Institution[]> {
  const results: Institution[] = [];
  for (let index = 0; index < ids.length; index += 40) {
    const url = new URL(`${OPENALEX_API}/institutions`);
    url.searchParams.set("filter", `openalex_id:${ids.slice(index, index + 40).join("|")}`);
    url.searchParams.set("per_page", "100");
    url.searchParams.set("select", "id,display_name,type,homepage_url,ror,geo");
    url.searchParams.set("mailto", "research@nexora.local");
    const key = process.env.OPENALEX_API_KEY?.trim();
    if (key) url.searchParams.set("api_key", key);
    const page = await requestJson<OpenAlexResponse<Institution>>(url, { accept: "application/json", "user-agent": "NEXORA-California-AI-case/2.0" });
    results.push(...(page.results ?? []));
  }
  return results;
}

function regionFor(city = "") {
  const normalized = city.toLowerCase();
  if (["mountain view", "stanford", "berkeley", "san mateo", "san jose", "menlo park", "livermore", "santa cruz"].includes(normalized)) return "sf-bay-area";
  if (["los angeles", "pasadena"].includes(normalized)) return "los-angeles";
  if (["san diego", "la jolla"].includes(normalized)) return "san-diego";
  if (normalized === "irvine") return "orange-county";
  return "california";
}

async function buildOpenAlexSnapshot() {
  const frameFilter = `authorships.institutions.country_code:US,primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${COMPLETE_PERIOD}`;
  const frame = await queryOpenAlex(frameFilter, "authorships.institutions.id", 200);
  const frameGroups = frame.group_by ?? [];
  if (frameGroups.length !== 200) throw new Error(`Expected 200 OpenAlex candidate groups; received ${frameGroups.length}.`);
  const counts = new Map(frameGroups.map((group) => [group.key, group.count]));
  const institutionEntities = await listInstitutions(frameGroups.map((group) => group.key.split("/").at(-1)!));
  const institutions = institutionEntities
    .filter((institution) => institution.geo?.region === "California")
    .map((institution) => ({
      id: institution.id.split("/").at(-1)!,
      name: institution.display_name,
      type: institution.type,
      city: institution.geo?.city ?? "California",
      regionId: regionFor(institution.geo?.city),
      homepageUrl: institution.homepage_url,
      ror: institution.ror,
      completePeriodWorkCount: counts.get(institution.id) ?? 0,
      coverageTier: (counts.get(institution.id) ?? 0) >= 2_500 ? "A" : (counts.get(institution.id) ?? 0) >= 1_000 ? "B" : "C",
    }))
    .sort((left, right) => right.completePeriodWorkCount - left.completePeriodWorkCount);
  if (institutions.length < 15) throw new Error(`Expected at least 15 California institutions in the top-200 frame; received ${institutions.length}.`);

  const institutionFilter = institutions.map((item) => item.id).join("|");
  const baseFilter = `authorships.institutions.id:${institutionFilter},primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${OBSERVED_PERIOD}`;
  const [annual, byInstitution, byTopic] = await Promise.all([
    queryOpenAlex(baseFilter, "publication_year", 50),
    queryOpenAlex(baseFilter, "authorships.institutions.id", 100),
    queryOpenAlex(baseFilter, "primary_topic.id", 200),
  ]);

  const regionGroups = Object.entries(Object.groupBy(institutions, (item) => item.regionId));
  const regions = await Promise.all(regionGroups.map(async ([regionId, rows]) => {
    const ids = (rows ?? []).map((item) => item.id).join("|");
    const filter = `authorships.institutions.id:${ids},primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${OBSERVED_PERIOD}`;
    const result = await queryOpenAlex(filter, undefined, 1);
    return { regionId, workCount: result.meta.count, institutionIds: (rows ?? []).map((item) => item.id), sourceUrl: publicOpenAlexUrl(filter, undefined, 1) };
  }));

  const relationships: { fromInstitutionId: string; toInstitutionId: string; workCount: number; sourceUrl: string }[] = [];
  const pairs: [typeof institutions[number], typeof institutions[number]][] = [];
  for (let leftIndex = 0; leftIndex < institutions.length; leftIndex += 1) {
    for (let rightIndex = leftIndex + 1; rightIndex < institutions.length; rightIndex += 1) pairs.push([institutions[leftIndex], institutions[rightIndex]]);
  }
  for (let index = 0; index < pairs.length; index += 6) {
    const batch = pairs.slice(index, index + 6);
    const rows = await Promise.all(batch.map(async ([left, right]) => {
      // Runtime verification on 2026-08-11 showed that repeating the field is
      // parsed as an explicit AND; the documented plus form was parsed as one ID.
      const filter = `authorships.institutions.id:${left.id},authorships.institutions.id:${right.id},primary_topic.subfield.id:${AI_SUBFIELD_ID},publication_year:${OBSERVED_PERIOD}`;
      const result = await queryOpenAlex(filter, undefined, 1);
      return result.meta.count > 0 ? { fromInstitutionId: left.id, toInstitutionId: right.id, workCount: result.meta.count, sourceUrl: publicOpenAlexUrl(filter, undefined, 1) } : null;
    }));
    relationships.push(...rows.filter((row): row is NonNullable<typeof row> => row !== null));
    await sleep(80);
  }

  const annualRows = (annual.group_by ?? []).map((row) => ({ year: Number(row.key), workCount: row.count })).sort((left, right) => left.year - right.year);
  const selectedIds = new Set(institutions.map((item) => item.id));
  const institutionRows = (byInstitution.group_by ?? [])
    .filter((row) => selectedIds.has(row.key.split("/").at(-1)!))
    .map((row) => ({ institutionId: row.key.split("/").at(-1)!, name: row.key_display_name, workCount: row.count }));
  const topicRows = (byTopic.group_by ?? []).map((row) => ({ topicId: row.key.split("/").at(-1)!, name: row.key_display_name, workCount: row.count }));
  if (annualRows.length !== 12) throw new Error(`Expected 12 source-native years; received ${annualRows.length}.`);
  if (institutionRows.length !== institutions.length) throw new Error(`Expected ${institutions.length} institutions; received ${institutionRows.length}.`);
  if (topicRows.length < 50) throw new Error(`Expected broad topic coverage; received ${topicRows.length}.`);
  if (relationships.length < 25) throw new Error(`Expected at least 25 verified relationships; received ${relationships.length}.`);

  return {
    caseId: "california-ai",
    caseVersion: "ca-ai-case-v2.0",
    snapshotDate: SNAPSHOT_DATE,
    provider: "OpenAlex",
    providerUrl: "https://developers.openalex.org/",
    license: { name: "CC0", url: "https://creativecommons.org/publicdomain/zero/1.0/" },
    apiBehavior: { verifiedAt: SNAPSHOT_DATE, endpoint: "/works", aiSubfieldId: AI_SUBFIELD_ID, publicationYears: OBSERVED_PERIOD, completeYears: COMPLETE_PERIOD, aggregationOnly: true },
    scope: {
      institutionSelection: "Top 200 U.S. institutions by 2015-2025 OpenAlex AI-subfield work count, filtered to OpenAlex geo.region = California; tiers describe coverage volume, not quality.",
      candidateFrameSize: 200,
      californiaInstitutionCount: institutions.length,
      thresholdNote: "The top-200 candidate-frame boundary is an activity-coverage cutoff; it is not a statewide census or importance ranking.",
      institutions,
    },
    totals: { uniqueWorks: annual.meta.count, annualObservationCount: annualRows.length, institutionCount: institutionRows.length, topicCount: topicRows.length, relationshipCount: relationships.length },
    annual: annualRows,
    institutions: institutionRows,
    topics: topicRows,
    regions,
    relationships: relationships.sort((left, right) => right.workCount - left.workCount),
    sourceQueries: { candidateFrame: publicOpenAlexUrl(frameFilter, "authorships.institutions.id", 200), annual: publicOpenAlexUrl(baseFilter, "publication_year", 50), institutions: publicOpenAlexUrl(baseFilter, "authorships.institutions.id", 100), topics: publicOpenAlexUrl(baseFilter, "primary_topic.id", 200) },
    limitations: [
      "The institution frame is bounded to the top 200 U.S. AI-subfield institutions before California filtering and is not a statewide census.",
      "A work is in scope when its primary OpenAlex topic is in AI subfield 1702 and at least one selected institution appears in authorship affiliations.",
      "2026 is incomplete and excluded from complete-year growth and calibration trends.",
      "Institution and regional counts overlap across co-authored works; the annual total is deduplicated by work.",
      "OpenAlex topic assignment is algorithmic and is interpreted as a classification proxy, not research quality.",
      "Coverage tiers A/B/C encode observed activity volume only and must not be interpreted as quality or rank.",
    ],
  };
}

const fundingTitlePattern = /(artificial intelligence|\bAI\b|machine learning|large language model|\bLLM\b|neural network|deep learning)/i;

async function buildFundingSnapshot() {
  const common = { keyword: '"artificial intelligence"', awardeeStateCode: "CA", dateStart: "01/01/2025", dateEnd: "12/31/2025", sortKey: "awardNumber", rpp: "25" };
  const candidates: NSFAward[] = [];
  let totalCount = Number.POSITIVE_INFINITY;
  for (let offset = 0; offset < totalCount; offset += 25) {
    const url = new URL(NSF_API);
    for (const [key, value] of Object.entries({ ...common, offset: String(offset) })) url.searchParams.set(key, value);
    const page = await requestJson<{ response?: { award?: NSFAward[]; metadata?: { totalCount?: number }; serviceNotification?: unknown[] } }>(url, { accept: "application/json", "user-agent": "NEXORA-California-AI-case/2.0" });
    if (page.response?.serviceNotification) throw new Error(`NSF API notification: ${JSON.stringify(page.response.serviceNotification)}`);
    totalCount = Number(page.response?.metadata?.totalCount ?? 0);
    candidates.push(...(page.response?.award ?? []));
  }
  const deduplicatedCandidates = new Map(candidates.map((award) => [award.id, award]));
  const awards = [...deduplicatedCandidates.values()]
    .filter((award) => fundingTitlePattern.test(award.title ?? ""))
    .map((award) => ({
      id: award.id!,
      title: award.title!,
      recipientName: award.awardeeName!,
      recipientCity: award.awardeeCity!,
      recipientStateCode: award.awardeeStateCode!,
      awardDate: award.date!,
      startDate: award.startDate!,
      expirationDate: award.expDate!,
      fundsObligatedUSD: Number(award.fundsObligatedAmt ?? 0),
      estimatedTotalUSD: Number(award.estimatedTotalAmt ?? 0),
      program: award.fundProgramName ?? "NSF program not reported",
      transactionType: award.transType ?? "Not reported",
      active: award.activeAwd === "true",
      sourceUrl: `https://www.nsf.gov/awardsearch/showAward?AWD_ID=${award.id}`,
    }))
    .sort((left, right) => right.awardDate.localeCompare(left.awardDate) || left.id.localeCompare(right.id));
  if (awards.length < 40) throw new Error(`Expected at least 40 title-qualified NSF awards; received ${awards.length}.`);
  if (awards.some((award) => !Number.isFinite(award.fundsObligatedUSD) || award.fundsObligatedUSD < 0)) throw new Error("Invalid NSF obligated amount.");
  return {
    caseId: "california-ai",
    snapshotVersion: "ca-ai-funding-v2.0",
    snapshotDate: SNAPSHOT_DATE,
    provider: "U.S. National Science Foundation Award Search API",
    status: "OBSERVED_PUBLIC_DATA",
    currency: "USD",
    amountBasis: "Nominal fundsObligatedAmt reported by NSF; no inflation adjustment and no claim of total California AI funding.",
    query: { ...common, sourceUrl: `${NSF_API}?${new URLSearchParams({ ...common, offset: "0" })}` },
    selectionRule: "Deduplicate by NSF award ID, then retain only titles matching the documented case-insensitive AI title taxonomy.",
    titleTaxonomy: ["artificial intelligence", "AI (word boundary)", "machine learning", "large language model", "LLM (word boundary)", "neural network", "deep learning"],
    candidateRows: totalCount,
    uniqueCandidateAwards: deduplicatedCandidates.size,
    totals: { awardCount: awards.length, recipientCount: new Set(awards.map((award) => award.recipientName)).size, obligatedUSD: awards.reduce((sum, award) => sum + award.fundsObligatedUSD, 0) },
    awards,
    limitations: [
      "The snapshot covers NSF awards dated in 2025 only and is not a multi-agency funding total.",
      "The API keyword searches all award fields; NEXORA therefore applies a stricter title-only AI taxonomy after retrieval.",
      "Title matching improves precision but can omit relevant awards whose AI content appears only in abstracts or program metadata.",
      "Funds obligated are nominal award-level amounts and are not annualized, inflation-adjusted, or attributed to economic impact.",
      "Recipient state is administrative awardee geography and may differ from every performance location.",
    ],
  };
}

async function atomicWrite(targetPath: string, data: unknown) {
  const target = resolve(targetPath);
  const temporary = `${target}.next`;
  await mkdir(dirname(target), { recursive: true });
  await writeFile(temporary, `${JSON.stringify(data, null, 2)}\n`, "utf8");
  await rm(target, { force: true });
  await rename(temporary, target);
  return target;
}

const result: Record<string, unknown> = { mode: write ? "PROMOTE" : "DRY_RUN", provider: providerArg, snapshotDate: SNAPSHOT_DATE };
if (providerArg === "all" || providerArg === "openalex") {
  const snapshot = await buildOpenAlexSnapshot();
  result.openalex = { totals: snapshot.totals, validation: "PASS" };
  if (write) result.openalexPath = await atomicWrite("data/cases/california-ai/openalex-snapshot.json", snapshot);
}
if (providerArg === "all" || providerArg === "funding") {
  const snapshot = await buildFundingSnapshot();
  result.funding = { totals: snapshot.totals, validation: "PASS" };
  if (write) result.fundingPath = await atomicWrite("data/cases/california-ai/funding-snapshot.json", snapshot);
}
console.log(JSON.stringify(result, null, 2));
