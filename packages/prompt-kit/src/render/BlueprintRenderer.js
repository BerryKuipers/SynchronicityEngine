"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BlueprintRenderer = void 0;
var BlueprintRenderer = /** @class */ (function () {
    function BlueprintRenderer() {
    }
    BlueprintRenderer.prototype.render = function (input) {
        var themes = "[BLUEPRINT THEMES]\n".concat(input.themes.map(function (t) { return "- ".concat(t); }).join('\n'));
        var excitement = "[EXCITEMENT SIGNALS]\n".concat(input.excitement
            .map(function (e) {
            return "- Keywords: ".concat(e.keywords.join(', '), " (Intensity: ").concat(e.intensity, ")");
        })
            .join('\n'));
        return "".concat(themes, "\n").concat(excitement);
    };
    return BlueprintRenderer;
}());
exports.BlueprintRenderer = BlueprintRenderer;
