# NEXORA Methodology Index / 方法索引

Release: **Post-Sprint Integration v1** · 2026-08-10

NEXORA keeps source facts, transformations, scores, simulations and AI interpretation separate. The canonical evidence chain is: **Public Data → Normalized Data → Derived Metric → Composite Score → AI Interpretation**. Simulation outputs are labeled **Simulated** and are not forecasts.

NEXORA 将来源事实、转换、评分、模拟和 AI 解读明确分离。标准证据链为：**公共数据 → 标准化数据 → 衍生指标 → 综合评分 → AI 解读**。模拟输出标记为**模拟结果**，不等同于预测。

## Canonical status vocabulary / 标准状态词

| English | 中文 | Meaning / 含义 |
| --- | --- | --- |
| Public Data | 公共数据 | Direct, attributable public-source record / 可归属的公开来源记录 |
| Normalized Data | 标准化数据 | Public data transformed into the canonical schema / 转换为标准模型的数据 |
| Derived Metric | 衍生指标 | Reproducible calculation from records / 由记录可复现计算 |
| Composite Score | 综合评分 | Weighted multi-dimensional index / 多维加权指数 |
| Demo Data | 演示数据 | Synthetic or curated product-validation data / 用于产品验证的数据 |
| Stale Data | 过期数据 | Beyond declared freshness window / 超出新鲜度窗口 |
| Unavailable | 不可用 | Required evidence or provider unavailable / 证据或服务不可用 |
| Simulated | 模拟结果 | Model output under explicit assumptions / 明确假设下的模型输出 |
| AI Interpretation | AI 解读 | Model-generated synthesis, separately labeled / 独立标识的模型解读 |

## Module methods / 模块方法

- Atlas: [ATLAS_METHOD.md](./ATLAS_METHOD.md), [ATLAS_DATA_MODEL.md](./ATLAS_DATA_MODEL.md)
- Radar: [RADAR_METHOD.md](./RADAR_METHOD.md), [RADAR_SCORE_METHOD.md](./RADAR_SCORE_METHOD.md)
- Ecosystems: [ECOSYSTEMS_METHOD.md](./ECOSYSTEMS_METHOD.md), [ECOSYSTEMS_HEALTH_METHOD.md](./ECOSYSTEMS_HEALTH_METHOD.md), [ECOSYSTEMS_NETWORK_METRICS.md](./ECOSYSTEMS_NETWORK_METRICS.md)
- Policy: [POLICY_METHOD.md](./POLICY_METHOD.md), [POLICY_COMPARISON_METHOD.md](./POLICY_COMPARISON_METHOD.md), [POLICY_SCENARIO_METHOD.md](./POLICY_SCENARIO_METHOD.md)
- Organizations: [ORGANIZATIONS_METHOD.md](./ORGANIZATIONS_METHOD.md), [ORGANIZATION_COMPARISON_METHOD.md](./ORGANIZATION_COMPARISON_METHOD.md)
- Public data: [DATA_PROVENANCE.md](./DATA_PROVENANCE.md), [DATA_QUALITY.md](./DATA_QUALITY.md), [DATA_FRESHNESS.md](./DATA_FRESHNESS.md), [DATA_LICENSE_AUDIT.md](./DATA_LICENSE_AUDIT.md)
- NEXORA AI: [AI_GROUNDING.md](./AI_GROUNDING.md), [AI_RETRIEVAL.md](./AI_RETRIEVAL.md), [AI_CITATIONS.md](./AI_CITATIONS.md), [AI_RESPONSE_POLICY.md](./AI_RESPONSE_POLICY.md)
- Simulator: [SYSTEM_DYNAMICS_MODEL.md](./SYSTEM_DYNAMICS_MODEL.md), [SCENARIO_ASSUMPTIONS.md](./SCENARIO_ASSUMPTIONS.md), [SENSITIVITY_ANALYSIS.md](./SENSITIVITY_ANALYSIS.md), [SIMULATION_UNCERTAINTY.md](./SIMULATION_UNCERTAINTY.md)

For present coverage boundaries, see [NEXORA_CURRENT_LIMITATIONS.md](./NEXORA_CURRENT_LIMITATIONS.md).
