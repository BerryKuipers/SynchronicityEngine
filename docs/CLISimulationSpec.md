# CLI Simulation Gameplay Interface Specification

## 1. Purpose & Philosophy

This document defines the specification for the Command Line Interface (CLI) gameplay interface and its corresponding adapter layer for the SynchronicityEngine.

The CLI serves as the first playable, text-first prototype of the engine. Its primary purpose is to function as a **consciousness physics experiment interface**, not a spiritual role-playing game. It is designed to be a cognitive sandbox where a player can directly observe and interact with the core feedback loop of the engine: `belief → emotion → choice → reality`.

### Core Functions:
- **Playable Layer**: Provides the initial user-facing experience of a life simulation driven by the consciousness engine.
- **Debugging Window**: Acts as a direct view into metaphysical state transitions, making the engine's mechanics transparent.
- **Test Harness**: Serves as a deterministic testbed for AI personas (LLM-driven or otherwise) that will be integrated later.
- **Narrative Channel**: Delivers key information to the player, such as synchronicity breadcrumbs, emotional feedback, dream sequences, and alignment metrics.

The user experience should feel like operating a sophisticated piece of scientific equipment for exploring the mechanics of consciousness.

---

## 2. Game Loop Structure

The core of the CLI experience is a deterministic, tick-based game loop. Each cycle represents a single **moment of choice** and follows a strict sequence:

1.  **Tick `N`**: The loop begins, advancing the simulation tick.
2.  **Present State Snapshot**: The CLI displays a summary of the player's current situation, including a narrative description of the "life moment."
3.  **Display Field Feedback**:
    -   **Emotional Field**: Shows the current emotional vector (e.g., `fear-contraction`, `excitement-expansion`).
    -   **Belief State**: Highlights any beliefs under pressure or close to a state change.
    -   **Synchronicity Indicators**: Notes the potential for meaningful coincidences in the current environment.
4.  **Player Action Selection**: The player is prompted to choose from a list of available symbolic actions.
5.  **Engine Update**: The chosen action is sent to the engine, which processes the choice, updates the worldline, and calculates the new state for the next tick.
6.  **Log Entry**: A deterministic entry is written to the replay log, recording the state, the choice, and the outcome for this tick.

This structure ensures that every moment of gameplay is a clear, self-contained interaction with the engine's core mechanics.

---

## 3. User Input Model

Player input is designed to be symbolic and abstract, reflecting high-level cognitive and emotional choices rather than detailed physical actions. Verbose chat or natural language parsing is explicitly out of scope.

### Affordances (Player Commands):

The player chooses from a context-sensitive list of commands, such as:

-   **`act <behaviour_choice>`**: Make a choice based on the current narrative situation.
-   **`focus <intention>`**: Direct attention or intention towards a specific element of the situation.
-   **`reflect`**: Trigger an introspection event to examine the beliefs behind the current emotional state.
-   **`release <belief_id>`**: Attempt to de-rigidify or surrender a specific limiting belief.
-   **`trust` / `surrender`**: Make a choice that represents a jump in alignment, acting without full information.
-   **`avoid` / `resist`**: Engage an ego defense mechanism in response to a challenging situation.
-   **`dream`**: Voluntarily enter a subconscious/dream state to process information.
-   **`respond <synchronicity_id>`**: Act upon a presented synchronicity.
-   **`doubt` / `fear` / `control`**: Make a choice rooted in ego-based control, testing the system's resistance feedback.

All inputs are routed through the CLI adapter to the appropriate `EngineCommandPort`.

---

## 4. Output / Display Model

The CLI presents information in a clear, data-rich format, separated into distinct panels.

### Main Display Panels:

#### Perception Layer
This is the primary narrative window.
-   **Narrative Text**: A concise, metaphor-grounded description of the current "life moment."
-   **Emotional Telemetry**: `EMOTION: Expansion (Excitement) | Intensity: 8/10`
-   **Belief Warnings**: `STRESS: Belief B-07 ('I am not worthy') is under pressure.`
-   **Synchronicity Breadcrumb**: `SYNC: A book on a nearby table seems to catch your eye.`
-   **Inner Voice**: `EGO: 'This is too risky. You should play it safe.'`
-   **Higher Mind Pulse**: (Appears when unlocked) `HM: A feeling of deep peace accompanies this path.`
-   **Probability Wave**: `PROB: The potential for a significant connection has increased.`

#### Debug Panel (Always Visible)
Provides raw data about the simulation state.
-   `TICK: 147`
-   `SEED: 0x...a4f3`
-   `VIBRATION: 450Hz`
-   `ALIGNMENT: +0.12 delta`
-   `TIMELINE: 01-A`
-   `ENTROPY: 0.3 (Clarity)`
-   `DREAM RECALL: 85%`
-   `INSIGHTS: 2`

### Optional Advanced Panels (Toggled via `/panel` command)

-   **Belief Table**: An abbreviated view of the player's core beliefs and their current strength/rigidity.
-   **Emotion Graph**: An ASCII waveform plotting emotional state over the last `N` ticks.
-   **Timeline Graph**: An ASCII tree diagram showing the current timeline and any branches.
-   **Synchronicity Gauge**: A "heat gauge" showing the accumulated potential for a synchronicity event.

---

## 5. Narrative Systems

The narrative is a direct reflection of the engine's state, presented symbolically rather than as a literal story.

### Principles:
-   **Symbols over Specifics**: Situations are described in archetypal terms (e.g., "A challenge to your authority" instead of "Your boss yells at you").
-   **Metaphorical Grounding**: Scenarios are grounded in common human experiences to be relatable.
-   **Probabilistic Consequences**: The outcome of a choice is not a linear script but an emergent result of the engine's probabilistic rules.

### Narrative Templates:
The CLI adapter will use a templating system to generate text for:
-   Life Situations
-   Emotional Inflection Moments
-   Synchronicity Hints
-   Dream Fragments
-   Alternate-Self Whisper Echoes (hints from parallel timelines)
-   Higher-Mind Signal Attempts (describing the feeling of successful or failed intuition)

---

## 6. Alignment Feedback Loop

The UI must provide clear, constant feedback on the player's alignment state.

### Displayed Metrics:
-   `ALIGNMENT: 72%`
-   `LEVEL PROXIMITY: 88% towards Higher-Mind Perception`
-   `VIBRATION: 450Hz (Clarity)`
-   `RESISTANCE METER: [||--]`
-   `EMOTIONAL MOMENTUM: +2 (Accelerating)`
-   `INFLUENCE RATIO: Ego 30% | Higher Mind 70%`

### Unlocking Higher Perception:
When alignment and vibration sustain above a certain threshold:
-   A new command is unlocked: **`listen`**.
-   The **Higher Mind Pulse** appears in the Perception Layer, offering a new channel of information.
-   Narrative hints shift from focusing on local events to highlighting global patterns.

---

## 7. Dream Mode Spec

Dream Mode is a distinct state within the CLI.

### Triggers:
-   Player input (`dream` command).
-   High emotional buildup (positive or negative).
-   Accumulation of un-actioned synchronicities.
-   Reaching a peak alignment state.

### Outputs:
-   **Symbol Stream**: A raw feed of archetypal symbols and glyphs.
-   **Archetypal Guidance**: A narrative fragment translating the core message of the dream.
-   **Belief Release Opportunity**: A prompt to `release` a specific belief illuminated by the dream.
-   **Memory Packet**: If the `DREAM RECALL` probability roll succeeds, a new insight or piece of information is gained.
-   **Debug Info**: The CLI will display the "Dream Entropy" score used to generate the dream.

---

## 8. Debug Commands

For development and testing, a set of slash commands will be available:

-   `/state`: Dump the full current state of the engine.
-   `/beliefs`: Display the detailed belief table.
-   `/emotions`: Display the detailed emotional state vector.
-   `/timeline`: Show information about the current timeline and its branches.
-   `/replay start <logfile>`: Begin a replay from a log.
-   `/replay to <tick>`: Advance the replay to a specific tick.
-   `/branch <id>`: Switch the view to a parallel timeline branch.
-   `/seed info`: Display the global seed and all sub-seeds.
-   `/rng check`: Run a diagnostic on the PRNG streams.
-   `/panel toggle <panel_name>`: Toggle the visibility of advanced panels.

---

## 9. Determinism Rules

The CLI adapter must strictly adhere to the engine's determinism contract:
-   All narrative events, choices, and descriptions must be derivable from the simulation seed.
-   Dream content must be generated deterministically.
-   Synchronicity selection and presentation must be a deterministic function of the engine state.
-   Player choices, while interactive, are recorded in the event log, making the entire session reproducible. Adjusting the "ego vs. alignment dial" in the engine's parameters should yield predictably different outcomes in the CLI.

---

## 10. End Conditions

A simulation run can end in one of two primary modes, with clear textual feedback.

### 1) Ego-Based Exit
Triggered by sustained low alignment, high resistance, or stagnation.
-   **Avoidance Exhaustion**: The player runs out of energy to resist catalysts.
-   **Emotional Collapse**: The emotional state falls below a critical threshold.
-   **Stagnation Plateau**: The player achieves a stable but non-growth state and refuses all prompts to evolve.
-   **Display**: The CLI will output a summary of the karmic loops and unresolved beliefs, followed by `SESSION ENDED: TIMELINE COLLAPSED`.

### 2) Alignment Breakthrough
Triggered by sustaining a peak vibrational state.
-   **Identity Transcendence**: The player successfully `releases` the core ego-identity belief.
-   **Transition to Higher-Mind Camera**: The primary perception shifts from the individual to a wider, more objective view.
-   **Display**: The CLI will output a summary of the insights gained, followed by `SESSION COMPLETE: PERCEPTION SHIFT ACHIEVED. HIGHER-MIND INTERFACE UNLOCKED.`. (The new interface is not part of this spec).
