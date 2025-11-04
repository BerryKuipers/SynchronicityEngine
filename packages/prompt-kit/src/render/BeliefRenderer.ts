import { IRenderer } from '../contracts/PromptContracts';
import { BeliefOverlay } from '../types';

export class BeliefRenderer implements IRenderer<BeliefOverlay> {
  public render(input: BeliefOverlay): string {
    if (input.beliefs.length === 0) {
      return '';
    }
    return `[BELIEFS]
${input.beliefs
  .map(
    (b) =>
      `- ${b.description} (Intensity: ${b.intensity}, Rigidity: ${b.rigidity})`
  )
  .join('\n')}`;
  }
}
