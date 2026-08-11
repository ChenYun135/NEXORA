# California AI Provenance

| Provider | Dataset | Source | Retrieval | Transformation | Case use |
| --- | --- | --- | --- | --- | --- |
| OpenAlex | Works API | `developers.openalex.org` / `api.openalex.org` | 2026-08-10 | Filter, group, normalize; no full records retained | Annual research, institution participation, topics, co-authorship |
| California Governor | Executive orders and announcements | `gov.ca.gov` | 2026-08-10 | Factual metadata normalization only | Policy mechanisms and status |
| California Legislature | Bill text/history | `leginfo.legislature.ca.gov` | 2026-08-10 | Bill identity, chapter status and mechanism | Policy registry |
| California CDT | Technology letters and guidelines | `cdt.ca.gov` | 2026-08-10 | Document metadata and mechanism | Public-sector AI governance |
| Official organizations | About/contact pages | Official domains | 2026-08-10 | Identity and location normalization | Organization registry |
| NSF / GO-Biz | Official program pages | Official domains | 2026-08-10 | Program-stage context only | Limited public-funding context |

Canonical machine-readable source records live in `data/cases/california-ai/sources.ts`. All remote HTML is treated as untrusted content; scripts are not executed and only required factual fields are retained.

