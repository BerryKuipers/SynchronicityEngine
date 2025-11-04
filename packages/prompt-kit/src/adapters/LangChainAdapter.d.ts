import { EngineEventPayload } from '../schema/event';
import { LLMAdapter } from './LLMAdapter';
export declare class LangChainAdapter implements LLMAdapter {
    generate(system: string, user: string): Promise<EngineEventPayload>;
}
