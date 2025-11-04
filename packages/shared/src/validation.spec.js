"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var strict_1 = require("node:assert/strict");
var node_test_1 = require("node:test");
var validation_js_1 = require("./validation.js");
void (0, node_test_1.default)('normalizeResonance clamps values within bounds', function () {
    var vector = (0, validation_js_1.normalizeResonance)({ focus: 150.2, intuition: -12, harmony: Number.NaN });
    strict_1.default.equal(vector.focus, validation_js_1.RESONANCE_MAX);
    strict_1.default.equal(vector.intuition, validation_js_1.RESONANCE_MIN);
    strict_1.default.equal(vector.harmony, validation_js_1.RESONANCE_MIN);
});
void (0, node_test_1.default)('resolveActionEnergy enforces positive balance', function () {
    var remaining = (0, validation_js_1.resolveActionEnergy)({ availableEnergy: 10, resonance: { focus: 0, intuition: 0, harmony: 0 } }, 4);
    strict_1.default.equal(remaining, 6);
    var error;
    try {
        (0, validation_js_1.resolveActionEnergy)({ availableEnergy: 2, resonance: { focus: 0, intuition: 0, harmony: 0 } }, 3);
    }
    catch (err) {
        error = err;
    }
    strict_1.default.equal(error === null || error === void 0 ? void 0 : error.message, 'Insufficient energy for action');
});
void (0, node_test_1.default)('adjustResonance applies vector shifts', function () {
    var result = (0, validation_js_1.adjustResonance)({ focus: 5, intuition: 5, harmony: 5 }, { focus: 2, intuition: -3, harmony: 10 });
    strict_1.default.deepEqual(result, { focus: 7, intuition: 2, harmony: 15 });
    strict_1.default.equal((0, validation_js_1.calculateResonanceLevel)(result), 'calm');
});
