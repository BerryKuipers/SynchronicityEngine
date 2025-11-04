import { createInMemoryWithNdjson, ITraceSink } from '../sink'
import { TraceSpan } from '../types'
import fs from 'fs'
import path from 'path'

describe('createInMemoryWithNdjson', () => {
  const traceDir = 'var/test-traces'
  let sink: ITraceSink

  beforeEach(() => {
    fs.mkdirSync(traceDir, { recursive: true })
    sink = createInMemoryWithNdjson(traceDir)
  })

  afterEach(() => {
    fs.rmSync(traceDir, { recursive: true, force: true })
  })

  it('should append a span to the in-memory store and to the ndjson file', () => {
    const span: TraceSpan = {
      traceId: 'test-trace',
      runId: 'test-run',
      spanId: 'test-span',
      phase: 'assemble',
      ts: Date.now(),
    }

    sink.append(span)

    const spans = sink.get('test-trace')
    expect(spans).toHaveLength(1)
    expect(spans[0]).toEqual(span)

    const ndjson = fs.readFileSync(path.join(traceDir, 'test-trace.ndjson'), 'utf-8')
    expect(ndjson).toEqual(JSON.stringify(span) + '\n')
  })
})
