"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionManager = void 0;
var SessionManager = /** @class */ (function () {
    function SessionManager(config) {
        this.config = config;
        this.sessions = new Map();
    }
    SessionManager.prototype.get = function (sessionId) {
        var state = this.sessions.get(sessionId);
        if (!state) {
            throw new Error("Session ".concat(sessionId, " has not been initialised"));
        }
        return state;
    };
    SessionManager.prototype.ensure = function (sessionId) {
        if (!this.sessions.has(sessionId)) {
            this.sessions.set(sessionId, {
                sceneId: this.config.initialSceneId,
                resonance: __assign({}, this.config.initialResonance),
                energy: this.config.initialEnergy,
                history: [],
            });
        }
        return this.get(sessionId);
    };
    SessionManager.prototype.set = function (sessionId, state) {
        this.sessions.set(sessionId, state);
    };
    return SessionManager;
}());
exports.SessionManager = SessionManager;
