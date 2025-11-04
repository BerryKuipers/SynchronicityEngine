import { SessionState } from './types.js';
import { EngineConfig } from './types.js';
export declare class SessionManager {
    private readonly config;
    private readonly sessions;
    constructor(config: EngineConfig);
    get(sessionId: string): SessionState;
    ensure(sessionId: string): SessionState;
    set(sessionId: string, state: SessionState): void;
}
