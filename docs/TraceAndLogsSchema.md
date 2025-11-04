# Trace and Logs Schema

This document defines the schema for the `TraceSpan` and `LogRecord` types used in the SynchronicityEngine.

## TraceSpan

A `TraceSpan` represents a single operation in a trace.

```typescript
export type TraceSpan = {
  traceId: TraceId
  runId: RunId
  spanId: SpanId
  parentSpanId?: SpanId
  layer?: 'physical'|'higher'|'soul'|'oversoul'|'subconscious'|'emotional'|'sync_router'
  phase: TracePhase
  seed?: string
  promptHash?: string
  components?: { lawPath?: string; personaPath?: string }
  inputs?: { beliefsDigest?: string; worldDigest?: string; blueprintDigest?: string; personaVersion?: string; lawVersion?: string; provider?: string }
  outputs?: { event?: unknown; deltas?: Record<string,number>; validated?: boolean; repaired?: boolean }
  reasons?: string[]
  edges?: { type: TraceEdge; to: SpanId }[]
  ts: number
}
```

## LogRecord

A `LogRecord` represents a single log entry.

```typescript
export type LogRecord = {
  ts: number
  level: LogLevel
  traceId?: string
  runId?: string
  spanId?: string
  layer?: 'physical'|'higher'|'soul'|'oversoul'|'subconscious'|'emotional'|'sync_router'
  phase?: 'assemble'|'generate'|'validate'|'apply'
  topic: string
  msg: string
  data?: Record<string, unknown>
  promptHash?: string
  seed?: string
  components?: { lawPath?: string; personaPath?: string }
}
```
