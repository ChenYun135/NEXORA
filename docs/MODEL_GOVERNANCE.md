# Model Governance / 模型治理

Model owner: NEXORA research engineering. Current identifiers: `sim-model-v1.0.0`, `eq-v1.0.0`, `euler-annual-v1.0.0`.

Changes to stocks, flows, equations, parameter semantics, calibration snapshots, or scenario definitions require:

- a changelog entry and version increment;
- dependency and dimensional review;
- regression, boundary, determinism, and invariant tests;
- updated evidence/assumption classification;
- bilingual documentation and UI review;
- a new private deployment version.

AI interpretation is downstream only. It may summarize a completed run when a governed provider is available, but cannot alter parameters, equations, outputs, warnings, evidence classification, or reproducibility metadata.
