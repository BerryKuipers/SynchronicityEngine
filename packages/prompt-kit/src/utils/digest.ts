import crypto from 'crypto'

export function makeDigest(obj: unknown): string {
  const str = JSON.stringify(obj)
  return crypto.createHash('sha256').update(str).digest('hex').substring(0, 16)
}
