# ADR: Sprint 7 Data Storage

Decision: track only small curated metadata and versioned production pilot snapshots in Git; keep large raw/provider responses out. This provides reproducibility, fast Sites rendering and offline tests without introducing a database. PostgreSQL becomes appropriate for high-volume snapshots, concurrent ingestion, mutable review queues or scheduled promotions. A graph database is deferred until relationship traversal materially exceeds the current canonical edge model.
