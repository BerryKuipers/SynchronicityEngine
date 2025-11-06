import { createSession, startRun } from './repositories.js'
const s = crypto.randomUUID()
const r = crypto.randomUUID()
await createSession(s, 'dev')
await startRun(r, s)
