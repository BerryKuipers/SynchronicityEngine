import {
  Action,
  ActionContext,
  adjustResonance,
  assertValidAction,
  calculateResonanceLevel,
  normalizeResonance,
  resolveActionEnergy,
} from '@synchronicity/shared';
import {
  EngineActionResult,
  EngineConfig,
  EngineSnapshot,
  SceneDefinition,
  SceneDescription,
  SceneContext,
  SessionState,
} from './types.js';
import { SceneRegistry } from './scene-registry.js';
import { SessionManager } from './session-manager.js';

export class SynchronicityEngine {
  private readonly registry = new SceneRegistry();
  private readonly sessions: SessionManager;

  constructor(private readonly config: EngineConfig) {
    this.sessions = new SessionManager(config);
  }

  registerScene(scene: SceneDefinition): void {
    this.registry.register(scene);
  }

  describe(sessionId: string): EngineSnapshot {
    const state = this.sessions.ensure(sessionId);
    const scene = this.registry.get(state.sceneId);
    const context: SceneContext = { state };
    const description = scene.onDescribe(context);
    description.actions.forEach(assertValidAction);
    return this.buildSnapshot(scene, state, description);
  }

  performAction(sessionId: string, actionId: string): EngineActionResult {
    const state = this.sessions.ensure(sessionId);
    const scene = this.registry.get(state.sceneId);
    const context: SceneContext = { state };
    const description = scene.onDescribe(context);
    description.actions.forEach(assertValidAction);
    const action = this.requireAction(description.actions, actionId);
    const actionContext: ActionContext = {
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
    const updatedState: SessionState = {
      sceneId: nextSceneId,
      resonance: nextResonance,
      energy: nextEnergy,
      history: [...state.history, event],
    };
    this.sessions.set(sessionId, updatedState);
    const snapshot = this.describe(sessionId);
    return {
      applied: true,
      remainingEnergy: snapshot.energy,
      resonance: snapshot.resonance,
      narrative: resolution.narrative,
      snapshot,
    };
  }

  private requireAction(actions: Action[], actionId: string): Action {
    const action = actions.find((candidate) => candidate.id === actionId);
    if (!action) {
      throw new Error(`Action ${actionId} is not available in the current scene`);
    }
    return action;
  }

  private buildSnapshot(scene: SceneDefinition, state: SessionState, description: SceneDescription): EngineSnapshot {
    const resonance = normalizeResonance(state.resonance);
    return {
      sceneId: state.sceneId,
      title: scene.title,
      summary: description.summary,
      resonanceLevel: calculateResonanceLevel(resonance),
      resonance,
      availableActions: description.actions,
      energy: state.energy,
      history: state.history,
    };
  }
}
