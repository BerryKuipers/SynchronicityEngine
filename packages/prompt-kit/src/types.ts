import { LevelId } from '@synchronicity/shared';
import type { ChatAssembly } from './contracts/PromptContracts';

export type Layer = LevelId;

export type Belief = {
  id: string;
  description: string;
  intensity: number;
  rigidity: number;
};

export type BeliefOverlay = {
  beliefs: Belief[];
};

export type WorldState = {
  time: number;
  energy: number;
  resonance: number;
  narrative: string;
};

export type Blueprint = {
  themes: string[];
  excitement: {
    keywords: string[];
    intensity: number;
  }[];
};

export type PromptAssemblyInput = {
  layer: Layer;
  lawVersion: string;
  personaVersion: string;
  beliefs: BeliefOverlay;
  world: WorldState;
  blueprint: Blueprint;
  userIntent: string;
  seed: number;
  guardrails?: string[];
};

export type { ChatAssembly };
