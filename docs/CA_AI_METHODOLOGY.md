# California AI Flagship Methodology

## Design

This is a bounded evidence synthesis that reuses NEXORA’s public-data, entity, policy, retrieval, and simulation architecture. It does not create an independent evidence system.

## Research method

OpenAlex API behavior and official documentation were checked on 2026-08-10. The research query requires at least one of ten verified California institutions, publication year 2015–2026, and OpenAlex primary-topic subfield `1702`. Annual totals are unique works returned by the grouped endpoint. Institution counts can overlap across affiliations. The three-year research change is:

`((works_2025 - works_2022) / works_2022) × 100`

2026 is shown as incomplete and excluded from complete-year growth. Volume is not treated as quality. No citation-quality score is created because the grouped endpoint does not expose a defensible citation sum for this bounded query.

## Network method

Each promoted edge counts works that satisfy both repeated institution filters, AI subfield 1702, and 2015–2026. The documented `+` example was runtime-tested; the current API parsed it as one combined token and returned the first institution’s count. Those results were rejected. Repeating the institution filter produced an explicit AND query and is used here. The UI shows the top 20 non-zero edges by co-authored-work count. “Most connected” always means within this verified subset.

## Organization and policy method

Organization identity and public location use official organization pages. A descriptive role does not establish AI strength, funding, importance, or partnership. Policies use official California executive, department, or legislative pages. Mechanisms describe intended channels; no policy presence-to-impact inference is made.

## Coverage and limitations

Patent, capital, startup-formation, market, and comparable AI-talent evidence are unavailable. Public funding is limited to official program/authorization context with no inferred award totals. Simulator inputs preserve OBSERVED, DERIVED, ASSUMPTION, and UNAVAILABLE classifications.

