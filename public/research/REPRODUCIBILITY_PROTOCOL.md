# Reproducibility protocol

1. Pin repository commit, runtime and package lock.
2. Record provider, query/file, retrieval timestamp, vintage and license/terms.
3. Hash immutable raw snapshots before transformation.
4. Validate schema, required fields, types, ranges, geography, time and provenance; quarantine failures.
5. Version mappings, formulas and derived outputs.
6. Record model version, scenario schema, inputs, horizon, warnings and reproducibility hash.
7. Generate figures from versioned data/specification files—never screenshots.
8. Run build, typecheck, lint, unit/integration tests and public-boundary scans.
9. Publish only aggregate public-safe artifacts. Exclude secrets, restricted microdata, private manuscripts, local paths and Git metadata.

Determinism is a software property, not empirical validation. Reproducible assumptions can still be wrong; uncertainty and evidence class remain mandatory.
