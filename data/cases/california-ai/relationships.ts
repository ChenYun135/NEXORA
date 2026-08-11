import snapshot from "./openalex-snapshot.json" with { type: "json" };
import { californiaAIOrganizations } from "./organizations.ts";

const openAlexToOrg = new Map(californiaAIOrganizations.filter((item) => item.openAlexId).map((item) => [item.openAlexId!, item.id]));

export const californiaAIRelationships = snapshot.relationships.slice(0, 20).map((edge, index) => ({
  id: `ca-ai-openalex-collaboration-${index + 1}`,
  fromOrganizationId: openAlexToOrg.get(edge.fromInstitutionId)!,
  toOrganizationId: openAlexToOrg.get(edge.toInstitutionId)!,
  type: "RESEARCH_COLLABORATION" as const,
  workCount: edge.workCount,
  period: "2015-2026",
  evidenceStatus: "VERIFIED_RELATIONSHIP" as const,
  evidenceMethod: "OpenAlex work count with both selected institutions in authorship affiliations and primary topic in AI subfield 1702.",
  sourceUrl: edge.sourceUrl,
  retrievedAt: snapshot.snapshotDate,
  coverageNote: "Verified within the selected ten-institution subset; not a complete California collaboration graph.",
}));
