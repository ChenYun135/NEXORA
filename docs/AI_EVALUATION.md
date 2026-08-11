# AI Evaluation

`tests/fixtures/ai-evaluation.ts` defines 15 fixed cases across research, trends, policy, regions, ecosystems, organizations, data gaps, methods, unsupported forecasts, Chinese queries, and prompt injection. `tests/ai-copilot.test.ts` contains 23 offline assertions.

Release gates cover intent/entity resolution, bounded retrieval, Demo exclusion, provenance semantics, country/metro disclosure, patent unavailability, safe citations, unsupported-number rejection, output schema, reproducibility, prompt versioning, bilingual behavior, and deterministic mock-provider behavior. All tests run without live model access.
