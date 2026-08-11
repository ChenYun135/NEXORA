import type { Metadata } from "next";
import { PolicyIntelligence } from "@/components/policy-intelligence";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";

export const metadata:Metadata={title:"NEXORA Policy Intelligence — Public Policy Forces",description:"Understand the policy forces shaping emerging industries.",openGraph:{title:"NEXORA Policy Intelligence",description:"Understand the policy forces shaping emerging industries.",images:[{url:"/policy-og.png",width:1733,height:909,alt:"NEXORA Policy Intelligence"}]},twitter:{card:"summary_large_image",title:"NEXORA Policy Intelligence",description:"Understand the policy forces shaping emerging industries.",images:["/policy-og.png"]}};
export default function PolicyPage(){return <><ProductionEvidenceStrip module="policy"/><PolicyIntelligence/></>}
