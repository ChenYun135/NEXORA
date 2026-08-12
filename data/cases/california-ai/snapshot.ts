import { californiaAIRegistry } from "./case.ts";
import { californiaAIOrganizations } from "./organizations.ts";
import { californiaAIPolicies } from "./policies.ts";
import { californiaAIRelationships } from "./relationships.ts";
import { californiaAISources } from "./sources.ts";
import { californiaAICoverage } from "./coverage.ts";
import { californiaAIFundingSnapshot } from "./funding.ts";
import { californiaAITalentIndicators } from "./talent.ts";

export const CaliforniaAIFlagshipSnapshot = {
  snapshotDate: californiaAIRegistry.snapshotDate,
  caseVersion: californiaAIRegistry.version,
  dataVersions: { openAlex: "runtime-verified-2026-08-11", funding: californiaAIFundingSnapshot.snapshotVersion, talent: "bls-oews-2025-may", organizations: "ca-ai-org-v2.0", policies: "ca-ai-policy-v1.0", relationships: "ca-ai-network-v2.0" },
  taxonomyVersion: californiaAIRegistry.taxonomyVersion,
  sourceCount: californiaAISources.length,
  organizationCount: californiaAIOrganizations.length,
  policyCount: californiaAIPolicies.length,
  relationshipCount: californiaAIRelationships.length,
  researchObservationCount: californiaAIRegistry.snapshot.annual.length,
  fundingAwardCount: californiaAIFundingSnapshot.totals.awardCount,
  talentIndicatorCount: californiaAITalentIndicators.length,
  coverage: californiaAICoverage,
  freshness: "FRESH",
} as const;
