import { Action, ActionContext, ResonanceLevel, ResonanceVector } from './types.js';

export const RESONANCE_MAX = 100;
export const RESONANCE_MIN = 0;

const VIBRANT_THRESHOLD = 34;
const CHAOTIC_THRESHOLD = 67;

export const normalizeResonance = (vector: ResonanceVector): ResonanceVector => {
  return {
    focus: clamp(vector.focus),
    intuition: clamp(vector.intuition),
    harmony: clamp(vector.harmony),
  };
};

const clamp = (value: number): number => {
  if (Number.isNaN(value) || !Number.isFinite(value)) {
    return RESONANCE_MIN;
  }
  return Math.min(RESONANCE_MAX, Math.max(RESONANCE_MIN, Math.round(value)));
};

export const assertValidAction = (action: Action): void => {
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

export const calculateResonanceLevel = (vector: ResonanceVector): ResonanceLevel => {
  const normalized = normalizeResonance(vector);
  const average = (normalized.focus + normalized.intuition + normalized.harmony) / 3;
  if (average < VIBRANT_THRESHOLD) {
    return 'calm';
  }
  if (average < CHAOTIC_THRESHOLD) {
    return 'vibrant';
  }
  return 'chaotic';
};

export const resolveActionEnergy = (context: ActionContext, cost: number): number => {
  const remaining = context.availableEnergy - cost;
  if (remaining < 0) {
    throw new Error('Insufficient energy for action');
  }
  return remaining;
};

export const adjustResonance = (vector: ResonanceVector, shift: ResonanceVector): ResonanceVector => {
  return normalizeResonance({
    focus: vector.focus + shift.focus,
    intuition: vector.intuition + shift.intuition,
    harmony: vector.harmony + shift.harmony,
  });
};
