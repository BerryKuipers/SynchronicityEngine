import { createNdjsonLogger, ILogSink } from '../log'
import { LogRecord } from '../types'
import fs from 'fs'
import path from 'path'

describe('createNdjsonLogger', () => {
  const logDir = 'var/test-logs'
  let sink: ILogSink

  beforeEach(() => {
    fs.mkdirSync(logDir, { recursive: true })
    sink = createNdjsonLogger(logDir, 'test-app')
  })

  afterEach(() => {
    fs.rmSync(logDir, { recursive: true, force: true })
  })

  it('should write a log record to the correct ndjson file', () => {
    const record: LogRecord = {
      ts: Date.now(),
      level: 'info',
      topic: 'test',
      msg: 'test message',
    }

    sink.write(record)

    const today = new Date()
    const year = today.getUTCFullYear()
    const month = (today.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = today.getUTCDate().toString().padStart(2, '0')
    const logFilePath = path.join(logDir, `${year}-${month}-${day}`, 'test-app.ndjson')

    const ndjson = fs.readFileSync(logFilePath, 'utf-8')
    expect(ndjson).toEqual(JSON.stringify(record) + '\n')
  })
})
