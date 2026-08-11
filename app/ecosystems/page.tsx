import type { Metadata } from "next";
import { Ecosystems } from "@/components/ecosystems";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";
import { CaliforniaAIContextBanner } from "@/components/california-ai-context-banner";
const title = "NEXORA Ecosystems — Future Industry Intelligence", description = "Map evidence-linked innovation networks across research, capital, policy and commercialization.";
export const metadata:Metadata={title,description,openGraph:{title,description,images:[{url:"/ecosystems-og.png",width:1733,height:909,alt:"NEXORA Ecosystems innovation network intelligence"}]},twitter:{card:"summary_large_image",title,description,images:["/ecosystems-og.png"]}};
export default function EcosystemsPage(){return <><ProductionEvidenceStrip module="ecosystems"/><CaliforniaAIContextBanner module="ecosystems"/><Ecosystems/></>}
