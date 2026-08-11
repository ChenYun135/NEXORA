# Simulator Input Readiness / 模拟器输入就绪度

This audit is the Sprint 9 modeling boundary. It is completed before equations are implemented. It distinguishes production observations, production-derived metrics, Demo values, unavailable inputs, and explicit model assumptions. A count below describes coverage of the nine initial stock concepts; it is not a confidence score.

## Initial stock-variable readiness

| Stock concept | Readiness | Eligible evidence | Model boundary |
|---|---|---|---|
| Research Capacity | `OBSERVED_CALIBRATED` | OpenAlex mapped-topic annual publication counts, 2020–2025 | A versioned normalization may initialize a bounded research index. Topic mappings are proxies and are not a universal maximum. |
| Technology Knowledge Stock | `DERIVED_CALIBRATED` | Cumulative/lagged transformation of the same OpenAlex series | Accumulation and depreciation coefficients remain assumptions; patents are excluded. |
| Commercialization Capacity | `NEXORA_ASSUMPTION` | No production commercialization series | Initial value and response coefficients must be scenario assumptions. |
| Startup Base | `NEXORA_ASSUMPTION` | No verified startup population or longitudinal formation/exit series | Existing product startup values are Demo and are excluded from calibration. |
| Skilled Talent Pool | `NEXORA_ASSUMPTION` | No production talent series | World Bank R&D expenditure is not a talent measure. |
| Innovation Infrastructure | `NEXORA_ASSUMPTION` | Official policy/program identity records only | Program existence does not quantify infrastructure capacity or effect. |
| Policy Support Capacity | `NEXORA_ASSUMPTION` with observed context | Eight verified official program/standards identities | Identity/status can be cited; intensity, implementation, lag, and effect are assumptions. Sprint 5 comparison values are Demo. |
| Ecosystem Connectivity | `NEXORA_ASSUMPTION` with one observed relationship | One verified MIT–IBM joint-research relationship | One edge cannot calibrate an aggregate network. Sprint 4 graphs and health metrics remain Demo. |
| Market Adoption Capacity | `NEXORA_ASSUMPTION` | No production adoption series | Initial value and adoption response are scenario assumptions. |

Preliminary stock coverage by count: one observed-calibrated, one derived-calibrated, and seven assumption-led concepts. This is a transparent classification, not empirical validation.

## Flow and auxiliary readiness

- `Research Creation` can be initialized from the direction of OpenAlex publication series, with mapping and normalization limitations.
- `Knowledge Diffusion`, `Technology Transfer`, `Commercialization Flow`, `Startup Formation`, `Startup Attrition`, `Talent Inflow/Outflow`, `Infrastructure Expansion`, `Policy Implementation`, and `Technology Adoption` have no sufficient production longitudinal calibration and must use documented parameter ranges.
- `Public Funding Inflow` cannot be inferred from policy identity alone. `Private Capital Inflow` is unavailable.
- World Bank R&D expenditure is observed country-level context only. It cannot be treated as Bay Area, Boston, or Shenzhen metro calibration.
- Network centrality from Demo graphs is excluded from production calibration. Any connectivity, diversity, redundancy, or bridge-dependency modifier is a scenario assumption until a production longitudinal graph exists.

## Values explicitly excluded from calibration

- Radar Opportunity Scores, Radar stage and momentum dimensions: `DEMO`.
- Ecosystem health, resilience, graph edges, centrality summaries and relationship layers except the one verified relationship: `DEMO` or unavailable.
- Sprint 5 policy intensity/comparison dimensions: `DEMO`; verified official program identities remain contextual observations only.
- Sprint 6 organization activity, performance, funding and relationships beyond verified identity records: `DEMO` or unavailable.
- AI-generated interpretation: never a calibration input and never allowed to change simulation output.

## Missing production inputs

USPTO patent observations, startup formation/exit series, capital flows, commercialization outcomes, talent mobility, market adoption, infrastructure capacity, policy implementation/effect measures, metro-level comparable series, and longitudinal production ecosystem relationships are unavailable. Null and unavailable values are never converted to zero.

## Approved Sprint 9 model status

The reference model may begin as `PARTIALLY_CALIBRATED`, `Conceptual / Research Model`. It may support transparent scenario experiments, deterministic sensitivity analysis, and reproducible comparisons. It must not claim empirical validation, causal proof, forecast certainty, policy recommendation, investment advice, or a most-likely future.
