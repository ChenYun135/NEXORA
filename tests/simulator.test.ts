import test from "node:test";
import assert from "node:assert/strict";
import { innovationEcosystemModelV1 } from "../simulation/model/model-v1.ts";
import { calibrationCoverage, calibrationRecords, modelEvidence } from "../simulation/calibration/calibration.ts";
import { defaultParameters, modelParameters } from "../simulation/parameters/parameters.ts";
import { scenarios, scenarioById } from "../simulation/scenarios/scenarios.ts";
import { clearSimulationCache, compareToBaseline, runSimulation, validateScenario } from "../simulation/solver/solver.ts";
import { oneWaySensitivity, sensitivityRanking } from "../simulation/sensitivity/sensitivity.ts";
import { scenarioToJson, simulationToCsv } from "../simulation/exports/exports.ts";

const baseline = scenarioById("baseline");

test("model registry is typed, versioned, and partially calibrated", () => {
  assert.equal(innovationEcosystemModelV1.version, "sim-model-v1.0.0");
  assert.equal(innovationEcosystemModelV1.status, "PARTIALLY_CALIBRATED");
  assert.equal(innovationEcosystemModelV1.stocks.length, 9);
  assert.equal(innovationEcosystemModelV1.flows.length, 12);
  assert.equal(innovationEcosystemModelV1.auxiliaries.length, 4);
  assert.equal(innovationEcosystemModelV1.feedbackLoops.filter(x => x.type === "REINFORCING").length, 2);
  assert.equal(innovationEcosystemModelV1.feedbackLoops.filter(x => x.type === "BALANCING").length, 2);
});

test("equation registry has unique targets and resolvable dependencies", () => {
  const ids = new Set(modelParameters.map(x => x.id));
  const variableIds = new Set([
    ...innovationEcosystemModelV1.stocks.map(x => x.id),
    ...innovationEcosystemModelV1.auxiliaries.map(x => x.id),
  ]);
  assert.equal(new Set(innovationEcosystemModelV1.equations.map(x => x.targetVariable)).size, innovationEcosystemModelV1.equations.length);
  for (const equation of innovationEcosystemModelV1.equations) {
    assert.ok(variableIds.has(equation.targetVariable as never));
    assert.ok(equation.dependencies.every(id => ids.has(id as never) || variableIds.has(id as never)));
    assert.equal(equation.version, "eq-v1.0.0");
  }
});

test("all parameters have valid defaults, review ranges, bilingual names, and channels", () => {
  assert.equal(modelParameters.length, 26);
  for (const p of modelParameters) {
    assert.ok(p.defaultValue >= p.min && p.defaultValue <= p.max, p.id);
    assert.ok(p.sensitivityRange[0] >= p.min && p.sensitivityRange[1] <= p.max, p.id);
    assert.ok(p.name.en && p.name.zh && p.modelChannel.en && p.modelChannel.zh, p.id);
    assert.equal(defaultParameters[p.id], p.defaultValue);
  }
});

test("catalog provides baseline, nine prototype scenarios, and the California AI case preset", () => {
  assert.equal(scenarios.length, 11);
  assert.equal(scenarios[0].id, "baseline");
  assert.ok(scenarios.slice(0,10).every(x => x.isDemo && x.name.en && x.name.zh && x.modelVersion === innovationEcosystemModelV1.version));
  assert.equal(scenarioById("california-ai-baseline").isDemo, false);
  assert.doesNotThrow(() => runSimulation(scenarioById("california-ai-baseline")));
  assert.match(scenarios[0].description.en, /not the most likely/i);
});

test("baseline is deterministic and cache-safe", () => {
  clearSimulationCache();
  const a = runSimulation(baseline, {}, undefined, 10);
  const b = runSimulation(baseline, {}, undefined, 10);
  assert.equal(a.reproducibilityHash, b.reproducibilityHash);
  assert.deepEqual(a.outputs.series, b.outputs.series);
  assert.equal(a.startedAt, a.completedAt);
});

test("5, 10, and 15 year runs preserve time and numerical invariants", () => {
  for (const horizon of [5, 10, 15] as const) {
    const run = runSimulation(baseline, {}, undefined, horizon);
    assert.equal(run.outputs.series[0].points.length, horizon + 1);
    assert.deepEqual(run.quality.finite, true);
    assert.deepEqual(run.quality.nonNegative, true);
    assert.deepEqual(run.quality.timeOrdered, true);
    for (const series of run.outputs.series) {
      assert.ok(series.points.every((p, i) => Number.isFinite(p.value) && p.value >= 0 && p.year === i));
    }
  }
});

test("unsupported horizons, out-of-range values, and model mismatches fail validation", () => {
  assert.equal(validateScenario(baseline, {}, 7 as never).valid, false);
  assert.equal(validateScenario(baseline, { publicResearchSupport: 9 }).valid, false);
  assert.equal(validateScenario({ ...baseline, modelVersion: "unknown" }, {}).valid, false);
  assert.throws(() => runSimulation(baseline, { publicResearchSupport: 9 }));
});

test("commercialization support and research support have directionally sane outputs", () => {
  const base = runSimulation(baseline, {}, undefined, 10);
  const commercial = runSimulation(scenarioById("commercialization-led"), {}, undefined, 10);
  const research = runSimulation(scenarioById("research-led"), {}, undefined, 10);
  assert.ok(commercial.outputs.finalValues.commercializationCapacity >= base.outputs.finalValues.commercializationCapacity);
  assert.ok(research.outputs.finalValues.researchCapacity >= base.outputs.finalValues.researchCapacity);
});

test("implementation lag changes the path without changing observed inputs", () => {
  const fast = runSimulation(baseline, { infrastructureLag: 0, researchInfrastructure: .8 }, undefined, 10);
  const slow = runSimulation(baseline, { infrastructureLag: 4, researchInfrastructure: .8 }, undefined, 10);
  assert.notDeepEqual(
    fast.outputs.series.find(x => x.id === "infrastructure")?.points,
    slow.outputs.series.find(x => x.id === "infrastructure")?.points,
  );
  assert.deepEqual(fast.inputSnapshotIds, slow.inputSnapshotIds);
});

test("minimum and maximum reviewed inputs remain finite and bounded", () => {
  const minimum = Object.fromEntries(modelParameters.map(x => [x.id, x.min]));
  const maximum = Object.fromEntries(modelParameters.map(x => [x.id, x.max]));
  for (const run of [runSimulation(baseline, minimum, undefined, 15), runSimulation(baseline, maximum, undefined, 15)]) {
    assert.ok(run.quality.finite && run.quality.nonNegative);
    for (const id of innovationEcosystemModelV1.stocks.map(x => x.id)) assert.ok(run.outputs.finalValues[id as keyof typeof run.outputs.finalValues] <= 120);
  }
});

test("comparison computes baseline deltas for every output", () => {
  const base = runSimulation(baseline);
  const compared = compareToBaseline(runSimulation(scenarioById("balanced-policy")), base);
  assert.equal(Object.keys(compared.outputs.baselineDeltas ?? {}).length, compared.outputs.series.length);
  assert.ok(compared.outputs.baselineDeltas);
  assert.equal(compared.outputs.baselineDeltas.researchCapacity!.absolute, Number((compared.outputs.finalValues.researchCapacity - base.outputs.finalValues.researchCapacity).toFixed(1)));
});

test("one-way sensitivity uses five points and produces a stable ranking", () => {
  const result = oneWaySensitivity(baseline, "researchProductivity");
  assert.equal(result.points.length, 5);
  assert.ok(result.points.every((x, i) => i === 0 || x.parameterValue > result.points[i - 1].parameterValue));
  const ranking = sensitivityRanking(baseline, "innovationOutput", undefined, 8);
  assert.equal(ranking.results.length, 8);
  assert.ok(ranking.results.every((x, i) => i === 0 || x.sensitivityStrength <= ranking.results[i - 1].sensitivityStrength));
});

test("calibration coverage and unavailable evidence remain explicit", () => {
  assert.deepEqual(calibrationCoverage, { observed: 11.1, derived: 11.1, assumption: 77.8, unavailable: 3, basis: calibrationCoverage.basis });
  assert.equal(calibrationRecords.filter(x => x.classification === "OBSERVED_CALIBRATED").length, 1);
  assert.equal(calibrationRecords.filter(x => x.classification === "DERIVED_CALIBRATED").length, 1);
  assert.equal(calibrationRecords.filter(x => x.classification === "NEXORA_ASSUMPTION").length, 7);
  assert.ok(modelEvidence.some(x => x.id === "ev-missing-patents" && x.classification === "UNAVAILABLE_INPUT"));
});

test("runs warn about assumptions and do not turn missing patents into zero", () => {
  const run = runSimulation(baseline);
  assert.ok(run.warnings.some(x => x.code === "ASSUMPTION_HEAVY"));
  assert.ok(run.warnings.some(x => x.code === "MISSING_PATENT_CALIBRATION"));
  assert.ok(!JSON.stringify(run).includes('"patent":0'));
});

test("CSV and JSON exports preserve time series and reproducibility metadata", () => {
  const run = runSimulation(baseline, {}, undefined, 5);
  const csv = simulationToCsv(run);
  assert.match(csv, /^year,researchCapacity/);
  assert.equal(csv.split("\n").length, 7);
  const json = JSON.parse(scenarioToJson(baseline, run));
  assert.equal(json.schemaVersion, "nexora-scenario-export-v1");
  assert.equal(json.run.reproducibilityHash, run.reproducibilityHash);
  assert.equal(json.run.modelVersion, "sim-model-v1.0.0");
});

test("model language avoids forecasts, guarantees, and optimization claims", () => {
  const text = JSON.stringify({ scenarios, model: innovationEcosystemModelV1 }).toLowerCase();
  assert.ok(!/will definitely|guaranteed outcome|optimal policy|forecast probability/.test(text));
});
