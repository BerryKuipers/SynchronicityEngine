"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EngineEventPayloadSchema = void 0;
var zod_1 = require("zod");
var ResonanceVectorSchema = zod_1.z.object({
    focus: zod_1.z.number().min(0).max(1),
    intuition: zod_1.z.number().min(0).max(1),
    harmony: zod_1.z.number().min(0).max(1),
});
exports.EngineEventPayloadSchema = zod_1.z.object({
    actionId: zod_1.z.string().min(1),
    narrative: zod_1.z.string().min(1),
    resonance: ResonanceVectorSchema,
    applied: zod_1.z.boolean(),
    remainingEnergy: zod_1.z.number().min(0),
});
