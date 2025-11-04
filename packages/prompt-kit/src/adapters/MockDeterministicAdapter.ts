import { LLMAdapter, LLMAdapterOptions } from './LLMAdapter';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';
import { seededPick, hashString } from '../utils';

export class MockDeterministicAdapter implements LLMAdapter {
  async generate(prompt: string, options?: LLMAdapterOptions): Promise<EngineEventPayload> {
    if (process.env.NODE_ENV === 'production') {
      throw new Error('MockDeterministicAdapter cannot be used in production.');
    }

    const seed = options?.seed ?? Date.now();
    const actionIds = ['action-1', 'action-2', 'action-3'];
    const narratives = ['Narrative A', 'Narrative B', 'Narrative C'];

    const payload: EngineEventPayload = {
      actionId: seededPick(seed, actionIds),
      narrative: seededPick(seed, narratives),
      resonance: {
        focus: seededPick(seed, [0.1, 0.5, 0.9]),
        intuition: seededPick(seed, [0.2, 0.6, 0.8]),
        harmony: seededPick(seed, [0.3, 0.7, 0.7]),
      },
      applied: seededPick(seed, [true, false]),
      remainingEnergy: seededPick(seed, [50, 75, 100]),
    };

    return EngineEventPayloadSchema.parse(payload);
  }
}
