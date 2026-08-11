# NEXORA Post-Sprint Integration Audit 1

Date: **2026-08-10**  
Release: **Post-Sprint Integration v1**  
Scope: nine completed sprints; no Sprint 10 created  
Deployment target: existing **Private / Owner-only** Sites project

## Executive result / 审计结论

Status: **PASS FOR PRIVATE OWNER-ONLY PREVIEW / 通过私有预览验收**.

The integrated product story is now: **Public Data → Atlas → Radar → Ecosystems → Policy → Organizations → NEXORA AI → Simulator**. All requested routes render in English and Chinese, trust states remain explicit, contextual handoffs are restored, and automated plus browser QA passes. Public release remains blocked by the separate checklist.

产品主线现统一为：**公共数据 → 产业图谱 → 机会雷达 → 创新生态 → 政策 → 组织 → NEXORA AI → 情景模拟**。全部要求路由支持中英文，数据可信度状态保持明确，上下文交接已恢复，自动化与浏览器 QA 通过。公开发布仍由独立清单阻止。

## Route audit / 路由审计

| Route | EN/ZH | Trust/empty/error | Context handoff | Responsive |
| --- | --- | --- | --- | --- |
| `/` | Pass | Demo KPI strip; no fake live coordinates | Eight-step journey | 1440/768/390/320 pass |
| `/atlas` | Pass | Demo metrics and evidence panel | region, industry, technology | Pass |
| `/radar` | Pass | Demo composite, missing evidence | region, technology | Pass |
| `/ecosystems` | Pass | Demo relationships and evidence status | region, industry, technology, layer, node | Pass |
| `/policy` | Pass | fact/derived/interpretation separation | jurisdiction, industry, technology, policy | Pass |
| `/companies` | Pass | Demo entity vs verified identity | organization, industry, technology, region, ecosystem | Pass |
| `/companies/[id]` | Pass | Intentional bilingual not-found | stable organization ID | Pass |
| `/data-status` | Pass | Provider, freshness, quality, license, AI and simulator status | source-of-truth route | Pass |
| `/ai` | Pass | grounded citations, gaps, refusals | query + module context | Pass |
| `/simulator` | Pass | simulated, assumptions, sensitivity, uncertainty | preset + module context | Pass |
| unknown route | Pass | Intentional bilingual 404 | return-home/data-status links | Pass |

## Issue classification / 问题分级

### P0

- Found: **0**. Fixed: **0**. Open: **0**.

### P1

- Found: **4**. Fixed: **4**. Open: **0**.
  1. Atlas/Radar query handoffs produced URLs but did not restore destination state.
  2. Language choice did not persist across routes and the document language could become semantically incorrect.
  3. Home trust strip/sidebar and navigation text overlapped at desktop breakpoints.
  4. vinext RSC Link navigation emitted runtime errors; shared internal navigation now uses standard semantic anchors and the fresh-console click test is clean.

### P2

- Found: **9**. Fixed: **9**. Open: **0** in this release: home story/order, false-live visual metadata, canonical terminology registry, metadata naming, global 404, AI provider status, 390/320 layout, mobile menu ARIA state, and missing documentation/release gates.
- Deferred P2 debt is separately registered in [TECHNICAL_DEBT.md](./TECHNICAL_DEBT.md); it is not a regression or private-preview blocker.

### P3

- Deferred: route-level CSS/token duplication and gradual copy-dictionary extraction. Both are documented and intentionally excluded from this integration sprint.

## Trust and runtime audit / 可信度与运行状态

- OpenAlex: **HEALTHY**, production pilot observations.
- World Bank: **HEALTHY**, country-level production context.
- Data.gov: **DEGRADED**, last-known-good snapshot retained.
- USPTO: **NOT CONFIGURED**, never converted to zero patent evidence.
- Official policies/organizations: bounded verified pilot; no implied verification of all activity.
- NEXORA AI provider: **NOT CONFIGURED**; deterministic evidence-first fallback available.
- Simulator: model v1, **PARTIALLY CALIBRATED**; simulation is not prediction.
- Home KPIs, most ecosystem edges and analytical indices: **Demo Data**, explicitly labeled.

## QA evidence / QA 证据

- Build: pass.
- TypeScript: pass, zero errors.
- ESLint: pass, zero errors/warnings.
- Automated tests: **106 passed, 0 failed**.
- New product integration unit tests: **5**.
- New rendered integration checks: **4** (bilingual 404, home trust story, metadata consistency, persistent language architecture).
- Browser route matrix: all requested routes checked at 1440×900, 768×1024, 390×844 and 320×740; no horizontal overflow.
- Browser interactions: Home → Atlas → Data Status clicks pass; Atlas/Radar query restoration passes; NEXORA AI grounded result renders; Simulator run returns a reproducibility hash with sensitivity and uncertainty.
- Browser console: zero warnings/errors in a fresh post-fix click flow.
- Accessibility: one H1 on Home, zero duplicate IDs, zero unlabeled visible controls, zero negative-tab-index visible controls, visible focus outline, semantic status text and native controls.
- Reduced motion: active media rules verified in built browser CSS and route styles.
- Dependency audit: `npm audit --omit=dev` reports **0 vulnerabilities**.
- Source/client secret scan: **0 key-like secrets**; only `.env.example` exists.
- Client bundle observation: largest shared chunk is React/framework (~190 KB uncompressed); largest route chunks remain below ~55 KB uncompressed in the audited build. No secret-like material found.

## Privacy, licensing and architecture / 隐私、许可与架构

- No personal files, private people data, browser data or unrelated project data were introduced.
- No secrets were added; future provider credentials must remain server-side Sites secrets.
- [DATA_LICENSE_AUDIT.md](./DATA_LICENSE_AUDIT.md) remains current; no source or license scope changed in this audit.
- The nine-sprint architecture, route set, canonical data models and `.openai/hosting.json` project identity remain intact.
- Removed dead generic `app/[module]` preview route; replaced it with a real global 404.
- Dependencies added/removed: **none**.

## Acceptance criteria / 验收标准

All 48 Post-Sprint 01 acceptance criteria pass for the private Owner-only release. P0 = 0, P1 = 0, build/type/lint/tests/security/client scan pass, English/Chinese and responsive QA pass, and no Sprint 10 was created. Public release readiness is deliberately **not** approved; see [PUBLIC_RELEASE_READINESS.md](./PUBLIC_RELEASE_READINESS.md).
