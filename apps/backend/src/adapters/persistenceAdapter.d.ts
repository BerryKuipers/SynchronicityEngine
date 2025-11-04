import { EngineEvent } from '@engine/interfaces/Ports';
import { EngineSnapshotV1 } from '@shared/types';
export declare function persistEvent(sessionId: string, tick: number, e: EngineEvent): Promise<void>;
export declare function persistSnapshot(sessionId: string, tick: number, snapshot: EngineSnapshotV1): Promise<void>;
export declare function getLatestSnapshot(sessionId: string): Promise<any>;
