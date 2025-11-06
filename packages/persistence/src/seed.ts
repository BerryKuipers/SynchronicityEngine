import { loadEnvFromRoot } from './config.js';

// Load .env from project root
loadEnvFromRoot();

import { createSession, startRun } from './repositories.js'
const s = crypto.randomUUID()
const r = crypto.randomUUID()
await createSession(s, 'dev')
await startRun(r, s)
