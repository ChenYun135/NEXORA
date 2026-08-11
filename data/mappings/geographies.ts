import type { CanonicalGeography } from "@/domain/public-data";
export const canonicalGeographies:CanonicalGeography[]=[
 ["country-us","United States","美国","US"],["country-cn","China","中国","CN"],["country-de","Germany","德国","DE"],["country-gb","United Kingdom","英国","GB"],["country-jp","Japan","日本","JP"],["country-kr","South Korea","韩国","KR"],["country-sg","Singapore","新加坡","SG"]
].map(([id,en,zh,countryCode])=>({id,type:"COUNTRY",name:{en,zh},countryCode,parentId:null,latitude:null,longitude:null,sourceIds:["world-bank-indicators"]}));
export const countryCodeToGeographyId:Record<string,string>={USA:"country-us",CHN:"country-cn",DEU:"country-de",GBR:"country-gb",JPN:"country-jp",KOR:"country-kr",SGP:"country-sg",US:"country-us",CN:"country-cn",DE:"country-de",GB:"country-gb",JP:"country-jp",KR:"country-kr",SG:"country-sg"};
