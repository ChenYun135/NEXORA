import type { Metadata } from "next";
import { OrganizationIntelligence } from "@/components/organization-intelligence";

export const metadata:Metadata={title:"NEXORA Organizations — Emerging Industry Intelligence",description:"Understand the organizations shaping emerging industries. / 洞察塑造未来产业的关键组织。",openGraph:{title:"NEXORA ORGANIZATIONS",description:"Understand the organizations shaping emerging industries.",images:[{url:"/organizations-og.png",width:1733,height:909,alt:"NEXORA Organizations"}]},twitter:{card:"summary_large_image",title:"NEXORA ORGANIZATIONS",description:"Understand the organizations shaping emerging industries.",images:["/organizations-og.png"]}};
export default function CompaniesPage(){return <OrganizationIntelligence/>}
