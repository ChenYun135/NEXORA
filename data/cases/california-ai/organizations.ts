import type { CaseText, EvidenceStatus } from "./case.ts";

export type CaliforniaAIOrganization = {
  id: string; name: CaseText; category: "UNIVERSITY" | "RESEARCH_INSTITUTION" | "AI_COMPANY" | "TECHNOLOGY_COMPANY" | "SEMICONDUCTOR_HARDWARE" | "GOVERNMENT_PUBLIC_PROGRAM";
  regionId: string; city: string; role: string; roleLabel: CaseText; officialUrl: string; openAlexId: string | null; status: EvidenceStatus; evidenceNote: CaseText;
};

const verified = (id: string, en: string, zh: string, category: CaliforniaAIOrganization["category"], regionId: string, city: string, role: string, roleEn: string, roleZh: string, officialUrl: string, openAlexId: string | null = null): CaliforniaAIOrganization => ({
  id, name: { en, zh }, category, regionId, city, role, roleLabel: { en: roleEn, zh: roleZh }, officialUrl, openAlexId, status: "VERIFIED_PUBLIC_ENTITY",
  evidenceNote: { en: "Identity and location are sourced from the official organization page. The role is descriptive and does not imply ecosystem importance.", zh: "身份与地点来自组织官方页面；角色仅作描述，不代表生态重要性排名。" },
});

export const californiaAIOrganizations: CaliforniaAIOrganization[] = [
  verified("org-stanford", "Stanford University", "斯坦福大学", "UNIVERSITY", "sf-bay-area", "Stanford", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.stanford.edu/about/", "I97018004"),
  verified("org-uc-berkeley", "University of California, Berkeley", "加州大学伯克利分校", "UNIVERSITY", "sf-bay-area", "Berkeley", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.berkeley.edu/about/", "I95457486"),
  verified("org-lbnl", "Lawrence Berkeley National Laboratory", "劳伦斯伯克利国家实验室", "RESEARCH_INSTITUTION", "sf-bay-area", "Berkeley", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.lbl.gov/about/", "I148283060"),
  verified("org-ucla", "University of California, Los Angeles", "加州大学洛杉矶分校", "UNIVERSITY", "los-angeles", "Los Angeles", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.ucla.edu/about", "I161318765"),
  verified("org-caltech", "California Institute of Technology", "加州理工学院", "UNIVERSITY", "los-angeles", "Pasadena", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.caltech.edu/about", "I122411786"),
  verified("org-usc", "University of Southern California", "南加州大学", "UNIVERSITY", "los-angeles", "Los Angeles", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.usc.edu/about/", "I1174212"),
  verified("org-ucsd", "University of California San Diego", "加州大学圣迭戈分校", "UNIVERSITY", "san-diego", "San Diego", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://ucsd.edu/about/index.html", "I36258959"),
  verified("org-sdsu", "San Diego State University", "圣迭戈州立大学", "UNIVERSITY", "san-diego", "San Diego", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.sdsu.edu/about/", "I26538001"),
  verified("org-uci", "University of California, Irvine", "加州大学尔湾分校", "UNIVERSITY", "orange-county", "Irvine", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://uci.edu/about/", "I204250578"),
  verified("org-uc-davis", "University of California, Davis", "加州大学戴维斯分校", "UNIVERSITY", "california", "Davis", "RESEARCH_ANCHOR", "Research Anchor", "科研支点", "https://www.ucdavis.edu/about", "I84218800"),
  verified("org-openai", "OpenAI", "OpenAI", "AI_COMPANY", "sf-bay-area", "San Francisco", "TECHNOLOGY_DEVELOPER", "Technology Developer", "技术开发者", "https://openai.com/about/"),
  verified("org-anthropic", "Anthropic", "Anthropic", "AI_COMPANY", "sf-bay-area", "San Francisco", "TECHNOLOGY_DEVELOPER", "Technology Developer", "技术开发者", "https://www.anthropic.com/company"),
  verified("org-nvidia", "NVIDIA", "英伟达", "SEMICONDUCTOR_HARDWARE", "sf-bay-area", "Santa Clara", "AI_INFRASTRUCTURE_PROVIDER", "AI Infrastructure Provider", "AI 基础设施提供者", "https://www.nvidia.com/en-us/about-nvidia/"),
  verified("org-amd", "AMD", "超威半导体", "SEMICONDUCTOR_HARDWARE", "sf-bay-area", "Santa Clara", "AI_INFRASTRUCTURE_PROVIDER", "AI Infrastructure Provider", "AI 基础设施提供者", "https://www.amd.com/en/corporate.html"),
  verified("org-intel", "Intel", "英特尔", "SEMICONDUCTOR_HARDWARE", "sf-bay-area", "Santa Clara", "MANUFACTURING_HARDWARE_ACTOR", "Manufacturing / Hardware Actor", "制造与硬件参与者", "https://www.intel.com/content/www/us/en/company-overview/company-overview.html"),
  verified("org-google", "Google", "谷歌", "TECHNOLOGY_COMPANY", "sf-bay-area", "Mountain View", "TECHNOLOGY_DEVELOPER", "Technology Developer", "技术开发者", "https://about.google/"),
  verified("org-meta", "Meta", "Meta", "TECHNOLOGY_COMPANY", "sf-bay-area", "Menlo Park", "TECHNOLOGY_DEVELOPER", "Technology Developer", "技术开发者", "https://about.meta.com/company-info/"),
  verified("org-apple", "Apple", "苹果", "TECHNOLOGY_COMPANY", "sf-bay-area", "Cupertino", "TECHNOLOGY_DEVELOPER", "Technology Developer", "技术开发者", "https://www.apple.com/leadership/"),
  verified("org-salesforce", "Salesforce", "赛富时", "TECHNOLOGY_COMPANY", "sf-bay-area", "San Francisco", "COMMERCIALIZATION_ACTOR", "Commercialization Actor", "商业化参与者", "https://www.salesforce.com/company/"),
  verified("org-databricks", "Databricks", "Databricks", "AI_COMPANY", "sf-bay-area", "San Francisco", "AI_INFRASTRUCTURE_PROVIDER", "AI Infrastructure Provider", "AI 基础设施提供者", "https://www.databricks.com/company/about-us"),
  verified("org-cdt", "California Department of Technology", "加州技术部", "GOVERNMENT_PUBLIC_PROGRAM", "sacramento", "Sacramento", "GOVERNMENT_POLICY_ACTOR", "Government / Policy Actor", "政府与政策参与者", "https://www.cdt.ca.gov/about/"),
  verified("org-govops", "California Government Operations Agency", "加州政府运营署", "GOVERNMENT_PUBLIC_PROGRAM", "sacramento", "Sacramento", "GOVERNMENT_POLICY_ACTOR", "Government / Policy Actor", "政府与政策参与者", "https://www.govops.ca.gov/"),
  verified("org-gobiz", "Governor's Office of Business and Economic Development", "加州州长商业与经济发展办公室", "GOVERNMENT_PUBLIC_PROGRAM", "sacramento", "Sacramento", "PUBLIC_FUNDING_ACTOR", "Public Funding Actor", "公共资金参与者", "https://business.ca.gov/about/"),
  verified("org-odi", "California Office of Data and Innovation", "加州数据与创新办公室", "GOVERNMENT_PUBLIC_PROGRAM", "sacramento", "Sacramento", "ECOSYSTEM_COORDINATOR", "Ecosystem Coordinator", "生态协调者", "https://innovation.ca.gov/about/"),
  verified("org-cec", "California Energy Commission", "加州能源委员会", "GOVERNMENT_PUBLIC_PROGRAM", "sacramento", "Sacramento", "PUBLIC_FUNDING_ACTOR", "Public Funding Actor", "公共资金参与者", "https://www.energy.ca.gov/about"),
];
