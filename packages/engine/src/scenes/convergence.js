"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convergenceScene = void 0;
var shared_1 = require("@synchronicity/shared");
exports.convergenceScene = {
    id: 'convergence',
    title: 'Resonant Confluence',
    onDescribe: function (_a) {
        var state = _a.state;
        var level = (0, shared_1.calculateResonanceLevel)(state.resonance);
        var summary = "Energy spirals through the confluence. Your aura vibrates at a ".concat(level, " pitch with ").concat(state.energy, " energy remaining.");
        return {
            summary: summary,
            actions: [
                {
                    id: 'stabilize-field',
                    label: 'Stabilize Field',
                    description: 'Guide the resonance into a steady stream.',
                    cost: 3,
                },
                {
                    id: 'release-echo',
                    label: 'Release Echo',
                    description: 'Release a harmonic pulse to call distant allies.',
                    cost: 5,
                },
            ],
            resonanceShift: { focus: 4, intuition: 3, harmony: 4 },
        };
    },
    onResolve: function (actionId, _a) {
        var state = _a.state;
        if (actionId === 'stabilize-field') {
            return {
                narrative: 'You weave the streams together, anchoring the chamber in a calm resonance.',
                resonanceShift: { focus: 5, intuition: 2, harmony: 6 },
                energyDelta: 2,
            };
        }
        var intuitionBoost = state.history.length >= 3 ? 8 : 3;
        return {
            narrative: 'A radiant echo courses outward, promising future allies.',
            resonanceShift: { focus: 1, intuition: intuitionBoost, harmony: 5 },
            energyDelta: -1,
        };
    },
};
