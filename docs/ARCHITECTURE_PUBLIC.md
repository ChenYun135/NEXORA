# Public Architecture

NEXORA is a vinext/React application with server-rendered routes, client-side exploration components, typed domain models, curated public snapshots, deterministic calculations, and a read-only evidence-first AI endpoint.

```text
Public source snapshots -> typed data/domain layer -> route components
                                      |-> derived metrics with labels
                                      |-> evidence retrieval -> bounded synthesis
                                      |-> scenario assumptions -> simulated output
```

- `app/`: route, metadata, robots, sitemap, and API boundary.
- `components/`: bilingual interaction and trust labels.
- `data/`, `domain/`, `lib/`, `services/`, `simulation/`: typed data, calculations, evidence retrieval, and scenarios.
- `public/`: public-safe visual assets and method pages.
- `tests/`: public product behavior, safety, and integration tests.

No public route depends on unpublished research, review files, personal directories, or a local secret. Optional server credentials remain server-side. The public candidate omits the private Sites project identifier and uses a null hosting template.
