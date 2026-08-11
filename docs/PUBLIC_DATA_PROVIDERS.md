# Public Data Providers / 公共数据源

Official documentation verified 2026-08-10.

| Provider | Purpose | Authentication | Pilot / cadence | Failure behavior | Official documentation |
|---|---|---|---|---|---|
| OpenAlex | topics, institutions, annual work aggregates | Basic filtering worked during verification; official docs recommend/free API key for scaled use | 4 mapped topics, 2020–2025; monthly | cached/LKG then Demo | https://developers.openalex.org/api-reference/introduction |
| World Bank Indicators API v2 | country macro context | none for selected API | R&D share, 7 countries; annual | retain nulls and LKG | https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures |
| USPTO ODP | patents/bulk product discovery | `USPTO_API_KEY` required | adapter + fixture/CPC pilot; no production claims | NOT_CONFIGURED | https://data.uspto.gov/apis/bulk-data/search |
| Data.gov Catalog | dataset discovery metadata only | documented CKAN endpoint currently returned 404 | 5-record LKG catalog pilot; weekly | DEGRADED, provider-ready | https://data.gov/developers/apis/ |
| Federal Register / official program sites | official policy metadata | none | curated verification; weekly/manual | keep last verified status | https://www.federalregister.gov/developers/documentation/api/v1 |
| Official organization pages | public identity only | none | 15 identities; monthly/manual | never infer identity/activity | official HTTPS pages |

No author/inventor/person profiles, personal addresses or full documents are ingested.
