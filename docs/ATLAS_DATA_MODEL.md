# Atlas Data Model / Atlas 数据模型

`AtlasHotspot` represents an innovation ecosystem with a bilingual name and overview, country, coordinates, regional zone, industry strengths, metrics, technologies, universities, representative organizations, policies, and signals.

`AtlasHotspot` 表示一个创新生态，包含双语名称与概述、国家、坐标、区域分组、产业优势、指标、技术、大学、代表性组织、政策与信号。

`AtlasMetric` extends the core metric contract and requires geography, time period, methodology, derived status, confidence, notes, and provenance. Prototype metrics also carry `isDemo: true`. Production metrics will distinguish:

- Observed Public Data / 公共观测数据
- Derived Metric / 衍生指标
- NEXORA Composite Score / NEXORA 综合评分
- AI Interpretation / AI 解读

Geographic and organizational records remain aggregate and public. Person-level data and person-level innovation scores are outside the model.
