import { californiaAIOrganizations } from "./organizations.ts";
import { californiaAIPolicies } from "./policies.ts";
import { californiaAIPublicFunding } from "./funding.ts";
import { californiaAITalentSource } from "./talent.ts";
import { californiaAIPatentStatus } from "./patents.ts";
import { californiaAIEntrepreneurship } from "./entrepreneurship.ts";

export const californiaAISources = [
  { id: "source-openalex", title: "OpenAlex API", publisher: "OurResearch", url: "https://developers.openalex.org/", retrievedAt: "2026-08-11", license: "CC0", usage: "Aggregated works, institutions, topics and co-authorship counts" },
  { id: californiaAITalentSource.id, title: californiaAITalentSource.title, publisher: californiaAITalentSource.publisher, url: californiaAITalentSource.url, retrievedAt: californiaAITalentSource.retrievedAt, license: "U.S. government public data; cite BLS and retrieval date", usage: "AI-adjacent occupational employment, location quotient and wage cross-section" },
  { id: "source-uspto-odp", title: "USPTO Open Data Portal Bulk Data Search API", publisher: "U.S. Patent and Trademark Office", url: californiaAIPatentStatus.officialUrl, retrievedAt: "2026-08-11", license: "Official API documentation — metadata/link only", usage: "Adapter availability and secret requirement; no live records" },
  { id: "source-census-bfs", title: "Business Formation Statistics — About the Data", publisher: "U.S. Census Bureau", url: californiaAIEntrepreneurship.officialUrl, retrievedAt: "2026-08-11", license: "U.S. government public data", usage: "Feasibility assessment only; no AI-startup metric promoted" },
  { id: "source-ror", title: "Research Organization Registry", publisher: "ROR", url: "https://ror.org/about/", retrievedAt: "2026-08-11", license: "CC0", usage: "Institution identity cross-reference" },
  ...californiaAIOrganizations.map((item) => ({ id: `source-${item.id}`, title: item.name.en, publisher: item.name.en, url: item.officialUrl, retrievedAt: "2026-08-11", license: "Official page — metadata/link only", usage: "Organization identity and public location" })),
  ...californiaAIPolicies.map((item) => ({ id: `source-${item.id}`, title: item.title.en, publisher: item.agency, url: item.officialUrl, retrievedAt: "2026-08-11", license: "Official public document — metadata/link only", usage: "Policy identity, status and intended mechanism" })),
  ...californiaAIPublicFunding.map((item) => ({ id: `source-${item.id}`, title: item.title.en, publisher: item.agency, url: item.officialUrl, retrievedAt: "2026-08-11", license: "Official U.S./California government data or page", usage: item.amount === null ? "Program or authorization context" : "Award-level nominal obligations" })),
];
