import type { Metadata } from "next";
import { NexoraSimulator } from "@/components/nexora-simulator";
import { CaliforniaAIContextBanner } from "@/components/california-ai-context-banner";
const title="NEXORA Simulator — Future Industry Intelligence",description="Explore how innovation ecosystems may evolve under explicit assumptions, with transparent system dynamics, sensitivity and uncertainty.";
export const metadata:Metadata={title,description,alternates:{canonical:"/simulator"},openGraph:{title,description,images:[{url:"/simulator-og.png",width:1200,height:630,alt:"NEXORA Simulator system dynamics and scenario trajectories"}]},twitter:{card:"summary_large_image",title,description,images:["/simulator-og.png"]}};
export default function SimulatorPage(){return <><CaliforniaAIContextBanner module="simulator"/><NexoraSimulator/></>}
