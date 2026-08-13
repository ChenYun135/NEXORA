# NEXORA Public Data Architecture

## Boundary

NEXORA maintains a public data layer that is separate from all private research workspaces. The public layer contains official-provider metadata, generic schemas, public aggregates, reusable taxonomies, quality states and source-first methodology. All unpublished analytical artifacts remain outside the public release.

## Layer contract

1. **RAW** — immutable provider response or official bulk archive, stored with source URL and vintage.
2. **NORMALIZED** — provider fields mapped without changing their empirical meaning.
3. **HARMONIZED** — geography, time, institution and unit identifiers aligned under declared crosswalk versions.
4. **DERIVED** — transparent transformations with input snapshot and transformation hashes.
5. **RESEARCH_INPUT** — private and excluded from public release.
6. **PUBLIC_EXPORT** — public-safe provider summaries, dictionaries, aggregates and program records only.

No transformation layer may be skipped. Data.gov may assist discovery but is never the final empirical source when the issuing provider is available.

## Canonical observation contract

Every observation retains a geography level, canonical geography ID, observation year, source period, retrieval date, snapshot date, metric, value, unit, semantic missing-value status, provider and snapshot ID. City, county, CBSA, state and country observations are never silently pooled.

Missing values remain one of `MISSING`, `NOT_APPLICABLE`, `SUPPRESSED` or `UNAVAILABLE`. A value becomes `OBSERVED_ZERO` only when the source explicitly reports zero. In particular, Census suppression flags override numeric placeholders.

## Reproducibility

Each snapshot manifest records provider, query, parameters, retrieval and snapshot dates, source period, record count, checksum, source vintage, schema version, pipeline version, revision state and transformation hash. Government revisions create a new vintage; they do not silently overwrite prior snapshots.

## Request control

Provider clients use allow-listed origins, validated paths, timeouts, bounded retry with backoff, response caching and circuit breaking. Secrets are server-side environment values only. Bulk archives are preferred when they provide more stable and auditable reproduction than repeated API requests.
