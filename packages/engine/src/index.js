import { SynchronicityEngine } from './engine.js';
import { introductionScene } from './scenes/introduction.js';
import { convergenceScene } from './scenes/convergence.js';
export const defaultEngineConfig = {
    initialSceneId: 'introduction',
    initialResonance: { focus: 28, intuition: 32, harmony: 26 },
    initialEnergy: 10,
};
export const createDefaultEngine = () => {
    const engine = new SynchronicityEngine(defaultEngineConfig);
    engine.registerScene(introductionScene);
    engine.registerScene(convergenceScene);
    return engine;
};
export { SynchronicityEngine, introductionScene, convergenceScene };
export * from './types.js';
export * from './interfaces/Ports.js';
