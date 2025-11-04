import { LLMAdapter } from './LLMAdapter';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';

export class MockDeterministicAdapter implements LLMAdapter {
  async generate(prompt: string): Promise<EngineEventPayload> {
    // NOTE: This is a deterministic adapter for testing purposes.
    // It will always return a valid EngineEventPayload.
    const payload: EngineEventPayload = {
      actionId: 'mock-action',
      narrative: `Mock narrative for prompt: ${prompt}`,
      resonance: {
        focus: 0.5,
        intuition: 0.5,
        harmony: 0.5,
      },
      applied: true,
      remainingEnergy: 100,
    };

    return EngineEventPayloadSchema.parse(payload);
  }
}
