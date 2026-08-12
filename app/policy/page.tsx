import type { Metadata } from "next";
import { PolicyIntelligence } from "@/components/policy-intelligence";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";
import { CaliforniaAIContextBanner } from "@/components/california-ai-context-banner";
const title = "NEXORA Policy — Future Industry Intelligence", description = "Understand the public-policy forces shaping emerging industries.";
export const metadata:Metadata={title,description,alternates:{canonical:"/policy"},openGraph:{title,description,images:[{url:"/policy-og.png",width:1200,height:630,alt:"NEXORA Policy Intelligence"}]},twitter:{card:"summary_large_image",title,description,images:["/policy-og.png"]}};
export default function PolicyPage(){return <><ProductionEvidenceStrip module="policy"/><CaliforniaAIContextBanner module="policy"/><PolicyIntelligence/></>}
