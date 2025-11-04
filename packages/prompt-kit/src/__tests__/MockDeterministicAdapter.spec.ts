import { MockDeterministicAdapter } from '../adapters/MockDeterministicAdapter';
import { test, expect } from 'node:test';
import assert from 'node:assert';

test('MockDeterministicAdapter should return a predictable response', async () => {
  const adapter = new MockDeterministicAdapter();
  const response = await adapter.generate('test prompt');

  assert.deepStrictEqual(response, {
    actionId: 'mock-action',
    narrative: 'Mock narrative for prompt: test prompt',
    resonance: {
      focus: 0.5,
      intuition: 0.5,
      harmony: 0.5,
    },
    applied: true,
    remainingEnergy: 100,
  });
});
