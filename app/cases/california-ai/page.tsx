import type { Metadata } from "next";
import { CaliforniaAIFlagship } from "@/components/california-ai-flagship";

const title = "California AI Innovation Ecosystem | NEXORA Flagship Case";
const description = "Evidence-based mapping of a selected California AI research panel, organizations, policy context and innovation networks, with explicit provenance and limitations.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/cases/california-ai" },
  openGraph: { title, description, images: [{ url: "/california-ai-og.png", width: 1200, height: 630, alt: "NEXORA California AI Innovation Ecosystem flagship case" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/california-ai-og.png"] },
};

export default function CaliforniaAIPage() { return <CaliforniaAIFlagship />; }
