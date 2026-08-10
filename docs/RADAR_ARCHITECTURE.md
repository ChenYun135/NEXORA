# Radar Architecture / Radar 架构

NEXORA Radar is a dedicated `/radar` product surface built on the existing application, localization, provenance, demo-data, and provider boundaries. No foundation architecture was replaced.

NEXORA Radar 是建立在现有应用、双语、来源追踪、演示数据与 Provider 边界之上的独立 `/radar` 产品界面，没有替换任何基础架构。

## Layers / 分层

- `domain/radar.ts`: signal, technology, score, confidence, evidence, time, and snapshot contracts.
- `data/demo/radar.ts`: industries, technologies, signal observations, time series, evidence, and score configuration.
- `lib/radar-score.ts`: pure score normalization, missing-data, and filtering logic.
- `components/radar.tsx`: localized interaction orchestration only; no score formulas or embedded datasets.
- `components/radar.module.css`: radial projection, analytical layout, mobile list/bottom-sheet, and reduced motion.
- `app/radar/page.tsx`: route and social metadata.

The radial field uses maturity as radial distance: established technologies sit near the center and earlier, more uncertain technologies sit toward the frontier. Industry families define angular sectors. Node size represents composite momentum; node mark, border style, label, and text express direction and confidence without relying only on color.

径向距离表示技术成熟度：成熟技术靠近中心，更早期、更不确定的技术靠近外圈；产业家族决定角度扇区。节点大小表示综合动能，方向与置信度同时通过符号、边框、标签与文字表达，避免只依赖颜色。

Mobile does not shrink the desktop radar mechanically. It replaces technology nodes with a compact keyboard-accessible list and presents intelligence in a bottom sheet.
