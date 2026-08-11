# Policy Data Model / 政策数据模型

`PolicyRecord` separates identity, jurisdiction, taxonomy, dates, mechanisms, targets, funding, provenance, evidence, confidence, timeline, cross-module links, uncertainty, and demo status.

Key supporting types include `PolicyJurisdiction`, `PolicySource`, `PolicyEvidence`, `PolicyConfidence`, `PolicyTimelineEvent`, `PolicySignal`, `PolicyFundingMechanism`, `PolicyComparisonConfig`, and `PolicySnapshot`.

资金金额允许为 `null`。若金额缺失，币种也必须为 `null`；缺失数据不会转换为零。资金阶段保留 Announced、Authorized、Appropriated、Awarded 与 Unknown 的差异。原币种保持不变，Sprint 5 不进行汇率换算。

Many-to-many policy links use stable industry, technology, organization, target, region, and ecosystem identifiers. Status is typed and never inferred from an old document. Production records must obtain current legal status from authoritative sources.

