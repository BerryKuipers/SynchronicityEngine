import { FastifyInstance } from 'fastify'
import { LogIndexer, LogRecord } from '@synchronicity/trace'
import fs from 'fs'
import path from 'path'
import readline from 'readline'
import { PassThrough } from 'stream'

export default async function (fastify: FastifyInstance) {
  const { logSink, traceSink } = fastify

  const indexer = new LogIndexer()

  async function loadLogsForDate(date: string, app: string) {
    const filePath = path.join('var/logs', date, `${app}.ndjson`)
    try {
      const fileStream = fs.createReadStream(filePath)
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      })

      for await (const line of rl) {
        const record = JSON.parse(line)
        indexer.add(record)
      }
    } catch (error) {
      // Ignore errors if the file doesn't exist
    }
  }

  // Load today's logs into the indexer
  const today = new Date().toISOString().split('T')[0]
  await loadLogsForDate(today, 'backend')

  fastify.get('/api/v1/logs/tail', async (request, reply) => {
    const { lines = 200, level = 'info' } = request.query as { lines?: number, level?: string }
    const today = new Date().toISOString().split('T')[0]
    const logs = await getLogs(today, 'backend')
    const filteredLogs = logs.filter(log => log.level === level).slice(-lines)
    reply.send(filteredLogs)
  })

  fastify.post('/api/v1/logs/search', async (request, reply) => {
    const {
      fromTs,
      toTs,
      level,
      traceId,
      runId,
      spanId,
      layer,
      phase,
      topic,
      text,
      limit = 1000,
    } = request.body as any

    const today = new Date().toISOString().split('T')[0]
    const logs = await getLogs(today, 'backend')

    const filteredLogs = logs.filter(log => {
      if (fromTs && log.ts < fromTs) return false
      if (toTs && log.ts > toTs) return false
      if (level && log.level !== level) return false
      if (traceId && log.traceId !== traceId) return false
      if (runId && log.runId !== runId) return false
      if (spanId && log.spanId !== spanId) return false
      if (layer && log.layer !== layer) return false
      if (phase && log.phase !== phase) return false
      if (topic && log.topic !== topic) return false
      if (text && !log.msg.includes(text)) return false
      return true
    })

    reply.send(filteredLogs.slice(0, limit))
  })

  fastify.get('/api/v1/trace/:traceId/logs', async (request, reply) => {
    const { traceId } = request.params as { traceId: string }
    const logs = indexer.findByTraceId(traceId)
    reply.send(logs)
  })

  fastify.get('/api/v1/logs/stream', (request, reply) => {
    const { level = 'info' } = request.query as { level?: string }

    reply.raw.setHeader('Content-Type', 'text/event-stream')
    reply.raw.setHeader('Cache-Control', 'no-cache')
    reply.raw.setHeader('Connection', 'keep-alive')

    const stream = new PassThrough()

    const sendLog = (log: LogRecord) => {
      if (log.level === level) {
        stream.write(`data: ${JSON.stringify(log)}\n\n`)
      }
    }

    const today = new Date().toISOString().split('T')[0]
    const filePath = path.join('var/logs', today, 'backend.ndjson')
    let fileSize = fs.existsSync(filePath) ? fs.statSync(filePath).size : 0

    const watcher = fs.watch(filePath, (eventType) => {
      if (eventType === 'change') {
        const newSize = fs.statSync(filePath).size
        const stream = fs.createReadStream(filePath, { start: fileSize, end: newSize })
        const rl = readline.createInterface({ input: stream })
        rl.on('line', (line) => {
          const record = JSON.parse(line)
          sendLog(record)
        })
        fileSize = newSize
      }
    })

    stream.pipe(reply.raw)

    request.raw.on('close', () => {
      watcher.close()
    })
  })

  async function getLogs(date: string, app: string): Promise<LogRecord[]> {
    const filePath = path.join('var/logs', date, `${app}.ndjson`)
    try {
      const fileStream = fs.createReadStream(filePath)
      const rl = readline.createInterface({
        input: fileStream,
        crlfDelay: Infinity,
      })

      const logs: LogRecord[] = []
      for await (const line of rl) {
        logs.push(JSON.parse(line))
      }
      return logs
    } catch (error) {
      return []
    }
  }
}
