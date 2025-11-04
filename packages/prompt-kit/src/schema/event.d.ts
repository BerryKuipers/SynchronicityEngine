import { z } from 'zod';
export declare const EngineEventPayloadSchema: z.ZodObject<{
    actionId: z.ZodString;
    narrative: z.ZodString;
    resonance: z.ZodObject<{
        focus: z.ZodNumber;
        intuition: z.ZodNumber;
        harmony: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        focus?: number;
        intuition?: number;
        harmony?: number;
    }, {
        focus?: number;
        intuition?: number;
        harmony?: number;
    }>;
    applied: z.ZodBoolean;
    remainingEnergy: z.ZodNumber;
}, "strip", z.ZodTypeAny, {
    actionId?: string;
    narrative?: string;
    resonance?: {
        focus?: number;
        intuition?: number;
        harmony?: number;
    };
    applied?: boolean;
    remainingEnergy?: number;
}, {
    actionId?: string;
    narrative?: string;
    resonance?: {
        focus?: number;
        intuition?: number;
        harmony?: number;
    };
    applied?: boolean;
    remainingEnergy?: number;
}>;
export type EngineEventPayload = z.infer<typeof EngineEventPayloadSchema>;
