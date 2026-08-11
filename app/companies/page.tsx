import type { Metadata } from "next";
import { OrganizationIntelligence } from "@/components/organization-intelligence";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";
const title = "NEXORA Organizations — Future Industry Intelligence", description = "Understand the organizations shaping emerging industries with explicit entity and evidence status.";
export const metadata:Metadata={title,description,openGraph:{title,description,images:[{url:"/organizations-og.png",width:1733,height:909,alt:"NEXORA Organizations"}]},twitter:{card:"summary_large_image",title,description,images:["/organizations-og.png"]}};
export default function CompaniesPage(){return <><ProductionEvidenceStrip module="companies"/><OrganizationIntelligence/></>}
