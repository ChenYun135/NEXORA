# Public variable dictionary

| ID | Layer | Kind | Definition | Unit | Evidence status |
|---|---|---|---|---|---|
| research_capacity | simulation | stock | capacity to produce relevant research | bounded index | partially calibratable |
| knowledge_stock | simulation | stock | accumulated model-relevant knowledge | bounded index | assumption-led |
| talent_pool | simulation | stock | available relevant skills capacity | bounded index | proxy/derived |
| collaboration_connectivity | analytical/simulation | stock | strength and diversity of institutional links | bounded index | derived where networks are verified |
| commercialization_capacity | simulation | stock | knowledge-translation capacity | bounded index | assumption-led |
| venture_pipeline | simulation | stock | aggregate venture/initiative pipeline | bounded index | assumption-led; BFS proxy candidate |
| public_research_support | simulation | policy input | research support intensity | 0–1 | scenario input |
| workforce_development | simulation | policy input | talent-development intensity | 0–1 | scenario input |
| research_infrastructure | simulation | policy input | research infrastructure intensity | 0–1 | scenario input |
| translation_support | simulation | policy input | transfer/commercialization support | 0–1 | scenario input |
| coordination_support | simulation | policy input | intermediary/network support | 0–1 | scenario input |
| public_procurement | simulation | policy input | demand-side procurement support | 0–1 | scenario input |
| value_creation | simulation | output | conditional composite model output | simulated index | assumption-led; not GDP/welfare |

Canonical machine-readable definitions live in `simulation/model-v2/specification.ts`. Changes require a version increment, test update and research crosswalk review.
