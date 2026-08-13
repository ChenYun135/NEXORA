import type { Metadata } from "next";
import { Atlas } from "@/components/atlas";
import { ProductionEvidenceStrip } from "@/components/production-evidence-strip";
const title = "NEXORA Atlas — Future Industry Intelligence", description = "Map the geography of emerging industries and innovation ecosystems.";
export const metadata:Metadata={title,description,alternates:{canonical:"/atlas"},openGraph:{title,description,images:[{url:"/atlas-og.png",width:1200,height:630,alt:"NEXORA Atlas global industry geography"}]},twitter:{card:"summary_large_image",title,description,images:["/atlas-og.png"]}};
export default function AtlasPage(){return <><ProductionEvidenceStrip module="atlas"/><Atlas/></>}
