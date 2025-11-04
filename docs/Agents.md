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

## Observability Cookbook

This section provides guidance on how to use the observability features of the SynchronicityEngine to investigate and debug agent behavior.

### Log and Trace Correlation

All logs and traces are correlated by `traceId` and `runId`. When investigating an issue, start by finding the `traceId` for the operation in question. You can then use this `traceId` to retrieve all the logs and spans associated with that operation.

### Tailing Logs

To tail the logs in real-time, you can use the `/api/v1/logs/stream` endpoint. This will stream new log lines as they are written.

### Searching Logs

To search for specific log entries, you can use the `/api/v1/logs/search` endpoint. This endpoint allows you to filter logs by a variety of criteria, including `traceId`, `runId`, `topic`, and `level`.

### Example Prompts for Agents

- "Find all logs with a level of 'error' for traceId '123e4567-e89b-12d3-a456-426614174000'"
- "Show me all logs with the topic 'adapter.call' for the last hour"
- "Get the trace for runId 'abcdef123456'"
