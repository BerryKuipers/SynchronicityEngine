# Physical Body Subsystem Specification

This document defines the mechanics of the `PhysicalBody` entity within the SynchronicityEngine.

## 1. Core Principles

The PhysicalBody is not merely a health meter; it is a dynamic system that reflects the `Incarnation`'s internal state. Its vitals are interconnected and influenced by beliefs, emotions, and actions.

- **Vibrational Resonance**: The body's state is a direct physical expression of the Incarnation's vibrational alignment. High alignment (joy, passion) leads to improved health and energy, while low alignment (fear, stress) degrades them.
- **Homeostasis and Allostasis**: The body constantly seeks equilibrium (homeostasis). However, prolonged stress or negative belief states induce an allostatic load, leading to chronic issues, fatigue, and illness.
- **Belief-Emotion-Physiology Axis**: A core mechanic is the causal chain:
  1.  **Belief**: A core belief (e.g., "I am not safe") is activated.
  2.  **Emotion**: The belief triggers a corresponding emotional state (e.g., fear, anxiety).
  3.  **Physiology**: The emotion maps to a physiological response (e.g., increased fatigue, decreased mood, compromised health).

## 2. State Variables

The `PhysicalBody` is defined by the following primary state variables:

-   `health`: Overall physical integrity. 100 is optimal, 0 is death.
-   `energy`: Available vitality for actions.
-   `fatigue`: Accumulated exhaustion. High fatigue reduces energy regeneration.
-   `hunger`: Need for nourishment. High hunger can deplete health and energy.
-   `mood`: A short-term emotional indicator, affecting performance and interactions.
-   `injuries`: A JSONB field storing specific, temporary conditions (e.g., `{ "sprained_ankle": { "severity": 0.4, "healing_progress": 0.1 } }`).
-   `traits`: A JSONB field for long-term genetic or chronic conditions (e.g., `{ "fast_metabolism": true }`).

## 3. Example Flow: Stress and Healing

This example illustrates the interplay of game mechanics on the PhysicalBody.

### Scenario: The player encounters a stressful event.

1.  **Event Trigger**: The engine generates a `STRESSFUL_ENCOUNTER` event.
2.  **Belief Activation**: The Incarnation's belief "The world is a dangerous place" is activated.
3.  **Emotional Response**: The `EmotionalPhysicsEngine` processes this, resulting in a `FEAR` state.
4.  **Vitals Update**: The `PhysicalBodyRepo.updateVitals` method is called with a delta:
    -   `mood`: -20
    -   `fatigue`: +15
    -   `energy`: -10
5.  **Long-Term Effect**: If this state persists, the allostatic load increases, slowly decreasing the baseline `health`.

### Scenario: The player chooses to rest and eat.

1.  **Player Action**: The player executes the `SLEEP` and `EAT` actions.
2.  **Vitals Update (`SLEEP`)**: `updateVitals` is called:
    -   `fatigue`: -50
    -   `energy`: +60
3.  **Vitals Update (`EAT`)**: `updateVitals` is called:
    -   `hunger`: -40
    -   `energy`: +20
4.  **Healing Process**: With sufficient energy and low fatigue, the `HEAL` process runs. The `sprained_ankle` injury's `healing_progress` increases. If it reaches 1.0, the injury is removed.
5.  **Positive Feedback Loop**: Improved physical state positively influences `mood`, which in turn makes it easier to achieve higher vibrational alignment.
