export class SessionManager {
    config;
    sessions = new Map();
    constructor(config) {
        this.config = config;
    }
    get(sessionId) {
        const state = this.sessions.get(sessionId);
        if (!state) {
            throw new Error(`Session ${sessionId} has not been initialised`);
        }
        return state;
    }
    ensure(sessionId) {
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
    set(sessionId, state) {
        this.sessions.set(sessionId, state);
    }
}
