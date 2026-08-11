# NEXORA AI Architecture

Sprint 8 adds a server-side, evidence-based research copilot at `/ai`. The request path is: query understanding → typed query plan → canonical NEXORA retrieval → bounded `EvidencePack` → provider boundary → schema, citation, and grounding validation → answer. The browser receives only the validated answer and evidence metadata; prompts, credentials, and provider details remain server-side.

The default provider is deterministic `nexora-evidence-first`. It is production-usable without a model credential and never fabricates narrative beyond retrieved evidence. `MockAIProvider` supports offline tests. A future live provider must implement `GroundedAIProvider` and pass the same validation gate.

Production, Derived, Composite, Curated, AI-generated, Demo, Unavailable, and Stale states remain distinct. Demo records are excluded from AI evidence unless a future explicitly labeled workflow opts in.
