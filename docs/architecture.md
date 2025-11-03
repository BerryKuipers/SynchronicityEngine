# Architecture Overview

SynchronicityEngine separates experience delivery from engine orchestration. The engine exposes deterministic progression through scenes, traits, and vibrational states. Applications integrate through the shared domain contracts to coordinate gameplay across transports.

## Layers

- **Engine core** orchestrates progression, scheduling, and state resolution.
- **Shared contracts** provide canonical action and narrative definitions.
- **Backend API** persists sessions and exposes synchronous and asynchronous actions.
- **Frontend client** renders scenes and collects player input.

## Data flow

1. The frontend requests the current scene summary for a session.
2. The backend delegates to the engine, which resolves narrative updates.
3. The engine returns an immutable snapshot and generated narrative.
4. The backend persists the snapshot and emits it back to the client.
5. The client renders the snapshot and offers valid actions derived from the engine output.

## Engine packages

- `packages/engine` houses the Synchronicity runtime and agent coordination.
- `packages/shared` contains domain primitives shared across all layers.
