import { SynchronicityEngine } from './engine.js';
import { introductionScene } from './scenes/introduction.js';
import { convergenceScene } from './scenes/convergence.js';
import { EngineConfig } from './types.js';
export declare const defaultEngineConfig: EngineConfig;
export declare const createDefaultEngine: () => SynchronicityEngine;
export { SynchronicityEngine, introductionScene, convergenceScene };
export * from './types.js';
export * from './interfaces/Ports.js';
