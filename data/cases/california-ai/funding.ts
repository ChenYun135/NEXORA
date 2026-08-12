import snapshot from "./funding-snapshot.json" with { type: "json" };

export const californiaAIFundingSnapshot = snapshot;
export const californiaAIFundingAwards = snapshot.awards.map((award) => ({ ...award, evidenceId: `ca-ai-nsf-award-${award.id}`, status: "OBSERVED_PUBLIC_DATA" as const }));

export const californiaAIPublicFunding = [
  { id: "funding-nsf-2025-title-qualified", title: { en: "NSF 2025 California AI title-qualified awards", zh: "NSF 2025 年加州 AI 标题级筛选奖项" }, agency: "U.S. National Science Foundation", stage: "OBSERVED_AWARDS", amount: snapshot.totals.obligatedUSD, currency: "USD", relevance: { en: `${snapshot.totals.awardCount} deduplicated awards across ${snapshot.totals.recipientCount} recipients; title-taxonomy bounded, not total California AI funding.`, zh: `${snapshot.totals.awardCount} 个去重奖项，覆盖 ${snapshot.totals.recipientCount} 个受资助主体；受标题词表约束，不代表加州 AI 资金总额。` }, officialUrl: snapshot.query.sourceUrl },
  { id: "funding-calcompute", title: { en: "CalCompute public cloud framework", zh: "CalCompute 公共云框架" }, agency: "California Government Operations Agency", stage: "AUTHORIZED_CONTEXT", amount: null, currency: null, relevance: { en: "Authorization context only; no verified award amount is asserted.", zh: "仅作授权背景；不主张存在已核验拨款金额。" }, officialUrl: "https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB53" },
] as const;
