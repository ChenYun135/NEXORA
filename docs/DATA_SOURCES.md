# Data Sources / 数据来源

Sprint 2 still uses structured prototype records under `data/demo/`. No live external API is required by the interface and every prototype index is visibly labeled as Demo Data. Sprint 2 仍使用 `data/demo/` 下的结构化原型记录；界面不依赖外部实时 API，所有原型指数均明确标记为“演示数据”。

## Future provider mapping / 未来数据源映射

| Provider | Intended records | 用途 | Provenance class |
|---|---|---|---|
| OpenAlex | papers, institutions, topics, citations | 论文、机构、主题、引用 | Observed public data |
| USPTO Open Data | patents, applicants, technology classifications | 专利、申请机构、技术分类 | Observed public data |
| World Bank Open Data | country economic and innovation indicators | 国家级经济与创新指标 | Observed public data |
| Data.gov | reusable United States public datasets | 美国公共数据集 | Observed public data |
| Official government portals | policy documents and programs | 政策文件与公共计划 | Observed public data |
| Official universities | public institution and research information | 大学与科研机构公开信息 | Observed public data |
| Official company sources | public company information only | 仅限企业公开信息 | Observed public data |

Production providers will normalize records behind the interfaces in `services/providers.ts`. Every imported source retains its canonical URL, publisher, source type, retrieval date, license where available, geography, and time coverage. Derived indicators document methodology; composite scores disclose their components; AI interpretations remain separate.

生产数据将通过 `services/providers.ts` 中的接口标准化。每条来源记录保留权威链接、发布机构、来源类型、获取日期、适用许可、地理范围和时间范围。衍生指标必须记录方法，综合评分必须披露组成，AI 解读必须保持独立。

NEXORA does not ingest personal or sensitive data and does not create person-level innovation scoring. NEXORA 不采集个人或敏感数据，也不进行个人层面的创新评分。
