import { LogRecord } from './types.js'
import fs from 'fs'
import path from 'path'

export interface ILogSink {
  write(r: LogRecord): void
}

export function createNdjsonLogger(dir: string, app: string): ILogSink {
  function getLogFilePath(): string {
    const now = new Date()
    const year = now.getUTCFullYear()
    const month = (now.getUTCMonth() + 1).toString().padStart(2, '0')
    const day = now.getUTCDate().toString().padStart(2, '0')
    const logDir = path.join(dir, `${year}-${month}-${day}`)
    fs.mkdirSync(logDir, { recursive: true })
    return path.join(logDir, `${app}.ndjson`)
  }

  return {
    write(r: LogRecord): void {
      const filePath = getLogFilePath()
      fs.appendFileSync(filePath, JSON.stringify(r) + '\n')
    },
  }
}
