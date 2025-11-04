import { createHash } from 'crypto';

export const hashString = (input: string): string => {
  return createHash('sha256').update(input).digest('hex');
};

export const seededPick = <T>(seed: number, arr: T[]): T => {
  if (arr.length === 0) {
    throw new Error('Cannot pick from an empty array.');
  }
  const index = Math.abs(seed) % arr.length;
  return arr[index];
};
