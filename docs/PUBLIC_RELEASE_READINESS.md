# NEXORA Public Release Readiness / 公开发布准备度

Current decision: **NOT READY FOR PUBLIC RELEASE — KEEP PRIVATE / 暂不适合公开发布，保持私有**.

This checklist is a future release gate. It does not authorize a sharing change.

## Data / 数据

- [ ] Replace or clearly scope remaining Demo datasets on public-facing paths.
- [ ] Establish monitored refresh SLAs and incident ownership for each production provider.
- [ ] Configure or explicitly remove unsupported USPTO expectations.
- [ ] Validate the California AI flagship case with documented source-level provenance.

## Legal and licensing / 法律与许可

- [ ] Complete counsel review of licenses, attribution, terms and derived-data reuse.
- [ ] Publish terms of use, acceptable-use policy and advice disclaimers.
- [ ] Review every outbound source and OG asset for public distribution rights.

## Privacy and security / 隐私与安全

- [x] No private people graph or personal profiles in the current private build.
- [x] No client-side API keys or provider tokens found in the integration audit.
- [ ] Complete production threat model, dependency/security scan and incident response exercise.
- [ ] If AI is enabled, keep credentials server-side and add abuse, cost and retention controls.

## Product trust / 产品可信度

- [x] Canonical Public, Normalized, Derived, Composite, Demo, Stale, Unavailable, Simulated and AI states are documented.
- [x] Simulation is labeled as non-predictive.
- [ ] Run independent domain review of scoring, policy and simulation methods.
- [ ] Publish change logs and methodology version history.

## Accessibility, localization and operations / 可访问性、本地化与运维

- [x] Major routes have bilingual UI, keyboard focus and reduced-motion handling.
- [ ] Complete formal WCAG 2.2 AA audit with assistive-technology users.
- [ ] Add production observability, error budgets, rollback drills and support workflow.
- [ ] Approve public analytics/cookie behavior and corresponding notice, if any.

## Release gate / 发布门槛

Public sharing requires explicit owner authorization after all blocking boxes are complete, P0/P1 defects are zero, source licensing is approved, and a final security/privacy review passes. Until then, Sites access must remain **Private / Owner-only**.
