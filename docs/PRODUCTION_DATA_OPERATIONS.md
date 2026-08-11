# Production Data Operations

1. `npm run data:refresh` performs the deterministic dry-run pipeline.
2. `npm run data:validate` checks schemas, IDs, provenance, mappings, geography, dates and values.
3. `npm run data:quality` prints promotion reports and quarantined counts.
4. Inspect `/data-status` for provider health, freshness, coverage and license state.
5. A live provider smoke test is manual and separate from normal tests; configure secrets through Sites only.
6. Stage a new snapshot, compare added/unchanged/deprecated/rejected counts, review anomalies, then promote only after the gate passes.
7. On failure keep last-known-good. Switch `NexoraDataService` to Demo for local work; never relabel Demo as production.
8. Update mapping version and notes before refreshing affected metrics.
