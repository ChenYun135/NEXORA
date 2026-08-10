# Radar Data Model / Radar 数据模型

The Radar domain adds `EmergingIndustry`, `EmergingTechnology`, `SignalCategory`, `SignalObservation`, `MomentumMetric`, `OpportunityScore`, `OpportunityDimension`, `TechnologyStage`, `TrendDirection`, `EvidenceRecord`, `TimeSeriesPoint`, `IndustryRegionRelationship`, `RadarSnapshot`, `RadarMethodology`, and `ConfidenceAssessment`.

Radar 领域层新增新兴产业、新兴技术、信号类别、信号观测、动能指标、机会评分、评分维度、技术阶段、趋势方向、证据记录、时间序列、产业区域关系、快照、方法与置信度模型。

## Missing data / 缺失数据

Metric values are `number | null`. `null` means unavailable evidence and is never converted to zero. The score result exposes both `missing` dimensions and `availableWeight`. If every configured dimension is missing, the score is `null`.

指标值为 `number | null`。`null` 表示证据不可用，绝不转换为零。评分结果同时公开缺失维度与可用权重；若全部配置维度缺失，评分返回 `null`。

## Evidence / 证据

Every observation supports source identity, public source type, URL, title, publication/retrieval dates, geography, time period, metric key, observation type, methodology, confidence, derivation status, and demo status. No private or person-level data is modeled.
