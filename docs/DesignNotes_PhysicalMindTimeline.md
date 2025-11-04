# Physical Mind Timeline System Specification

## 1. Overview

The Physical Mind experiences time-space in a linear, sequential fashion. This specification defines the system responsible for simulating this perceived continuity, representing the flow of days, nights, and years as a discrete, deterministic progression. While higher layers of consciousness perceive time as simultaneous or holographic, the Physical Mind's reality is constructed as a forward-moving causal chain.

This document primarily defines the simulation of the *awake timeline*. The architecture is designed to be extensible, allowing for the future integration of dream states and other non-linear perceptual modes without altering the core framework.

## 2. Core Concepts

### 2.1 Temporal Continuity

- **Time Progression**: Time advances in discrete units called "ticks." Each tick can represent any duration (e.g., a moment, an hour, a day) and is managed by a central clock. The simulation speed can be adjusted (e.g., x1, x10, x100) to fast-forward through uneventful periods.
- **Simulation Control**: The simulation can be paused, resumed, or accelerated.
- **State Updates**: Each tick may trigger internal state updates (e.g., belief decay, emotional shifts) or the generation of new external events.

### 2.2 Lifecycle

The timeline governs the entire lifecycle of the Physical Mind persona, from incarnation to transition.

- **Phases**: The lifecycle is divided into distinct phases: Child → Youth → Adult → Elder → Death/Transition.
- **Parameter Modulation**: Each phase adjusts core parameters of the Physical Mind, including belief plasticity (higher in youth), physical and mental capabilities, and the set of probable experiences.

### 2.3 Event Generation

Events are the primary mechanism through which the Physical Mind interacts with its reality. They are not random but are probabilistically selected based on the player's internal state.

- **Selection Criteria**:
  - **Blueprint Themes**: Events are chosen to reflect the core lessons and themes defined in the Soul Blueprint.
  - **Belief & Vibration**: The player's current belief systems and vibrational state reweight the probability distribution of candidate events.
  - **Synchronicity & Relevance**: The Synchronicity Physics Engine identifies and surfaces events that are thematically relevant and meaningful.
- **Event Types**: Events can range from mundane daily experiences to major life-altering moments, spontaneous synchronicities, and (in a future extension) dreams.

### 2.4 Player Interaction

The player's primary mode of interaction is responding to events presented on the timeline.

- **Event Presentation**: Events are surfaced to the UI as nodes or items in a chronological feed.
- **Response Mechanism**: The player responds to events through multiple-choice options or (in advanced modes) free-text input.
- **Consequence Loop**: Responses directly feed back into the system, altering belief structures, updating the vibrational state, and influencing the probability of subsequent events. An AI layer may be used to process free-text reactions to maintain narrative coherence.

### 2.5 Simulation Modes

- **Manual Mode**: The player actively triggers progression by selecting "Next Day" or "Continue," giving them full control over the pacing.
- **Auto Mode**: Time advances automatically at a set rate. If player input is required for an event, the simulation pauses; otherwise, an AI-driven persona profile can provide default reactions to maintain flow.
- **Hybrid Mode**: A combination of manual and automatic progression, allowing the player to intervene at key moments while letting uneventful periods pass autonomously.

## 3. Technical Architecture

### 3.1 Module Placement

The timeline logic will be encapsulated within the engine core to maintain hexagonal architecture principles.

- **Location**: `packages/engine/src/layers/physical/timeline/`
- **Main Class**: `TimelineEngine`
- **Core Methods**:
  - `advanceTime(ticks: number): void`
  - `injectEvent(source: string, event: Event): void`
  - `subscribe(callback: (state: TimelineState) => void): UnsubscribeFunction`
  - `serializeState(): string`
  - `restoreState(serializedState: string): void`
- **State Exposure**: The `TimelineEngine` will expose its state as an observable stream, allowing the UI and Trace system to subscribe to updates without direct coupling.

### 3.2 Integration Points

- **Trace System**: Emits structured logs and spans for each significant action (e.g., `tick`, `event_generated`, `state_snapshot`), correlated by `traceId` and `runId`.
- **Engine Core**: Reads belief, blueprint, and world states from the core engine services to inform event generation.
- **Event Generators**: Invokes event generator modules (which can be either deterministic or AI-driven) to produce candidate events.
- **Adapters**: Sends state updates to frontend clients via existing adapter ports.

### 3.3 Data Structures

- **`TimelineState`**:
  ```typescript
  interface TimelineState {
    currentTime: number; // The current tick count
    tickRate: number;    // Multiplier for simulation speed
    phase: 'child' | 'youth' | 'adult' | 'elder' | 'transition';
    events: Event[];     // Chronological list of past and present events
  }
  ```
- **`Event`**:
  ```typescript
  interface Event {
    id: string;          // Unique identifier (e.g., UUID)
    type: string;        // E.g., 'daily', 'major', 'synchronicity'
    title: string;
    description: string;
    timestamp: number;   // The tick at which the event occurred
    layer: 'physical';
    source: 'blueprint' | 'belief' | 'external';
    resolved: boolean;   // True if the player has responded
  }
  ```

### 3.4 Persistence

- **State Snapshots**: The timeline's state can be serialized and stored in a local persistence layer or a database, enabling save/load functionality and replay analysis.
- **State Correlation**: Each snapshot will reference the `promptHash` and a digest of the belief state at that specific tick, ensuring full auditability and deterministic replay.

## 4. Dream-State Extension (Future)

The timeline architecture is designed to accommodate a future dream subsystem, which operates as a nested, non-linear timeline within the Physical Mind's experience.

- **Non-Linear Perception**: Within a dream, time is fluid. The dream event generator can introduce symbolic logic and override physical laws (e.g., enabling flight, teleportation).
- **Sub-Timeline**: Each dream is recorded as a sub-timeline with its own internal tick space, linked to the main timeline at the points of falling asleep and waking.
- **Memory & Integration**: Upon awakening, continuity with the primary timeline is restored, but only partial, often symbolic, memory of the dream is retained.
- **Fractal Pattern**: This mechanism of nested timelines can be replicated for other layers of consciousness (e.g., Higher Mind meditations, Soul-level life reviews), creating a fractal hierarchy of experiences.

## 5. Visual and Interaction Layer

The UI will provide a clear, data-rich interface for interacting with the timeline.

- **Timeline View**: A primary view displaying events as expandable nodes on a chronological line.
- **Controls**: Interface elements for controlling the simulation: Clock/Speed controls, Pause/Play/Skip buttons.
- **Log Correlation**: Clicking an event node in the timeline will open the corresponding trace and log context in a debug panel, showing the exact state and decision logic that generated it.
- **Dream Mode Visualization**: Dream sub-timelines will be visually differentiated from the awake timeline using stylistic shifts (e.g., color changes, blur effects, symbolic glyphs).

## 6. AI Collaboration

The structured nature of the timeline allows for powerful AI-driven analysis and simulation.

- **State Inspection**: Agents can query the timeline to gain context: "Summarize the last 10 major events and their impact on the player's belief system."
- **Predictive Simulation**: Agents can run predictive models on the timeline: "Given the current state, what is the most probable synchronicity in the next 24 ticks?"
- **Readability**: The log and data schema for events and states will be designed for optimal machine readability, leveraging the existing NDJSON trace system.

## 7. Implementation Roadmap

1.  **Phase 1: Core Mechanics**: Create the `TimelineEngine` class with a deterministic tick counter and support for manual event injection.
2.  **Phase 2: Observability**: Integrate Trace and Log outputs for all state changes and events.
3.  **Phase 3: Event Generation**: Add a basic, stubbed event generator that produces mock events.
4.  **Phase 4: API Exposure**: Create a REST API endpoint (`/api/v1/timeline`) for inspecting the timeline state.
5.  **Phase 5: Frontend Visualization**: Implement a minimal `/timeline` route in the frontend application to display the timeline data.
6.  **Phase 6: Full Integration**: Connect the timeline to the dream module and the belief feedback loop.

## 8. Future Ideas

- **Environmental Simulation**: Merge the physical timeline with an environmental simulation that includes weather patterns, light cycles, and other ambient factors.
- **Fractal Hierarchy**: Fully implement the connection between dream and physical timelines, creating a single, navigable fractal hierarchy of consciousness states.
- **Replay & Fast-Forward**: Build robust tools for replaying, saving, and fast-forwarding through simulations for debugging and analysis.
- **Emotional Feedback**: Integrate the Emotional Physics Engine more deeply to allow for richer, more nuanced synchronicity generation based on emotional state.
