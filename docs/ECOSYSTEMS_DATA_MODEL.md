# Ecosystems Data Model / 创新生态数据模型

An `EcosystemGraph` contains one region–industry context, a snapshot date, nodes, edges, evidence, and clusters.

- Node types: university, research institution, startup, corporation, investor, government agency, technology, and public program.
- Edge types: research collaboration, technology transfer, investment, public funding, policy support, joint program, academic–industry collaboration, commercial partnership, patent relationship, knowledge flow, supply relationship, and ecosystem membership.
- Layers: research, technology, capital, policy, commercialization, talent/knowledge, and regional.
- Edge fields keep source, target, direction, strength, confidence, evidence identifiers, layer membership, time period, derivation status, and demo status separate.
- Evidence records extend the shared provenance model and add a relationship claim plus evidence type.

每张图对应一个地区—产业语境与一个时间快照。节点、关系、证据和聚类均使用稳定 ID 连接；公开事实、衍生指标和演示关系保持分离。

Graph validation rejects orphan edges, self-edges, duplicate typed relationships, non-demo relationships without evidence, and nodes with invalid region references. The current dataset contains six contexts with twelve nodes and eighteen relationships each. Organizations and relationships are representative demo records, not claims about private persons.

