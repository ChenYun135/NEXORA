import { californiaAIOrganizations } from "./organizations.ts";
import { californiaAIPolicies } from "./policies.ts";
import { californiaAIPublicFunding } from "./funding.ts";

export const californiaAISources = [
  { id: "source-openalex", title: "OpenAlex API", publisher: "OurResearch", url: "https://developers.openalex.org/", retrievedAt: "2026-08-10", license: "CC0", usage: "Aggregated works, institutions, topics and co-authorship counts" },
  ...californiaAIOrganizations.map((item) => ({ id: `source-${item.id}`, title: item.name.en, publisher: item.name.en, url: item.officialUrl, retrievedAt: "2026-08-10", license: "Official page — metadata/link only", usage: "Organization identity and public location" })),
  ...californiaAIPolicies.map((item) => ({ id: `source-${item.id}`, title: item.title.en, publisher: item.agency, url: item.officialUrl, retrievedAt: "2026-08-10", license: "Official public document — metadata/link only", usage: "Policy identity, status and intended mechanism" })),
  ...californiaAIPublicFunding.map((item) => ({ id: `source-${item.id}`, title: item.title.en, publisher: item.agency, url: item.officialUrl, retrievedAt: "2026-08-10", license: "Official public page — metadata/link only", usage: "Program or authorization context" })),
];
