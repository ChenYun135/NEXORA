import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render(pathname="/"){
 const workerUrl=new URL("../dist/server/index.js",import.meta.url);workerUrl.searchParams.set("test",`${process.pid}-${Date.now()}-${pathname}`);
 const {default:worker}=await import(workerUrl.href);
 return worker.fetch(new Request(`http://localhost${pathname}`,{headers:{accept:"text/html"}}),{ASSETS:{fetch:async()=>new Response("Not found",{status:404})}},{waitUntil(){},passThroughOnException(){}});
}
test("renders the NEXORA product routes",async()=>{
 for(const [path,expected] of [["/","Map what"],["/atlas","NEXORA Atlas"],["/radar","NEXORA Radar"]]){const response=await render(path);assert.equal(response.status,200);assert.match(response.headers.get("content-type")??"",/^text\/html\b/i);assert.match(await response.text(),new RegExp(expected,"i"));}
});
test("Radar exposes trust, interaction and cross-navigation",async()=>{
 const html=await(await render("/radar")).text();
 assert.match(html,/Detect the signals shaping tomorrow/i);assert.match(html,/Emerging Opportunity Radar/i);assert.match(html,/Signal Explorer/i);assert.match(html,/DEMO DATA/i);assert.match(html,/\/atlas\?region=/i);
 const [component,css]=await Promise.all([readFile(new URL("../components/radar.tsx",import.meta.url),"utf8"),readFile(new URL("../components/radar.module.css",import.meta.url),"utf8")]);
 assert.match(component,/setLang\("zh"\)/);assert.match(component,/setSelectedId/);assert.match(component,/technologyMatchesFilters/);assert.match(css,/prefers-reduced-motion:\s*reduce/);
});
test("does not restore starter preview metadata",async()=>{const layout=await readFile(new URL("../app/layout.tsx",import.meta.url),"utf8");assert.doesNotMatch(layout,/codex-preview|Your site is taking shape|SkeletonPreview/);});
