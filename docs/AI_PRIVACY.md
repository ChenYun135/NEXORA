# AI Privacy

Sprint 8 uses no personal profile store, conversation database, browser history, cookies, or user document ingestion. Workspace history is transient browser state and is not persisted by NEXORA. The service logs no raw prompt content in the application layer.

Only canonical public-industry evidence and safe stable entity IDs are sent through the provider boundary. The current evidence-first provider is local deterministic code, so no query or evidence leaves the deployment. A future external provider requires a documented privacy review and a Sites secret.
