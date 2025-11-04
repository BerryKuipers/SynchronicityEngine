import { EngineSnapshotV1 } from '@synchronicity/shared';
export type EngineEvent = {
    type: 'SynchronicityOccurred';
    payload: {
        layer: string;
        magnitude: number;
    };
} | {
    type: 'BeliefUpdated';
    payload: {
        key: string;
    };
} | {
    type: 'LevelTransitioned';
    payload: {
        from: string;
        to: string;
    };
};
export interface EngineCommandPort {
    act(sessionId: string, intent: unknown): Promise<void>;
}
export interface EngineQueryPort {
    snapshot(sessionId: string): Promise<EngineSnapshotV1>;
}
export interface EngineEventPort {
    subscribe(sessionId: string, handler: (e: EngineEvent) => void): () => void;
}
