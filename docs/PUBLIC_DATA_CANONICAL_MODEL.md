# Canonical Public Data Model

`domain/public-data.ts` defines canonical sources, record identity, datasets, observations, relationships, geography, provenance, transformations, derivations, lineage, snapshots, ingestion runs, rejected records, quality, freshness, conflicts and provider health. Provider IDs and source record IDs make upsert idempotent. Dates retain their distinct meanings. Values carry unit, scale, geography granularity and nullable state.
