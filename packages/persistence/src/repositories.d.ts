export declare function appendEvent(e: {
    id: string;
    sessionId: string;
    tick: number;
    type: string;
    payload: unknown;
    createdAt: Date;
}): Promise<void>;
export declare function saveEngineSnapshot(s: {
    id: string;
    sessionId: string;
    tick: number;
    snapshot: unknown;
    createdAt: Date;
}): Promise<void>;
export declare function createSession(id: string, label?: string): Promise<void>;
export declare function startRun(runId: string, sessionId: string): Promise<void>;
export declare function latestSnapshot(sessionId: string): Promise<any>;
