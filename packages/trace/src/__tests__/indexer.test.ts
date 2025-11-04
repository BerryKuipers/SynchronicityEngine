import { LogIndexer } from '../indexer'
import { LogRecord } from '../types'

describe('LogIndexer', () => {
  it('should index and retrieve logs by traceId', () => {
    const indexer = new LogIndexer()
    const record: LogRecord = {
      ts: Date.now(),
      level: 'info',
      topic: 'test',
      msg: 'test message',
      traceId: 'test-trace',
    }

    indexer.add(record)

    const logs = indexer.findByTraceId('test-trace')
    expect(logs).toHaveLength(1)
    expect(logs[0]).toEqual(record)
  })

  it('should index and retrieve logs by topic', () => {
    const indexer = new LogIndexer()
    const record: LogRecord = {
      ts: Date.now(),
      level: 'info',
      topic: 'test-topic',
      msg: 'test message',
    }

    indexer.add(record)

    const logs = indexer.findByTopic('test-topic')
    expect(logs).toHaveLength(1)
    expect(logs[0]).toEqual(record)
  })
})
