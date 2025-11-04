import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import pg from 'pg';
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
