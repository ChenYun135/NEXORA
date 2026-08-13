# NEXORA Public Provider Catalog

The canonical machine-readable catalog is available at [`/research/provider-registry.json`](/research/provider-registry.json).

## Tier A

OpenAlex; NSF Awards; NCSES HERD; SBIR/STTR; BLS OEWS/QCEW; Census BFS; Census BDS; Census ACS; BEA Regional; USPTO; California Legislative Information; Federal Register; and the controlled Official Program Evidence Library.

## Tier B

IPEDS; USAspending; EDA Tech Hubs; NSF Engines; DOE programs; California Energy Commission; and California GO-Biz.

Each entry documents official URL, source and access type, authentication, reuse boundary, update cadence, temporal and geographic coverage, key entities, supported generic constructs, citation, operational state, verification date and limitation.

Statuses describe the current NEXORA implementation, not provider quality:

- `READY`: verified public snapshot or controlled official records pass the current public boundary.
- `STAGED`: adapter/schema is prepared but production ingestion or QA is incomplete.
- `REVIEW_REQUIRED`: source or reuse contract needs further review.
- `NOT_CONFIGURED`: a required environment key or production connection is absent.
- `UNAVAILABLE`: no defensible public path is available.
- `DEGRADED`: a previously working path is temporarily impaired.
