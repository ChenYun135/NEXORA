# System Dynamics Model / 系统动力学模型

## Purpose

`Innovation Ecosystem Evolution Model v1` is a conceptual research model for asking “what may happen under these assumptions?” It is not an empirical forecast. Status: `PARTIALLY_CALIBRATED`.

## Structure

Nine bounded stocks represent research capacity, technology knowledge, commercialization capacity, startup base, skilled talent, innovation infrastructure, policy support, ecosystem connectivity, and market adoption. Twelve flows and four auxiliary variables connect them. Innovation output and talent pressure are derived outputs rather than observations.

The centralized equation registry is version `eq-v1.0.0`; the solver is deterministic annual Euler `euler-annual-v1.0.0`. Supported horizons are 5, 10, and 15 years. Delays are explicit for policy implementation, infrastructure, talent, and knowledge transfer. Diminishing returns and balancing pressure prevent unchecked exponential narratives. Stocks are bounded to the documented 0–120 research scale; a clamp produces a warning.

## Feedback

- Research → knowledge → commercialization → adoption is reinforcing.
- Connectivity improves diffusion and transfer, but centrality is a modifier—not proof of causality.
- Talent pressure and startup attrition are balancing loops.
- Policy support acts through delayed implementation and does not directly guarantee outcomes.

Every run stores model, equation, solver, scenario, parameter, context, and evidence snapshot versions plus a reproducibility hash.
