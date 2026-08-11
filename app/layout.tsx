import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const mono = Geist_Mono({ variable: "--font-mono", subsets: ["latin"] });
const title = "NEXORA — Future Industry Intelligence";
const description = "Evidence-based intelligence for mapping emerging industries, detecting signals, understanding ecosystems and exploring scenarios.";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_URL ?? "https://nexora-future-intelligence.chenyunwh2010.chatgpt.site"),
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: { title, description, images: [{ url: "/og.png", width: 1733, height: 909, alt: "NEXORA future industry intelligence" }] },
  twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${geist.variable} ${mono.variable}`}>{children}</body></html>;
}
