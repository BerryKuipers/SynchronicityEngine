import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import { loadEnvFromRoot, getDatabaseUrl } from './config.js';

// Load .env from project root
loadEnvFromRoot();
const DATABASE_URL = getDatabaseUrl();

const pool = new Pool({ connectionString: DATABASE_URL })
export const db = drizzle(pool);
