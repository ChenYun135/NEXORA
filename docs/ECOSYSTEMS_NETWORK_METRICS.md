# Ecosystems Network Metrics / 创新生态网络指标

## Degree centrality / 度中心性

For node `v`, normalized degree centrality is `deg(v) / (n - 1)`. It measures the share of visible nodes directly adjacent to `v`. Multiple typed edges between the same pair count as one adjacency in this metric.

## Betweenness centrality / 中介中心性

The implementation uses the unweighted Brandes algorithm on the visible undirected adjacency graph. For each source it performs breadth-first shortest-path discovery, counts equal shortest paths, and accumulates dependency scores backward. The final score uses the undirected normalization factor `1 / ((n - 1)(n - 2))` after ordered-source accumulation.

This metric identifies possible bridge nodes; it does not establish causality, influence, or commercial importance. Direction, relationship strength, and confidence are not used as path weights in Sprint 4.

## Neighborhood and integrity / 邻域与完整性

Focus Mode uses breadth-first one-hop or two-hop neighborhoods. Integrity checks cover missing endpoints, self-relations, duplicates, missing evidence for non-demo edges, and invalid region references. All metrics are derived and labeled accordingly.

