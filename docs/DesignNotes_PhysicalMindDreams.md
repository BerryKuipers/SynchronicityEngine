# Physical Mind Dream Subsystem Specification

## 1. Overview

Dreams occur within the Physical Mind but operate under different temporal and physical rules. The subsystem models the non-linear, symbolic, and emotionally charged nature of dreams. It describes how dreams connect to beliefs, blueprint themes, and synchronicity events.

## 2. Core Concepts

### 2.1 Altered Temporal Flow
- Time behaves fluidly: scenes shift without continuity.
- Tick rate is independent from the physical timeline; it can stretch or collapse time.
- Duration in a dream may equal seconds of physical sleep.

### 2.2 Symbolic Environment
- Reality is generated from belief fragments, emotions, and active themes.
- Physics are mutable: flying, shape-shifting, telepathy, and the merging of identities are possible.
- Environments are archetypal: rooms, water, mountains, corridors, skies, mirrors.

### 2.3 Memory Gradient
- On awakening, recall decays exponentially.
- Memory data is stored with a clarity coefficient (0–1).
- Dream events are partially integrated into the physical belief system if emotionally strong.

### 2.4 Emotional Resonance
- Dreams serve as rapid feedback for beliefs and unresolved energy.
- Each dream event is tagged with a dominant emotion (fear, joy, awe, confusion, acceptance).
- Resonance determines the likelihood of waking synchronicities.

## 3. Technical Architecture

### 3.1 Module Placement
- Package: `packages/engine/src/layers/physical/dreams/`
- Main class: `DreamEngine`
- Interfaces:
  - `DreamScenarioGenerator`
  - `DreamMemoryManager`
  - `DreamTransitionController`
- Methods:
  - `enterDream(state: WorldState, beliefs: Beliefs[]): DreamSession`
  - `advanceDream(ticks: number)`
  - `recordEvent(event: DreamEvent)`
  - `exitDream(): DreamSummary`

### 3.2 Data Structures
- `DreamEvent { id, scene, emotion, description, symbolicRefs[], intensity, remembered: boolean }`
- `DreamSession { sessionId, startTime, endTime?, events[], clarity: number }`
- `DreamSummary { sessionId, rememberedEvents, beliefImpacts }`

### 3.3 Integration
- Triggered by the Physical Mind Timeline when sleep cycles occur.
- Uses the same AI adapter to generate narrative content and symbolic descriptions.
- Stores logs in Trace/Logs under `layer='dream'`.
- On exit, posts a summary to the BeliefSystem for update and integration.

## 4. Interaction and Visualization

- UI: A separate tab or modal shows dream playback.
- Visual cues: Surreal color grading, floating UI, blurred transitions.
- Option to 'interpret dream' → calls AI to summarize themes and belief correlations.
- Memory decay is simulated visually (text fading or fragments disappearing).

## 5. AI Collaboration

- Agents can interpret, summarize, or reconstruct dreams:
  - 'List all dreams in the last 7 nights with fear > 0.6.'
  - 'Summarize dream fragments that became synchronicities in the next day.'
- Output is JSON formatted for LLM ingestion.

## 6. Simulation Rules

- Dream initiation probability increases with emotional load and alignment shifts.
- Each sleep cycle can spawn 0–3 dreams.
- Dream recall chance is based on clarity, alignment, and a user attention variable.

## 7. Implementation Roadmap

1. Implement `DreamEngine` stub with deterministic mock dreams.
2. Connect with Timeline sleep events.
3. Add `/api/v1/dreams` routes to list and retrieve dream summaries.
4. Add a minimal dream log tab in the frontend.
5. Integrate the belief feedback pipeline.
6. Expand with real AI narrative generation.

## 8. Future Ideas

- Lucid dreaming mode where the player gains partial control.
- Shared dream network between users (Oversoul layer link).
- Integration with real sleep data or external sensors.
- Archetype analytics dashboard.
