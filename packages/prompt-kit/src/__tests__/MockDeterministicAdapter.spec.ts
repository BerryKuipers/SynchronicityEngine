import { describe, it } from 'node:test';
import assert from 'node:assert';
import { MockDeterministicAdapter } from '../adapters/MockDeterministicAdapter';
import { EngineEventPayloadSchema } from '../schema/event';

describe('MockDeterministicAdapter', () => {
  it('should return a valid EngineEventPayload', async () => {
    const adapter = new MockDeterministicAdapter();
    const result = await adapter.generate('test prompt');
    assert.doesNotThrow(() => EngineEventPayloadSchema.parse(result));
  });

  it('should return the same output for the same seed', async () => {
    const adapter = new MockDeterministicAdapter();
    const result1 = await adapter.generate('test prompt', { seed: 123 });
    const result2 = await adapter.generate('test prompt', { seed: 123 });
    assert.deepStrictEqual(result1, result2);
  });
});
