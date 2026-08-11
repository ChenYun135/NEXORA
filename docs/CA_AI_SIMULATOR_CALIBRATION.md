# California AI Simulator Calibration

Preset: `California AI — Evidence-Informed Baseline`  
Model label: `Partially Calibrated Scenario Model`

| Input | Classification | Basis | Limitation |
| --- | --- | --- | --- |
| Research capacity | OBSERVED | OpenAlex 2015–2025 complete-year aggregate | Ten-institution subset |
| Knowledge stock | DERIVED | Accumulated research-activity proxy | Not measured knowledge capital |
| Network connectivity | DERIVED | Verified OpenAlex co-authorship subset | Not a complete innovation network |
| Policy support | PARTIALLY_CALIBRATED | Official policy evidence | Policy count is not policy strength |
| Talent capacity | ASSUMPTION | No production series | Assumption-heavy |
| Commercialization | ASSUMPTION | No startup/market series | Assumption-heavy |
| Capital availability | UNAVAILABLE | No reusable public series | Missing input |
| Patent activity | UNAVAILABLE | USPTO not configured | Missing input |

Available scenario narratives are Research Expansion, Commercialization Bridge, Talent Expansion, Infrastructure Support, and Balanced Innovation Package. All output language must say “scenario result,” never forecast, prediction, or causal estimate.

## Empirical baseline v2 / 实证基线 v2

Statuses are `OBSERVED`, `EMPIRICALLY_DERIVED`, `PROXY_CALIBRATED`, `ASSUMPTION`, and `UNAVAILABLE`. Research, NSF funding, network and BLS talent now inform the baseline; commercialization remains assumption-heavy and patents/capital unavailable. Model snapshot: `ca-ai-case-v2.0-2026-08-11`. It is not econometrically validated. / 模型并未经过计量验证。
