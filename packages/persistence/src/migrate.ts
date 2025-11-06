import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load .env from project root (../../.env relative to this file)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
config({ path: join(__dirname, '../../../.env') });

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// This is a bit of a hack to get around the fact that the `db` object
// is a singleton and we need to end the connection pool after the migration.
// We create a new pool here and pass it to the migrator.
const pool = new pg.Pool({ connectionString: process.env.DATABASE_URL });
const migrationDb = drizzle(pool);

async function main() {
  await migrate(migrationDb, { migrationsFolder: './drizzle' });
  await pool.end();
}

main();
