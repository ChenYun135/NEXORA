import type { Metadata } from "next";
import { PublicMethodologyPage } from "@/components/public-methodology-page";

export const metadata: Metadata = { title: "Methodology & Limitations — NEXORA", description: "How NEXORA separates public evidence, derived metrics, AI interpretation, and scenario output.", alternates: { canonical: "/methodology" } };
export default function MethodologyPage() { return <PublicMethodologyPage />; }
