# California AI Paper Variables

| Variable | Construct | Definition | Source | Geography | Time | Unit | Transformation | Measurement type | Coverage | Paper role | Limitation |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| `research_work_count` | Research activity | Annual unique AI-subfield works | OpenAlex | Fixed 16-institution frame | 2015–2025 | works | None | Observed | 11 complete years | PRIMARY_EMPIRICAL | Activity proxy, not statewide census |
| `research_growth_2022_2025` | Research dynamics | Complete-year endpoint change | OpenAlex | Same frame | 2022–2025 | percent | `(2025-2022)/2022*100` | Derived | Compatible endpoints | PRIMARY_EMPIRICAL | Frame/taxonomy-sensitive |
| `institution_participation` | Participation | Institution-associated work count | OpenAlex | Institution | 2015–2025 | works | Provider group-by | Observed | 16 institutions | SECONDARY_EMPIRICAL | Overlapping affiliations |
| `network_degree` | Network structure | Positive within-frame degree | OpenAlex | Institution frame | 2015–2025 | institutions | Graph derivation | Derived | 16 institutions | SECONDARY_EMPIRICAL | Frame-dependent |
| `nsf_award_count_2025` | Public R&D support | Deduplicated title-qualified awards | NSF | California recipient state | 2025 | awards | Deduplicate ID | Observed | One agency/year | SECONDARY_EMPIRICAL | Not total AI funding |
| `nsf_obligations_2025` | Public R&D support | Nominal funds obligated | NSF | California recipient state | 2025 | nominal USD | Sum accepted records | Observed | One agency/year | SECONDARY_EMPIRICAL | Not impact/effectiveness |
| `bls_ai_adjacent_employment` | Workforce proxy | Selected SOC employment | BLS OEWS | San Jose-Sunnyvale-Santa Clara MSA | May 2025 | jobs | None | Proxy | Five occupations | CONTEXTUAL | Not AI workers/statewide talent |
| `scenario_parameter_values` | Scenario assumptions | Reviewed model parameters | NEXORA | Conceptual case | Scenario horizon | model-specific | Model equations | Assumption | Scenario model | SIMULATOR_ONLY | Not empirical outcomes |
| `uspto_ai_patent_count` | Patent activity | CPC-qualified record count | USPTO ODP | Unavailable | Unavailable | records | Not activated | Unavailable | NOT_CONFIGURED | NOT_READY | No promoted snapshot |
| `ai_startup_formation` | Entrepreneurship | California AI startup formation | None | California | Unavailable | firms | None | Unavailable | Unavailable | NOT_READY | BFS cannot identify AI startups |
| `venture_capital` | Capital | Transaction-level California AI VC | None | California | Unavailable | nominal USD | None | Unavailable | Unavailable | NOT_READY | No source passed gate |

