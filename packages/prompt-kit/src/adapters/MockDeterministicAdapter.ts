import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';
import { createSha256Hash } from '../utils';

function simpleScoring(user: string): {
  actionId: string;
  narrative: string;
} {
  // TODO: Factor this out into a small module if duplication appears elsewhere.
  const excitementMatch = user.match(/Excitement: (\d+)/);
  const rigidityMatch = user.match(/Rigidity: (\d+)/);

  const excitement = excitementMatch ? parseInt(excitementMatch[1], 10) : 0;
  const rigidity = rigidityMatch ? parseInt(rigidityMatch[1], 10) : 5;

  if (excitement > 7 && rigidity < 4) {
    return {
      actionId: 'act-on-excitement',
      narrative: 'User is aligned and flexible, acting on highest excitement.',
    };
  }
  return {
    actionId: 'observe-and-reflect',
    narrative: 'User is in a state of observation and reflection.',
  };
}

export function generate(
  system: string,
  user: string,
  options?: { seed?: number }
): EngineEventPayload {
  const { actionId, narrative } = simpleScoring(user);
  const hash = createSha256Hash(`${user}-${options?.seed}`);

  const payload = {
    actionId,
    narrative,
    resonance: {
      focus: parseFloat(`0.${hash.substring(0, 2)}`),
      intuition: parseFloat(`0.${hash.substring(2, 4)}`),
      harmony: parseFloat(`0.${hash.substring(4, 6)}`),
    },
    applied: true,
    remainingEnergy: parseInt(hash.substring(6, 8), 16),
  };

  return EngineEventPayloadSchema.parse(payload);
}
