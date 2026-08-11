# Simulation Reproducibility / 模拟可复现性

A run is reproducible when the following are identical: model version, equation version, solver version, calibration/evidence snapshot IDs, scenario ID and version, context IDs, horizon, complete parameter vector, and annual time step.

The client solver is deterministic and performs no network call. Its stable cache key includes those inputs. Each run emits a reproducibility hash and timestamp. JSON export preserves metadata, parameters, warnings, time series, final outputs, bottleneck explanation, and comparison values. CSV export preserves yearly stock/output series.

To verify, import the recorded input values into the same source revision and confirm the run hash and series. A version change intentionally invalidates equivalence.
