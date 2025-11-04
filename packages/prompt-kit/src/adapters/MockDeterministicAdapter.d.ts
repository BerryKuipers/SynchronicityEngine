import { EngineEventPayload } from '../schema/event';
import { LLMAdapter } from './LLMAdapter';
export declare class MockDeterministicAdapter implements LLMAdapter {
    generate(system: string, user: string, options?: {
        seed?: number;
    }): Promise<EngineEventPayload>;
}
