# Public data provider registry

Verified against official provider documentation on 2026-08-12. “Public” does not mean unrestricted: dataset-specific terms, attribution and disclosure rules still apply.

| ID | Provider | Intended use | Access / update note | Public handling status | Official documentation |
|---|---|---|---|---|---|
| openalex | OpenAlex | works, topics, affiliations, collaboration | API now requires a free key; snapshot is free and quarterly | candidate; CC0 metadata/snapshot, attribution retained | https://developers.openalex.org/ |
| crossref | Crossref REST API | DOI metadata and record reconciliation | public REST API; content fields may carry separate rights | candidate; do not republish copyrighted abstracts blindly | https://www.crossref.org/documentation/retrieve-metadata/rest-api/ |
| census-bfs | Census Business Formation Statistics | aggregate business applications/formations | monthly state/region/national; annual county | candidate; measure is not a startup count | https://www.census.gov/data/tables/time-series/econ/bfs/business-formation-statistics.html |
| census-bds | Census Business Dynamics Statistics | aggregate establishment dynamics | disclosure-protected aggregates; API key required | candidate; no restricted microdata | https://www.census.gov/programs-surveys/bds/data.API.html |
| bls | U.S. Bureau of Labor Statistics | occupations, employment, wages | public API; registration expands limits | candidate; retrieval date and BLS disclaimer required | https://www.bls.gov/bls/api_features.htm |
| ncses | NSF NCSES | R&D, education and workforce aggregates | public tables/files; restricted microdata excluded | candidate public-use products only | https://ncses.nsf.gov/explore-data |
| nih-reporter | NIH RePORTER | public project/award records | API v2 and documented elements | candidate; taxonomy and deduplication required | https://api.reporter.nih.gov/ |
| usaspending | USAspending.gov | federal award context | public DATA Act REST API | candidate; award amounts require action/fiscal logic | https://api.usaspending.gov/docs/endpoints |
| uspto | USPTO | patents and technology classes | bulk/API products; interface-specific terms | deferred until access and taxonomy are validated | https://developer.uspto.gov/ |
| world-bank | World Bank Indicators API | international macro context | public API, JSON/CSV/XML; update cadence varies | candidate; indicator-specific metadata required | https://datahelpdesk.worldbank.org/knowledgebase/articles/898581-api-basic-call-structures |
| bea | U.S. Bureau of Economic Analysis | national/regional economic context | published statistics through API; key registration | candidate; preserve vintage and units | https://apps.bea.gov/api/_pdf/bea_web_service_api_user_guide.pdf |
| ipeds | NCES IPEDS | institutions, completions, staff and finance | annual public aggregate files; provisional/final releases | candidate; account for collection/data-year lag | https://nces.ed.gov/ipeds/use-the-data/usethedata |
| ca-leginfo | California Legislative Information | official bills, statutes and histories | official public-domain legislative information | candidate; existence/status is not effectiveness | https://leginfo.legislature.ca.gov/ |

## Required snapshot fields

Provider ID, source URL, dataset/endpoint, query or file ID, retrieved-at UTC, publication/vintage date, geography, time coverage, schema version, raw/accepted/rejected counts, content hash, license/terms URL and transformation version.
