import { LogRecord } from './types'

// TODO: This is a placeholder implementation. A more robust implementation
// would use a proper in-memory database or a more efficient indexing strategy.
export class LogIndexer {
  private byTraceId = new Map<string, LogRecord[]>()
  private byRunId = new Map<string, LogRecord[]>()
  private byTopic = new Map<string, LogRecord[]>()

  add(record: LogRecord) {
    if (record.traceId) {
      if (!this.byTraceId.has(record.traceId)) {
        this.byTraceId.set(record.traceId, [])
      }
      this.byTraceId.get(record.traceId)?.push(record)
    }

    if (record.runId) {
      if (!this.byRunId.has(record.runId)) {
        this.byRunId.set(record.runId, [])
      }
      this.byRunId.get(record.runId)?.push(record)
    }

    if (!this.byTopic.has(record.topic)) {
      this.byTopic.set(record.topic, [])
    }
    this.byTopic.get(record.topic)?.push(record)
  }

  findByTraceId(traceId: string): LogRecord[] {
    return this.byTraceId.get(traceId) || []
  }

  findByRunId(runId: string): LogRecord[] {
    return this.byRunId.get(runId) || []
  }

  findByTopic(topic: string): LogRecord[] {
    return this.byTopic.get(topic) || []
  }
}
