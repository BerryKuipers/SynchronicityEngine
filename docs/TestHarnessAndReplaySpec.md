# Deterministic Simulation Test Harness and Replay System Specification

## Introduction

This document specifies the architecture for the Deterministic Simulation Test Harness and Replay System for the SynchronicityEngine. The primary purpose of this system is to guarantee that all engine mechanics—including consciousness-layer logic, emotional physics, dream generation, belief evolution, timeline branching, and synchronicity emergence—are reproducible, auditable, and debuggable.

This system treats the simulation of consciousness as a physics engine, demanding rigorous, deterministic, and verifiable behavior.

---

## 1. Core Objectives

The test harness and replay system must support the following capabilities:

- **Deterministic Engine Runs**: Given an identical initial state and seed, the engine must produce an identical evolution of state over any number of ticks.
- **Reproducible Phenomena**: Dreams, emotional shifts, and synchronicities must be fully reproducible under identical seeded conditions.
- **Branchable Simulation Timelines**: The system must allow for the creation of divergent timelines from any given state snapshot to explore alternate choice pathways.
- **Time Travel Debugging**: Developers must be able to replay a simulation from any recorded tick, inspecting the full engine state.
- **Stack-Like Rewind**: The ability to "undo" the simulation to a previous event or decision point to explore alternative immediate outcomes.
- **Timeline Comparison**: A mechanism to "diff" the state of two parallel timelines, highlighting the divergence of beliefs, emotional states, and events.
- **Chaotic Sensitivity Analysis**: The ability to run simulations where a micro-adjustment to an initial condition (e.g., a single belief's certainty value) can be tracked to observe its macro-level impact on the timeline.

---

## 2. Deterministic Simulation Rules

Determinism is the cornerstone of this system. The following rules define its implementation.

### Seed Model

All sources of apparent randomness must be derived from a hierarchical seeding model:

- **Global Seed**: A master seed for the entire simulation run, from which all other seeds are derived.
- **Layer-Level Sub-Seeds**: Each consciousness layer persona (Higher Mind, Subconscious, etc.) shall be initialized with its own deterministic pseudo-random number generator (PRNG), seeded from the global seed. This isolates sources of "randomness" for easier debugging.
- **Specialized RNG Streams**: To prevent cross-talk, distinct PRNG streams will be used for:
    - **Emotional RNG Stream**: For calculating probabilistic emotional reactions and decay.
    - **Dream RNG Stream**: For selecting symbols and constructing dream narratives from the symbolic grammar.
    - **Synchronicity RNG Stream**: For determining the timing and form of synchronicity event delivery.

### Replay Contract

- Any simulation run must be perfectly reproducible from its initial state snapshot and its seed manifest.
- Any external, non-deterministic input (e.g., live player input) must be recorded as a timestamped event in the event log. During replay, these events are injected back into the simulation at the appropriate tick, making the entire run deterministic.

### Belief Mutation Determinism

The change in a belief's state (`ΔB`) must be a pure, deterministic function:
`ΔB = f(EmotionVector, AlignmentState, CognitiveFrictionCoefficient, SubconsciousWeight, Seed)`

### Dream Generation Determinism

Dream generation will not be a black box. It will be governed by:

- **Symbolic Grammar Table**: A static, configurable map that defines the rules for combining symbols.
- **Entropy Budget**: The "creativity" or "randomness" of a dream is controlled by a seeded entropy value.
- **Symbol Repetition Rules**: Seeded rules that govern the frequency and pattern of symbol appearance.
- **Probability Mapping**: A seeded PRNG determines which valid symbol combination is chosen from the grammar.
- **Dream Current Stream**: A seeded, continuous stream of values (e.g., Perlin noise) that can be sampled to influence the "flow" and "mood" of the dream narrative.

---

## 3. Event-Sourced Replay System

The engine's state evolution will be captured as a time-series log of immutable events. The state at any tick `T` can be reconstructed by starting with the initial state and re-applying all events up to `T`.

### Log Types

The event log must capture the following event types:

- `EngineTick`: Marks the passage of a single unit of simulation time.
- `LayerStateCommit`: A snapshot of a specific layer's state after its processing for a given tick.
- `BeliefChange`: Records the delta of a belief modification, including the causal factors.
- `EmotionalForceEvent`: Records the application of an emotional impulse, its source, and its magnitude.
- `SynchronicitySeedPlanted`: An event triggered by the Higher Mind to prime the Synchronicity Router.
- `DreamAccessResult`: Records whether a dream was generated, presented, and recalled by the Physical Mind.
- `TimelineBranchDecision`: An explicit event marking a point where the timeline was forked, recording the choice that led to the new branch.
- `ExternalInput`: Records any input from outside the deterministic simulation (e.g., user action).

### Replay Mode

- **Linear Replay**: A straightforward replay of a single timeline from start to finish.
- **Branch Replay**: Replay to a `TimelineBranchDecision` event, then switch to replaying the events of the divergent timeline.
- **Timeline Merge Analysis**: A non-runtime mode to analyze two separate event logs, identify their common ancestor, and visualize their divergence.

### Time Travel

- **Seek to Tick N**: The replay system must be able to efficiently advance the simulation to any tick `N` by restoring the nearest preceding snapshot and replaying the events between the snapshot and `T`.
- **Restore and Replay**: The core mechanism for time travel, combining state snapshots with event-sourcing.
- **Jump Between Forks**: The ability to pause replay on one timeline branch, jump to a corresponding tick on a parallel branch, and compare the state.

---

## 4. Verification & Assertions

The test harness will include a system of deterministic assertions that run during replay to verify the simulation's integrity.

### Core Assertions

- **Vibration Monotonicity**: A player's vibrational alignment cannot increase without a corresponding positive choice or belief change.
- **Emotional Force Conservation**: The total emotional energy in the system must be conserved, barring explicit inputs. Emotions decay predictably and do not arise from nowhere.
- **Belief Evolution Constraints**: Beliefs cannot change faster than their defined "cognitive friction" allows.
- **No Unearned Synchronicities**: Assert that a high-impact synchronicity event is always preceded by a period of sustained high alignment from the player.
- **Dream Consistency**: Assert that dream outputs are consistent with the current emotional entropy, belief pressure, and timeline tension vectors.

These assertions will detect metaphysical "cheating," impossible state transitions, alignment contradictions, and stagnation loops.

---

## 5. Test Types

The harness will support the following structured test categories:

### Unit-Style Deterministic Metaphysics Tests

- **Belief Shift**: `assert(calculateBeliefDelta(emotionVector, seed) == expectedDelta)`.
- **Emotion Decay**: `assert(calculateEmotionDecay(emotion, time) == expectedValue)`.
- **Vibration Resonance**: `assert(calculateVibration(beliefSet) == expectedFrequency)`.
- **Sync Trigger Probability**: `assert(calculateSyncProbability(alignment, seed) == expectedChance)`.

### Integration Tests

- **Message Flow**: Test the full cycle of `Physical Mind Choice -> Higher Mind Signal -> Subconscious Translation -> Dream Event`.
- **State Change Propagation**: Test `Dream -> Belief Change -> New Choice -> Synchronicity`.
- **Timeline Branching**: Verify that a choice correctly generates a new, independent timeline branch in the event log.
- **Experience Selection**: Test that emotional state correctly biases the event selection algorithm.

### Regression Simulation Runs

A suite of canonical simulation replays will serve as regression tests:

- **Awakening Path**: A "golden path" replay demonstrating a successful player evolution.
- **Ego Friction Stress Test**: A scenario designed to maximize resistance and test the system's negative feedback loops.
- **High-Alignment Fast Path**: A test demonstrating accelerated progress and high-frequency synchronicity.
- **Resistance Spiral**: A test capturing a feedback loop of negative belief -> negative event -> reinforced negative belief.
- **Enlightened Stagnation**: An edge-case test where high alignment is achieved but the player avoids all catalysts for further growth.

---

## 6. Debug & Visualization Tools

The replay system will be designed to feed data to a suite of visualization tools:

- **Timeline Diff Graph**: A branching graph diagram showing all timelines, with nodes representing key events. Clicking an edge shows the "diff" between timelines.
- **Belief Evolution Plot**: A time-series chart of key belief strengths and certainties.
- **Emotional Force Field Plot**: A vector field visualization of the emotional forces acting on the player at any given tick.
- **Synchronicity Breadcrumb Chain**: A map showing the player's path, with markers indicating where synchronicities were seeded and where they manifested.
- **Dream Symbol Network Map**: A graph showing the relationship between dream symbols, their source concepts, and their frequency.
- **Layer Signal Flow**: An animated diagram showing the flow of messages (commands, events, queries) between the different consciousness layers in real-time during replay.
- **Replay Scrubber**: A UI component with a scrubbable timeline bar, play/pause controls, and tick-by-tick stepping.

---

## 7. Output Format & Artifacts

A test run will produce the following artifacts:

- **Replay Logs**: A structured, machine-readable format (e.g., JSON or binary) of the complete event stream.
- **State Snapshots**: Periodic snapshots of the full engine state to optimize replay speed.
- **Seed Manifest**: A file containing the global seed and all derived sub-seeds used in the run.
- **Determinism Proof**: A checksum or hash of the final state, which can be compared against a known-good value for verification.
- **Timeline Explorer UI Hooks**: The replay system will expose an API for a frontend application to query and visualize the test artifacts.

---

## 8. Success Criteria

- The engine's evolution must be 100% reproducible from a seed manifest and an initial state.
- Parallel simulation runs must diverge *only* when a recorded choice or seeded random outcome differs.
- The debug and visualization tools must allow a developer to step through the evolution of the consciousness model with the same clarity as stepping through a physics simulation.
- Any bug related to engine state can be captured as a replay log, allowing for perfect reproduction and debugging.
