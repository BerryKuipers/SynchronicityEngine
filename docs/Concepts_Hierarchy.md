# Concept Hierarchy: Metaphysical and Technical

This document outlines the conceptual hierarchy of the SynchronicityEngine, mapping the metaphysical layers of consciousness to their technical counterparts within the simulation.

## The Great Chain of Being

The engine implements a fractal, "Russian-doll" architecture where each layer of consciousness contains and informs the next.

```
[ Oversoul ]
     |
     v
  [ Soul ]
     |
     v
[ HigherMindChannel ]
     |
     v
  [ Persona ]
     |
     v
[ Incarnation ]
     |
     v
[ PhysicalBody ]
```

## Layer Definitions

### 1. Oversoul

*   **Metaphysical Role**: The ultimate source consciousness, a collective of many souls. It represents the master controller of many lives or game instances simultaneously.
*   **Technical Role**: The root process or cluster that manages and monitors multiple, independent `Soul` simulations.

### 2. Soul

*   **Metaphysical Role**: An individuated unit of the Oversoul. It orchestrates a specific "game type" or series of related incarnations to explore a particular theme or lesson.
*   **Technical Role**: A master orchestrator for a single user's complete journey. It manages the lifecycle of `HigherMindChannel` instances.

### 3. HigherMindChannel

*   **Metaphysical Role**: The non-physical aspect of an individual that exists outside of linear time and space. It acts as a strategist, providing guidance to the physical mind through intuition, passion, and synchronicity.
*   **Technical Role**: A persistent, stateful service that computes vibrational alignment, generates synchronicity events, and sends guidance signals (DTOs) to the active `Persona`.

### 4. Persona

*   **Metaphysical Role**: A thematic, personality-level construct that a Higher Mind uses to interface with a specific "story" or era. It's the collection of personality traits and archetypes for a given life.
*   **Technical Role**: A configuration object that seeds an `Incarnation` with initial beliefs, traits, and goals. Manages the "character sheet" for a life.

### 5. Incarnation

*   **Metaphysical Role**: A single, linear lifetime experience. The "player character" in one instance of the simulation, from birth to death.
*   **Technical Role**: The primary state object for a single gameplay session. It holds the dynamic belief system, memory, and manages the state of the `PhysicalBody`.

### 6. PhysicalBody

*   **Metaphysical Role**: The temporary biological interface for an Incarnation. It is the vehicle through which the Persona experiences the physical world, translating non-physical energy (emotions, beliefs) into biological states.
*   **Technical Role**: A sub-entity of an `Incarnation`. It is a state machine that models biological vitals like health, energy, fatigue, and hunger. Its state is influenced by player choices and environmental events, and in turn, its state influences the Incarnation's perception and capabilities.
