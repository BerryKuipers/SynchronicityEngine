// src/domain/adapters.ts
import type { EngineSnapshot, EngineVM } from './viewModels.js'

export function toEngineVM(s: EngineSnapshot): EngineVM {
  return {
    sessionId: 'unknown',
    timeline: s.timelineHints.map((h, i) => ({
      id: String(i),
      t: new Date().toISOString(),
      label: h
    })),
    resonance: {
      score: s.resonanceScore,
      vector: []
    }
  }
}
