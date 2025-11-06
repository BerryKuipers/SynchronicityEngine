import { Action, NarrativeEvent, ResonanceVector } from '@synchronicity/shared';
export interface SceneDescription {
    summary: string;
    actions: Action[];
    resonanceShift?: ResonanceVector;
    energyDelta?: number;
}
export interface SceneResolution {
    narrative: string;
    resonanceShift?: ResonanceVector;
    energyDelta?: number;
    nextSceneId?: string;
}
export interface SceneContext {
    state: SessionState;
}
export interface SceneDefinition {
    id: string;
    title: string;
    onDescribe: (context: SceneContext) => SceneDescription;
    onResolve: (actionId: string, context: SceneContext) => SceneResolution;
}
export interface SessionState {
    sceneId: string;
    resonance: ResonanceVector;
    energy: number;
    history: NarrativeEvent[];
}
export interface EngineConfig {
    initialSceneId: string;
    initialResonance: ResonanceVector;
    initialEnergy: number;
}
