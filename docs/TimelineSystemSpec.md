# Multiverse Timeline System Specification

## 1. Concept Model

- **Timeline**: A timeline is a directed, acyclic graph representing a sequence of events and states that a player experiences. It is the "master" branch from which all other potential timelines diverge.

- **Branch**: A branch is a fork from a timeline, representing a potential future. It is created at a "choice point" and has its own distinct state. Branches can be either "active" (being explored by the player) or "inactive" (potential but not currently experienced).

- **Branch Collapse**: A branch collapses when its probability weight falls below a certain threshold. This can happen due to player choices that make the branch's future less likely, or due to a lack of "energetic" investment from the player.

- **Branch Merge**: A branch merges back into its parent timeline when the player's actions in the branch lead to a state that is functionally identical to a state on another branch or the main timeline.

## 2. State Variables

- **Timeline Energy / Probability Weight**: A normalized value [0, 1] representing the likelihood of a timeline branch manifesting. The sum of all active branches from a single choice point always equals 1.
- **Identity Coherence Score**: A measure [0, 1] of how consistent the player's identity is across timeline jumps. Lower scores indicate disorientation and a fragmented sense of self.
- **Alignment / Resonance Index**: A value [-1, 1] indicating the player's vibrational alignment with their "higher self" or optimal path. Positive values indicate high alignment, negative values indicate dissonance.
- **Divergence Factor**: A measure of how much a branch's state has deviated from its parent timeline.
- **Momentum of Self**: A vector representing the continuity of the player's core identity traits across branches.
- **Timeline Entropy**: A measure of the "disorder" or number of active, high-probability branches. High entropy indicates a lack of clarity and a fragmented future.

## 3. Branching Triggers

- **Belief Change Thresholds**: When a player's core beliefs are challenged or changed beyond a certain threshold, a new timeline branch is created to explore the consequences of this new belief.
- **Emotional State Inflection**: A significant shift in the player's emotional state (e.g., from despair to hope) can trigger a branch, representing a new emotional trajectory.
- **Alignment Spikes**: A sudden, sharp increase in the Alignment/Resonance Index will trigger a branch, representing a "higher vibrational" path opening up.
- **High-Choice-Density Moments**: Narrative moments with multiple, mutually exclusive choices will generate a branch for each potential choice.

## 4. Mechanics

- **Branch Generation Function**: `generate_branch(parent_timeline, trigger_event)` -> `new_branch`. This function creates a new branch with a copy of the parent's state, giving the new branch an initial probability weight based on the trigger event.
- **Branch Weighting Function**: `calculate_weight(branch, player_state)` -> `new_weight`. This function periodically updates the probability weight of each branch based on player alignment, beliefs, and emotional state. The sum of all weights for branches from a single point is normalized to 1.
- **Branch Decay Function**: `decay_branch(branch)` -> `updated_branch`. This function periodically decreases the probability weight of inactive branches, with the rate of decay proportional to the branch's divergence from the player's current reality.
- **Merge Algorithm**: `merge_branches(branch_a, branch_b)` -> `merged_timeline`. This algorithm is triggered when two branches become functionally identical, combining their histories and consolidating their probability weights.
- **Timeline Collapse Rules**: A branch collapses if its probability weight falls below a defined threshold (e.g., 0.01), at which point it is pruned from the timeline tree.
- **Timeline "Snap" Events**: A "snap" event occurs when a player's state changes dramatically, forcing a jump to a more aligned branch. This is a high-cost event, causing a significant decrease in Identity Coherence.

## 5. Synchronicity as Cross-Timeline Event

- **Synchronicity Pulse**: A synchronicity pulse is an event that occurs when two or more timelines "resonate." Resonance is calculated as a function of the similarity of their state vectors and the player's Alignment/Resonance Index.
- **Formal Rule for Synchronicity**: `if (state_similarity(branch_a, branch_b) > threshold && player.alignment > 0) { trigger_synchronicity_event() }`. The synchronicity event manifests as a "meaningful coincidence" in the player's active timeline, reinforcing the path and increasing its probability weight.

## 6. Travel / Sliding Model

- **Rules for Sliding**: A player "slides" into a higher-probability branch when their alignment and choices consistently favor that branch's trajectory. This is a passive, gradual process, not an active choice.
- **Cost of Jumps**: A "jump" is an active, forced shift to a different timeline, usually triggered by a "snap" event. The cost of a jump is a reduction in the Identity Coherence Score, leading to temporary disorientation and a penalty to certain in-game actions.
- **Re-stabilization Curve**: After a jump, the Identity Coherence Score will gradually return to its baseline over time, following a logarithmic curve.

## 7. Determinism & Seeds

- **Randomness**: All "random" events in the simulation are derived from a pseudo-random number generator (PRNG).
- **Seeding**: The PRNG is initialized with a seed value at the start of each simulation. This ensures that a given seed will always produce the same sequence of "random" numbers, and therefore the same simulation outcomes.
- **Replayability**: By saving the initial seed, a simulation can be replayed exactly, which is essential for debugging and testing.
- **Debug "Fixed Timeline" Mode**: A special debug mode will allow the engine to be run with a specific seed, and to "force" certain choices, allowing for the precise testing of specific timeline branches.

## 8. Data Structures

- **Timeline Tree/Graph**: The multiverse is represented as a tree or directed acyclic graph, where each node is a `TimelineNode` and each edge is a `TimelineEdge`.
- **`TimelineNode`**:
    - `node_id`: A unique identifier for the node.
    - `parent_id`: The ID of the parent node.
    - `state_vector`: A vector representing the game state at this node.
    - `metadata`: A dictionary of key-value pairs for storing additional data, such as the event that triggered the creation of this node.
- **`TimelineEdge`**:
    - `edge_id`: A unique identifier for the edge.
    - `source_node_id`: The ID of the source node.
    - `target_node_id`: The ID of the target node.
    - `probability_weight`: The probability weight of the target branch.

## 9. Test Scenarios

- **High alignment → narrowing multiverse**: A player with a consistently high Alignment/Resonance Index will see their timeline entropy decrease. The probability weights of branches that are not aligned with their trajectory will decay rapidly, leading to a single, high-probability path.
- **Low clarity → probabilistic fragmentation**: A player with a low Alignment/Resonance Index or a low Identity Coherence Score will experience an increase in timeline entropy. Many branches will have similar, low probability weights, and the player's future will be unclear.
- **Synchronicity spike → path reinforcement**: A synchronicity event will cause a significant increase in the probability weight of the player's active timeline. This will make the path more stable and less likely to be abandoned.
- **Belief collapse → forced branch jump**: A player who undergoes a radical belief change will trigger a "snap" event. The system will identify a branch that is more consistent with the new belief and force the player to "jump" to it, incurring a significant Identity Coherence penalty.

## 10. Visual Debug Layer

- **Branch Energy Bars**: A UI element that displays the probability weight of each active branch as a horizontal bar. This will allow for the at-a-glance visualization of the most likely futures.
- **Resonance Lines**: When a synchronicity event occurs, a glowing line will be drawn between the resonating branches in the timeline graph, visually indicating the cross-timeline connection.
- **Coherence Graph**: A line graph that plots the Identity Coherence Score over time, allowing for the easy identification of jumps and re-stabilization periods.
- **"Most Probable Current Identity Trajectory"**: A highlighted path through the timeline graph that represents the most likely sequence of future events, based on the current player state.
- **Optional "Quantum Fog" Regions**: Inactive branches with very low probability weights will be visually obscured by a "fog of war" effect, indicating that they are currently inaccessible to the player.
