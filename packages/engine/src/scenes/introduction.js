import { calculateResonanceLevel } from '@synchronicity/shared';
const attuneBreath = {
    narrative: 'A measured inhale steadies the chamber as harmonics settle around you.',
    resonanceShift: { focus: 6, intuition: 4, harmony: 8 },
    energyDelta: 1,
};
export const introductionScene = {
    id: 'introduction',
    title: 'Awakening Chamber',
    onDescribe: ({ state }) => {
        const level = calculateResonanceLevel(state.resonance);
        const summary = `The crystalline chamber hums at a ${level} cadence while your energy rests at ${state.energy}.`;
        return {
            summary,
            actions: [
                {
                    id: 'attune-breath',
                    label: 'Attune Breath',
                    description: 'Steady your breath to coax the chamber into harmony.',
                    cost: 2,
                },
                {
                    id: 'open-gate',
                    label: 'Open Resonant Gate',
                    description: 'Channel stored energy into the central gateway.',
                    cost: 4,
                },
            ],
        };
    },
    onResolve: (actionId, { state }) => {
        if (actionId === 'attune-breath') {
            return attuneBreath;
        }
        const harmonyPenalty = calculateResonanceLevel(state.resonance) === 'chaotic' ? -12 : 0;
        const resonanceShift = { focus: 2 + harmonyPenalty, intuition: 5, harmony: 10 + harmonyPenalty };
        const nextSceneId = state.resonance.harmony + resonanceShift.harmony >= 60 ? 'convergence' : 'introduction';
        return {
            narrative: 'You align the gate sigils and a resonant doorway crackles into view.',
            resonanceShift,
            energyDelta: -2,
            nextSceneId,
        };
    },
};
