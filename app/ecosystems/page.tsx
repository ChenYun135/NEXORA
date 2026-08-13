import type { Metadata } from "next";
import { Ecosystems } from "@/components/ecosystems";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";
const title = "NEXORA Ecosystems — Future Industry Intelligence", description = "Map evidence-linked innovation networks across research, capital, policy and commercialization.";
export const metadata:Metadata={title,description,alternates:{canonical:"/ecosystems"},openGraph:{title,description,images:[{url:"/ecosystems-og.png",width:1200,height:630,alt:"NEXORA Ecosystems innovation network intelligence"}]},twitter:{card:"summary_large_image",title,description,images:["/ecosystems-og.png"]}};
export default function EcosystemsPage(){return <><ProductionEvidenceStrip module="ecosystems"/><Ecosystems/></>}
