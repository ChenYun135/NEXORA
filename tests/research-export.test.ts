import assert from "node:assert/strict";
import test from "node:test";
import { embedSvgMetadata, publicationFigureTheme, researchRowsToCsv } from "../lib/research-export.ts";

const metadata = {
  figureId: "NX-FIG-001",
  dataSnapshot: "public-2026-08-12",
  generatedDate: "2026-08-12",
  sources: ["Provider B", "Provider A"],
  variableDefinitions: { value: "Observed value", region: "Public geography" },
  modelVersion: "public-v1",
};

test("research CSV output is deterministic and carries required metadata", () => {
  const rows = [{ value: 2, region: "B" }, { region: "A", value: 1 }];
  const first = researchRowsToCsv(rows, metadata);
  assert.equal(first, researchRowsToCsv(rows, metadata));
  assert.match(first, /# figure_id: NX-FIG-001/);
  assert.match(first, /# sources: Provider A \| Provider B/);
  assert.match(first, /region,value/);
});

test("SVG exports embed public research metadata", () => {
  const svg = embedSvgMetadata('<svg xmlns="http://www.w3.org/2000/svg"><circle r="2"/></svg>', metadata);
  assert.match(svg, /data-nexora-export="true"/);
  assert.match(svg, /NX-FIG-001/);
  assert.equal(publicationFigureTheme.background, "#ffffff");
  assert.equal(publicationFigureTheme.palette.length >= 5, true);
});
