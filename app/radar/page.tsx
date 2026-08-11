import type { Metadata } from "next";
import { Radar } from "@/components/radar";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";
const title = "NEXORA Radar — Future Industry Intelligence", description = "Detect emerging-technology momentum with explainable evidence and explicit uncertainty.";
export const metadata:Metadata={title,description,openGraph:{title,description,images:[{url:"/radar-og.png",width:1733,height:909,alt:"NEXORA Radar emerging opportunity intelligence"}]},twitter:{card:"summary_large_image",title,description,images:["/radar-og.png"]}};
export default function RadarPage(){return <><ProductionEvidenceStrip module="radar"/><Radar/></>}
