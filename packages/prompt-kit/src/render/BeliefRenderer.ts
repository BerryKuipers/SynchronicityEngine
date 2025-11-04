import { IRenderer } from '../contracts/PromptContracts.js';
import { Belief, BeliefOverlay } from '../types.js';

export class BeliefRenderer implements IRenderer<BeliefOverlay> {
  public render(input: BeliefOverlay): string {
    if (input.beliefs.length === 0) {
      return '';
    }
    return `[BELIEFS]
${input.beliefs
  .map(
    (b: Belief) =>
      `- ${b.description} (Intensity: ${b.intensity}, Rigidity: ${b.rigidity})`
  )
  .join('\n')}`;
  }
}
