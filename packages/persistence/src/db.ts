import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from project root (../../.env relative to this file)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../../../.env') });

if (!process.env.DATABASE_URL) {
throw new Error('DATABASE_URL is not set')
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL })
export const db = drizzle(pool);
