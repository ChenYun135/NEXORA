import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";

const css=fs.readFileSync("app/r5-premium.css","utf8");
const layout=fs.readFileSync("app/layout.tsx","utf8");
const simulator=fs.readFileSync("components/nexora-simulator.tsx","utf8");

test("R5 premium layer is loaded after prior refinements",()=>{
 assert.match(layout,/r4-premium\.css[\s\S]*r5-premium\.css/);
});

test("Atlas primary markers have a circular computed contract",()=>{
 assert.match(css,/\[class\*="_hotspot_"\]\{[^}]*aspect-ratio:1\/1!important;[^}]*width:var\(--size\)!important;[^}]*height:var\(--size\)!important;[^}]*border-radius:50%!important/);
 assert.match(css,/data-tier="primary"/);
 assert.match(css,/data-tier="secondary"/);
 assert.match(css,/data-tier="context"/);
});

test("Meaningful type is readable and Chinese titles retain editorial control",()=>{
 assert.match(css,/button,select,input,textarea,label,td,th,dt,dd,summary\)\{font-size:max\(14px,1em\)/);
 assert.match(css,/html\[lang="zh"\].*text-wrap:pretty/);
});

test("R5 visually distinguishes radar signals and network roles",()=>{
 assert.match(css,/data-family="advanced-computing"/);
 assert.match(css,/data-role="anchor"/);
 assert.match(css,/data-role="bridge"/);
 assert.match(css,/data-community="research"/);
});

test("Simulator result includes a human-readable decision brief",()=>{
 assert.match(simulator,/r5-decision-brief/);
 assert.match(simulator,/BINDING BOTTLENECK/);
 assert.match(simulator,/WHAT TO WATCH/);
 assert.match(simulator,/Scenario ≠ Prediction/);
});

test("Public R5 source contains no private paper paths",()=>{
 for(const file of ["app/r5-premium.css","components/nexora-simulator.tsx","docs/NEXORA_R5_PREMIUM_PRODUCT_REPORT.md"]){
  const text=fs.existsSync(file)?fs.readFileSync(file,"utf8"):"";
  assert.doesNotMatch(text,/research\\paper-|research\/paper-|Paper 0[123]/i);
 }
});
