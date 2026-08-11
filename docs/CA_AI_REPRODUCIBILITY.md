# California AI Reproducibility

1. Use Node 22.13 or later.
2. Run `npm run data:case:california-ai:dry-run` to execute the targeted retrieval and validation without writing.
3. Run `npm run data:case:california-ai` to promote `data/cases/california-ai/openalex-snapshot.json`.
4. An optional `OPENALEX_API_KEY` may be supplied server-side; it is never serialized. On 2026-08-10, basic aggregation requests succeeded without a key, although current official documentation describes API-key access.
5. Run `npm run test:case:california-ai`, then the full `npm test`, `npm run lint`, and TypeScript check.

The snapshot records case version, taxonomy version, source query URLs, institution IDs, time window, aggregate counts, retrieval date and limitations. Normal regression tests use the checked-in aggregate snapshot; they do not require live internet access.

Reproducing a later date can legitimately yield different values because OpenAlex backfills records and updates topic classification. Any promoted refresh must update the changelog and re-run the data-quality gate.

v2 commands: `npm run data:case:california-ai:dry-run -- --provider=openalex|funding` and `npm run data:case:california-ai -- --provider=openalex|funding`. The script retries transient failures, validates counts, writes `.next`, then atomically promotes. Existing snapshots are last-known-good until all provider gates pass. / v2 支持按来源干跑与原子晋级；全部门禁通过前保留最近已知良好快照。
