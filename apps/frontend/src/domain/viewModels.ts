// src/domain/viewModels.ts
export type TimelineItem = { id: string; t: string; label: string }
export type ResonanceVM = { score: number; vector: number[] }
export type EngineVM = {
  sessionId: string
  timeline: TimelineItem[]
  resonance: ResonanceVM
}

export type { EngineSnapshotV1 as EngineSnapshot } from '@synchronicity/shared'
