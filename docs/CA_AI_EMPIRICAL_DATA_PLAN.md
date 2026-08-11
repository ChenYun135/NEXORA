# California AI Empirical Data Plan v2 / 加州 AI 实证数据计划 v2

Status: implemented private research snapshot, 2026-08-11. / 状态：已实现的私有研究快照，2026-08-11。

## Measurement layers / 测量层

| Construct / 构念 | Provider | Status | Rule |
|---|---|---|---|
| Research activity / 科研活动 | OpenAlex | observed | AI subfield 1702; 2015–2026; 2026 partial |
| Institution frame / 机构框架 | OpenAlex | observed | top 200 U.S. AI institutions in complete years, then `geo.region=California` |
| Collaboration / 协作 | OpenAlex | derived | explicit two-institution AND filters; positive pairs only |
| AI-adjacent talent / AI 邻近人才 | BLS OEWS | observed | San Jose MSA, May 2025, five SOC indicators |
| Public funding / 公共资金 | NSF | observed | 2025 California awards, deduplicated ID, title taxonomy |
| Patents / 专利 | USPTO ODP | not configured | live only with server secret `USPTO_API_KEY` |
| Entrepreneurship / 创业 | Census BFS | limited | general context cannot be relabeled as AI startups |
| Capital / 资本 | — | unavailable | no source passed legal and measurement gate |

All promotion is aggregate or award-level public metadata. Raw works, PI contacts, people profiles and secrets are excluded. / 晋级内容仅为聚合或公开奖项元数据；排除原始成果、PI 联系信息、个人画像与密钥。
