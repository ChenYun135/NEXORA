import type { Metadata } from "next";
import { Atlas } from "@/components/atlas";

export const metadata:Metadata={title:"NEXORA Atlas — Global Industry Geography",description:"Map the geography of emerging industries and innovation ecosystems.",openGraph:{title:"NEXORA Atlas",description:"Map the geography of emerging industries.",images:[{url:"/atlas-og.png",width:1733,height:909,alt:"NEXORA Atlas global industry geography"}]},twitter:{card:"summary_large_image",title:"NEXORA Atlas",description:"Map the geography of emerging industries.",images:["/atlas-og.png"]}};
export default function AtlasPage(){return <Atlas/>}
