import type { CanonicalGeography } from "@/domain/public-data";
export const canonicalGeographies:CanonicalGeography[]=[
 ["country-us","United States","美国","US"],["country-cn","China","中国","CN"],["country-de","Germany","德国","DE"],["country-gb","United Kingdom","英国","GB"],["country-jp","Japan","日本","JP"],["country-kr","South Korea","韩国","KR"],["country-sg","Singapore","新加坡","SG"]
].map(([id,en,zh,countryCode])=>({id,type:"COUNTRY",name:{en,zh},countryCode,parentId:null,latitude:null,longitude:null,sourceIds:["world-bank-indicators"]}));
export const countryCodeToGeographyId:Record<string,string>={USA:"country-us",CHN:"country-cn",DEU:"country-de",GBR:"country-gb",JPN:"country-jp",KOR:"country-kr",SGP:"country-sg",US:"country-us",CN:"country-cn",DE:"country-de",GB:"country-gb",JP:"country-jp",KR:"country-kr",SG:"country-sg"};

export const californiaAICanonicalGeographies:CanonicalGeography[]=[
 {id:"california",type:"STATE_PROVINCE",name:{en:"California",zh:"加利福尼亚州"},countryCode:"US",parentId:"country-us",latitude:36.7783,longitude:-119.4179,sourceIds:["official-california"]},
 {id:"sf-bay-area",type:"METRO_ECOSYSTEM",name:{en:"San Francisco Bay Area",zh:"旧金山湾区"},countryCode:"US",parentId:"california",latitude:37.7749,longitude:-122.4194,sourceIds:["ca-ai-case-v2.0"]},
 {id:"los-angeles",type:"METRO_ECOSYSTEM",name:{en:"Los Angeles",zh:"洛杉矶"},countryCode:"US",parentId:"california",latitude:34.0522,longitude:-118.2437,sourceIds:["ca-ai-case-v2.0"]},
 {id:"san-diego",type:"METRO_ECOSYSTEM",name:{en:"San Diego",zh:"圣迭戈"},countryCode:"US",parentId:"california",latitude:32.7157,longitude:-117.1611,sourceIds:["ca-ai-case-v2.0"]},
 {id:"orange-county",type:"METRO_ECOSYSTEM",name:{en:"Orange County / Irvine",zh:"橙县／尔湾"},countryCode:"US",parentId:"california",latitude:33.6846,longitude:-117.8265,sourceIds:["ca-ai-case-v2.0"]},
 {id:"sacramento",type:"METRO_ECOSYSTEM",name:{en:"Sacramento / policy context",zh:"萨克拉门托／政策语境"},countryCode:"US",parentId:"california",latitude:38.5816,longitude:-121.4944,sourceIds:["ca-ai-case-v2.0"]},
];

export const californiaAISemanticAliases={"silicon-valley":"sf-bay-area"} as const;
