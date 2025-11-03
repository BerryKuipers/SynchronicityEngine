# CLI Simulation Specification

This document defines the Command Line Interface (CLI) gameplay interface and architecture for the SynchronicityEngine. Its purpose is to enable a text-first playable prototype where a player experiences a life simulation driven by the consciousness engine, modeling emotions, beliefs, synchronicities, dreams, and alignment progression in a deterministic manner.

## 1) Purpose & Philosophy

The CLI serves as:

- The first "playable layer" of the consciousness engine.
- A cognitive sandbox to observe the `belief → emotion → choice → reality` feedback loop.
- A debugging window into metaphysical state transitions.
- A test harness for deterministic, and later, LLM-driven personas.
- A narrative channel for delivering:
    - Synchronicity breadcrumbs
    - Emotional feedback signals
    - Dream sequences
    - Alignment feedback
    - Parallel timeline hints
    - Higher-mind nudges

The tone is not spiritual role-play, but rather a **consciousness physics experiment interface**.

## 2) Game Loop Structure

The main loop cycle, or "Tick," represents a single moment of choice and proceeds as follows:

1.  **Tick N**: The simulation advances one step.
2.  **Present State Snapshot**: A summary of the player's current state is displayed.
    -   Emotional field feedback
    -   Belief state pressures
    -   Synchronicity potential indicators
3.  **Player Action Selection**: The player is prompted to choose an action from a list of affordances.
4.  **Engine Update**: The engine processes the player's choice and updates the worldline state.
5.  **Replay Log Entry**: The state transition is recorded for debugging and replay.

## 3) User Input Model

The player interacts with the simulation by choosing from a set of symbolic affordances. These actions are routed to the appropriate engine ports.

-   **Act**: A standard behavioral choice within the narrative context.
-   **Focus**: A shift in intention or attention.
-   **Reflect**: An introspection event to analyze recent experiences.
-   **Release**: An action to de-rigidify or surrender a belief.
-   **Trust / Surrender**: An alignment jump, yielding control to the Higher Mind.
-   **Avoid / Resist**: An ego-defense mechanism.
-   **Dream**: Enter a subconscious state to process information.
-   **Respond to Synchronicity**: Acknowledge and act upon a synchronicity.
-   **Doubt / Fear / Control**: Test actions representing resistance.

Input is symbolic, not verbose chat, to maintain a clear, mechanical interaction model.

## 4) Output / Display Model

The CLI presents information through two primary layers: a perception layer and a debug panel.

### Perception Layer

-   **Narrative**: Text description of the current "life moment."
-   **Emotional Telemetry**: A vector and intensity score representing the current emotional state.
-   **Belief State**: Warnings of belief stress or fracture.
-   **Synchronicity**: A "breadcrumb" or hint of a synchronistic event.
-   **Inner Voice**: Ego chatter or internal monologue.
-   **Higher Mind Pulse**: A signal from the Higher Mind (when unlocked).
-   **Probability Wave**: An indicator of a shift in the potential future timeline.

### Debug Panel

-   **Tick**: Current simulation tick count.
-   **Seed**: The master seed for the current simulation.
-   **Vibration**: The player's current vibrational frequency.
-   **Alignment Delta**: The difference between Physical Mind and Higher Mind alignment.
-   **Timeline ID**: The identifier for the current timeline branch.
-   **Entropy / Clarity Score**: A measure of cognitive coherence.
-   **Dream Recall Probability**: The likelihood of remembering the last dream sequence.
-   **Insight Packets**: The number of new insights gained.

### Optional Advanced Panels

-   **Belief Table**: An abbreviated view of the current belief system.
-   **Emotion Graph**: An ASCII waveform of emotional fluctuations.
-   **Timeline Graph**: An ASCII tree diagram of timeline branches.
-   **Synchronicity "Heat Gauge"**: A meter indicating the potential for synchronicity.

## 5) Narrative Systems

Events are represented as symbols and metaphors rather than concrete, specific scenarios. This allows for probabilistic and emergent consequences.

### Narrative Templates

-   "Life Situations"
-   "Emotional Inflection Moments"
-   "Synchronicity Hints"
-   "Dream Fragments"
-   "Alternate-Self Whisper Echoes"
-   "Higher-Mind Signal Attempt (Failed/Succeeded)"

## 6) Alignment Feedback Loop

The CLI must provide clear feedback on the player's alignment state.

-   **Alignment %**: The current alignment score.
-   **Level Proximity**: Progress toward transitioning from the Physical to the Higher Mind.
-   **Vibration Frequency**: The current vibrational value.
-   **Resistance Meter**: A measure of opposition to alignment.
-   **Emotional Inertia**: The momentum of the current emotional state.
-   **Ego vs. Higher Mind Ratio**: The current balance of influence.

Upon reaching a sufficient alignment level, the `listen` command is unlocked, opening a direct narrative channel from the Higher Mind and shifting perception from local events to global patterns.

## 7) Dream Mode Spec

Dream mode can be triggered by:

-   The "Sleep" input command.
-   High emotional overwhelm.
-   Accumulated synchronicities.
-   Peak alignment states.

The output of a dream sequence includes:

-   A stream of symbolic data.
-   Archetypal guidance.
-   Opportunities for belief release.
-   A "memory packet" if the dream recall check succeeds.
-   A "dream entropy" score in the debug panel.

## 8) Debug Commands

A set of developer-mode commands for inspecting and manipulating the simulation state.

-   `/state`: Display the full raw state.
-   `/beliefs`: View the complete belief matrix.
-   `/emotions`: List current emotional vectors.
-   `/timeline`: Show timeline history and branches.
-   `/replay start`: Begin a replay from the log.
-   `/replay to <tick>`: Replay to a specific tick.
-   `/branch <id>`: Switch to a different timeline branch.
-   `/seed info`: Display information about the current seed.
-   `/rng check`: Verify the state of the random number generator.
-   `/panel toggle <name>`: Toggle the visibility of advanced panels.

## 9) Determinism Rules

The simulation must be fully deterministic.

-   All narrative events are algorithmically generated from the master seed.
-   Dream content is deterministic.
-   Synchronicity selection is a deterministic function of the simulation state.
-   Player choices that modify the "ego vs. alignment dial" yield predictable, repeatable outcomes.

## 10) End Conditions

The simulation can end in one of two primary modes:

**1) Ego-Based Exit**
-   **Avoidance Exhaustion**: The player can no longer avoid confronting a core belief.
-   **Emotional Collapse**: The emotional state becomes unstable.
-   **Stagnation Plateau**: The player ceases to make progress.

**2) Alignment Breakthrough**
-   **Identity Transcendence**: The player's sense of self expands beyond the Physical Mind.
-   **Transition to Higher-Mind Camera**: The primary viewpoint shifts to the Higher Mind.
-   This unlocks a new interface layer (to be defined in a separate specification).

The victory/failure state is displayed through a final narrative summary and a report of the final simulation state.
