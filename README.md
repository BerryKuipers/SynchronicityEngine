# SynchronicityEngine Monorepo

SynchronicityEngine is a modular TypeScript monorepo that powers an expandable text-first game engine. The workspace includes a Fastify backend, a Vite + React frontend, and reusable packages for shared contracts and engine orchestration.

## Getting started

```bash
npm install
npm run dev
```

## Workspace layout

- `apps/frontend` exposes the interactive client.
- `apps/backend` provides API access to the engine.
- `packages/engine` implements the core Synchronicity runtime.
- `packages/shared` hosts shared domain contracts and utilities.

## Development scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Starts all workspace development servers. |
| `npm run build` | Builds every workspace package and app. |
| `npm run lint` | Runs ESLint across all workspaces. |
| `npm run typecheck` | Runs TypeScript in type-check only mode across all workspaces. |

## Licensing

All contributions default to the repository license.
