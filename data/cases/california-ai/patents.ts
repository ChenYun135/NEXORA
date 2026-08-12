export const californiaAIPatentStatus = {
  provider: "USPTO Open Data Portal",
  status: "NOT_CONFIGURED" as const,
  recordCount: null,
  note: { en: "Production access is not configured. Live ingestion is disabled and no fixture or Demo count is promoted as evidence.", zh: "尚未配置生产访问。实时采集已停用，且不会将 fixture 或 Demo 计数晋级为证据。" },
  officialUrl: "https://data.uspto.gov/apis/patent-file-wrapper/application-data",
};

export const californiaAIPatentTaxonomy = {
  version: "ca-ai-patent-taxonomy-v1.0",
  status: "FIXTURE_TESTED_NOT_LIVE" as const,
  include: ["G06N3/00", "G06N5/00", "G06N7/00", "G06N20/00", "G06F18/00"],
  exclude: ["records whose only match is an applicant or assignee name containing AI"],
  caution: "Classification families overlap and do not by themselves establish California inventive activity; inventor/assignee geography requires a separate documented rule.",
} as const;
