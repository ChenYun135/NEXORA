# NEXORA Technical Debt Register / 技术债务

Observed at **Post-Sprint Integration v1**, 2026-08-10. P0: 0. P1: 0 after integration fixes.

| Issue / 问题 | Impact / 影响 | Priority | Recommended action / 建议 |
| --- | --- | --- | --- |
| Localized copy is embedded in large route components | Copy review and translation memory are harder to maintain / 双语审校成本较高 | P2 | Extract copy dictionaries module-by-module without changing runtime behavior |
| Domain modules have separate query parsers | Supported handoffs work, but validation policy is duplicated / 参数验证策略分散 | P2 | Consolidate around a typed route-state registry |
| Global search has stable IDs but no shared index or ranker | Users search within modules rather than across the product / 尚不能跨模块搜索 | P2 | Build a federated, evidence-aware search only after a real flagship dataset exists |
| Several analytical canvases are visually dense on small screens | Text/table alternatives exist, but advanced interaction is less efficient on mobile / 小屏高级操作效率较低 | P2 | Add progressive disclosure and dedicated mobile inspection drawers |
| Demo and production records coexist in route-level presentation code | Trust labels are explicit, but future data expansion increases regression risk / 数据扩展后回归风险上升 | P2 | Enforce status types at view-model boundaries and add snapshot fixtures |
| Route-specific CSS repeats design tokens and header patterns | Visual language is consistent, but global redesigns cost more / 全局改版成本较高 | P3 | Gradually extract shared primitives after the flagship case validates patterns |
| No live AI provider is configured | AI cannot generate provider-backed synthesis / 无实时模型综合 | P3 / intentional | Configure a server-side secret only when evaluation and cost controls are approved |

Deferred items are not blockers for the current private research preview. / 以上延期项不阻塞当前私有研究预览。
