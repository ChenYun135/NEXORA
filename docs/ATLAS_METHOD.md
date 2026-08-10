# Atlas Method / Atlas 方法

Sprint 2 values are synthetic demonstration indices on a 0–100 scale. They are designed to test filtering, relative intensity, regional profiles, comparison, bilingual labels, and provenance UI. They must not be cited as real-world findings.

Sprint 2 的数值均为 0–100 范围的合成演示指数，用于测试筛选、相对强度、区域画像、比较、双语标签与来源界面，不得作为真实世界研究结论引用。

## Proposed production sequence / 建议生产流程

1. Retrieve observed public records from approved providers.
2. Normalize geography, entity identity, time period, and technology classification.
3. Record source URL, source type, retrieval time, license, and coverage.
4. Calculate documented derived metrics without overwriting source facts.
5. Normalize only comparable indicators and expose uncertainty.
6. Build transparent composites with published weights and sensitivity checks.
7. Keep AI interpretation in a separately labeled layer with citations.

1. 从批准的公共数据源获取观测记录；
2. 标准化地理、实体身份、时间区间与技术分类；
3. 保存来源链接、类型、获取时间、许可与覆盖范围；
4. 依据文档化方法计算衍生指标，且不覆盖来源事实；
5. 仅标准化具有可比性的指标，并展示不确定性；
6. 使用公开权重和敏感性检查构建透明综合评分；
7. 将带引用的 AI 解读保留在独立标识层。

Prototype confidence is fixed at 55% to make its non-production status explicit. A production confidence model should combine coverage, recency, source authority, geographic resolution, and methodological stability.
