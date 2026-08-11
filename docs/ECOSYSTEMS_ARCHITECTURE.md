# Ecosystems Architecture / 创新生态架构

Sprint 4 adds a standalone `/ecosystems` product surface without replacing Atlas or Radar. The page is assembled from four boundaries: typed domain records in `domain/ecosystems.ts`, structured demo graphs in `data/demo/ecosystems.ts`, pure graph and scoring functions in `lib/ecosystem-graph.ts`, and the interactive client view in `components/ecosystems.tsx`.

Sprint 4 新增独立的 `/ecosystems` 产品界面，不替换 Atlas 或 Radar。架构分为四层：领域类型、结构化演示图谱、纯函数图算法与评分、交互式客户端视图。

The renderer is a deterministic DOM/CSS network rather than a canvas-only black box. It supports pointer pan, bounded zoom, role/industry/geography grouping, layer filters, relationship filters, flow modes, Focus Mode, one/two-hop neighborhoods, and an accessible text relationship list. Reduced-motion users receive a static experience.

URL context is accepted through `region`, `industry`, `technology`, `layer`, and `node` query parameters. Atlas and Radar link into these parameters; Ecosystems links back to region and technology intelligence.

Production evolution is expected to preserve the domain boundary while replacing demo providers. Temporal snapshots and graph-database adapters can be added behind the same graph contract; they are not implemented in Sprint 4.

