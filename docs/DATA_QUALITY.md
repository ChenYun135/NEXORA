# Data Quality / 数据质量

Dimensions: completeness, validity, consistency, freshness, uniqueness, provenance coverage, taxonomy coverage and geography coverage. Promotion is rejected for an empty dataset, critical schema errors, missing provenance, duplicate IDs, ≥10% rejected records, >90% unexplained loss, 100× count spikes or systematic null/mapping failures. Invalid records are quarantined with only a safe metadata summary. `npm run data:quality` emits the pilot report.
