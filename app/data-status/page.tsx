import type { Metadata } from "next";
import { DataStatus } from "@/components/data-status";
const title="NEXORA Data Status — Future Industry Intelligence",description="Provider health, freshness, coverage, quality, licensing and provenance for NEXORA public data.";
export const metadata:Metadata={title,description,openGraph:{title,description,images:[{url:"/data-status-og.png",width:1732,height:908,alt:"NEXORA Data Status — public data provenance, quality and freshness"}]},twitter:{card:"summary_large_image",title,description,images:["/data-status-og.png"]}};
export default function DataStatusPage(){return <DataStatus/>}
