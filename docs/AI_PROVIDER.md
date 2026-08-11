# AI Provider Boundary

`GroundedAIProvider` accepts only a structured query, typed plan, bounded `EvidencePack`, prompt version, and answer limit. It returns a schema-conforming answer plus sanitized operational metadata. Providers may not retrieve additional sources or change evidence IDs.

Sprint 8 ships `EvidenceFirstAIProvider` and `MockAIProvider`; no live model credential was discovered or invented. A live adapter must remain server-only, use a Sites Secret/Environment Variable, implement timeout/error handling, and pass citation, grounding, security, privacy, and offline contract tests before activation.
