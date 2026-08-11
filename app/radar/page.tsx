import type { Metadata } from "next";
import { Radar } from "@/components/radar";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";

export const metadata:Metadata={title:"NEXORA Radar — Emerging Opportunity Intelligence",description:"Detect the signals shaping tomorrow.",openGraph:{title:"NEXORA Radar",description:"Detect the signals shaping tomorrow.",images:[{url:"/radar-og.png",width:1733,height:909,alt:"NEXORA Radar emerging opportunity intelligence"}]},twitter:{card:"summary_large_image",title:"NEXORA Radar",description:"Detect the signals shaping tomorrow.",images:["/radar-og.png"]}};
export default function RadarPage(){return <><ProductionEvidenceStrip module="radar"/><Radar/></>}
