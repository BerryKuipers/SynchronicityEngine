"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.convergenceScene = exports.introductionScene = exports.SynchronicityEngine = exports.createDefaultEngine = exports.defaultEngineConfig = void 0;
var engine_js_1 = require("./engine.js");
Object.defineProperty(exports, "SynchronicityEngine", { enumerable: true, get: function () { return engine_js_1.SynchronicityEngine; } });
var introduction_js_1 = require("./scenes/introduction.js");
Object.defineProperty(exports, "introductionScene", { enumerable: true, get: function () { return introduction_js_1.introductionScene; } });
var convergence_js_1 = require("./scenes/convergence.js");
Object.defineProperty(exports, "convergenceScene", { enumerable: true, get: function () { return convergence_js_1.convergenceScene; } });
exports.defaultEngineConfig = {
    initialSceneId: 'introduction',
    initialResonance: { focus: 28, intuition: 32, harmony: 26 },
    initialEnergy: 10,
};
var createDefaultEngine = function () {
    var engine = new engine_js_1.SynchronicityEngine(exports.defaultEngineConfig);
    engine.registerScene(introduction_js_1.introductionScene);
    engine.registerScene(convergence_js_1.convergenceScene);
    return engine;
};
exports.createDefaultEngine = createDefaultEngine;
__exportStar(require("./types.js"), exports);
__exportStar(require("./interfaces/Ports.js"), exports);
