import { adjustResonance, assertValidAction, calculateResonanceLevel, normalizeResonance, resolveActionEnergy, } from '@synchronicity/shared';
import { SceneRegistry } from './scene-registry.js';
import { SessionManager } from './session-manager.js';
import { EventEmitter } from 'events';
export class SynchronicityEngine {
    config;
    registry = new SceneRegistry();
    sessions;
    emitter = new EventEmitter();
    constructor(config) {
        this.config = config;
        this.sessions = new SessionManager(config);
    }
    // Port Implementations
    async act(sessionId, intent) {
        // For now, we'll assume the intent is a simple actionId string
        const actionId = intent;
        this.performAction(sessionId, actionId);
        this.emitter.emit('event', {
            type: 'BeliefUpdated',
            payload: { key: 'some_belief' },
        });
    }
    async snapshot(sessionId) {
        const state = this.sessions.ensure(sessionId);
        const scene = this.registry.get(state.sceneId);
        const description = scene.onDescribe({ state });
        return {
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
                    alignment: normalizeResonance(state.resonance).harmony,
                    sublevels: {},
                },
                {
                    id: 'higher',
                    vibration: {
                        min: 0,
                        max: 100,
                        current: normalizeResonance(state.resonance).intuition,
                        thresholds: [50, 75],
                    },
                    alignment: normalizeResonance(state.resonance).focus,
                    sublevels: {},
                },
            ],
            resonanceScore: calculateResonanceLevel(state.resonance),
            timelineHints: description.summary.split('.'),
        };
    }
    subscribe(sessionId, handler) {
        this.emitter.on('event', handler);
        return () => {
            this.emitter.off('event', handler);
        };
    }
    // Public Methods
    registerScene(scene) {
        this.registry.register(scene);
    }
    // Private Methods
    performAction(sessionId, actionId) {
        const state = this.sessions.ensure(sessionId);
        const scene = this.registry.get(state.sceneId);
        const context = { state };
        const description = scene.onDescribe(context);
        description.actions.forEach(assertValidAction);
        const action = this.requireAction(description.actions, actionId);
        const actionContext = {
            availableEnergy: state.energy,
            resonance: state.resonance,
        };
        const remainingEnergy = resolveActionEnergy(actionContext, action.cost);
        const resolution = scene.onResolve(action.id, context);
        const nextEnergy = Math.max(0, remainingEnergy + (resolution.energyDelta ?? 0));
        const resonanceShift = resolution.resonanceShift ?? { focus: 0, intuition: 0, harmony: 0 };
        const nextResonance = adjustResonance(state.resonance, resonanceShift);
        const nextSceneId = resolution.nextSceneId ?? state.sceneId;
        const event = {
            timestamp: Date.now(),
            actionId: action.id,
            narrative: resolution.narrative,
            resonanceLevel: calculateResonanceLevel(nextResonance),
        };
        const updatedState = {
            sceneId: nextSceneId,
            resonance: nextResonance,
            energy: nextEnergy,
            history: [...state.history, event],
        };
        this.sessions.set(sessionId, updatedState);
    }
    requireAction(actions, actionId) {
        const action = actions.find((candidate) => candidate.id === actionId);
        if (!action) {
            throw new Error(`Action ${actionId} is not available in the current scene`);
        }
        return action;
    }
}
