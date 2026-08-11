import type { CanonicalObservation, CanonicalRelationship, CanonicalSource, ProviderHealth } from "../../domain/public-data.ts";
import { countryCodeToGeographyId } from "../mappings/geographies.ts";

export const productionSnapshotDate="2026-08-10";
const documented=(licenseName:string,licenseUrl:string,reuseNotes:string)=>({licenseName,licenseUrl,status:"DOCUMENTED" as const,reuseNotes,attributionRequirement:"Source attribution retained",redistributionAllowed:true,rawDataRedistributionAllowed:true,derivedDataAllowed:true,reviewedAt:productionSnapshotDate});
const review=(notes:string)=>({licenseName:null,licenseUrl:null,status:"REVIEW_REQUIRED" as const,reuseNotes:notes,attributionRequirement:"Link to official source",redistributionAllowed:null,rawDataRedistributionAllowed:null,derivedDataAllowed:null,reviewedAt:productionSnapshotDate});

export const canonicalSources:CanonicalSource[]=[
 {id:"openalex-api",provider:"OPENALEX",name:"OpenAlex API",publisher:"OurResearch",sourceType:"PUBLIC_DATABASE",tier:3,url:"https://developers.openalex.org/",retrievedAt:productionSnapshotDate,sourceUpdatedAt:productionSnapshotDate,license:documented("CC0","https://creativecommons.org/publicdomain/zero/1.0/","OpenAlex states that its data is CC0."),attributionText:"Source: OpenAlex"},
 {id:"world-bank-indicators",provider:"WORLD_BANK",name:"World Development Indicators API",publisher:"World Bank",sourceType:"PUBLIC_DATABASE",tier:3,url:"https://api.worldbank.org/v2/",retrievedAt:productionSnapshotDate,sourceUpdatedAt:null,license:review("Indicator-level terms and attribution require dataset-specific review."),attributionText:"Source: World Bank"},
 {id:"data-gov-catalog",provider:"DATA_GOV",name:"Data.gov Catalog",publisher:"U.S. General Services Administration",sourceType:"GOVERNMENT_CATALOG",tier:1,url:"https://catalog.data.gov/",retrievedAt:productionSnapshotDate,sourceUpdatedAt:null,license:documented("CC0 catalog metadata","https://creativecommons.org/publicdomain/zero/1.0/","Catalog metadata only; discovered datasets retain their own terms."),attributionText:"Source: Data.gov"},
 {id:"uspto-odp",provider:"USPTO",name:"USPTO Open Data Portal",publisher:"United States Patent and Trademark Office",sourceType:"GOVERNMENT_DATABASE",tier:1,url:"https://data.uspto.gov/",retrievedAt:productionSnapshotDate,sourceUpdatedAt:null,license:review("API key required; product-specific reuse terms require review."),attributionText:"Source: USPTO"},
 {id:"federal-register",provider:"FEDERAL_REGISTER",name:"Federal Register",publisher:"Office of the Federal Register",sourceType:"OFFICIAL_REGISTER",tier:1,url:"https://www.federalregister.gov/",retrievedAt:productionSnapshotDate,sourceUpdatedAt:productionSnapshotDate,license:review("Official public document metadata; document-specific materials may differ."),attributionText:"Source: Federal Register"},
 {id:"official-policy",provider:"OFFICIAL_POLICY",name:"Official policy and public-program pages",publisher:"Issuing public institutions",sourceType:"OFFICIAL_INSTITUTION",tier:1,url:"https://www.nist.gov/chips",retrievedAt:productionSnapshotDate,sourceUpdatedAt:null,license:review("Identity, status and links only; no page-content redistribution."),attributionText:"Source: issuing public institution"},
 {id:"official-identity",provider:"OFFICIAL_ORGANIZATION",name:"Official organization identity pages",publisher:"Source organizations",sourceType:"OFFICIAL_INSTITUTION",tier:2,url:"https://www.nist.gov/",retrievedAt:productionSnapshotDate,sourceUpdatedAt:null,license:review("Identity facts and links only; no site content redistribution."),attributionText:"Source: official organization pages"}
];

const researchTuples:[string,string,number][]=[
 ["T11948","2020",12667],["T11948","2021",9946],["T11948","2022",10924],["T11948","2023",13751],["T11948","2024",13507],["T11948","2025",23219],
 ["T10682","2020",8774],["T10682","2021",10721],["T10682","2022",11704],["T10682","2023",13839],["T10682","2024",14092],["T10682","2025",20695],
 ["T10932","2020",10714],["T10932","2021",10132],["T10932","2022",9451],["T10932","2023",9148],["T10932","2024",9094],["T10932","2025",10029],
 ["T10281","2020",16299],["T10281","2021",17340],["T10281","2022",20408],["T10281","2023",21625],["T10281","2024",24449],["T10281","2025",28674]
];
export const openAlexResearchObservations:CanonicalObservation[]=researchTuples.map(([topic,period,value])=>({id:`oa-${topic}-${period}`,datasetId:"openalex-topic-activity",metricKey:"publication_count",entityId:`openalex-topic-${topic}`,geographyType:null,geographyId:null,period,value,unit:"works",scale:1,currency:null,status:"OBSERVED",sourceRecordIds:[`openalex-group-${topic}-${period}`],observedAt:`${period}-12-31`,retrievedAt:productionSnapshotDate}));

const wbTuples:[string,string,number][]=[
 ["CHN","2019",2.20144],["CHN","2020",2.35712],["CHN","2021",2.38165],["CHN","2022",2.4945],["CHN","2023",2.57729],
 ["DEU","2019",3.11256],["DEU","2020",3.0897],["DEU","2021",3.0786],["DEU","2022",3.07096],["DEU","2023",3.1539],
 ["GBR","2019",2.6707],["GBR","2020",2.93993],["GBR","2021",2.89968],["GBR","2022",2.75224],["GBR","2023",2.67614],
 ["JPN","2019",3.21824],["JPN","2020",3.26556],["JPN","2021",3.27383],["JPN","2022",3.40053],["JPN","2023",3.44125],
 ["KOR","2019",4.36379],["KOR","2020",4.5214],["KOR","2021",4.59673],["KOR","2022",4.84753],["KOR","2023",4.94352],
 ["SGP","2019",1.88845],["SGP","2020",2.15983],["SGP","2021",1.93761],["SGP","2022",1.80821],
 ["USA","2019",3.14297],["USA","2020",3.41788],["USA","2021",3.4689],["USA","2022",3.48736],["USA","2023",3.44716]
];
export const worldBankObservations:CanonicalObservation[]=wbTuples.map(([country,period,value])=>({id:`wb-rd-${country}-${period}`,datasetId:"world-bank-rd-context",metricKey:"rd_expenditure_gdp_share",entityId:null,geographyType:"COUNTRY",geographyId:countryCodeToGeographyId[country],period,value,unit:"% of GDP",scale:1,currency:null,status:"OBSERVED",sourceRecordIds:[`world-bank-GB.XPD.RSDV.GD.ZS-${country}-${period}`],observedAt:`${period}-12-31`,retrievedAt:productionSnapshotDate}));

export interface VerifiedOrganizationIdentity {id:string;name:{en:string;zh:string};organizationType:string;countryCode:string;city:string|null;officialUrl:string;officialDomain:string;externalIds:Record<string,string>;sourceId:string;lastVerified:string;status:"OBSERVED";}
const verifiedOrganizationSeeds:[string,string,string,string,string,string|null,string,string,Record<string,string>][]=[
 ["org-mit","Massachusetts Institute of Technology","麻省理工学院","UNIVERSITY","US","Cambridge","https://www.mit.edu/","mit.edu",{openalex:"I63966007"}],
 ["org-stanford","Stanford University","斯坦福大学","UNIVERSITY","US","Stanford","https://www.stanford.edu/","stanford.edu",{openalex:"I97018004"}],
 ["org-tsinghua","Tsinghua University","清华大学","UNIVERSITY","CN","Beijing","https://www.tsinghua.edu.cn/","tsinghua.edu.cn",{openalex:"I99065089"}],
 ["org-nist","National Institute of Standards and Technology","美国国家标准与技术研究院","GOVERNMENT_AGENCY","US","Gaithersburg","https://www.nist.gov/","nist.gov",{}],
 ["org-nsf","U.S. National Science Foundation","美国国家科学基金会","GOVERNMENT_AGENCY","US","Alexandria","https://www.nsf.gov/","nsf.gov",{}],
 ["org-doe","U.S. Department of Energy","美国能源部","GOVERNMENT_AGENCY","US","Washington","https://www.energy.gov/","energy.gov",{}],
 ["org-nasa","National Aeronautics and Space Administration","美国国家航空航天局","GOVERNMENT_AGENCY","US","Washington","https://www.nasa.gov/","nasa.gov",{}],
 ["org-astar","A*STAR","新加坡科技研究局","RESEARCH_INSTITUTION","SG","Singapore","https://www.a-star.edu.sg/","a-star.edu.sg",{}],
 ["org-utokyo","The University of Tokyo","东京大学","UNIVERSITY","JP","Tokyo","https://www.u-tokyo.ac.jp/en/","u-tokyo.ac.jp",{}],
 ["org-kaist","KAIST","韩国科学技术院","UNIVERSITY","KR","Daejeon","https://www.kaist.ac.kr/en/","kaist.ac.kr",{}],
 ["org-ibm","IBM","IBM","CORPORATION","US","Armonk","https://www.ibm.com/","ibm.com",{}],
 ["org-nvidia","NVIDIA","英伟达","CORPORATION","US","Santa Clara","https://www.nvidia.com/","nvidia.com",{}],
 ["org-asml","ASML","阿斯麦","CORPORATION","NL","Veldhoven","https://www.asml.com/","asml.com",{}],
 ["org-aria","Advanced Research and Invention Agency","英国先进研究与发明署","PUBLIC_PROGRAM","GB","London","https://www.aria.org.uk/","aria.org.uk",{}],
 ["org-openalex","OpenAlex","OpenAlex 开放研究索引","NONPROFIT","US",null,"https://openalex.org/","openalex.org",{}]
];
export const verifiedOrganizations:VerifiedOrganizationIdentity[]=verifiedOrganizationSeeds.map(([id,en,zh,organizationType,countryCode,city,officialUrl,officialDomain,externalIds])=>({id,name:{en,zh},organizationType,countryCode,city,officialUrl,officialDomain,externalIds,sourceId:"official-identity",lastVerified:productionSnapshotDate,status:"OBSERVED"}));

export interface VerifiedPolicyPilot {id:string;title:{en:string;zh:string};jurisdiction:string;agency:string;policyType:string;currentStatus:"ACTIVE"|"PUBLISHED"|"UNKNOWN";officialUrl:string;sourceId:string;publishedAt:string|null;effectiveDate:string|null;lastVerified:string;status:"OBSERVED";technologyIds:string[];}
const verifiedPolicySeeds:[string,string,string,string,string,string,VerifiedPolicyPilot["currentStatus"],string,string,string|null,string|null,string[]][]=[
 ["nist-ai-rmf","AI Risk Management Framework","人工智能风险管理框架","United States","NIST","STANDARDS","PUBLISHED","https://www.nist.gov/itl/ai-risk-management-framework","nist",null,null,["ai-agents"]],
 ["chips-for-america","CHIPS for America","美国芯片计划","United States","NIST","FUNDING_PROGRAM","ACTIVE","https://www.nist.gov/chips","nist",null,null,["advanced-packaging"]],
 ["nsf-tip","Technology, Innovation and Partnerships Directorate","技术、创新与合作伙伴关系理事会","United States","NSF","RESEARCH_PROGRAM","ACTIVE","https://new.nsf.gov/tip","nsf",null,null,["ai-agents","quantum-computing"]],
 ["doe-lpo-title17","Title 17 Clean Energy Financing","Title 17 清洁能源融资","United States","U.S. Department of Energy","FUNDING_PROGRAM","ACTIVE","https://www.energy.gov/lpo/title-17-clean-energy-financing","doe",null,null,["grid-storage","green-hydrogen"]],
 ["sba-sbir-sttr","SBIR and STTR Programs","SBIR 与 STTR 计划","United States","U.S. Small Business Administration","PUBLIC_PRIVATE_INITIATIVE","ACTIVE","https://www.sbir.gov/","sba",null,null,["ai-agents","quantum-computing"]],
 ["arpa-e","ARPA-E","美国能源高级研究计划署","United States","U.S. Department of Energy","RESEARCH_PROGRAM","ACTIVE","https://arpa-e.energy.gov/","doe",null,null,["grid-storage","green-hydrogen"]],
 ["ca-clean-transport","Clean Transportation Program","加州清洁交通计划","California","California Energy Commission","FUNDING_PROGRAM","ACTIVE","https://www.energy.ca.gov/programs-and-topics/programs/clean-transportation-program","cec",null,null,["solid-state-batteries"]],
 ["uk-aria","Advanced Research and Invention Agency","英国先进研究与发明署","United Kingdom","ARIA","RESEARCH_PROGRAM","ACTIVE","https://www.aria.org.uk/","aria",null,null,["ai-agents","quantum-computing"]]
];
export const verifiedPolicies:VerifiedPolicyPilot[]=verifiedPolicySeeds.map(([id,en,zh,jurisdiction,agency,policyType,currentStatus,officialUrl,providerSourceId,publishedAt,effectiveDate,technologyIds])=>({id,title:{en,zh},jurisdiction,agency,policyType,currentStatus,officialUrl,sourceId:providerSourceId==="official-policy"?providerSourceId:"official-policy",publishedAt,effectiveDate,lastVerified:productionSnapshotDate,status:"OBSERVED",technologyIds}));

export const verifiedRelationships:CanonicalRelationship[]=[{id:"rel-mit-ibm-ai-lab",fromEntityId:"org-mit",toEntityId:"org-ibm",relationshipType:"JOINT_RESEARCH_PROGRAM",status:"OBSERVED",sourceRecordIds:["https://mitibmwatsonailab.mit.edu/"],validFrom:null,validTo:null}];

export interface CatalogRecord {id:string;title:string;publisher:string;catalogUrl:string;modified:string|null;licenseStatus:"DOCUMENTED"|"REVIEW_REQUIRED";status:"OBSERVED";}
export const dataGovCatalogRecords:CatalogRecord[]=[
 {id:"datagov-ckan",title:"Data.gov CKAN API",publisher:"General Services Administration",catalogUrl:"https://catalog.data.gov/dataset/data-gov-ckan-api",modified:"2018-09-24",licenseStatus:"DOCUMENTED",status:"OBSERVED"},
 {id:"nist-dioptra",title:"Dioptra Test Platform",publisher:"National Institute of Standards and Technology",catalogUrl:"https://catalog.data.gov/?q=Dioptra%20Test%20Platform",modified:"2024-07-24",licenseStatus:"REVIEW_REQUIRED",status:"OBSERVED"},
 {id:"uspto-office-actions",title:"Office Action Weekly Zips API",publisher:"United States Patent and Trademark Office",catalogUrl:"https://catalog.data.gov/?q=Office%20Action%20Weekly%20Zips%20API",modified:"2025-08-28",licenseStatus:"REVIEW_REQUIRED",status:"OBSERVED"},
 {id:"nasa-public-listing",title:"NASA Public Data Listing",publisher:"NASA",catalogUrl:"https://catalog.data.gov/?keyword=data-json",modified:"2025-04-01",licenseStatus:"REVIEW_REQUIRED",status:"OBSERVED"},
 {id:"jpl-small-body",title:"JPL Small Body Database Browser",publisher:"NASA",catalogUrl:"https://catalog.data.gov/?q=JPL%20Small%20Body%20Database",modified:"2025-03-31",licenseStatus:"REVIEW_REQUIRED",status:"OBSERVED"}
];

export const providerHealth:ProviderHealth[]=[
 {provider:"OPENALEX",status:"HEALTHY",lastSuccessAt:"2026-08-10T03:01:22Z",lastFailureAt:null,lastLatencyMs:1300,errorSummary:null,recordCount:openAlexResearchObservations.length+3,freshness:"Fresh · verified 2026-08-10",coverage:{en:"4 mapped topics, 2020–2025; 3 institution identities",zh:"4 个映射主题，2020–2025；3 个机构身份"},licenseStatus:"DOCUMENTED"},
 {provider:"WORLD_BANK",status:"HEALTHY",lastSuccessAt:"2026-08-10T00:00:00Z",lastFailureAt:null,lastLatencyMs:700,errorSummary:null,recordCount:worldBankObservations.length,freshness:"Annual series · latest available values retained",coverage:{en:"R&D expenditure context for 7 countries",zh:"7 个国家的研发支出背景"},licenseStatus:"REVIEW_REQUIRED"},
 {provider:"DATA_GOV",status:"DEGRADED",lastSuccessAt:null,lastFailureAt:"2026-08-10T00:00:00Z",lastLatencyMs:null,errorSummary:"Legacy documented CKAN endpoint returned 404; catalog discovery snapshot retained.",recordCount:dataGovCatalogRecords.length,freshness:"Catalog snapshot 2026-08-10",coverage:{en:"Discovery metadata only; each dataset has its own contract",zh:"仅发现元数据；每个数据集具有独立契约"},licenseStatus:"DOCUMENTED"},
 {provider:"USPTO",status:"NOT_CONFIGURED",lastSuccessAt:null,lastFailureAt:null,lastLatencyMs:null,errorSummary:"USPTO ODP API key required.",recordCount:0,freshness:"Unavailable",coverage:{en:"Adapter and CPC mapping tested with fixtures; no production patent claims",zh:"适配器与 CPC 映射已用 fixture 测试；无生产专利声明"},licenseStatus:"REVIEW_REQUIRED"},
 {provider:"OFFICIAL_POLICY",status:"HEALTHY",lastSuccessAt:"2026-08-10T00:00:00Z",lastFailureAt:null,lastLatencyMs:null,errorSummary:null,recordCount:verifiedPolicies.length,freshness:"Manually verified 2026-08-10",coverage:{en:"8 official US, California and UK program/standards records",zh:"8 条美国、加州和英国官方计划/标准记录"},licenseStatus:"REVIEW_REQUIRED"},
 {provider:"OFFICIAL_ORGANIZATION",status:"HEALTHY",lastSuccessAt:"2026-08-10T00:00:00Z",lastFailureAt:null,lastLatencyMs:null,errorSummary:null,recordCount:verifiedOrganizations.length,freshness:"Identity verification 2026-08-10",coverage:{en:"15 official organization identities; activity and Demo relationships remain separate",zh:"15 个官方组织身份；活动与演示关系保持分离"},licenseStatus:"REVIEW_REQUIRED"}
];
