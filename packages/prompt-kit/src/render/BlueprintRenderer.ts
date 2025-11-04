import { IRenderer } from '../contracts/PromptContracts';
import { Blueprint } from '../types';

export class BlueprintRenderer implements IRenderer<Blueprint> {
  public render(input: Blueprint): string {
    const themes = `[BLUEPRINT THEMES]
${input.themes.map((t) => `- ${t}`).join('\n')}`;

    const excitement = `[EXCITEMENT SIGNALS]
${input.excitement
  .map(
    (e) =>
      `- Keywords: ${e.keywords.join(', ')} (Intensity: ${e.intensity})`
  )
  .join('\n')}`;

    return `${themes}\n${excitement}`;
  }
}
