import type { Metadata } from "next";
import { NexoraAIWorkspace } from "@/components/nexora-ai-workspace";
const title="NEXORA AI — Evidence-based Research Copilot",description="Evidence-based intelligence for emerging industries, with grounded retrieval, transparent citations and explicit data boundaries.";
export const metadata:Metadata={title,description,openGraph:{title,description,images:[{url:"/ai-og.png",width:1731,height:909,alt:"NEXORA AI evidence-based intelligence for emerging industries"}]},twitter:{card:"summary_large_image",title,description,images:["/ai-og.png"]}};
export default function AIPage(){return <NexoraAIWorkspace/>}
