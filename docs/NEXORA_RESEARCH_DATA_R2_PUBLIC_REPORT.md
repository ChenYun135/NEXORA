# NEXORA Research Data Expansion R2

R2 advances the public data foundation from a provider catalog toward bounded, reproducible longitudinal evidence.

## Operational boundary

Four Tier A provider families are currently marked READY. READY applies only to the tested product and snapshot boundary, not every product offered by a provider.

- OpenAlex: stable institution identifiers and a reproducible annual works aggregation.
- Bureau of Labor Statistics: California QCEW annual totals for 2015–2023.
- Federal Register: selected-agency annual publication counts for 2015–2023.
- Official program library: controlled identity, objective and mechanism metadata from issuing agencies.

NSF Awards remains STAGED because full-result pagination did not produce stable non-overlapping pages during R2 QA. Census BFS, BDS and ACS require an API key under the current access rules and remain NOT_CONFIGURED. No missing official value is replaced with a fabricated estimate.

## Harmonization

R2 adds versioned geography, technology, NAICS and SOC rules, conservative institution/company identity handling, deterministic checksums and explicit missing-value states. Public aggregates are descriptive. Publications are not implementation, business applications are not startups, patents are not commercialization, and provider availability is not evidence of causality.

## Public downloads

- [Provider registry](/research/provider-registry.json)
- [R2 operational coverage](/research/r2-operational-coverage.json)
- [Data provenance](/docs/DATA_PROVENANCE.md)
- [Public limitations](/docs/PUBLIC_DATA_LIMITATIONS.md)

Paper-specific panels, transformations, parameter candidates, model calibration inputs and diagnostics are excluded from the public release.
