import {
  Action,
  adjustResonance,
  assertValidAction,
  calculateResonanceLevel,
  normalizeResonance,
  EngineSnapshotV1,
  ActionContext,
  resolveActionEnergy,
} from '@synchronicity/shared';
import { EngineConfig, SceneDefinition, SceneContext, SessionState } from './types.js';
import { SceneRegistry } from './scene-registry.js';
import { SessionManager } from './session-manager.js';
import {
  EngineCommandPort,
  EngineEvent,
  EngineEventPort,
  EngineQueryPort,
} from './interfaces/Ports.js';
import { EventEmitter } from 'events';

export class SynchronicityEngine
  implements EngineCommandPort, EngineQueryPort, EngineEventPort
{
  private readonly registry = new SceneRegistry();
  private readonly sessions: SessionManager;
  private readonly emitter = new EventEmitter();

  constructor(private readonly config: EngineConfig) {
    this.sessions = new SessionManager(config);
  }

  // Port Implementations
  async act(sessionId: string, intent: unknown): Promise<void> {
    // For now, we'll assume the intent is a simple actionId string
    const actionId = intent as string;
    this.performAction(sessionId, actionId);
    this.emitter.emit('event', {
      type: 'BeliefUpdated',
      payload: { key: 'some_belief' },
    });
  }

  async snapshot(sessionId: string): Promise<EngineSnapshotV1> {
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
      resonanceScore: ["calm", "vibrant", "chaotic"].indexOf(calculateResonanceLevel(state.resonance)),
      timelineHints: description.summary.split('.'),
    };
  }

  subscribe(sessionId: string, handler: (e: EngineEvent) => void): () => void {
    this.emitter.on('event', handler);
    return () => {
      this.emitter.off('event', handler);
    };
  }

  // Public Methods
  registerScene(scene: SceneDefinition): void {
    this.registry.register(scene);
  }

  // Private Methods
  private performAction(sessionId: string, actionId: string) {
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
  }

  private requireAction(actions: Action[], actionId: string): Action {
    const action = actions.find((candidate) => candidate.id === actionId);
    if (!action) {
      throw new Error(`Action ${actionId} is not available in the current scene`);
    }
    return action;
  }
}
