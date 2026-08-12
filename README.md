# NEXORA

**Evidence-based future-industry intelligence / 鍩轰簬璇佹嵁鐨勬湭鏉ヤ骇涓氭儏鎶?*

NEXORA connects public data, geography, emerging signals, innovation networks, policy, organizations, evidence-grounded AI synthesis, and transparent scenarios. It is a research and exploration product鈥攏ot an investment, legal, regulatory, or forecasting service.

NEXORA 杩炴帴鍏叡鏁版嵁銆佷骇涓氬湴鐞嗐€佹柊鍏翠俊鍙枫€佸垱鏂扮綉缁溿€佹斂绛栥€佺粍缁囥€佸惊璇?AI 缁煎悎涓庨€忔槑鎯呮櫙妯″瀷銆傛湰椤圭洰鐢ㄤ簬鐮旂┒涓庢帰绱紝涓嶆瀯鎴愭姇璧勩€佹硶寰嬨€佺洃绠℃垨棰勬祴鏈嶅姟銆?
![NEXORA public release candidate dashboard](public/readme/nexora-home.png)

| Evidence trust center | California AI flagship case |
|---|---|
| ![NEXORA Data Status](public/readme/nexora-data-status.png) | ![NEXORA California AI case](public/readme/nexora-california-ai.png) |

## Public release candidate 1.0

- `/data-status` 鈥?provider coverage, provenance, freshness, quality, and license status
- `/atlas` 鈥?geographic context with explicit evidence modes
- `/radar` 鈥?emerging-signal exploration; composite scores are labeled Demo or Derived
- `/ecosystems` 鈥?organization-level network views; no people graph or private contacts
- `/policy` 鈥?official-policy context; no legal advice or causal impact claims
- `/companies` 鈥?public organization intelligence; no personal profiling
- `/ai` 鈥?deterministic, evidence-first synthesis with citations and refusal boundaries
- `/simulator` 鈥?scenario outputs under explicit assumptions; simulation is not prediction
- `/cases/california-ai` 鈥?a selected California AI evidence panel, not a statewide census

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

This source tree may coexist with private research work locally, but a public repository must be created only from the sanitized `.public-release/` candidate. Paper manuscripts, peer-review material, unpublished analysis, checkpoints, credentials, local databases, deployment metadata, and caches are excluded by design. See [PAPER01_PUBLIC_PRIVATE_BOUNDARY.md](docs/public-release/PAPER01_PUBLIC_PRIVATE_BOUNDARY.md).

## Reuse, security, and citation

- Application code: [MIT License](LICENSE); third-party datasets, fonts, and marks remain under their own terms.
- Security: [SECURITY.md](SECURITY.md) and [SECURITY_PUBLIC.md](docs/SECURITY_PUBLIC.md)
- Contributions: [CONTRIBUTING.md](CONTRIBUTING.md)
- Citation metadata: [CITATION.cff](CITATION.cff)
- Privacy and public-use disclaimer: [PRIVACY_PUBLIC.md](docs/PRIVACY_PUBLIC.md), [TERMS_PUBLIC.md](docs/TERMS_PUBLIC.md)

Version: `1.0.0` public release candidate. No DOI or public repository URL is claimed until an authorized release exists.

## Roadmap

The next authorized action is publication of this audited candidate鈥攏ot a new Sprint or major feature. Later work may add validated providers, production performance monitoring, and a DOI-backed archival release, but only with the same provenance, licensing, privacy, and missing-data gates. Live demo URL: **pending explicit public-access authorization**.

