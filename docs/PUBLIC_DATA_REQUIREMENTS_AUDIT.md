# Public Data Requirements Audit / 公共数据输入契约审计

Verified against the Sprint 2–6 domain models on 2026-08-10, before Sprint 7 ingestion work began.

## Already supported / 已支持

- Stable NEXORA IDs for regions, industries, technologies, policies and organizations.
- Nullable dates, amounts, research/patent links and organization profile fields.
- Entity-, metric- and relationship-level source/evidence references.
- Separate Demo, observed, derived and composite concepts in module-specific models.
- Policy lifecycle dates, organization presence validity, confidence inputs and original currency.

## Canonical gaps / 统一模型缺口

The module models duplicate source, confidence, evidence and status concepts. A shared canonical layer is required for provider record identity, source tier, license metadata, normalized geography, observations, time series, datasets, relationships, field provenance, conflicts, transformations, metric derivations, snapshots, ingestion runs, rejected records, quality reports, freshness policies and provider health.

## Normalization and time semantics / 标准化与时间语义

- External names and classifications map into versioned NEXORA geography, industry and technology registries; provider schemas stop at adapters.
- `publishedAt`, `filedAt`, `effectiveDate`, `observedAt`, `sourceUpdatedAt`, `retrievedAt`, `calculatedAt`, `validFrom` and `validTo` remain distinct.
- Missing values stay `null`; no implicit zero, interpolation, currency conversion or guessed coordinates.
- External organization records require exact IDs/domains/country evidence; name similarity alone cannot merge entities.

## Provenance and licensing / 来源与许可

Every promoted production entity, relationship and metric requires canonical source identity, source record ID, HTTPS URL, retrieval date, ingestion run, schema/parser version, checksum, attribution and license status. Field provenance is required for identity and high-impact fields; lower-risk fields may use entity-level provenance. Provider metadata must distinguish catalog license from each discovered dataset's own terms.

## Do not ingest / 禁止采集

Personal emails, phone numbers, people profiles, inventor/author profiles for product display, addresses, private funding/cap tables, private investor data, cookies, sessions, authentication data, social behavior, resumes, personal political/location data, paywalled proprietary datasets without permission, and full copyrighted documents. Remote HTML is untrusted and is never rendered unsanitized.

## Storage decision / 存储决策

Sprint 7 uses small versioned, reviewable production pilot snapshots plus canonical metadata in Git. Large raw responses are not committed. Promotion is atomic in the pipeline abstraction and preserves last-known-good data. A durable database is deferred until dataset volume, concurrent writes or scheduling requires it; see `ADR_DATA_STORAGE.md`.
