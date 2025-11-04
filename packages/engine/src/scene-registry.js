"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SceneRegistry = void 0;
var SceneRegistry = /** @class */ (function () {
    function SceneRegistry() {
        this.scenes = new Map();
    }
    SceneRegistry.prototype.register = function (scene) {
        if (this.scenes.has(scene.id)) {
            throw new Error("Scene ".concat(scene.id, " already registered"));
        }
        this.scenes.set(scene.id, scene);
    };
    SceneRegistry.prototype.get = function (sceneId) {
        var scene = this.scenes.get(sceneId);
        if (!scene) {
            throw new Error("Scene ".concat(sceneId, " is not registered"));
        }
        return scene;
    };
    SceneRegistry.prototype.list = function () {
        return Array.from(this.scenes.values());
    };
    return SceneRegistry;
}());
exports.SceneRegistry = SceneRegistry;
