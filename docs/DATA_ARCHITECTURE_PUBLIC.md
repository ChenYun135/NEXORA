# Public Data Architecture

NEXORA separates provider facts from transformations and interpretation.

| Layer | Meaning | Public behavior |
|---|---|---|
| Public Data | Source-native public record or statistic | Provider, period, geography, and source URL shown |
| Normalized | Schema/geography/taxonomy mapping | Transformation documented |
| Derived | Reproducible calculation from identified inputs | Formula, scope, and limitations stated |
| Composite / Demo | Product prototype construct | Never presented as official or universal ranking |
| AI Interpretation | Evidence-bounded synthesis | Citation and sufficiency state required |
| Simulated | Output under explicit assumptions | Never called prediction |
| Unavailable / Degraded / Stale / Not Configured | Evidence or service limitation | Preserved as state; never replaced with zero |

Provider refresh work is staged, validated, and promoted atomically. Public bundles contain selected snapshots needed by the UI, not raw caches, API responses, checkpoints, databases, unpublished research datasets, or credentials. The California AI case is a selected evidence panel with construct-specific geography and periods—not a statewide census.
