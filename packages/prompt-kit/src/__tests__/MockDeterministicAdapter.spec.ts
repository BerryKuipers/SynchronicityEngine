import { MockDeterministicAdapter } from '../adapters/MockDeterministicAdapter';
import { EngineEventPayloadSchema } from '../schema/event';

describe('MockDeterministicAdapter', () => {
  it('should return the same payload for the same seed and input', async () => {
    const adapter = new MockDeterministicAdapter();
    const payload1 = await adapter.generate('system', 'user', { seed: 123 });
    const payload2 = await adapter.generate('system', 'user', { seed: 123 });
    expect(payload1).toEqual(payload2);
  });

  it('should return a different payload for a different seed', async () => {
    const adapter = new MockDeterministicAdapter();
    const payload1 = await adapter.generate('system', 'user', { seed: 123 });
    const payload2 = await adapter.generate('system', 'user', { seed: 456 });
    expect(payload1).not.toEqual(payload2);
  });

  it('should return a valid EngineEventPayload', async () => {
    const adapter = new MockDeterministicAdapter();
    const payload = await adapter.generate('system', 'user', { seed: 123 });
    const validation = EngineEventPayloadSchema.safeParse(payload);
    expect(validation.success).toBe(true);
  });
});
