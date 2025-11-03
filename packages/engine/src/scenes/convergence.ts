import { calculateResonanceLevel } from '@synchronicity/shared';
import { SceneContext, SceneDefinition } from '../types.js';

export const convergenceScene: SceneDefinition = {
  id: 'convergence',
  title: 'Resonant Confluence',
  onDescribe: ({ state }: SceneContext) => {
    const level = calculateResonanceLevel(state.resonance);
    const summary = `Energy spirals through the confluence. Your aura vibrates at a ${level} pitch with ${state.energy} energy remaining.`;
    return {
      summary,
      actions: [
        {
          id: 'stabilize-field',
          label: 'Stabilize Field',
          description: 'Guide the resonance into a steady stream.',
          cost: 3,
        },
        {
          id: 'release-echo',
          label: 'Release Echo',
          description: 'Release a harmonic pulse to call distant allies.',
          cost: 5,
        },
      ],
      resonanceShift: { focus: 4, intuition: 3, harmony: 4 },
    };
  },
  onResolve: (actionId: string, { state }: SceneContext) => {
    if (actionId === 'stabilize-field') {
      return {
        narrative: 'You weave the streams together, anchoring the chamber in a calm resonance.',
        resonanceShift: { focus: 5, intuition: 2, harmony: 6 },
        energyDelta: 2,
      };
    }
    const intuitionBoost = state.history.length >= 3 ? 8 : 3;
    return {
      narrative: 'A radiant echo courses outward, promising future allies.',
      resonanceShift: { focus: 1, intuition: intuitionBoost, harmony: 5 },
      energyDelta: -1,
    };
  },
};
