import { EngineEventPayload } from '../schema/event';
export interface LLMAdapterOptions {
    seed?: number;
}
export interface LLMAdapter {
    generate(system: string, user: string, options?: LLMAdapterOptions): Promise<EngineEventPayload>;
}
