# NEXORA Public Data Requirements for Sprint 7

This is the production input contract created by Atlas, Radar, Ecosystems, Policy, and Organizations. Sprint 6 does not ingest these sources.

| Field | Entity | Meaning | Preferred source | Fallback | Refresh | Geography / time | Provenance | Derived | Nullable | Privacy risk | Licensing / reuse |
|---|---|---|---|---|---|---|---|---|---|---|---|
| region_id, name, coordinates | Atlas Region | Stable place identity | official geographic authority | open gazetteer | annual | global / current | source URL + retrieved date | no | no | low | verify redistribution |
| industry_links | Atlas Region | evidenced regional industry presence | official statistics/programs | research databases | quarterly | region / valid period | claim-level sources | sometimes | yes | low | aggregation rights |
| research_activity | Atlas/Radar Metric | public research volume/momentum | OpenAlex | Crossref/repositories | monthly | region / publication date | work IDs + method | yes | yes | low | open-data terms |
| patent_activity | Atlas/Radar Metric | public patent filings by technology | USPTO | WIPO/national offices | monthly | assignee/region / filing date | publication IDs | yes | yes | low | bulk-data licenses |
| technology_id, taxonomy | Radar Technology | stable technology classification | NEXORA taxonomy | public standards | versioned | global / valid period | taxonomy version | yes | no | low | taxonomy reuse |
| signal_observation | Radar Signal | directional public observation | primary public dataset | official release | monthly | geography / period | record IDs + query | yes | yes | low | source-dependent |
| confidence_inputs | Cross-domain | authority, completeness, consistency, recency | source metadata | manual review | each refresh | record / as-of date | method version | yes | yes | low | NEXORA method |
| organization_id, identity | Organization | public institution identity | official site | registry/filing | quarterly | jurisdiction / valid period | official identity source | no | no | medium | database rights |
| organization_type, status | Organization | type and public status | official site/filing | registry | quarterly | jurisdiction / valid period | field-level source | sometimes | yes | medium | no personal data |
| organization_region_link | Organization | HQ/research/operating/program/ecosystem presence | official location page | filing/release | quarterly | region / valid from-to | claim evidence | no | yes | low | organization-level |
| organization_industry_link | Organization | industry association | official description | official program | quarterly | global / valid period | relationship evidence | sometimes | yes | low | classification method |
| organization_technology_link | Organization | technology association | official product/research page | patent/research DB | monthly | global / observed date | relationship evidence | sometimes | yes | low | claim reuse |
| ecosystem_relationship | Ecosystem Edge | public organization relation | official partnership/program | official release | monthly | region / valid from-to | edge evidence IDs | sometimes | yes | medium | exclude people |
| relationship_type/direction | Ecosystem Edge | normalized edge semantics | source claim + taxonomy | analyst review | each change | graph / valid period | source + method | yes | no | low | NEXORA taxonomy |
| research_link | Organization | public institution research | OpenAlex | official repository | monthly | institution / publication date | work/institution IDs | sometimes | yes | low | open licenses |
| patent_link | Organization | public assignee patents | USPTO | WIPO/national offices | monthly | assignee / filing date | publication ID | sometimes | yes | low | patent terms |
| policy_id, title, status | Policy | official policy identity/lifecycle | official government | gazette/legislature | weekly | jurisdiction / event dates | document URL/version | no | no | low | public reuse |
| policy_mechanism/effect | Policy | normalized instrument/effect | official text | official summary | amendment | jurisdiction / valid period | clause evidence | yes | yes | low | label interpretation |
| policy_organization_link | Policy↔Organization | eligible/funded/participant/regulated/supported/partner | official award/program list | official release | monthly | jurisdiction / valid period | relationship evidence | no | yes | medium | no inferred applicability |
| public_funding_award | Program↔Organization | verified public award only | NSF/NIH/DOE/SBIR/grants | recipient release | monthly | award geography/dates | award ID + currency | no | yes | medium | exclude private funding |
| source metadata | Source | publisher, URL, dates, license | source itself | catalog metadata | retrieval | source / publication time | immutable retrieval | no | no | low | license review |
| observed_at, valid_from/to | All claims | observation/validity window | originating record | retrieval timestamp | change | geography / temporal | source timestamp | no | yes | low | permitted history only |

Cross-cutting requirements: field-level lineage, source authority, retrieval timestamp, license/reuse classification, schema version, transformation method, nullable-state preservation, correction/retraction support, and zero personal-profile ingestion. Production pipelines must reject personal emails, phone numbers, employee/founder tracking, private cap tables, private funding, cookies, sessions, and inferred sensitive information.
