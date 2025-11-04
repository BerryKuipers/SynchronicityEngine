import { EngineEventPayload } from '../schema/event';
import { LLMAdapter } from './LLMAdapter';
export declare class DirectOpenAIAdapter implements LLMAdapter {
    private readonly config?;
    constructor(config?: {
        apiKey?: string;
    });
    generate(system: string, user: string, options?: {
        seed?: number;
    }): Promise<EngineEventPayload>;
}
