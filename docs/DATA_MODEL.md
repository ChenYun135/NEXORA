# Data Model / 数据模型

Core entities are Industry, Technology, Company, University, ResearchPaper, Patent, Policy, Investor, Organization, City, Region, Country, Metric, Signal, Source, and Relationship.

核心实体包括产业、技术、公司、大学、论文、专利、政策、投资机构、组织、城市、地区、国家、指标、信号、来源与关系。

Representative edges: Technology → Industry; Company → Technology; University/ResearchPaper/Patent → Technology; Policy → Industry; Investor → Company; Company → City → Region. Each factual relationship supports provenance. See `domain/models.ts` for executable TypeScript contracts.
