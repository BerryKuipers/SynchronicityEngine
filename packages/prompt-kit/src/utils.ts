import { createHash } from 'crypto';

export const hashString = (input: string): string => {
  return createHash('sha256').update(input).digest('hex');
};

export const seededPick = <T>(seed: number, arr: T[]): T => {
  const index = Math.floor((seed / 2 ** 32) * arr.length);
  return arr[index];
};
