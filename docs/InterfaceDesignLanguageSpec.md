# Interface Design Language Specification

This document defines the visual, audio, and interaction design language for the SynchronicityEngine. It establishes a consistent metaphysical UX aesthetic intended to evolve across all future UI layers, from the initial CLI to a fully immersive cosmic interface. The goal is to communicate concepts like vibration, alignment, and parallel timelines through symbolic cognitive interfaces rather than literal mysticism.

## 1) Design Philosophy

The design language is founded on the principle that the user interface should feel like an extension of consciousness mechanics, not a conventional game HUD.

-   **Core Metaphor**: A merger of physics and spirituality, rendered as cognitive UX signals. Reality is represented as fields, waves, and probabilities, not discrete objects.
-   **Internal State Focus**: The UI reflects the player's internal state—emotions, beliefs, alignment—rather than an external world.
-   **Symbolic Representation**: Every element symbolizes a law or layer of awareness.
-   **Signal-to-Noise Ratio**:
    -   Low ego states correspond to low noise and clear signals.
    -   Resistance and misalignment manifest as UI distortion, static, or interference.
    -   Alignment is represented by clarity, smooth gradients, and harmonic transitions.
-   **Perceptual Metaphors**: Phenomena like parallel timelines are communicated through subtle cues like phase-offset echoes. Emotion, belief changes, and synchronicities should be *felt* through the interface, not just narrated.

**Visual Tone**: A cinematic, minimal, cosmic interface inspired by works like *Arrival*, *Interstellar*, and *Tenet*. The aesthetic is a soft-glow, phi-based geometry that feels like a slow, fractal intelligence—a modern, sacred-technical style devoid of "woo."

## 2) Layers of Display

The design is modular, allowing the interface to evolve across several phases without requiring core logic refactoring.

### Phase 1 — Text Mode (CLI)
-   State is conveyed through symbolic text and Unicode glyphs.
-   Emotional states are visualized as ASCII waveforms.
-   Synchronicity hints are represented by unique glyphs.
-   Dream fragments appear as poetic, symbolic text packets.
-   Timeline shifts are indicated by subtle phase-glitch text animations.

### Phase 2 — Quiet HUD
-   A minimal, dark interface with simple strokes and node-line diagrams representing the layers of consciousness.
-   Emotional energy is visualized with simple energy bars.
-   Higher Mind events are signaled by a gentle, breath-like pulse.

### Phase 3 — Cosmic Visualization Layer
-   Probability space is rendered as particle fields.
-   Vibration is communicated through wave thickness and color temperature.
-   Alignment is shown as a coherent, harmonic glow.
-   Ego-based resistance introduces static, jitter, and clipping artifacts.
-   Higher Mind guidance appears as a smooth, geometric flux.
-   Timeline branches are visualized as translucent, overlapping ribbons.

### Phase 4 — Immersive Field (VR/AR)
-   The experience takes place in an ambient space, not a literal "world."
-   Consciousness is represented through vectors, light, shape, texture, and "consciousness weather" soundscapes.

The UI is *always* a representation of the inner world.

## 3) Shader Language Specification

Shaders are the primary tool for expressing metaphysical states visually.

| Concept                  | Shader Behavior                                      |
| ------------------------ | ---------------------------------------------------- |
| **Alignment ↑**          | Smooth gradients, harmonic pulses, golden-ratio ripples |
| **Misalignment**         | Fractal shear, chromatic noise, turbulence           |
| **Emotional Intensity**  | Amplitude and color saturation shifts                |
| **Belief Rigidity**      | Angular, hard edges vs. soft, fractal curves        |
| **Insight Moment**       | White-gold flash with a dissolving sigil             |
| **Synchronicity**        | Pearlescent shimmer and temporal echo effect         |
| **Parallel Self Bleed**  | Phase-shifted duplicate silhouettes                  |
| **Dream Mode**           | Low-contrast bloom with a "glyph rain" effect        |

**Color Palette**:
-   Primary: Indigo, Ultraviolet
-   Accent: Pearl, Opal, Gold, Rose
-   Neutrals: Deep void tones (Obsidian, Charcoal, Midnight Teal)

## 4) Audio Design Language

Sound design follows a principle of subtle, intelligent ambience—organic-electronic "consciousness weather."

-   **Alignment**: Harmonic choir micro-tones and breath-like pads.
-   **Ego Resistance**: Gritty, granular textures and phase jitter.
-   **Emotional Shift**: Low-frequency modulation and an overtone bloom.
-   **Synchronicity**: A crystalline bell followed by a reversed whisper trail.
-   **Dream State**: An underwater choir, soft glitch blooms, and a lullaby-like pulse.
-   **Parallel Self Echo**: Out-of-phase binaural drift.
-   **Insight**: A soft-strike bowl sound combined with an "air-sheen."

Sounds should never be overly dramatic or lean into "spiritual meme" territory.

## 5) Interaction Design

Cognitive actions are mapped to somatic cues rather than traditional UI buttons.

-   **Attention Shift**: A subtle zoom toward a wave source.
-   **Acceptance / Surrender**: A "dissolve" mechanic.
-   **Alignment**: A harmonic "snap-to-coherence" effect.
-   **Fear / Contraction**: Geometry that tightens, darkens, and trembles.
-   **Insight**: A camera bloom followed by a re-crystallization of geometry.

Even in text mode, these interactions are mimicked through "breath" micro-prompts, subtle Unicode glyph shifts, and progressive text clarity animations.

## 6) Component Architecture

The UI layer is designed to be a replaceable, plug-in-based surface driven exclusively by Data Transfer Objects (DTOs) from the engine.

-   **Decoupling**: The UI contains no direct game logic and is reactive to engine events rather than polling for state.
-   **Event-Driven Rendering**: The rendering model is based on events such as:
    -   `onEmotionChange`
    -   `onBeliefShift`
    -   `onAlignmentTick`
    -   `onSynchronicityHint`
    -   `onDreamFragment`
-   **Abstraction**: Interface definitions must be abstract and not reference specific frameworks like React or Three.js.

## 7) Debug / God-View Overlays

Developer-only overlays provide a direct view into the engine's state.

-   **Consciousness Stack**: A column view from Oversoul to Ego.
-   **Waveform View**: Real-time visualization of emotional and vibrational waves.
-   **Probability Lattice**: A map of potential future timelines.
-   **Belief Network**: A graph of interconnected belief edges.
-   **Emotion Field**: A vector map of the current emotional landscape.
-   **Dream Packet Log**: A feed of dream data.
-   **Synchronicity Seed List**: A list of seeds driving synchronicity events.

These overlays are toggled via the `/dev ui` command in the CLI.
