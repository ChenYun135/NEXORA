# Ecosystem Health Method / 创新生态健康度方法

Ecosystem Health is a configurable demo composite. Its dimensions and weights live in `ecosystemHealthConfig`, outside the UI:

- research connectivity
- commercialization connectivity
- capital connectivity
- policy connectivity
- technology diversity
- institutional diversity
- knowledge flow
- network resilience

Each available value is expected on a 0–100 prototype index. If a dimension is `null` or absent, it is reported as missing and excluded. Available weights are renormalized to sum to one; missing data is never converted to zero. If every dimension is missing, the result is `null`.

健康度是可配置的演示综合指标。缺失维度会明确显示，并仅在可用维度之间重新归一化权重；缺失值绝不被当作零。界面展示各维度值、有效权重和贡献，因此综合分数可追溯。

The current prototype intentionally leaves network resilience unavailable. A production resilience metric requires longitudinal snapshots and robustness tests that Sprint 4 does not yet provide.

