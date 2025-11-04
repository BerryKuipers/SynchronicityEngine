export type TraceId = string
export type RunId = string
export type SpanId = string
export type TracePhase = 'assemble'|'generate'|'validate'|'apply'
export type TraceEdge = 'causes'|'modulates'|'reads'|'writes'
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

export type LogLevel = 'debug'|'info'|'warn'|'error'
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
