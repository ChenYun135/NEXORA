# AI Security

The API enforces request size, query length, stable context IDs, coarse rate limiting, safe errors, and `no-store`. Prompts and provider calls are server-only. No secret uses a `NEXT_PUBLIC_` prefix. Arbitrary web retrieval is prohibited.

Source text is untrusted data. Prompt-injection phrases and active markup are removed before synthesis. Queries requesting hidden prompts, credentials, authorization headers, or instruction override are rejected before retrieval. Output schema, citation, and grounding validators form a mandatory post-generation gate.
