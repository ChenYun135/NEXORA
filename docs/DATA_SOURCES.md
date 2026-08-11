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

## Radar signal mapping / Radar 信号映射

| Radar category | Candidate public source | 未来公共数据源 |
|---|---|---|
| Research | OpenAlex | 论文、主题、机构与引用 |
| Patents | USPTO Open Data; future official international patent sources | 专利与技术分类 |
| Economic context | World Bank, Data.gov, official national statistics | 经济与创新背景 |
| Policy | Official government agencies | 政策文件与公共计划 |
| Institutions | Official university sources | 机构级公开科研信息 |
| Companies | Official company disclosures only | 仅限企业官方公开信息 |

Sprint 3 does not perform broad live ingestion or scrape private profiles. Provider integrations remain isolated from visualization components and must support fallback, caching, rate-limit handling, and complete provenance before activation.

## Ecosystems relationship mapping / 创新生态关系映射

Sprint 4 uses only structured demo relationships. Future production mapping may use OpenAlex for public research collaboration; USPTO for public patent relationships; NSF, NIH, DOE, and SBIR/STTR records for public grants and programs; official policy portals for policy support; official university pages for public institutional programs; and official corporate press releases or regulatory filings for disclosed partnerships. World Bank, Data.gov, and official statistics may provide regional context.

Sprint 4 仅使用结构化演示关系。未来生产映射可使用 OpenAlex 的公开科研合作、USPTO 的公开专利关系、NSF / NIH / DOE / SBIR-STTR 的公共资助与项目记录、官方政策门户、大学官方网站，以及企业官方新闻稿或监管披露中的公开合作信息。

No private-person profiles, contact details, inferred personal relationships, browser data, or sensitive records are permitted. Every production edge must retain source URL, publisher, retrieval date, observation period, evidence status, and confidence. Snapshot identifiers and validity periods are reserved for future longitudinal evolution analysis.

## Policy source roadmap / 政策来源路线图

Sprint 5 does not perform live policy ingestion. It uses policy-style demo records behind `PolicyDataProvider`. Future primary-source mapping may include:

- United States: Congress.gov, Federal Register, White House, NSF, DOE, NIST, SBA, Department of Commerce, and official CHIPS program sources.
- California: CA.gov, California Energy Commission, Governor's Office, GO-Biz, and official state agencies.
- European Union: EUR-Lex, European Commission, Horizon Europe, and official Digital Strategy sources.
- United Kingdom: GOV.UK, UKRI, and official departments.
- China: State Council, MIIT, NDRC, MOST, and official government sources.
- Singapore: gov.sg, EDB, A*STAR, and official agencies.
- Japan: METI, MEXT, Cabinet Office, and official sources.
- South Korea: MOTIE, MSIT, and official sources.

Production ingestion belongs to Sprint 7. Every imported policy record must preserve legal-status evidence, canonical source URL, document identifiers, jurisdiction, publication and effective dates, language, funding stage, original currency, retrieval time, confidence inputs, and evidence state. No private political, business, or individual data is permitted.
