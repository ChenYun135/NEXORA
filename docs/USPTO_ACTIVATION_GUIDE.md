# USPTO Activation Guide / USPTO 启用指南

Current status: `NOT_CONFIGURED`; production patent data: `UNAVAILABLE`.

Use the current [USPTO Open Data Portal Patent File Wrapper API](https://data.uspto.gov/apis/patent-file-wrapper/application-data), not retired PatentsView/Developer Hub documentation. The adapter uses `POST https://api.uspto.gov/api/v1/patent/applications/search`, `X-API-KEY`, JSON query/filter/range/sort/fields/pagination payloads, and `USPTO_API_KEY` as a server-only Sites Secret. The official public page does not publish a stable numeric ceiling; the client treats HTTP 429 and `Retry-After` as authoritative and does not invent a rate limit.

The adapter validates response schema, paginates, times out, retries transient/429 responses, caches successful requests, preserves last-known-good production snapshots, gates promotion, and keeps applicant, assignee and inventor address roles separate. Geography uses source-record addresses only; organization identity alone never supplies geography. The reviewed CPC include families are `G06N3/00`, `G06N5/00`, `G06N7/00`, `G06N20/00`, and `G06F18/00`; name-only “AI” matches are excluded.

## Configuration and verification

1. Sign in/register through USPTO ODP and obtain an API key under the current ODP account workflow.
2. Add a private Sites environment Secret named `USPTO_API_KEY`; never use a `NEXT_PUBLIC_` name.
3. Confirm `.env.example` contains only `USPTO_API_KEY=` and no value.
4. Run `npm run data:case:california-ai:uspto:dry-run`. Without the secret it must return `NOT_CONFIGURED` without failure or key output.
5. In a secret-bearing server environment run `npm run data:case:california-ai:uspto:live-dry-run`. This fetches at most ten staged records and never promotes them.
6. Inspect schema, CPC coverage, source address roles, duplicates, missing fields and the generated quality result before any future refresh/promotion implementation is authorized.

## Deterministic activation checklist

1. Secret present server-side.
2. No client exposure or logs.
3. One-record connectivity smoke test.
4. Small California AI dry run.
5. Schema validation.
6. CPC taxonomy mapping review.
7. Applicant/assignee/inventor resolution and address review.
8. Quality gate passes.
9. Stage an immutable candidate snapshot.
10. Promote atomically only after review.

Rollback: do not promote the candidate, or restore the previous immutable active snapshot using the established production rollback procedure. Failed quality, schema or geography review must leave status `NOT_CONFIGURED`/`UNAVAILABLE` or retain the prior last-known-good snapshot. This guide contains no credential.

