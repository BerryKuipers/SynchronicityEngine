# Architecture

SynchronicityEngine is organised into layers reflecting levels of consciousness. Each layer is represented by a TypeScript class implementing the `IConsciousnessLayer` interface. These classes are orchestrated by the `Engine` core, which coordinates input, state propagation and vibrational alignment calculations.

## Layers

| Layer          | Purpose |
| -------------- | ------- |
| **Oversoul**   | Root context containing multiple souls; manages the overall meta‑game. |
| **Soul**       | Governs a specific game archetype; manages reincarnational themes and aggregates higher minds. |
| **Higher Mind**| Holds the strategy and guiding principles for a single lifetime; provides intuition and synchronicity cues. |
| **Physical Mind** | Embodies the personality’s belief systems, perceptions and linear time experience; reacts to events. |
| **Personality**| Focused identity; interacts with the environment through the physical mind and expresses free will. |

## Engine

The engine maintains an ordered list of layers and exposes methods to run the simulation, propagate inputs and compute vibration scores. It does not know about presentation details. Future visual clients can subscribe to the engine’s outputs and render them appropriately.

## Data Flow

1. The physical layer receives input from the environment and updates its state and vibration.
2. The engine queries higher layers for guidance (synchronicity events) and passes them down.
3. Belief systems evolve based on actions and outcomes; vibration scores are recalculated.
4. Alignment with the higher mind triggers level‑up logic handled by the engine.

## Extending the Model

To add new behaviours, define additional methods in `IConsciousnessLayer` and implement them in each layer class. When adding new layers, ensure the engine is updated to handle their order.
