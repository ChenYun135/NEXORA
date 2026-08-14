# Public data refresh policy

NEXORA checks supported official public sources once each month. A monthly check is not a promise that every dataset changes monthly: each provider keeps its native release cadence.

- Daily, ongoing, and monthly sources are checked for new official records.
- Quarterly and annual sources are checked monthly but only updated when a new official release or revision exists.
- Missing, suppressed, not available, not applicable, and observed-zero values remain different states. Missing observations are never synthesized.
- Every promoted update receives an immutable snapshot ID, checksum, retrieval date, official vintage, coverage, schema version, record count, query or download specification, and pipeline commit.
- Historical revisions are recorded as old value, new value, release vintage, and revision date.

Candidates must pass schema, duplicate, missingness, suppression, units, geography, time, revision, and checksum checks. A failed candidate is not promoted; NEXORA continues to serve the last known good snapshot and marks the source as degraded where appropriate.

## Research firewall

The automated public pipeline is limited to generic public provider data, public aggregates, source metadata, and visualizations. Frozen or developing research analyses are outside this workflow and require separate researcher review. A later public refresh never changes a frozen analysis snapshot silently.
