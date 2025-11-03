import 'dotenv/config';
import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';

const client = new Client({ connectionString: process.env.DATABASE_URL });

async function main() {
  await client.connect();
  const db = drizzle(client);
  await migrate(db, { migrationsFolder: './packages/persistence/drizzle' });
  await client.end();
}

main();
