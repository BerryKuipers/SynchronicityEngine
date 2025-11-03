# Synchronicity Physics Specification

## 1. Purpose & Definition

**Goal:** This document formalizes synchronicity as a **probabilistic resonance phenomenon**. The core principle is that a player's internal state coherence—comprising their alignment with their Soul Blueprint, the permeability of their beliefs, and their emotional clarity—dynamically **modulates the probability distribution** of externally perceived events. This causes meaningful coincidences to **cluster** in a manner that is **deterministic under fixed seeds**.

This system defines the lawful, acausal relationship between consciousness and reality within the simulation.

- **Synchronicity vs. Randomness:** Random events have a uniform probability distribution, independent of player state. Synchronistic events are drawn from a probability distribution that has been reweighted by the player's internal state.
- **Synchronicity vs. Causality:** Causal events follow a direct chain of action and reaction. Synchronicity is acausal; it links events by meaning, not by direct physical cause and effect. It is an emergent property of the simulation's state-to-probability reweighting rules.

---

## 2. State Variables & Inputs

The following variables are consumed by the Synchronicity Physics engine at each time tick `t`.

| Symbol | Variable | Type | Description |
| --- | --- | --- | --- |
| `A(t)` | Alignment Index | Float `[0, 1]` | The degree of alignment between the Physical Mind and the Higher Mind. |
| `V(t)` | Vibration Frequency | Float `ℝ⁺` | The normalized vibrational frequency of the Physical Mind. |
| `E(t)` | Emotional Vector | Vector `ℝ²` | A vector in the Valence/Activation space representing the current emotional state. |
| `C(t)` | Clarity | Float `[0, 1]` | A measure of the purity of the emotional signal, where `1` is perfect clarity and `0` is maximum noise/distortion. Inverse of Emotional Entropy. |
| `B(t)` | Belief Rigidity Map | Map `{key -> [0,1]}` | A map of core beliefs to their rigidity scores, where `1` is completely rigid and `0` is completely fluid. |
| `P(t)` | Personality Stance Vector | Vector | A vector representing personality traits such as risk-aversion, openness, trust, and curiosity. |
| `Θ` | Soul Blueprint Theme Vector | Vector | A high-dimensional vector representing the core themes and lessons of the current incarnation. |
| `Λ(t)` | Layer Visibility Set | Set | A set defining which layers of consciousness (e.g., Higher Mind, Soul) are currently accessible to the Physical Mind. |
| `TΣ(t)` | Timeline State | Object | An object containing the current timeline's branch energy, divergence, and entropy. |
| `S` | Seeds | Object | A collection of seeds for all PRNGs: `S_global`, `S_sync`, `S_emotion`, `S_dream`. |

---

## 3. Core Quantities

These are derived quantities calculated at each tick, forming the basis for the reweighting algorithm.

- **Resonance with Blueprint (`R(t)`):** A measure of how closely the player's current state aligns with their soul's intended path.
  `R(t) = w_A * A(t) + w_V * V(t) + w_C * C(t) + w_P * cos(P(t), Θ)`
  where `w_i` are weighting coefficients.

- **Synchronicity Receptivity (`Q(t)`):** The player's overall openness to perceiving and receiving synchronistic events.
  `Q(t) = R(t) * (1 - ||E(t)|| * (1 - C(t)))`
  Receptivity is highest when Resonance is high and the emotional state is calm and clear.

- **Meaning Matching Score (`M_e(t)`):** For a given candidate event `e`, this score quantifies its thematic relevance to the Soul Blueprint.
  `M_e(t) = cosine_similarity(meta(e).themes, Θ)`
  where `meta(e).themes` is the thematic vector of the event.

- **Eligibility (`φ_e(t)`):** A boolean or continuous value determining if an event is a candidate for synchronistic selection.
  `φ_e(t) = f(Q(t), M_e(t), constraints(e), TΣ(t).branch_energy)`

All functions are parameterized with tunable constants for balancing.

---

## 4. Event Space & Reweighting

- **Event Candidate Pool (`ℰ(t)`):** The set of all possible events that could occur at tick `t`. Each event `e` has associated metadata:
  - `meta(e)`: thematic tags, intensity level, resource cost, timeline branch compatibility.
  - `preconds(e)`: belief or permission requirements for the event to be eligible.
  - `cooldowns(e)`: rules governing the minimum time until the event can reoccur.

- **Baseline Probability (`π₀(e)`):** The probability of an event `e` occurring naturally, as determined by the environment and timeline state, before any synchronistic reweighting.

- **Reweighting Rule (The Core Law):** The final probability `π(e | t)` of an event is its baseline probability multiplied by a gain factor `G_e(t)`.

  `π(e | t) = normalize( π₀(e) * G_e(t) )`

  `G_e(t) = exp( α * M_e(t) * Q(t) ) * H(e, TΣ(t)) * J(e, B(t))`

  Where:
  - `α` is a sensitivity constant that scales the impact of meaning and receptivity.
  - `H(e, TΣ(t))` is a timeline compatibility factor, penalizing events not aligned with the current timeline's energy and trajectory.
  - `J(e, B(t))` is a belief compatibility factor, which penalizes events that are strongly contradicted by rigid beliefs. `J ≈ 1` for compatible events, `J → 0` for strongly blocked events.

- **Constraints:** The system imposes ceiling and floor values on `π(e | t)` to prevent runaway positive feedback loops and ensure a baseline level of randomness.

---

## 5. Trigger Mechanics

A **Synchronicity Pulse** is a discrete event emitted by the engine when conditions are favorable for synchronicity.

- **Continuous Mode:** A pulse is emitted if a moving average `Q̄(t)` over a window `W` exceeds a threshold `τ_q`.
- **Discrete Mode:** A pulse is emitted if `Q(t)` crosses `τ_q` and the change in Alignment `ΔA(t)` has been positive over the last `k` ticks.
- **Harmonic Mode:** A pulse is emitted when the player's Vibration `V(t)` aligns with a harmonic of a core theme frequency from the Blueprint `Θ`.

The pulse payload includes:
- **Intensity (`I`):** `I = κ₁ * Q̄_W * M*`, where `M*` is the meaning score of the top candidate event.
- **Scope:** The scale of the event (micro, meso, macro).
- **Hint Vector:** A symbolic vector pointing towards the relevant theme.

---

## 6. Selection & Surfacing

Once a pulse is emitted, the engine selects one or more events from the reweighted distribution `π(e | t)`.

- **Deterministic Sampling:** To ensure replayability, the selection uses a deterministic algorithm like the Gumbel-Max trick or an alias method, seeded with the `S_sync` stream.
- **SynchronicityEvent Emission:** The chosen event is wrapped in a `SynchronicityEvent` data structure:
  `{ id, tick, intensity, chosenEvent, π₀(chosen), π(chosen), candidates_topK, state_digest }`
- **Noisy-Hint Mode:** If Clarity `C(t)` is below a threshold, the engine does not surface a strong event. Instead, it emits a `HintBreadcrumb`, a more subtle, symbolic clue.

---

## 7. Response & Feedback (Closed Loop)

The player's response `ρ` to a `SynchronicityEvent` is fed back into the system, creating a closed loop.

- The response updates Beliefs (`ΔB`) via the Emotional Physics engine.
- The response updates Alignment (`ΔA`).
- The response updates the Timeline branch weight (`ΔTΣ`).

- **Positive Response Gain:** An aligned response (acting on the synchronicity with trust) reinforces the feedback loop, increasing future `Q(t+1)`.
- **Avoidance Dampening:** A misaligned response (ignoring or resisting the synchronicity) dampens the loop, decaying the eligibility of similar events until the underlying belief is softened.

Formulas for these updates are defined as:
`ΔA = f(ρ, I, M_e)`
`ΔB = g(ρ, E(t+1))`
`ΔTΣ = h(ρ, I)`

---

## 8. Safety, Cooldowns, and Non-Pathological Behavior

- **Intensity Throttling:** The system limits the number and intensity of macro-level synchronicities per time period to prevent overwhelming the player.
- **Theme Diversity Constraint:** A mechanism prevents the system from repeatedly triggering events of the same thematic motif, ensuring a variety of experiences.
- **Emotional Capacity Guardrail:** Event intensity is capped if the player's emotional load (from `E(t)`) exceeds a safety threshold.
- **Ethical Bypass:** All events are filterable through a content safety layer that can zero their probability.
- **Deterministic Cooldowns:** Cooldowns are scheduled deterministically with logged reasons to ensure predictable behavior.

---

## 9. Determinism & Replay

- **Seeded RNG:** All stochastic decisions (event selection, noise generation) are derived from the master seed `S`.
- **Event Sourcing Log:** The engine logs the inputs to the reweighting function: candidate set hash, gain factors, the final sampled event, and a digest of the player state.
- **Replay Contract:** Given the same initial state and seed, the simulation will produce the exact same sequence of synchronistic events.
- **Fork Replay:** This allows for "what-if" scenarios. A developer can replay a session, change a single variable (e.g., a belief rigidity score), and observe the quantifiable divergence in the resulting event sequence.

---

## 10. Observability & Metrics

The engine must emit telemetry for debugging and balancing.

- Real-time plots of `Q(t)`, `R(t)`, `A(t)`, `C(t)`.
- A breakdown of gain components: `M_e`, `H`, `J`.
- A view of the top-K events in the pre- and post-reweighting probability distributions.
- A log of player responses, classified as (Align, Avoid, Mixed).
- A longitudinal **Synchronicity Yield** curve, plotting the rate of high-intensity synchronicities over time.
- A **Meaning-Coherence Index**, measuring the average `M_e` of surfaced events.
- An **Entropy of Choices** metric around synchronicity pulses.

Example log entry:
`{ tick: 1024, pulse_intensity: 0.8, event_id: '...', M_e: 0.9, Q: 0.75, π₀: 0.01, π_final: 0.25, response: 'Align' }`

---

## 11. Test Battery (Deterministic)

Specifications for deterministic tests:

1.  **High Alignment Case:** Given `A=0.8, Q=0.7`, the system is expected to produce a stream of high-intensity, theme-consistent events that are met with aligned responses, leading to a stable positive feedback loop.
2.  **Low Clarity Case:** Given `C=0.2`, the system should only emit `HintBreadcrumb` events or low-intensity pulses. The variance in event themes should increase, but the selection remains seeded and deterministic.
3.  **Belief Block Case:** An event with a high `M_e` should be suppressed (low `π_final`) if a relevant rigid belief exists (high `B(t)` -> `J ≪ 1`).
4.  **Timeline Compatibility Check:** An event with high `M_e` but low `H` (mismatched branch) should have its gain reduced, making it less likely until the timeline state changes.
5.  **Response Loop Test:** A sequence of aligned responses must measurably increase `A` and future `Q`. A sequence of avoidance responses must trigger a cooldown on the event's theme.
6.  **Anti-Exploit Test:** Repeatedly attempting to "game" the system should trigger the diversity and cooldown constraints, preventing pathological feedback loops.

---

## 12. Integration Points

- **Consumes:** `A, V, E, C, B, P, Θ, Λ, TΣ`, and seeds from their respective subsystems.
- **Emits:** `SynchronicityPulse`, `SynchronicityEvent`, `HintBreadcrumb` events to the main event bus.
- **Updates:** Player state is updated via the Emotional Physics, Belief, and Timeline subsystems in response to player actions.
- **Persistence:** All emitted events are written to an append-only event log. Snapshots of the probability distributions can be saved for debugging.

---

## 13. Parameterization & Tuning

The following constants must be exposed for tuning:

- `α` (sensitivity)
- `τ_q` (pulse threshold)
- `W` (pulse window size)
- `δ` (diversity coefficient)
- `γ` (cooldown schedule)
- `β(rigidity)` (belief penalty curve)
- `ω` (timeline compatibility weight)

The system should support A/B testing of different parameter sets under the same seed to compare outcomes deterministically.

---

## 14. Glossary

| Term | Definition |
| --- | --- |
| **Receptivity (`Q(t)`)** | The measure of the Physical Mind's openness to perceiving synchronicity. |
| **Resonance (`R(t)`)** | The degree of alignment between the player's current state and their Soul Blueprint. |
| **Meaning Score (`M_e(t)`)** | The thematic relevance of a candidate event to the Soul Blueprint. |
| **Eligibility (`φ_e(t)`)** | The fitness of an event to be considered for synchronistic selection. |
| **Pulse Intensity (`I`)** | The energetic magnitude of a Synchronicity Pulse. |
| **Breadcrumb** | A low-intensity, symbolic hint surfaced when Clarity is low. |
| **Diversity Constraint** | A rule to prevent the over-selection of events with the same theme. |
| **Cooldown** | A deterministic period during which a specific event or theme cannot be re-selected. |
