import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from project root
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../../../.env') });

import { createSession, startRun } from './repositories.js'
const s = crypto.randomUUID()
const r = crypto.randomUUID()
await createSession(s, 'dev')
await startRun(r, s)
