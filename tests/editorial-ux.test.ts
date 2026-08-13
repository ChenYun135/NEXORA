import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const read = (path: string) => readFile(new URL(`../${path}`, import.meta.url), "utf8");

test("homepage carousel exposes exactly one 100 percent slide at rest", async () => {
  const [component, css] = await Promise.all([read("components/editorial/ModuleShowcase.tsx"), read("components/editorial/module-showcase.module.css")]);
  assert.match(css, /overflow:\s*hidden/);
  assert.match(css, /flex:\s*0 0 100%/);
  assert.match(component, /translate3d\(-\$\{active\s*\*\s*100\}%/);
  assert.match(component, /aria-hidden=\{active!==i\}/);
  assert.match(component, /tabIndex=\{active===i\?0:-1\}/);
  assert.doesNotMatch(component, /autoplay|setInterval/i);
});

test("display headings and typography use the V3.1 rules", async () => {
  const [dashboard, shell, hardening] = await Promise.all([read("components/dashboard.tsx"), read("components/editorial/ResearchModuleShell.tsx"), read("app/v3-1-hardening.css")]);
  assert.doesNotMatch(dashboard, /Map what(?:&apos;|’)s emerging\./);
  assert.doesNotMatch(dashboard, /Understand what drives it\./);
  assert.doesNotMatch(dashboard, /See what comes next\./);
  assert.match(shell, /displayHeading\(displaySubtitle\)/);
  for (const token of ["--zh-display", "--zh-heading", "--zh-body", "--zh-caption"]) assert.match(hardening, new RegExp(token));
  assert.match(hardening, /table,th,td\)\{font-size:14px/);
});

test("research interpretation and public export systems remain reusable", async () => {
  const [findings, exportUtility] = await Promise.all([read("components/editorial/ResearchFindings.tsx"), read("lib/research-export.ts")]);
  for (const name of ["ResearchFinding", "EvidenceFinding", "BoundaryNote", "ChartExplanation"]) assert.match(findings, new RegExp(`function ${name}`));
  for (const field of ["figureId", "dataSnapshot", "generatedDate", "sources", "variableDefinitions", "modelVersion"]) assert.match(exportUtility, new RegExp(field));
});
