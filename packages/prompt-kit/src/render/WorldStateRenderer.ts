import { IRenderer } from '../contracts/PromptContracts';
import { WorldState } from '../types';

export class WorldStateRenderer implements IRenderer<WorldState> {
  public render(input: WorldState): string {
    return `[WORLD STATE]
- Time: ${input.time}
- Energy: ${input.energy}
- Resonance: ${input.resonance}
- Narrative: ${input.narrative}`;
  }
}
