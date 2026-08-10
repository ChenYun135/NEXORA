# Product Architecture / 产品架构

The application separates `domain`, `data`, `services`, `components`, routes, and visualizations. UI components consume typed data. Provider interfaces isolate future external integrations.

应用严格分离领域模型、数据、服务、组件、路由与可视化层。UI 仅消费类型化数据，未来外部数据接入由 Provider 接口隔离。

Routes: `/`, `/atlas`, `/radar`, `/companies`, `/ecosystems`, `/policy`, `/simulator`, `/ai`.

The current route shells establish stable module boundaries. Atlas is the next implementation focus. Graph-compatible entities and relationships are modeled without prematurely selecting a graph database.
