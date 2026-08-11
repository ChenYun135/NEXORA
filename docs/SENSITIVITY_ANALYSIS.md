# Sensitivity Analysis / 敏感性分析

Sprint 9 implements deterministic one-way sensitivity analysis. Each selected parameter is evaluated at five points across its declared review range while current scenario overrides and all other inputs remain fixed. Parameters are ranked by the absolute spread in final innovation output.

This identifies which assumptions exert leverage inside this model; it does not estimate causal importance, statistical significance, or real-world probability. Interactions between simultaneously changing parameters are not measured. A future global sensitivity method requires defensible joint distributions and production calibration.
