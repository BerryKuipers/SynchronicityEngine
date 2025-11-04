export type ResonanceLevel = 'calm' | 'vibrant' | 'chaotic';

export interface ResonanceVector {
  focus: number;
  intuition: number;
  harmony: number;
}

export interface Action {
  id: string;
  label: string;
  description: string;
  cost: number;
}

export interface ActionContext {
  availableEnergy: number;
  resonance: ResonanceVector;
}

export interface ActionResolution {
  applied: boolean;
  remainingEnergy: number;
  resonance: ResonanceVector;
  narrative: string;
}

export interface SceneSnapshot {
  sceneId: string;
  title: string;
  summary: string;
  resonanceLevel: ResonanceLevel;
  resonance: ResonanceVector;
  availableActions: Action[];
  energy: number;
  history: NarrativeEvent[];
}

export interface NarrativeEvent {
  timestamp: number;
  actionId: string;
  narrative: string;
  resonanceLevel: ResonanceLevel;
}

// V1 Contracts for Hexagonal Architecture

export type LevelId = 'physical' | 'higher' | 'soul' | 'oversoul';

export type VibrationBand = {
  min: number;
  max: number;
  current: number;
  thresholds: number[];
};

export type LayerSnapshot = {
  id: LevelId;
  vibration: VibrationBand;
  alignment: number;
  sublevels: Record<string, number>;
};

export type EngineSnapshotV1 = {
  version: 1;
  layers: LayerSnapshot[];
  resonanceScore: number;
  timelineHints: string[];
};

export type PhysicalBodyDTO = {
  id: string;
  incarnationId: string;
  birthDate: string;
  ageYearsCached: number;
  health: number;
  energy: number;
  fatigue: number;
  hunger: number;
  mood: number;
  injuries: Record<string, any>;
  traits: Record<string, any>;
  geneticSeed: string;
  createdAt: string;
  updatedAt: string;
};
