import { createHash } from 'crypto';

export function createSha256Hash(input: string): string {
  return createHash('sha256').update(input).digest('hex');
}
