# Atlas Architecture / Atlas 架构

NEXORA Atlas is implemented as a dedicated `/atlas` product surface rather than a dashboard card. The experience is organized into five layers: localized interface, typed Atlas demo records, map projection and hotspot interaction, region intelligence, and comparative analysis.

NEXORA Atlas 作为独立的 `/atlas` 产品界面实现，而不是仪表盘中的地图卡片。系统分为五层：本地化界面、类型化 Atlas 演示记录、地图投影与热点交互、区域情报、比较分析。

## Boundaries / 边界

- `app/atlas/page.tsx`: route and metadata / 路由与元数据
- `components/atlas.tsx`: interaction orchestration / 交互编排
- `components/atlas.module.css`: visual projection and responsive behavior / 地图视觉与响应式行为
- `data/demo/atlas.ts`: hotspots, metrics, industries, representative entities / 热点、指标、产业与代表性实体
- `domain/models.ts`: provenance-ready domain contracts / 支持来源追踪的领域契约
- `services/providers.ts`: future public-data provider boundaries / 未来公共数据 Provider 边界

The map uses a lightweight CSS geographic canvas with 18 accessible hotspot controls. It avoids remote tile dependencies and renders fewer than 30 geographic nodes. The desktop side panel becomes a mobile bottom sheet. Hotspot rankings provide a text-accessible equivalent to map color and intensity.

地图采用轻量 CSS 地理画布与 18 个可访问热点控件，不依赖远程瓦片服务，地理节点少于 30 个。桌面侧边面板在移动端转换为底部情报层；热点排名为地图颜色和强度提供文本等价信息。
