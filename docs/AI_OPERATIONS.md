# AI Operations

Run `npm run test:ai` for offline copilot evaluation and `npm test` for the full production build and regression suite. Also run lint, TypeScript, secret-pattern scanning, and client-bundle inspection before deployment.

Operational limits are centralized in `services/ai/config.ts`: 600-character queries, 24 evidence items, six context IDs per category, 1,800-character answer budget, 20-second provider timeout, and 30 requests/minute per coarse client bucket. Failures return safe codes without provider payloads. Version, provider, snapshots, and cache key are returned for reproducibility.
