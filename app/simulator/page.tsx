import type { Metadata } from "next";
import { NexoraSimulator } from "@/components/nexora-simulator";
const title="NEXORA Simulator — Evolution & Policy Scenario Engine",description="Explore how innovation ecosystems may evolve under different explicit assumptions, with transparent system dynamics, sensitivity and uncertainty.";
export const metadata:Metadata={title,description,openGraph:{title,description,images:[{url:"/simulator-og.png",width:1731,height:909,alt:"NEXORA Simulator system dynamics and scenario trajectories"}]},twitter:{card:"summary_large_image",title,description,images:["/simulator-og.png"]}};
export default function SimulatorPage(){return <NexoraSimulator/>}
