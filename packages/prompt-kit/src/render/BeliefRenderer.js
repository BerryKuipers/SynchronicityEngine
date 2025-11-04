"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BeliefRenderer = void 0;
var BeliefRenderer = /** @class */ (function () {
    function BeliefRenderer() {
    }
    BeliefRenderer.prototype.render = function (input) {
        if (input.beliefs.length === 0) {
            return '';
        }
        return "[BELIEFS]\n".concat(input.beliefs
            .map(function (b) {
            return "- ".concat(b.description, " (Intensity: ").concat(b.intensity, ", Rigidity: ").concat(b.rigidity, ")");
        })
            .join('\n'));
    };
    return BeliefRenderer;
}());
exports.BeliefRenderer = BeliefRenderer;
