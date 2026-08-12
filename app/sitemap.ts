import type { MetadataRoute } from "next";

const routes = ["", "/data-status", "/atlas", "/radar", "/ecosystems", "/policy", "/companies", "/ai", "/simulator", "/cases/california-ai", "/methodology", "/privacy", "/terms"];
export default function sitemap(): MetadataRoute.Sitemap {
  const base = process.env.SITE_URL ?? "https://nexora-future-intelligence.chenyunwh2010.chatgpt.site";
  return routes.map((route) => ({ url: `${base}${route}`, lastModified: "2026-08-11", changeFrequency: route === "" ? "weekly" : "monthly", priority: route === "" ? 1 : route === "/cases/california-ai" ? .9 : .8 }));
}
