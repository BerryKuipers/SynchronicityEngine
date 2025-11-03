# Agents Guidelines

This document defines guidelines for building AI agents that embody the layers of consciousness within the SynchronicityEngine. Each agent should be implemented as a class that adheres to the interfaces defined in `src/interfaces`. Agents should be self‑contained, mutable where appropriate, and avoid hard‑coded mocks.

## Principles

- **Single responsibility**: each agent encapsulates the logic for one consciousness layer only.
- **Statefulness**: agents maintain their own belief systems, vibration metrics and internal state.
- **Interactions**: communication between agents occurs through explicit method calls on the shared engine.
- **Extensibility**: new layers or behaviours can be added by implementing additional interfaces without modifying existing code.
- **TODO markers**: where functionality is incomplete, include `TODO:` to indicate work needed. Do not stub functions silently.
- **No mocks**: avoid returning fake data or placeholder responses inside production code. Use TODOs instead.

## Implementation Notes

Classes should use single quotes for string literals and avoid inline comments except where a `TODO:` is necessary. Use TypeScript’s typing system to enforce contract boundaries between layers. See the files under `src/layers` for examples of basic agent implementations.
