import { Action, ActionContext, ResonanceLevel, ResonanceVector } from './types.js';
export declare const RESONANCE_MAX = 100;
export declare const RESONANCE_MIN = 0;
export declare const normalizeResonance: (vector: ResonanceVector) => ResonanceVector;
export declare const assertValidAction: (action: Action) => void;
export declare const calculateResonanceLevel: (vector: ResonanceVector) => ResonanceLevel;
export declare const resolveActionEnergy: (context: ActionContext, cost: number) => number;
export declare const adjustResonance: (vector: ResonanceVector, shift: ResonanceVector) => ResonanceVector;
