# Timeline Visual Debug Interface Specification

## 1) Purpose & Philosophy

- **Why this exists**: This interface serves as a high-precision observational tool for inspecting the inner workings of the SynchronicityEngine. It is not a player-facing UI but a diagnostic and analytical console for developers, simulation architects, and advanced researchers to visualize the complex dynamics of consciousness mechanics in real time. Its purpose is to ensure the engine's fidelity to the core metaphysical model, debug its behavior, and reveal the elegant, underlying order of the simulation.

- **Who uses it**: The primary users are "consciousness engineers"—the developers building the engine—and "simulation designers" who craft narratives and scenarios. Advanced players may also gain access to it as a tool for deeper understanding of the game's mechanics.

- **Relationship to the “inner engine”**: The debug interface is a pure observer. It couples to the engine exclusively through read-only data ports (query snapshots and event streams). It has no capacity to alter the simulation's state, ensuring a strict separation between the core logic and its visual representation. This maintains the engine's integrity and renderer-agnostic architecture.

## 2) Debug UI Modes

The debug interface operates in several distinct modes, each designed for a specific analytical purpose.

- **Observer Mode**: A live, real-time trace of the engine's current state. This mode is used for monitoring active simulations, observing the immediate effects of player choices, and diagnosing emergent behaviors as they happen.

- **Replay Mode**: A powerful tool for timeline playback and analysis. This mode loads a recorded simulation history, allowing the user to scrub backward and forward in time, inspect state at any tick, and analyze the causal chain of events that led to a particular outcome.

- **Seed Mode**: A deterministic simulation mode that runs the engine from a fixed initial seed. This is essential for reproducibility and regression testing, allowing developers to test specific mechanics under controlled, identical conditions.

- **Quantum Drift Mode**: A probabilistic rendering mode that visualizes the multiverse not as a single collapsed timeline but as a shimmering field of probabilities. In this mode, all potential branches are displayed simultaneously, weighted by their likelihood, providing an intuitive grasp of the full "wave function" of possibilities available to the player.

- **Belief Stress Test Mode**: An isolated sandbox for testing the belief system's dynamics. In this mode, designers can inject hypothetical beliefs, adjust their rigidity and emotional charge, and observe the resulting impact on the player's timeline and vibrational state, without affecting the main simulation.

## 3) Primary Views

### a) Multiverse Tree Visualization

This is the central view of the debug interface, providing a macro-level map of the player's journey through the multiverse.

- **Nodes**: Each node represents a discrete state in a timeline, a "moment" of collapsed probability.
- **Edges**: Edges represent the transitions between states, triggered by decisions, events, or belief shifts.
- **Node Strength**: The brightness or thickness of a node's border indicates its probability weight. The currently inhabited timeline will have the most prominent nodes. Inactive or collapsed branches will be visually faint.
- **Color**: Node color represents the Resonance / Coherence score at that point in time. A pure, bright color (e.g., gold or white) indicates high coherence, while a distorted or muddy color indicates dissonance.

### b) Identity Stream Panel

This panel focuses on the continuity and fragmentation of the player's self-concept across different timelines.

- **Player’s Main Identity Arc**: A central, solid waveform representing the player's primary timeline experience. The amplitude of the wave corresponds to the "Momentum of Self."
- **Parallel Selves**: Fainter, "ghost" waveforms are overlaid on the main arc, representing significant parallel selves in nearby, high-probability branches. The more these waveforms diverge, the more different these "yous" are.
- **Continuity Score**: A numerical display of the Identity Coherence Score [0, 1], providing a precise measure of self-consistency.
- **Dissonance Fields**: Areas where the waveforms of parallel selves diverge sharply are highlighted with a subtle, shimmering field, indicating points of high internal conflict or choice-driven fragmentation.

### c) Synchronicity Radar

A radial display that visualizes the hidden connections and resonances between timelines.

- **Concentric Rings**: Each ring represents a level of "distance" from the player's current timeline (measured by the Divergence Factor).
- **Pulses**: When two or more branches resonate (i.e., a synchronicity event is probable), a pulse of light radiates from the center of the radar. The pulse's brightness and sharpness are proportional to the strength of the resonance.
- **Convergence Points**: Areas on the radar with a high density of pulses indicate "attractor fields" where multiple timelines are thematically or energetically converging, suggesting a significant future event.

### d) Belief-Structure Overlay

An optional overlay on the Multiverse Tree that reveals the cognitive architecture shaping the player's reality.

- **Belief Nodes**: Each core belief is represented as a geometric node, positioned near the timeline events it influences.
- **Rigidity Score**: The opacity of a belief node indicates its rigidity. Highly rigid beliefs are solid and opaque, while flexible beliefs are translucent.
- **Emotional Charge Heatmap**: The color of a belief node indicates its emotional charge (e.g., cool tones for positive charge, warm tones for negative).
- **Collapse → Branch Event Indicators**: When a belief collapses, the corresponding node will fracture and emit a shockwave that visibly triggers the creation of a new timeline branch in the Multiverse Tree.

### e) Alignment Meter

A precise, real-time gauge of the player's vibrational state and connection to their Higher Mind.

- **Pure Frequency Waveform**: A clean, sine-wave-like visualization of the Higher Mind's frequency (`V_HM`).
- **Distortion Waveform**: An overlay representing the Physical Mind's frequency (`V_PM`), which will show noise and distortion relative to the pure `V_HM` wave. The greater the difference, the lower the alignment.
- **Harmonic Overtones Visualization**: When alignment is high, subtle, higher-frequency waveforms (harmonics) will appear, representing the activation of higher consciousness layers (Soul, Oversoul).

### f) Narrative Trace

A human-readable, symbolic event log that translates the raw engine data into a meaningful narrative. This is crucial for understanding the *why* behind the numbers.

- **Format**: `[Timestamp] [Symbol] EventDescription → Consequence (ΔMetric: value)`
- **Example**:
  > `T:1024 | △ | Belief softened: "I am not worthy" → Timeline branch narrowed (ΔEntropy: -0.04)`
  > `T:1025 | ✧ | Synchronicity attracted: "Meaningful conversation" → Path reinforced (ΔWeight: +0.12)`
  > `T:1026 | ⇌ | High-purity choice made → Timeline drift initiated (ΔDivergence: +0.04)`

### g) Terminal Mode Representation

For a text-first implementation, these ASCII and glyph-based layouts are essential. They must be elegant, information-dense, and symbolic.

- **Tree**: A classic branching tree structure using ASCII characters.
  ```
  (T0)---(T1)---(T2 - current)---(T3a - 80%)
             |
             +----(T3b - 20%)
  ```
- **Pulse Ring (for Synchronicity Radar)**: A series of concentric rings with characters representing resonance pulses.
  ```
     . . . .
   . . ✧ . .
 . . . . . .
   . . . . .
  ```
- **Spiral Representation (for Timelines)**: A spiral can represent the cyclical nature of themes and lessons, with branches extending outwards.
- **Vector Arrows (for Alignment)**: Simple arrows to show the direction of alignment.
  ```
  HM:  --->
  PM:  ~->  (Alignment: 0.85)
  ```

## 4) Interaction Model

The interaction model is designed to be simple, powerful, and scriptable, especially in its terminal-first incarnation. All commands are verb-noun pairs.

- **`zoom(in|out)`**: Adjusts the level of detail in the Multiverse Tree view. `zoom out` shows the macro-level structure, while `zoom in` reveals moment-to-moment divergences.
- **`trace(layer)`**: Toggles the visibility of specific data layers, such as `beliefs`, `synchronicity`, or `identity`.
- **`show(events)`**: Filters the Narrative Trace to show only events of a certain type, e.g., `show(belief_shifts)`.
- **`follow(branch_id)`**: Sets the focus of all relevant views to a specific timeline branch, allowing for the detailed inspection of parallel realities.
- **`rewind(ticks)`**: In Replay Mode, moves the simulation state backward by a specified number of time ticks.
- **`play(speed)`**: In Replay Mode, plays the simulation forward at a given speed (e.g., `x1`, `x5`, `x10`).
- **`freeze()`**: Pauses the live simulation view (Observer Mode) or the current playback (Replay Mode).
- **`seed(seed_string)`**: In Seed Mode, initializes the engine with a specific seed for a deterministic run.
- **`inspect(node_id)`**: Displays a detailed pop-up or panel with the full state vector and metadata for a given timeline node.

## 5) Data Protocol

The UI is a pure consumer of snapshot events and state queries from the engine. This ensures zero coupling of engine logic to the UI. All data contracts will be versioned to ensure long-term stability.

- **Timeline Snapshot (`TimelineSnapshotV1`)**: An event emitted by the engine at regular intervals or on significant state changes. It contains the complete, serialized state of the multiverse tree, including all nodes, edges, probability weights, and coherence scores.
- **Branch Weights (`BranchWeightUpdateV1`)**: A lightweight event that is emitted more frequently than a full snapshot, containing only the updated probability weights for all active branches. This is used for smooth, real-time visualization of branch energy.
- **Layer Vibrations (`VibrationStateV1`)**: An event containing the current vibrational frequencies of all consciousness layers (`V_HM`, `V_PM`, etc.).
- **Synchronicity Event (`SynchronicityPulseV1`)**: A discrete event triggered when a synchronicity is generated by the engine, containing the IDs of the resonating branches and the strength of the pulse.
- **Breakthrough Log (`BreakthroughEventV1`)**: An event logged when a significant belief-shift or breakthrough occurs, containing the details of the belief that was transformed and the resulting impact on the player's vibrational state.

## 6) Future Visualization Path

While the initial implementation is text-based, the architecture is designed to support a variety of future visualization layers without any changes to the core engine.

- **2D Graph Mode**: A graphical implementation using standard 2D graphics libraries (e.g., d3.js, JavaFX) to render the multiverse tree with interactive nodes, smooth animations, and richer data overlays.
- **3D Holographic Mode**: A more advanced visualization that represents the multiverse as a 3D structure, allowing the user to rotate, pan, and zoom through the timeline graph in a three-dimensional space.
- **“Time Lattice” Rendering**: A specialized visualization that represents timelines not as branching trees but as a crystalline lattice, emphasizing the geometric and harmonic relationships between different reality streams.
- **VR Panoramic Inspector (Optional Later)**: A fully immersive virtual reality experience where the user can "stand inside" the multiverse and observe the flow of timelines around them, offering an unparalleled intuitive understanding of the simulation's dynamics.

## 7) Examples

These examples provide a more concrete sense of the terminal mode's aesthetic and information density.

- **Branching Tree with Belief Collapse**:
  ```
  (T4)---(T5)---(T6a - 95%)
             |      \
             |       (B-COLLAPSE: "I am powerless")
             +----(T6b - 5%)
  ```
- **Resonance Pulse Across Branches**:
  ```
     . . . . . .
   . . . ✧ . . .
 . ✧ . . . . . ✧ .  (Resonance: T3a, T5b, T6c)
   . . . . . . .
     . . . ✧ . .
  ```
- **Identity Coherence Wave**:
  ```
  Identity Arc:  ~~~~~~~~~~~~~  (Coherence: 0.98)
  Parallel Self: ~~~---~~~~~~~  (Divergence: 0.15 at T4)
  ```
- **Belief Tension Indicator**:
  ```
  Belief Node: [LIMITING: "I am separate"]
  Rigidity:    |||||||||| (95%)
  Charge:      - - - - - - (Negative)
  Tension:     >>>>> <<<<< (High - external events are challenging this belief)
  ```

## 8) Glossary

- **Resonance**: The degree of vibrational similarity between two or more timeline branches. High resonance is a precondition for synchronicity.
- **Coherence**: The internal consistency of a single timeline or identity stream. High coherence indicates a stable, focused reality, while low coherence indicates fragmentation and confusion.
- **Branch Probability**: The calculated likelihood of a particular timeline branch becoming the dominant, experienced reality for the player.
- **Identity Momentum**: The "mass" or continuity of the player's sense of self. High momentum makes it easier to resist fragmentation during timeline jumps.
- **Synchronicity Pulse**: A discrete, cross-timeline event generated by the engine when two or more branches achieve a high degree of resonance.
- **Belief Collapse**: The event where a core belief loses its structural integrity due to overwhelming contradictory evidence, often triggering a forced jump to a more compatible timeline.
- **Path Merge**: The convergence of two or more previously distinct timeline branches into a single, unified reality, typically occurring after the resolution of a major internal conflict.
