export const emergingTechnologyTalentTaxonomy = {
  id: "nexora-oews-emerging-tech-v1",
  version: "1.0.0",
  status: "STAGED" as const,
  source: "BLS Standard Occupational Classification and OEWS",
  included: [
    {code:"15-2051",label:"Data Scientists",rationale:"Direct data-science occupation; not assumed to be exclusively AI."},
    {code:"15-1252",label:"Software Developers",rationale:"Enabling software capacity; use only as a broad contextual measure."},
    {code:"15-1221",label:"Computer and Information Research Scientists",rationale:"Research-intensive computing occupation."},
    {code:"17-2061",label:"Computer Hardware Engineers",rationale:"Relevant to advanced computing and semiconductor systems."},
  ],
  excluded: [
    {code:"ALL_STEM",label:"All STEM occupations",rationale:"Too broad to represent emerging-technology talent."},
    {code:"KEYWORD_AI",label:"Job-title keyword matching",rationale:"Not reproducible in aggregate official statistics."},
  ],
  boundary: "This taxonomy measures selected occupational context. It does not identify individuals or define an AI workforce census.",
};
