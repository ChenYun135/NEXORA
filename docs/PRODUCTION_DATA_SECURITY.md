# Production Data Security

Allowlisted origins: `api.openalex.org`, `api.worldbank.org`, `catalog.data.gov`, `api.uspto.gov`, `federalregister.gov`, and explicitly curated official HTTPS identity/policy pages. No generic URL fetch, client-side secret, raw upstream proxy, remote script execution or unsanitized HTML rendering. Query IDs/ranges/pagination are validated. Errors redact credentials and raw payloads. Secrets use Sites environment variables; `.env*` stays ignored except placeholder-only `.env.example`.
