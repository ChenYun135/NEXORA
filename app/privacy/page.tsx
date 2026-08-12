import type { Metadata } from "next";
import { PublicInformationPage } from "@/components/public-information-page";

export const metadata: Metadata = { title: "Privacy — NEXORA", description: "How the NEXORA public release candidate handles language preferences, AI questions, cookies, analytics, and personal data.", alternates: { canonical: "/privacy" } };
export default function PrivacyPage(){return <PublicInformationPage kind="privacy"/>}
