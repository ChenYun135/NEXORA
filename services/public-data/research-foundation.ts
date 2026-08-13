import type { PublicPolicyProgramRecord, RegionYearObservation, SnapshotManifest } from "../../domain/research-data.ts";
import { publicProviderRegistry } from "../../data/providers/registry.ts";

export const publicProgramLibrary: PublicPolicyProgramRecord[] = [
  {programId:"sbir-sttr",officialName:"Small Business Innovation Research and Small Business Technology Transfer",agency:"U.S. Small Business Administration and participating agencies",jurisdiction:"United States",startDate:"1982-01-01",status:"ACTIVE",policyInstrument:"ENTREPRENEURSHIP_SUPPORT",targetTechnology:["cross-technology"],targetActor:["small businesses","research institutions"],fundingIfObserved:null,fundingUnit:null,geography:"United States",commercializationRole:"Supports staged small-business research and development awards",technologyTransferRole:"STTR includes formal research-institution participation",officialUrl:"https://www.sbir.gov/",sourceStatus:"OBSERVED",objective:"Support federal R&D with commercialization potential",observedOutcome:null},
  {programId:"nsf-tip",officialName:"NSF Directorate for Technology, Innovation and Partnerships",agency:"U.S. National Science Foundation",jurisdiction:"United States",startDate:"2022-01-01",status:"ACTIVE",policyInstrument:"KNOWLEDGE_TRANSFER",targetTechnology:["cross-technology"],targetActor:["research institutions","firms","regional partners"],fundingIfObserved:null,fundingUnit:null,geography:"United States",commercializationRole:"Supports use-inspired and translational pathways",technologyTransferRole:"Supports partnerships across research and practice",officialUrl:"https://www.nsf.gov/tip",sourceStatus:"OBSERVED",objective:"Advance use-inspired and translational research and innovation",observedOutcome:null},
  {programId:"nsf-engines",officialName:"NSF Regional Innovation Engines",agency:"U.S. National Science Foundation",jurisdiction:"United States",startDate:"2022-05-01",status:"ACTIVE",policyInstrument:"PUBLIC_PRIVATE_COORDINATION",targetTechnology:["cross-technology"],targetActor:["regional coalitions"],fundingIfObserved:null,fundingUnit:null,geography:"United States regions",commercializationRole:"Supports regional translation and commercialization capacity",technologyTransferRole:"Coordinates research, industry, government, and community partners",officialUrl:"https://www.nsf.gov/funding/initiatives/regional-innovation-engines",sourceStatus:"OBSERVED",objective:"Build regional innovation capacity through long-term coalitions",observedOutcome:null},
  {programId:"eda-tech-hubs",officialName:"Regional Technology and Innovation Hubs",agency:"U.S. Economic Development Administration",jurisdiction:"United States",startDate:"2023-01-01",status:"ACTIVE",policyInstrument:"PUBLIC_PRIVATE_COORDINATION",targetTechnology:["critical and emerging technologies"],targetActor:["regional consortia"],fundingIfObserved:null,fundingUnit:null,geography:"Designated United States regions",commercializationRole:"Supports regional technology commercialization",technologyTransferRole:"Links institutions, firms, workforce, and government",officialUrl:"https://www.eda.gov/funding/programs/regional-technology-and-innovation-hubs",sourceStatus:"OBSERVED",objective:"Strengthen regional capacity to manufacture, commercialize, and deploy critical technologies",observedOutcome:null},
  {programId:"chips-for-america",officialName:"CHIPS for America",agency:"National Institute of Standards and Technology",jurisdiction:"United States",startDate:"2022-08-09",status:"ACTIVE",policyInstrument:"FINANCE",targetTechnology:["semiconductors"],targetActor:["manufacturers","research consortia"],fundingIfObserved:null,fundingUnit:null,geography:"United States",commercializationRole:"Supports semiconductor manufacturing capacity",technologyTransferRole:"Includes public research and development programs",officialUrl:"https://www.nist.gov/chips",sourceStatus:"OBSERVED",objective:"Strengthen domestic semiconductor manufacturing and research",observedOutcome:null},
  {programId:"doe-funding-financing",officialName:"Department of Energy Funding and Financing Programs",agency:"U.S. Department of Energy",jurisdiction:"United States",startDate:null,status:"ACTIVE",policyInstrument:"R&D_SUPPORT",targetTechnology:["clean energy","advanced manufacturing"],targetActor:["research institutions","firms","public partners"],fundingIfObserved:null,fundingUnit:null,geography:"United States",commercializationRole:"Provides program-specific funding pathways subject to award verification",technologyTransferRole:"Supports research, demonstration and deployment pathways",officialUrl:"https://www.energy.gov/funding-financing",sourceStatus:"OBSERVED",objective:"Support energy research, development, demonstration and deployment",observedOutcome:null},
  {programId:"california-epic",officialName:"Electric Program Investment Charge",agency:"California Energy Commission",jurisdiction:"California",startDate:null,status:"ACTIVE",policyInstrument:"R&D_SUPPORT",targetTechnology:["clean energy"],targetActor:["research organizations","technology developers","California communities"],fundingIfObserved:null,fundingUnit:null,geography:"California",commercializationRole:"Supports clean-energy innovation projects under program-specific solicitations",technologyTransferRole:"Connects public-interest research with demonstration and deployment",officialUrl:"https://www.energy.ca.gov/programs-and-topics/programs/electric-program-investment-charge-epic-program",sourceStatus:"OBSERVED",objective:"Advance clean-energy research and innovation for California ratepayers",observedOutcome:null},
  {programId:"california-competes",officialName:"California Competes Tax Credit",agency:"California Governor's Office of Business and Economic Development",jurisdiction:"California",startDate:null,status:"ACTIVE",policyInstrument:"FINANCE",targetTechnology:["cross-technology"],targetActor:["businesses"],fundingIfObserved:null,fundingUnit:null,geography:"California",commercializationRole:"Provides a business investment incentive subject to award-specific verification",technologyTransferRole:"No technology-transfer outcome is inferred from eligibility or awards",officialUrl:"https://business.ca.gov/california-competes-tax-credit/",sourceStatus:"OBSERVED",objective:"Support business attraction, retention and expansion in California",observedOutcome:null},
];

export const buildSnapshotManifest = (input: Omit<SnapshotManifest,"checksum"|"transformationHash"> & {records: unknown[]; transformation?: unknown}): SnapshotManifest => ({
  ...input,
  checksum: stableHash(input.records),
  transformationHash: input.transformation === undefined ? null : stableHash(input.transformation),
});

export const stableHash = (value: unknown) => {
  const text = stableStringify(value);
  let hash = 2166136261;
  for (let index = 0; index < text.length; index += 1) { hash ^= text.charCodeAt(index); hash = Math.imul(hash, 16777619); }
  return (hash >>> 0).toString(16).padStart(8,"0");
};

const stableStringify = (value: unknown): string => {
  if (value === null || typeof value !== "object") return JSON.stringify(value);
  if (Array.isArray(value)) return `[${value.map(stableStringify).join(",")}]`;
  return `{${Object.entries(value as Record<string,unknown>).sort(([a],[b])=>a.localeCompare(b)).map(([key,item])=>`${JSON.stringify(key)}:${stableStringify(item)}`).join(",")}}`;
};

export const harmonizeRegionYear = (rows: RegionYearObservation[]) => {
  const seen = new Set<string>();
  return [...rows].sort((a,b)=>`${a.regionType}:${a.regionId}:${a.year}:${a.metricId}`.localeCompare(`${b.regionType}:${b.regionId}:${b.year}:${b.metricId}`)).map((row)=>{
    const provider = publicProviderRegistry.find((entry)=>entry.providerId===row.providerId);
    if (!provider) throw new Error(`UNKNOWN_PROVIDER:${row.providerId}`);
    const key = `${row.regionType}:${row.regionId}:${row.year}:${row.metricId}`;
    if (seen.has(key)) throw new Error(`DUPLICATE_REGION_YEAR_METRIC:${key}`);
    seen.add(key);
    if (row.value === null && row.status === "OBSERVED") throw new Error(`MISSING_STATUS_REQUIRED:${key}`);
    return {...row};
  });
};

export const separateBfsAndBds = (metricId: string) => metricId.startsWith("bfs_") ? "APPLICATION_OR_FORMATION_SIGNAL" : metricId.startsWith("bds_") ? "REALIZED_FIRM_OR_ESTABLISHMENT_DYNAMICS" : "OTHER";
