# NEXORA

**Evidence-based future-industry intelligence / 基于证据的未来产业情报**

NEXORA connects public data, geography, emerging signals, innovation networks, policy, organizations, evidence-grounded AI synthesis, and transparent scenarios. It is a research and exploration product—not an investment, legal, regulatory, or forecasting service.

NEXORA 连接公共数据、产业地理、新兴信号、创新网络、政策、组织、循证 AI 综合与透明情景模型。本项目用于研究与探索，不构成投资、法律、监管或预测服务。

![NEXORA public release candidate dashboard](public/readme/nexora-home.png)

| Evidence trust center | California AI flagship case |
|---|---|
| ![NEXORA Data Status](public/readme/nexora-data-status.png) | ![NEXORA California AI case](public/readme/nexora-california-ai.png) |

## Public release candidate 1.0

- `/data-status` — provider coverage, provenance, freshness, quality, and license status
- `/atlas` — geographic context with explicit evidence modes
- `/radar` — emerging-signal exploration; composite scores are labeled Demo or Derived
- `/ecosystems` — organization-level network views; no people graph or private contacts
- `/policy` — official-policy context; no legal advice or causal impact claims
- `/companies` — public organization intelligence; no personal profiling
- `/ai` — deterministic, evidence-first synthesis with citations and refusal boundaries
- `/simulator` — scenario outputs under explicit assumptions; simulation is not prediction
- `/cases/california-ai` — a selected California AI evidence panel, not a statewide census

## Trust model

NEXORA keeps these states distinct: **Public Data, Normalized, Derived, Composite, Demo, Simulated, AI Interpretation, Unavailable, Degraded, Stale, and Not Configured**. Missing evidence remains unavailable; it is never replaced with fabricated or zero values.

Start with the in-product **Data Status** page. Public methods and limitations are summarized in [METHODOLOGY_PUBLIC.md](docs/METHODOLOGY_PUBLIC.md) and [DATA_ARCHITECTURE_PUBLIC.md](docs/DATA_ARCHITECTURE_PUBLIC.md).

The selected public evidence layers currently reference OpenAlex, World Bank, Data.gov, NSF, BLS, and official policy/organization sources. USPTO remains **Not Configured** and unsupported patent indicators remain unavailable. Provider terms and attribution are documented in the public license audit.

## Architecture and technology

The public product uses React 19, TypeScript, vinext/Vite, Cloudflare-compatible server rendering, typed domain/data layers, deterministic retrieval and scoring, and a transparent system-dynamics engine. See [ARCHITECTURE_PUBLIC.md](docs/ARCHITECTURE_PUBLIC.md) for the route-to-evidence flow. The public candidate requires no database or live AI provider to demonstrate core behavior.

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
```

Copy `.env.example` to `.env.local` only if optional server-side providers are needed. Never use `NEXT_PUBLIC_*` for credentials. The default public demo does not require a secret.

## Repository boundary

This source tree may coexist with private research work locally, but a public repository must be created only from the sanitized `.public-release/` candidate. Paper manuscripts, peer-review material, unpublished analysis, checkpoints, credentials, local databases, deployment metadata, and caches are excluded by design.

## Reuse, security, and citation

- Application code: [MIT License](LICENSE); third-party datasets, fonts, and marks remain under their own terms.
- Security: [SECURITY.md](SECURITY.md) and [SECURITY_PUBLIC.md](docs/SECURITY_PUBLIC.md)
- Contributions: [CONTRIBUTING.md](CONTRIBUTING.md)
- Citation metadata: [CITATION.cff](CITATION.cff)
- Privacy and public-use disclaimer: [PRIVACY_PUBLIC.md](docs/PRIVACY_PUBLIC.md), [TERMS_PUBLIC.md](docs/TERMS_PUBLIC.md)

Version: `1.0.0` public release candidate. No DOI or public repository URL is claimed until an authorized release exists.

## Roadmap

The next authorized action is publication of this audited candidate—not a new Sprint or major feature. Later work may add validated providers, production performance monitoring, and a DOI-backed archival release, but only with the same provenance, licensing, privacy, and missing-data gates. Live demo URL: **pending explicit public-access authorization**.

🔬 研究背景与学术价值 | Research Background

NEXORA 是一个面向研究者、学生和产业分析人员的未来产业与创新生态研究平台。

NEXORA是武汉理工大学陈云在Cal Poly Pomona访学期间围绕未来产业、创新生态和数字化研究方法开展的独立研究型数字平台项目。

平台尝试将分散于科研数据库、政府开放数据、经济统计和机构信息中的公开数据整合到统一的研究环境中，通过数据可视化、科学计量分析、创新生态分析和 AI 辅助解释，帮助研究者观察新兴技术与未来产业的发展轨迹。

在学术层面，NEXORA 重点探索以下问题：
未来产业演化：观察不同技术和产业领域随时间与地域发生的结构性变化。
区域创新生态：分析高校、科研机构、企业和区域之间的创新活动及其空间分布。
科研专业化与协作：探索机构研究优势、主题专业化及科研合作网络的演化。
机会信号识别：从科研、产业、政策和区域数据中识别值得进一步研究的新兴信号。
方法敏感性：关注数据边界、分类体系、时间窗口和分析方法如何影响研究结论。

NEXORA 的目标并不是“预测未来”，而是为研究者提供一个可探索、可比较、可追溯证据来源的研究工具。

🌍 公开数据与数据治理
NEXORA 坚持公开数据优先原则。
公共平台所使用的数据均来自公开可访问或开放许可的数据源，不依赖企业机密数据、私人数据库或未授权的个人信息。
目前平台的数据来源包括或可包括：
OpenAlex — 学术成果、研究机构、研究主题与科研合作关系
World Bank Open Data — 全球经济与发展指标
U.S. Government Open Data — 美国政府开放数据资源
U.S. Bureau of Labor Statistics (BLS) — 劳动力市场与职业发展指标
其他具有明确来源说明的公开数据

为避免用户将不同性质的数据混为一谈，NEXORA 对数据和分析结果进行明确标识：
Observed / Public Data · Derived Indicators · Demo Data · Simulated Results · AI Interpretation · Unavailable / Degraded Data
平台强调：不仅要展示结果，还要说明数据从哪里来、指标如何形成，以及结果存在什么边界。

📊 研究框架 | Research Framework
NEXORA 将未来产业研究组织为几个相互关联的分析维度：
Technology → Institutions → Regions → Ecosystems → Policy → Opportunities
平台希望帮助研究者从多个尺度理解：
一个新兴技术如何形成科研活动，
如何在机构和区域中产生专业化，
如何形成创新合作网络，
又如何进一步与产业、政策和未来机会发生联系。

🛠️ 核心功能组件 | Key Modules
🗺️ Atlas
全球与区域创新活动的空间探索，观察未来产业和创新能力的地理分布。

📡 Opportunity Radar
通过结构化指标和多维信号识别值得进一步研究的新兴技术与产业机会。

🔗 Ecosystems
探索高校、科研机构、企业与区域之间的创新关系和生态结构。

🏢 Companies
从组织层面观察企业与创新主体的相关信息和发展信号。

🏛️ Policy
整理和展示与未来产业及技术发展相关的政策背景与公共信息。

🤖 AI Intelligence
在明确数据来源和模型可用性边界的前提下，提供 AI 辅助研究解释。

🧪 Simulator
通过情景参数探索不同条件下可能出现的变化。
Scenario ≠ Prediction.
模拟结果用于研究探索，而不是确定性预测。

🔬 California AI Research Case
以加州 AI 科研机构为案例，研究科研产出、专业化与合作网络的演化，同时检验研究结果对不同测量方法和研究边界的敏感性。

🔓 开放研究 | Open Research
NEXORA 希望逐步形成一个面向研究者的开放研究环境。
项目坚持：Public Data · Transparent Methods · Reproducible Analysis · Responsible AI
公开 GitHub 仓库提供平台代码和公开研究基础设施。
NEXORA 用于科研、教学和探索性分析。
平台不提供：
Investment Advice
Legal Advice
Deterministic Forecasts
Official Government Statistics
University-Endorsed Institutional Rankings
对于重要决策，请进一步查阅原始数据来源及相关专业资料。

🚀 Project Status
NEXORA v1.0.0 — Public Release
🌐 Website:
NEXORA Public Website
💻 GitHub:
NEXORA GitHub Repository
📚 Citation
If you use NEXORA in academic research, teaching, or analytical work, please cite the project or its associated publication when formal citation information becomes available.
A recommended citation and DOI will be added in a future release.
