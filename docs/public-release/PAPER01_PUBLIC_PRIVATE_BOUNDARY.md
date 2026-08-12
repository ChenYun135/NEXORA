# Paper 01 Public/Private Boundary

Date: 2026-08-11

## Decision

The current working repository is **private-only** because `research/paper-01/` is tracked and contains unpublished manuscripts, submission/reviewer material, analysis outputs, author declarations, internal QA, checkpoints, and research datasets. It must never be converted directly into a public GitHub repository.

The authorized public-repository candidate is built only at the project-local, ignored `.public-release/` directory using an explicit allowlist. Nothing is copied from `research/`, local `.env*`, `.git`, `.openai/hosting.json`, raw provider caches, databases, logs, private reports, manuscript files, or submission packages.

## Public-safe boundary

Included: product source required to build routes, selected UI-facing public snapshots, public method/security/privacy/license documentation, public tests, non-secret configuration, public assets, and a generated manifest.

Excluded: Paper 01 and every manuscript/version; peer-review defense and correspondence; work-level or institution-level research datasets created for the paper; retrieval caches/checkpoints; private completion reports; author identity materials beyond explicitly public citation metadata; secrets; Sites project identifiers; local operational artifacts.

The root `.gitignore` is defense-in-depth only. Because ignored files may already be tracked in the private repository, the decisive control is the allowlist candidate plus candidate-level secret/path/size checks. No private research file is deleted or modified by this release process.
