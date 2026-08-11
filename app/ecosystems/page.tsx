import type { Metadata } from "next";
import { Ecosystems } from "@/components/ecosystems";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";

export const metadata:Metadata={title:"NEXORA Ecosystems — Innovation Network Intelligence",description:"Map the networks behind innovation.",openGraph:{title:"NEXORA Ecosystems",description:"Map the networks behind innovation.",images:[{url:"/ecosystems-og.png",width:1733,height:909,alt:"NEXORA Ecosystems innovation network intelligence"}]},twitter:{card:"summary_large_image",title:"NEXORA Ecosystems",description:"Map the networks behind innovation.",images:["/ecosystems-og.png"]}};
export default function EcosystemsPage(){return <><ProductionEvidenceStrip module="ecosystems"/><Ecosystems/></>}
