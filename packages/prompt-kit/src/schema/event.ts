import { z } from 'zod';

const ResonanceVectorSchema = z.object({
  focus: z.number().min(0).max(1),
  intuition: z.number().min(0).max(1),
  harmony: z.number().min(0).max(1),
});

export const EngineEventPayloadSchema = z.object({
  actionId: z.string().min(1),
  narrative: z.string().min(1),
  resonance: ResonanceVectorSchema,
  applied: z.boolean(),
  remainingEnergy: z.number().min(0),
});

export type EngineEventPayload = z.infer<typeof EngineEventPayloadSchema>;
