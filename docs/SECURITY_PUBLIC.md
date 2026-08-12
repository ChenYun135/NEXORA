# Public Security Design

Threat model: accidental secret/research disclosure, unsafe user input, fabricated citations, dependency risk, personal-data expansion, and misleading decision claims.

Controls:

- `.env*` ignored except a blank `.env.example`; credentials are server-only and never `NEXT_PUBLIC_*`.
- Public repository is produced by allowlist into ignored `.public-release/`; private research, `.git`, local hosting identifiers, caches, databases, logs, and archives are excluded.
- AI input is length-bounded, evidence-retrieved, citation-checked, safe-fallback capable, and returned with `Cache-Control: no-store`.
- Product scope is organization-level; no people graph, employee tracking, private contacts, or sensitive-person inference.
- External links use fixed source registries or verified records; no model-generated URLs.
- Missing evidence fails visibly as unavailable/degraded/stale/not configured.
- Dependency and secret scans are release gates; unresolved P0/P1 issues block publication.

This design reduces risk but is not a security warranty. Report issues privately through [../SECURITY.md](../SECURITY.md).
