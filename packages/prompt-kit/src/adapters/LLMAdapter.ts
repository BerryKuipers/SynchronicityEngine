import { EngineEventPayload } from '../schema/event';

export interface LLMAdapterOptions {
  seed?: number;
}

export interface LLMAdapter {
  generate(prompt: string, options?: LLMAdapterOptions): Promise<EngineEventPayload>;
}
