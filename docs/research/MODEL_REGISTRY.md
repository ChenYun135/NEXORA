# Model registry

| Model | Version | Status | Purpose | Empirical boundary |
|---|---|---|---|---|
| Innovation Ecosystem Evolution Model | sim-model-v1.0.0 | partially calibrated conceptual model | current interactive simulator | selected inputs are observed/derived; most response coefficients remain assumptions |
| Innovation Ecosystem Policy Model | 2.0.0-research-design | conceptual specification | Paper-ready research backbone and future policy experiments | not empirically validated; no forecast or causal claims |

Model v2 declares annual stocks/flows, six policy instruments, implementation and development lags, three reinforcing loops, three balancing loops, four uncertainty classes and deterministic fingerprints. Its public source of truth is `simulation/model-v2/specification.ts`.

Promotion from `CONCEPTUAL` to `PARTIALLY_CALIBRATED` requires approved snapshot lineage, parameter evidence records, behavior tests, sensitivity results and researcher review. `EMPIRICALLY_CALIBRATED` is prohibited until an explicit empirical validation protocol passes.
