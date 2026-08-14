# Monthly data operations

The repository workflow runs at **09:17 UTC on the third day of every month** and supports manual `full`, `single-provider`, and `metadata-only` dispatches.

1. Read the provider cadence registry and check credential presence without printing values.
2. Query only controlled official APIs, bulk files, archives, registers, or pages. Fetch adapters use timeouts, bounded retries, exponential backoff, rate limiting, caching, pagination limits, and circuit breakers.
3. Create a candidate snapshot and compare it with the current verified snapshot for new records, revisions, withdrawals, schema changes, coverage changes, and unexpected jumps.
4. Run data QA, automated tests, and the public privacy boundary scan.
5. If clean and changed, open a dedicated candidate pull request. The workflow never deploys Sites automatically.

Large raw archives stay in external or local cache storage. The public repository contains reproducible code, small aggregates, metadata, checksums, and public-safe monthly reports.

## Operational safeguards

- The workflow uses minimum `contents` and `pull-requests` permissions.
- Secrets are available only to the scheduled/manual candidate job and never run in an untrusted pull-request context.
- One transient failure is retried; repeated failures become degraded; long-term age becomes stale.
- No-new-release is normal for quarterly and annual sources.
- Existing verified snapshots are retained; updates never silently overwrite history.
- A human reviews the candidate before any production site deployment.

## Manual commands

`npm run data:monthly -- --mode metadata-only`

`npm run data:monthly -- --mode full`

`npm run data:monthly -- --mode single-provider --provider OPENALEX`
