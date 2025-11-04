import type { EngineActionResult, EngineSnapshot } from '@synchronicity/engine';
export declare const fetchSnapshot: (sessionId: string) => Promise<EngineSnapshot>;
export declare const submitAction: (sessionId: string, actionId: string) => Promise<EngineActionResult>;
