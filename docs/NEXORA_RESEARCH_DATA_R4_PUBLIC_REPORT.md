# NEXORA R4 public-data readiness note

R4 promotes one narrowly bounded public-data product: annual counts returned by the official NSF Award Search API for an exact-phrase query, California awardee state, and 2018–2025 award dates. The public artifact contains eight annual aggregates, the full reproducible query boundary, source URLs, a SHA-256 checksum, and explicit limitations. It retains no record-level award data or contact information.

## Honest provider state

- NSF Award Search: `READY` only for the frozen annual-count product described above.
- Census ACS: `NOT_CONFIGURED`; current official documentation requires an API key.
- USPTO Open Data Portal: `NOT_CONFIGURED`; production access and product-specific reuse QA remain incomplete.
- California Legislative Information: `STAGED`; the official downloadable schema is verified, but a governed longitudinal policy-sequence snapshot has not passed the release gate.

## Research-readiness conclusion

The public foundation now supports a stronger descriptive view of research-support activity. It still does not establish technology commercialization outcomes, policy effectiveness, causal mechanisms, or a harmonized multi-region longitudinal panel. The next causal-model gate therefore remains `MORE_DATA_REQUIRED`. The comparative-research foundation is `PARTIAL`: several public series are harmonized, but cross-region institutional equivalence and configuration-set calibration remain deferred.

No unpublished manuscript, private research workspace, hidden calibration material, credential, or local path is included in this note or its export.
