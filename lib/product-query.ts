import { atlasHotspots, atlasIndustries, type IndustryId } from "../data/demo/atlas.ts";
import { radarTechnologies } from "../data/demo/radar.ts";

const SAFE_VALUE = /^[a-zA-Z0-9][a-zA-Z0-9._ -]{0,79}$/;

export function safeQueryValue(value: string | null) {
  if (!value || !SAFE_VALUE.test(value)) return undefined;
  return value;
}

export function parseAtlasQuery(query: string) {
  const params = new URLSearchParams(query);
  const rawRegion = safeQueryValue(params.get("region"));
  const region = rawRegion === "sf-bay-area" || rawRegion === "california" ? "sf" : rawRegion === "los-angeles" ? "la" : rawRegion;
  const technology = safeQueryValue(params.get("technology"));
  const industry = safeQueryValue(params.get("industry"));
  const hotspot = region
    ? atlasHotspots.find((item) => item.id === region || item.name.en.toLowerCase() === region.toLowerCase())
    : undefined;
  const technologyMatch = technology ? radarTechnologies.find((item) => item.id === technology) : undefined;
  const inferredIndustry = (industry === "artificial-intelligence" ? "ai" : industry) ?? technologyMatch?.industryId;
  const layer = inferredIndustry && atlasIndustries.some((item) => item.id === inferredIndustry) ? inferredIndustry as IndustryId : undefined;
  return { regionId: hotspot?.id, technologyId: technology, industryId: layer };
}

export function parseRadarQuery(query: string) {
  const params = new URLSearchParams(query);
  const technology = safeQueryValue(params.get("technology"));
  const rawRegion = safeQueryValue(params.get("region"));
  const region = rawRegion === "california" || rawRegion === "sf-bay-area" ? "sf" : rawRegion === "los-angeles" ? "la" : rawRegion;
  return {
    technologyId: technology && radarTechnologies.some((item) => item.id === technology) ? technology : undefined,
    region: region && radarTechnologies.some((item) => item.regions.includes(region)) ? region : undefined,
  };
}
