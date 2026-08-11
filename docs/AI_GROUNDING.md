# AI Grounding

Every substantive claim carries `supportingEvidenceIds`. Numerical claims must be present in their cited evidence; unsupported values fail validation. Grounding checks also reject unknown evidence IDs, Demo leakage, claims without citations, missing reproducibility metadata, and schema-invalid output.

Sufficiency is deterministic. `SUFFICIENT`, `PARTIAL`, and `INSUFFICIENT` depend on coverage of required evidence categories, evidence count, conflicts, and critical gaps. Insufficient packs return a constrained refusal with the exact missing evidence rather than a plausible-sounding answer.
