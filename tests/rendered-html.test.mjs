import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname="/"){
 const workerUrl=new URL("../dist/server/index.js",import.meta.url);workerUrl.searchParams.set("test",`${process.pid}-${Date.now()}-${pathname}`);
 const {default:worker}=await import(workerUrl.href);
 return worker.fetch(new Request(`http://localhost${pathname}`,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},{waitUntil(){},passThroughOnException(){}});
}
test("renders the NEXORA product routes",async()=>{
 for(const [path,expected] of [["/","Map what"],["/atlas","NEXORA Atlas"],["/radar","NEXORA Radar"],["/ecosystems","NEXORA Ecosystems"],["/policy","NEXORA Policy Intelligence"]]){const response=await render(path);assert.equal(response.status,200);assert.match(response.headers.get("content-type")??"",/^text\/html\b/i);assert.match(await response.text(),new RegExp(expected,"i"));}
});
test("Ecosystems exposes network intelligence, trust and cross-navigation",async()=>{
 const html=await(await render("/ecosystems")).text();assert.match(html,/Map the networks behind innovation/i);assert.match(html,/Innovation network canvas/i);assert.match(html,/DEMO/i);assert.match(html,/Evidence coverage/i);assert.match(html,/Ecosystem Health/i);assert.match(html,/\/atlas\?region=/i);assert.match(html,/\/radar\?technology=/i);
 const [component,css]=await Promise.all([readFile(new URL("../components/ecosystems.tsx",import.meta.url),"utf8"),readFile(new URL("../components/ecosystems.module.css",import.meta.url),"utf8")]);assert.match(component,/setLang\("zh"\)/);assert.match(component,/betweennessCentrality/);assert.match(component,/neighborhood/);assert.match(css,/prefers-reduced-motion:\s*reduce/);
});
test("Policy exposes evidence-oriented intelligence and integrated navigation",async()=>{
 const html=await(await render("/policy")).text();assert.match(html,/Understand the policy forces shaping emerging industries/i);assert.match(html,/Policy Landscape/i);assert.match(html,/Policy Explorer/i);assert.match(html,/Observed Public Fact/i);assert.match(html,/Derived Classification/i);assert.match(html,/NEXORA Interpretation/i);assert.match(html,/Jurisdiction Comparison/i);assert.match(html,/not legal or regulatory advice/i);assert.match(html,/\/atlas\?region=/i);assert.match(html,/\/radar\?technology=/i);assert.match(html,/\/ecosystems\?technology=/i);
 const [component,css]=await Promise.all([readFile(new URL("../components/policy-intelligence.tsx",import.meta.url),"utf8"),readFile(new URL("../components/policy-intelligence.module.css",import.meta.url),"utf8")]);assert.match(component,/setLang\("zh"\)/);assert.match(component,/filterPolicies/);assert.match(component,/parsePolicyQuery/);assert.match(css,/prefers-reduced-motion:\s*reduce/);
});
test("Radar exposes trust, interaction and cross-navigation",async()=>{
 const html=await(await render("/radar")).text();
 assert.match(html,/Detect the signals shaping tomorrow/i);assert.match(html,/Emerging Opportunity Radar/i);assert.match(html,/Signal Explorer/i);assert.match(html,/DEMO DATA/i);assert.match(html,/\/atlas\?region=/i);
 const [component,css]=await Promise.all([readFile(new URL("../components/radar.tsx",import.meta.url),"utf8"),readFile(new URL("../components/radar.module.css",import.meta.url),"utf8")]);
 assert.match(component,/setLang\("zh"\)/);assert.match(component,/setSelectedId/);assert.match(component,/technologyMatchesFilters/);assert.match(css,/prefers-reduced-motion:\s*reduce/);
});
test("does not restore starter preview metadata",async()=>{const layout=await readFile(new URL("../app/layout.tsx",import.meta.url),"utf8");assert.doesNotMatch(layout,/codex-preview|Your site is taking shape|SkeletonPreview/);});
