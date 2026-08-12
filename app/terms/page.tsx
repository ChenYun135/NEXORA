import type { Metadata } from "next";
import { PublicInformationPage } from "@/components/public-information-page";

export const metadata: Metadata = { title: "Public Use Disclaimer — NEXORA", description: "Research-use, data, derived-indicator, AI, and simulation limitations for NEXORA.", alternates: { canonical: "/terms" } };
export default function TermsPage(){return <PublicInformationPage kind="terms"/>}
