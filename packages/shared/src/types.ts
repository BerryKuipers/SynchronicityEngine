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
