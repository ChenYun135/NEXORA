# NEXORA Public Data Architecture

NEXORA separates official public data infrastructure from all private research workspaces. Public layers progress through RAW, NORMALIZED, HARMONIZED, DERIVED and PUBLIC_EXPORT; private research inputs never enter public exports.

Every observation retains geography level, observation year, source period, retrieval date, snapshot date, unit, semantic missing-value state, provider and snapshot identifier. City, county, CBSA, state and country are never silently mixed. Missing, not applicable, suppressed, unavailable and observed zero remain different states.

Snapshot manifests record query parameters, source vintage, checksum, schema version, pipeline version, revision state and transformation hash. Provider requests use allow-listed origins, validated paths, timeouts, bounded retry, caching and circuit breaking.
