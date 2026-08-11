# Public Data Architecture / 公共数据架构

`Remote source → controlled provider adapter → raw provider shape → runtime validation → canonical record → provenance/lineage → quality gate → staged snapshot → atomic promotion → NexoraDataService → UI`.

Provider schemas stop in `services/public-data/providers.ts`; components receive small safe canonical summaries. Sprint 7 stores reviewable pilot snapshots in Git, never large raw payloads. Data mode is `HYBRID`: each record retains its own status and the fallback order is Production → cached production → last-known-good → Demo → unavailable. Upstream access is never required during build or normal tests.

## Security boundary

Only allowlisted provider origins are callable. Paths, identifiers, date ranges and pagination are validated. Requests use timeouts, bounded exponential backoff, cache TTLs and a simple circuit breaker. No browser-side authenticated upstream calls or generic `fetch(userUrl)` exist.
