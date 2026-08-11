# Entity Resolution / 实体解析

Exact external ID or official domain produces `EXACT`; normalized official name plus country produces `HIGH`; name-only similarity never merges. MEDIUM/LOW/UNRESOLVED candidates require manual review. Aliases belong to one canonical entity. Conflicts preserve both source records and source-priority reasoning.
