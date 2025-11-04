"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorldStateRenderer = void 0;
var WorldStateRenderer = /** @class */ (function () {
    function WorldStateRenderer() {
    }
    WorldStateRenderer.prototype.render = function (input) {
        return "[WORLD STATE]\n- Time: ".concat(input.time, "\n- Energy: ").concat(input.energy, "\n- Resonance: ").concat(input.resonance, "\n- Narrative: ").concat(input.narrative);
    };
    return WorldStateRenderer;
}());
exports.WorldStateRenderer = WorldStateRenderer;
