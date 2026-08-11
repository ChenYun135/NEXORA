import assert from "node:assert/strict";
import test from "node:test";

import { canonicalDataStates, integrationRelease, productJourney } from "../domain/product.ts";
import { parseAtlasQuery, parseRadarQuery, safeQueryValue } from "../lib/product-query.ts";

test("defines the canonical eight-step product journey", () => {
  assert.deepEqual(productJourney.map((item) => item.id), ["data-status", "atlas", "radar", "ecosystems", "policy", "companies", "ai", "simulator"]);
  assert.ok(productJourney.every((item) => item.name.en && item.name.zh && item.description.en && item.description.zh));
  assert.equal(integrationRelease.version, "Post-Sprint Integration v1");
});

test("keeps the canonical trust vocabulary complete", () => {
  assert.deepEqual(canonicalDataStates, ["Public Data", "Normalized Data", "Derived Metric", "Composite Score", "Demo Data", "Stale Data", "Unavailable", "Simulated", "AI Interpretation"]);
});

test("Atlas accepts stable region IDs, legacy names and technology context", () => {
  assert.deepEqual(parseAtlasQuery("?region=sf&technology=ai-agents"), { regionId: "sf", technologyId: "ai-agents", industryId: "ai" });
  assert.equal(parseAtlasQuery("?region=San%20Francisco%20Bay%20Area").regionId, "sf");
  assert.equal(parseAtlasQuery("?industry=robotics").industryId, "robotics");
});

test("Radar accepts supported technology and region handoffs", () => {
  assert.deepEqual(parseRadarQuery("?technology=ai-agents&region=London"), { technologyId: "ai-agents", region: "London" });
  assert.deepEqual(parseRadarQuery("?technology=missing&region=Missing"), { technologyId: undefined, region: undefined });
});

test("query values reject control and path-like payloads", () => {
  assert.equal(safeQueryValue("ai-agents"), "ai-agents");
  assert.equal(safeQueryValue("../secret"), undefined);
  assert.equal(safeQueryValue("<script>"), undefined);
  assert.equal(safeQueryValue("x".repeat(81)), undefined);
});
