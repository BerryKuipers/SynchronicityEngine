import { SceneDefinition } from './types.js';
export declare class SceneRegistry {
    private readonly scenes;
    register(scene: SceneDefinition): void;
    get(sceneId: string): SceneDefinition;
    list(): SceneDefinition[];
}
