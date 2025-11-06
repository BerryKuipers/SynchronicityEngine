import { IRenderer } from '../contracts/PromptContracts.js';
import { WorldState } from '../types.js';

export class WorldStateRenderer implements IRenderer<WorldState> {
  public render(input: WorldState): string {
    return `[WORLD STATE]
- Time: ${input.time}
- Energy: ${input.energy}
- Resonance: ${input.resonance}
- Narrative: ${input.narrative}`;
  }
}
