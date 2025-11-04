import { EngineEventPayload } from '../schema/event';

export interface LLMAdapter {
  generate(prompt: string): Promise<EngineEventPayload>;
}
