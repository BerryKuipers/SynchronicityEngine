import assert from 'node:assert/strict';
import test from 'node:test';
import {
  RESONANCE_MAX,
  RESONANCE_MIN,
  adjustResonance,
  calculateResonanceLevel,
  normalizeResonance,
  resolveActionEnergy,
} from './validation.js';

void test('normalizeResonance clamps values within bounds', () => {
  const vector = normalizeResonance({ focus: 150.2, intuition: -12, harmony: Number.NaN });
  assert.equal(vector.focus, RESONANCE_MAX);
  assert.equal(vector.intuition, RESONANCE_MIN);
  assert.equal(vector.harmony, RESONANCE_MIN);
});

void test('resolveActionEnergy enforces positive balance', () => {
  const remaining = resolveActionEnergy({ availableEnergy: 10, resonance: { focus: 0, intuition: 0, harmony: 0 } }, 4);
  assert.equal(remaining, 6);
  let error: Error | undefined;
  try {
    resolveActionEnergy({ availableEnergy: 2, resonance: { focus: 0, intuition: 0, harmony: 0 } }, 3);
  } catch (err) {
    error = err as Error;
  }
  assert.equal(error?.message, 'Insufficient energy for action');
});

void test('adjustResonance applies vector shifts', () => {
  const result = adjustResonance({ focus: 5, intuition: 5, harmony: 5 }, { focus: 2, intuition: -3, harmony: 10 });
  assert.deepEqual(result, { focus: 7, intuition: 2, harmony: 15 });
  assert.equal(calculateResonanceLevel(result), 'calm');
});
