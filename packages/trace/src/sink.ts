import { TraceSpan, TraceId } from './types.js'
import fs from 'fs'
import path from 'path'

export interface ITraceSink {
  append(span: TraceSpan): void
  head(traceId: TraceId): TraceSpan[]
  get(traceId: TraceId): TraceSpan[]
}

export function createInMemoryWithNdjson(dir: string): ITraceSink {
  const traces = new Map<TraceId, TraceSpan[]>()
  fs.mkdirSync(dir, { recursive: true })

  return {
    append(span: TraceSpan): void {
      if (!traces.has(span.traceId)) {
        traces.set(span.traceId, [])
      }
      traces.get(span.traceId)?.push(span)
      fs.appendFileSync(path.join(dir, `${span.traceId}.ndjson`), JSON.stringify(span) + '\n')
    },

    head(traceId: TraceId): TraceSpan[] {
      // For now, returning all spans.
      // TODO: Implement proper head logic
      return traces.get(traceId) || []
    },



    get(traceId: TraceId): TraceSpan[] {
      return traces.get(traceId) || []
    },
  }
}
