import { EngineEventPayload } from '../schema/event.js';

export interface LLMAdapterOptions {
  seed?: number;
}

export interface LLMAdapter {
  generate(prompt: string, options?: LLMAdapterOptions): Promise<EngineEventPayload>;
}
