import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PublicFooter } from "@/components/public-footer";
import "./globals.css";
import "./editorial-overrides.css";
import "./visual-refinement-v2-1.css";
import "./v3-1-hardening.css";
import "./r4-premium.css";
import "./r5-premium.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const title = "NEXORA — Future Industry Intelligence";
const description = "Evidence-based intelligence for emerging industries, connecting public data, research signals, organizations, policy, innovation networks, and scenario analysis.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://nexora-future-intelligence.chenyunwh2010.chatgpt.site"),
  title,
  description,
  alternates: { canonical: "/" },
  applicationName: "NEXORA",
  authors: [{ name: "NEXORA Project" }],
  icons: { icon: "/favicon.svg" },
  robots: { index: true, follow: true },
  openGraph: { type: "website", siteName: "NEXORA", locale: "en_US", title, description, images: [{ url: "/og.png", width: 1200, height: 630, alt: "NEXORA future industry intelligence" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}<PublicFooter /></body></html>;
}
