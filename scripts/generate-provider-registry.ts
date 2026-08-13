import { mkdir, writeFile } from "node:fs/promises";
import { publicProviderRegistry, providerSummary } from "../data/providers/registry.ts";

const payload={schemaVersion:"2.0.0",generatedAt:"2026-08-13",summary:providerSummary(),providers:publicProviderRegistry};
await mkdir("public/research",{recursive:true});
await mkdir("data/exports/research",{recursive:true});
const json=`${JSON.stringify(payload,null,2)}\n`;
await writeFile("public/research/provider-registry.json",json,"utf8");
await writeFile("data/exports/research/provider-registry.json",json,"utf8");
console.log(`provider registry: ${payload.summary.total} providers; ${payload.summary.tierAReady} Tier A ready`);
