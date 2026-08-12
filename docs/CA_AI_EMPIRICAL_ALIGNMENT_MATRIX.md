# California AI Empirical Alignment Matrix

| Construct | Metric | Provider | Type | Geography level | Time coverage | Unit | Aggregation method | Comparability | Research use | Simulator use | Limitations |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Research activity/capacity proxy | Annual unique AI-subfield works | OpenAlex | Observed | Fixed 16-institution frame | 2015–2025 complete; 2026 partial | works | Provider year group-by | DIRECTLY_COMPARABLE | Primary descriptive trend | Research-capacity proxy | Activity, not quality, impact or statewide census |
| Institution participation | Complete-period work count | OpenAlex | Observed | Canonical institution location | 2015–2025 | institution-associated works | Institution group-by | COMPARABLE_AFTER_AGGREGATION | Secondary | None | Affiliations overlap; not additive |
| Network structure | Positive co-authorship pairs/degree | OpenAlex | Derived | 16-institution frame | 2015–2025 recommended | pairs/works | Within-frame repeated filters | COMPARABLE_AFTER_AGGREGATION | Secondary network description | Connectivity proxy | Not complete California network |
| AI-adjacent workforce | Employment/LQ/wage by SOC | BLS OEWS | Proxy | San Jose-Sunnyvale-Santa Clara MSA | May 2025 | jobs/LQ/nominal USD | Source-published | CONTEXT_ONLY | Workforce context | Regional contextual proxy | Not AI-worker count, Bay Area aggregate or statewide talent |
| Public R&D support | Award count/obligations | NSF | Observed | California recipient state | 2025 award dates | awards/nominal USD | Deduplicate ID, title taxonomy, sum obligations | CONTEXT_ONLY | Secondary funding evidence | Input context | One agency/year; not effectiveness |
| Patent activity | CPC-qualified applications | USPTO ODP | Observed when activated | Source-record address rule | Unavailable | applications/grants | Credential-ready, no promotion | NOT_COMPARABLE | Not ready | Unavailable | `USPTO_API_KEY` not configured |

No combined cross-layer score, correlation, lag analysis or causal inference is supported.

