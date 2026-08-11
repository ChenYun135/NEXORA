# NEXORA Organizations Architecture

Sprint 6 adds an organization-intelligence bounded context without replacing Atlas, Radar, Ecosystems, or Policy. `/companies` is the explorer; `/companies/[id]` is a stable citation-ready detail route. `domain/organizations.ts` owns contracts, `data/demo/organizations.ts` owns prototype entities/relationships/signals/sources, `lib/organization-intelligence.ts` owns deterministic analytics, and the provider interface preserves a future production boundary.

Shared IDs connect Organization → Industry, Technology, Atlas Region, Ecosystem, Policy, Source, ResearchPaper, Patent, PublicProgram. Existing Ecosystem edge semantics are reused. No graph database or ingestion pipeline is introduced.

Privacy boundary: this module is organization-level only. It has no person, email, phone, employee, founder, salary, wealth, private cap-table, private funding, cookie, or social-profile field.
