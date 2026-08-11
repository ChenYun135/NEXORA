# AI Retrieval

`NexoraQueryPlanner` emits typed operations such as `GET_METRICS`, `GET_TIMESERIES`, `GET_POLICIES`, and `COMPARE_ENTITIES`. `NexoraRetrievalService` executes them only against canonical NEXORA data and methodology registries. It does not browse arbitrary URLs.

Retrieval is bounded to 24 evidence items and ranked by relevance, authority, freshness, directness, and provenance. Entity references use stable IDs. Coverage, missing-data observations, limitations, conflicts, and snapshot IDs travel with every pack. OpenAlex observations, World Bank country context, verified official policy identities, and explicitly verified organization identities are eligible. Existing Demo scores and relationships are excluded.
