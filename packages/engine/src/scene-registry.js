export class SceneRegistry {
    scenes = new Map();
    register(scene) {
        if (this.scenes.has(scene.id)) {
            throw new Error(`Scene ${scene.id} already registered`);
        }
        this.scenes.set(scene.id, scene);
    }
    get(sceneId) {
        const scene = this.scenes.get(sceneId);
        if (!scene) {
            throw new Error(`Scene ${sceneId} is not registered`);
        }
        return scene;
    }
    list() {
        return Array.from(this.scenes.values());
    }
}
