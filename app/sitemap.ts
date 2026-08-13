import type { MetadataRoute } from "next";

const routes = ["", "/data-status", "/atlas", "/radar", "/ecosystems", "/policy", "/companies", "/ai", "/simulator", "/methodology", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "https://nexora-future-intelligence.chenyunwh2010.chatgpt.site";
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: "2026-08-13", changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : .8 }));
}
