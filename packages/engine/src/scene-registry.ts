import { SceneDefinition } from './types.js';

export class SceneRegistry {
  private readonly scenes = new Map<string, SceneDefinition>();

  register(scene: SceneDefinition): void {
    if (this.scenes.has(scene.id)) {
      throw new Error(`Scene ${scene.id} already registered`);
    }
    this.scenes.set(scene.id, scene);
  }

  get(sceneId: string): SceneDefinition {
    const scene = this.scenes.get(sceneId);
    if (!scene) {
      throw new Error(`Scene ${sceneId} is not registered`);
    }
    return scene;
  }

  list(): SceneDefinition[] {
    return Array.from(this.scenes.values());
  }
}
