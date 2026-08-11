import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { OrganizationIntelligence } from "@/components/organization-intelligence";
import { organizationProfiles } from "@/data/demo/organizations";

export async function generateMetadata({params}:{params:Promise<{id:string}>}):Promise<Metadata>{const {id}=await params,p=organizationProfiles.find(x=>x.id===id);return p?{title:`${p.name} — NEXORA Organizations`,description:p.description,openGraph:{title:`${p.name} — NEXORA Organizations`,description:p.description,images:["/organizations-og.png"]},twitter:{card:"summary_large_image",title:`${p.name} — NEXORA Organizations`,description:p.description,images:["/organizations-og.png"]}}:{title:"Organization Not Found — NEXORA"}}
export default async function OrganizationDetailPage({params}:{params:Promise<{id:string}>}){const {id}=await params;if(!organizationProfiles.some(x=>x.id===id))notFound();return <OrganizationIntelligence initialOrganizationId={id}/>}
