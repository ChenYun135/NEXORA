import type { Metadata } from "next";
import { CaliforniaAIFlagship } from "@/components/california-ai-flagship";

const title = "California AI Innovation Ecosystem | NEXORA Flagship Case";
const description = "Evidence-based mapping of California AI research, organizations, policy and innovation networks. Private research flagship case.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, images: [{ url: "/california-ai-og.png", width: 1731, height: 909, alt: "NEXORA California AI Innovation Ecosystem flagship case" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/california-ai-og.png"] },
};

export default function CaliforniaAIPage() { return <CaliforniaAIFlagship />; }

