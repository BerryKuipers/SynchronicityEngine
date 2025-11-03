import { SessionState } from './types.js';
import { EngineConfig } from './types.js';

export class SessionManager {
  private readonly sessions = new Map<string, SessionState>();

  constructor(private readonly config: EngineConfig) {}

  get(sessionId: string): SessionState {
    const state = this.sessions.get(sessionId);
    if (!state) {
      throw new Error(`Session ${sessionId} has not been initialised`);
    }
    return state;
  }

  ensure(sessionId: string): SessionState {
    if (!this.sessions.has(sessionId)) {
      this.sessions.set(sessionId, {
        sceneId: this.config.initialSceneId,
        resonance: { ...this.config.initialResonance },
        energy: this.config.initialEnergy,
        history: [],
      });
    }
    return this.get(sessionId);
  }

  set(sessionId: string, state: SessionState): void {
    this.sessions.set(sessionId, state);
  }
}
