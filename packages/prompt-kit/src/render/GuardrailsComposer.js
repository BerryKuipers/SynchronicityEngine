"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.renderGuardrails = renderGuardrails;
function renderGuardrails(seed, extra) {
    var guardrails = [
        'Maintain a consistent persona.',
        'Output only the requested JSON schema.',
        'Base decisions on the provided belief systems and world state.',
        "Seed for deterministic variance: ".concat(seed),
    ];
    if (extra) {
        guardrails.push.apply(guardrails, extra);
    }
    return "[GUARDRAILS]\n".concat(guardrails.map(function (g) { return "- ".concat(g); }).join('\n'));
}
