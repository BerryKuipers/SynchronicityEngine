import { EngineSnapshotV1 } from '@synchronicity/shared';
import { EngineConfig, SceneDefinition } from './types.js';
import { EngineCommandPort, EngineEvent, EngineEventPort, EngineQueryPort } from './interfaces/Ports.js';
export declare class SynchronicityEngine implements EngineCommandPort, EngineQueryPort, EngineEventPort {
    private readonly config;
    private readonly registry;
    private readonly sessions;
    private readonly emitter;
    constructor(config: EngineConfig);
    act(sessionId: string, intent: unknown): Promise<void>;
    snapshot(sessionId: string): Promise<EngineSnapshotV1>;
    subscribe(sessionId: string, handler: (e: EngineEvent) => void): () => void;
    registerScene(scene: SceneDefinition): void;
    private performAction;
    private requireAction;
}
