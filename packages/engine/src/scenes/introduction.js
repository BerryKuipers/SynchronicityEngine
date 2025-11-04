"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.introductionScene = void 0;
var shared_1 = require("@synchronicity/shared");
var attuneBreath = {
    narrative: 'A measured inhale steadies the chamber as harmonics settle around you.',
    resonanceShift: { focus: 6, intuition: 4, harmony: 8 },
    energyDelta: 1,
};
exports.introductionScene = {
    id: 'introduction',
    title: 'Awakening Chamber',
    onDescribe: function (_a) {
        var state = _a.state;
        var level = (0, shared_1.calculateResonanceLevel)(state.resonance);
        var summary = "The crystalline chamber hums at a ".concat(level, " cadence while your energy rests at ").concat(state.energy, ".");
        return {
            summary: summary,
            actions: [
                {
                    id: 'attune-breath',
                    label: 'Attune Breath',
                    description: 'Steady your breath to coax the chamber into harmony.',
                    cost: 2,
                },
                {
                    id: 'open-gate',
                    label: 'Open Resonant Gate',
                    description: 'Channel stored energy into the central gateway.',
                    cost: 4,
                },
            ],
        };
    },
    onResolve: function (actionId, _a) {
        var state = _a.state;
        if (actionId === 'attune-breath') {
            return attuneBreath;
        }
        var harmonyPenalty = (0, shared_1.calculateResonanceLevel)(state.resonance) === 'chaotic' ? -12 : 0;
        var resonanceShift = { focus: 2 + harmonyPenalty, intuition: 5, harmony: 10 + harmonyPenalty };
        var nextSceneId = state.resonance.harmony + resonanceShift.harmony >= 60 ? 'convergence' : 'introduction';
        return {
            narrative: 'You align the gate sigils and a resonant doorway crackles into view.',
            resonanceShift: resonanceShift,
            energyDelta: -2,
            nextSceneId: nextSceneId,
        };
    },
};
