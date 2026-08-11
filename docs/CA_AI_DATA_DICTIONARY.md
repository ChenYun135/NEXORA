# California AI Data Dictionary

| Field | Meaning | Source | Unit | Geography | Time | Status | Nullable | Transformation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `annual.workCount` | Unique AI-subfield works with selected affiliation | OpenAlex | works | Selected California institutions | year | OBSERVED | no | API group-by year |
| `institutions.workCount` | Works associated with an institution | OpenAlex | works | institution | 2015–2026 | OBSERVED | no | API group-by institution; overlaps allowed |
| `themes.workCount` | Sum of mapped primary-topic groups | OpenAlex + NEXORA mapping | works | selected subset | 2015–2026 | DERIVED | no | explicit topic-ID sum |
| `regions.workCount` | Unique works for selected institutions in a region grouping | OpenAlex | works | case region | 2015–2026 | OBSERVED | no | region-specific OR filter |
| `relationship.workCount` | Works with both selected institutions | OpenAlex | co-authored works | institution pair | 2015–2026 | DERIVED | no | repeated-filter AND query |
| `organization.role` | Descriptive ecosystem function | official identity + curation | category | organization | snapshot | CURATED | no | no score |
| `policy.mechanism` | Intended policy channel | official policy document | category | California | publication date | OBSERVED | no | factual classification |
| `funding.amount` | Verified program/award amount | official program | original currency | California/context | snapshot | UNAVAILABLE | yes | null unless explicitly verified |
| `coverage.level` | Evidence completeness | NEXORA audit | ordinal label | case | snapshot | DERIVED | no | qualitative quality gate |

Null is never converted to zero.

v2 adds: OpenAlex `coverageTier` (coverage volume only), BLS `soc`, `employment`, `locationQuotient`, `annualMeanWageUSD`, NSF `fundsObligatedUSD`, `estimatedTotalUSD`, `awardDate`, `recipientName`, provider `status`, Radar `score/weight/basis`, and network `degree/weightedDegree`. Currency is nominal USD. `NOT_CONFIGURED` and `UNAVAILABLE` remain distinct. / v2 新增覆盖层级、BLS、NSF、Radar 与网络字段；币种为名义美元，未配置与不可用严格区分。
