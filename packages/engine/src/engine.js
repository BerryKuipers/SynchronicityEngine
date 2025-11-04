"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SynchronicityEngine = void 0;
var shared_1 = require("@synchronicity/shared");
var scene_registry_js_1 = require("./scene-registry.js");
var session_manager_js_1 = require("./session-manager.js");
var events_1 = require("events");
var SynchronicityEngine = /** @class */ (function () {
    function SynchronicityEngine(config) {
        this.config = config;
        this.registry = new scene_registry_js_1.SceneRegistry();
        this.emitter = new events_1.EventEmitter();
        this.sessions = new session_manager_js_1.SessionManager(config);
    }
    // Port Implementations
    SynchronicityEngine.prototype.act = function (sessionId, intent) {
        return __awaiter(this, void 0, void 0, function () {
            var actionId;
            return __generator(this, function (_a) {
                actionId = intent;
                this.performAction(sessionId, actionId);
                this.emitter.emit('event', {
                    type: 'BeliefUpdated',
                    payload: { key: 'some_belief' },
                });
                return [2 /*return*/];
            });
        });
    };
    SynchronicityEngine.prototype.snapshot = function (sessionId) {
        return __awaiter(this, void 0, void 0, function () {
            var state, scene, description;
            return __generator(this, function (_a) {
                state = this.sessions.ensure(sessionId);
                scene = this.registry.get(state.sceneId);
                description = scene.onDescribe({ state: state });
                return [2 /*return*/, {
                        version: 1,
                        layers: [
                            {
                                id: 'physical',
                                vibration: {
                                    min: 0,
                                    max: 100,
                                    current: state.energy,
                                    thresholds: [25, 50, 75],
                                },
                                alignment: (0, shared_1.normalizeResonance)(state.resonance).harmony,
                                sublevels: {},
                            },
                            {
                                id: 'higher',
                                vibration: {
                                    min: 0,
                                    max: 100,
                                    current: (0, shared_1.normalizeResonance)(state.resonance).intuition,
                                    thresholds: [50, 75],
                                },
                                alignment: (0, shared_1.normalizeResonance)(state.resonance).focus,
                                sublevels: {},
                            },
                        ],
                        resonanceScore: (0, shared_1.calculateResonanceLevel)(state.resonance),
                        timelineHints: description.summary.split('.'),
                    }];
            });
        });
    };
    SynchronicityEngine.prototype.subscribe = function (sessionId, handler) {
        var _this = this;
        this.emitter.on('event', handler);
        return function () {
            _this.emitter.off('event', handler);
        };
    };
    // Public Methods
    SynchronicityEngine.prototype.registerScene = function (scene) {
        this.registry.register(scene);
    };
    // Private Methods
    SynchronicityEngine.prototype.performAction = function (sessionId, actionId) {
        var _a, _b, _c;
        var state = this.sessions.ensure(sessionId);
        var scene = this.registry.get(state.sceneId);
        var context = { state: state };
        var description = scene.onDescribe(context);
        description.actions.forEach(shared_1.assertValidAction);
        var action = this.requireAction(description.actions, actionId);
        var actionContext = {
            availableEnergy: state.energy,
            resonance: state.resonance,
        };
        var remainingEnergy = (0, shared_1.resolveActionEnergy)(actionContext, action.cost);
        var resolution = scene.onResolve(action.id, context);
        var nextEnergy = Math.max(0, remainingEnergy + ((_a = resolution.energyDelta) !== null && _a !== void 0 ? _a : 0));
        var resonanceShift = (_b = resolution.resonanceShift) !== null && _b !== void 0 ? _b : { focus: 0, intuition: 0, harmony: 0 };
        var nextResonance = (0, shared_1.adjustResonance)(state.resonance, resonanceShift);
        var nextSceneId = (_c = resolution.nextSceneId) !== null && _c !== void 0 ? _c : state.sceneId;
        var event = {
            timestamp: Date.now(),
            actionId: action.id,
            narrative: resolution.narrative,
            resonanceLevel: (0, shared_1.calculateResonanceLevel)(nextResonance),
        };
        var updatedState = {
            sceneId: nextSceneId,
            resonance: nextResonance,
            energy: nextEnergy,
            history: __spreadArray(__spreadArray([], state.history, true), [event], false),
        };
        this.sessions.set(sessionId, updatedState);
    };
    SynchronicityEngine.prototype.requireAction = function (actions, actionId) {
        var action = actions.find(function (candidate) { return candidate.id === actionId; });
        if (!action) {
            throw new Error("Action ".concat(actionId, " is not available in the current scene"));
        }
        return action;
    };
    return SynchronicityEngine;
}());
exports.SynchronicityEngine = SynchronicityEngine;
