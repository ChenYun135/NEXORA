# Policy Architecture / 政策智能架构

Sprint 5 adds a static `/policy` product route while preserving the existing Foundation, Atlas, Radar, and Ecosystems modules. The implementation uses four boundaries: typed concepts in `domain/policy.ts`, UI-independent demo records and configurations in `data/demo/policy.ts`, pure filtering/validation/comparison functions in `lib/policy-intelligence.ts`, and the client experience in `components/policy-intelligence.tsx`.

Sprint 5 新增独立的 `/policy` 产品路由，同时保留既有模块。架构分为政策领域类型、UI 无关演示数据、纯函数分析层与交互界面四层。

Cross-module navigation uses stable query identifiers: `jurisdiction`, `industry`, `technology`, and `policy`. No graph engine, document database, user account, alert service, or live provider was added. The `PolicyDataProvider` contract reserves production integration behind the service boundary for Sprint 7.

The page uses native HTML/CSS for its matrix, timeline, comparison, instrument bars, and conceptual pathway. This keeps the route lightweight and provides semantic fallbacks without visualization dependencies.

