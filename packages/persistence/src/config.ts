import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

/**
 * Load .env file from project root (../../.env relative to this package).
 * This utility is shared across db.ts, migrate.ts, and seed.ts to avoid duplication.
 */
export function loadEnvFromRoot(): void {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = dirname(__filename);
  const envPath = join(__dirname, '../../../.env');

  config({ path: envPath });
}

/**
 * Get DATABASE_URL from environment or throw error
 */
export function getDatabaseUrl(): string {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error('DATABASE_URL is not set in environment variables');
  }
  return url;
}
