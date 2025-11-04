"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.adjustResonance = exports.resolveActionEnergy = exports.calculateResonanceLevel = exports.assertValidAction = exports.normalizeResonance = exports.RESONANCE_MIN = exports.RESONANCE_MAX = void 0;
exports.RESONANCE_MAX = 100;
exports.RESONANCE_MIN = 0;
var VIBRANT_THRESHOLD = 34;
var CHAOTIC_THRESHOLD = 67;
var normalizeResonance = function (vector) {
    return {
        focus: clamp(vector.focus),
        intuition: clamp(vector.intuition),
        harmony: clamp(vector.harmony),
    };
};
exports.normalizeResonance = normalizeResonance;
var clamp = function (value) {
    if (Number.isNaN(value) || !Number.isFinite(value)) {
        return exports.RESONANCE_MIN;
    }
    return Math.min(exports.RESONANCE_MAX, Math.max(exports.RESONANCE_MIN, Math.round(value)));
};
var assertValidAction = function (action) {
    if (!action.id.trim()) {
        throw new Error('Action id must be provided');
    }
    if (!action.label.trim()) {
        throw new Error('Action label must be provided');
    }
    if (action.cost < 0) {
        throw new Error('Action cost cannot be negative');
    }
};
exports.assertValidAction = assertValidAction;
var calculateResonanceLevel = function (vector) {
    var normalized = (0, exports.normalizeResonance)(vector);
    var average = (normalized.focus + normalized.intuition + normalized.harmony) / 3;
    if (average < VIBRANT_THRESHOLD) {
        return 'calm';
    }
    if (average < CHAOTIC_THRESHOLD) {
        return 'vibrant';
    }
    return 'chaotic';
};
exports.calculateResonanceLevel = calculateResonanceLevel;
var resolveActionEnergy = function (context, cost) {
    var remaining = context.availableEnergy - cost;
    if (remaining < 0) {
        throw new Error('Insufficient energy for action');
    }
    return remaining;
};
exports.resolveActionEnergy = resolveActionEnergy;
var adjustResonance = function (vector, shift) {
    return (0, exports.normalizeResonance)({
        focus: vector.focus + shift.focus,
        intuition: vector.intuition + shift.intuition,
        harmony: vector.harmony + shift.harmony,
    });
};
exports.adjustResonance = adjustResonance;
