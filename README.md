# NEXORA

**Evidence-based future-industry intelligence / 基于证据的未来产业情报**

NEXORA connects public data, geography, emerging signals, innovation networks, policy, organizations, evidence-grounded AI synthesis, and transparent scenarios.

NEXORA 连接公共数据、产业地理、新兴信号、创新网络、政策、组织、循证 AI 综合与透明情景模型。

![NEXORA public dashboard](public/readme/nexora-home.png)

![NEXORA Data Status](public/readme/nexora-data-status.png)

## Public product

- `/data-status` — provider coverage, provenance, freshness, quality, and license status
- `/atlas` — geographic context with explicit evidence modes
- `/radar` — emerging-signal exploration with clearly labeled Demo and Derived values
- `/ecosystems` — organization-level network views without private contacts
- `/policy` — official-policy context without legal advice or causal claims
- `/companies` — public organization intelligence without personal profiling
- `/ai` — deterministic, evidence-first synthesis with citations and refusal boundaries
- `/simulator` — transparent scenarios under explicit assumptions, not predictions

## Trust model

NEXORA keeps Public Data, Normalized, Derived, Composite, Demo, Simulated, AI Interpretation, Unavailable, Degraded, Stale, and Not Configured states distinct. Missing evidence is never replaced with fabricated or zero values.

Public methods and limitations are summarized in [METHODOLOGY_PUBLIC.md](docs/METHODOLOGY_PUBLIC.md) and [DATA_ARCHITECTURE_PUBLIC.md](docs/DATA_ARCHITECTURE_PUBLIC.md).

## Technology

The public product uses React 19, TypeScript, vinext/Vite, Cloudflare-compatible server rendering, typed domain and data layers, deterministic retrieval and scoring, and a transparent system-dynamics engine. See [ARCHITECTURE_PUBLIC.md](docs/ARCHITECTURE_PUBLIC.md).

## Local development

Requirements: Node.js `>=22.13.0`.

```bash
npm ci
npm run dev
npm run typecheck
npm run lint
npm test
```

Copy `.env.example` to `.env.local` only for optional server-side providers. Never expose credentials through `NEXT_PUBLIC_*` variables.

## Public repository boundary

This repository contains released product source and public-facing documentation only. Unpublished research, internal analysis, review material, credentials, private datasets, local databases, deployment metadata, and caches are excluded.

## License, security, and privacy

- Application code: [MIT License](LICENSE)
- Security: [SECURITY.md](SECURITY.md) and [SECURITY_PUBLIC.md](docs/SECURITY_PUBLIC.md)
- Contributions: [CONTRIBUTING.md](CONTRIBUTING.md)
- Privacy and terms: [PRIVACY_PUBLIC.md](docs/PRIVACY_PUBLIC.md) and [TERMS_PUBLIC.md](docs/TERMS_PUBLIC.md)

Third-party datasets, fonts, and marks remain subject to their own terms. NEXORA is an exploration product, not an investment, legal, regulatory, or forecasting service.
