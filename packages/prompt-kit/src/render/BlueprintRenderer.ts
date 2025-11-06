import { IRenderer } from '../contracts/PromptContracts.js';
import { Blueprint } from '../types.js';

export class BlueprintRenderer implements IRenderer<Blueprint> {
  public render(input: Blueprint): string {
    const themes = `[BLUEPRINT THEMES]
${input.themes.map((t: string) => `- ${t}`).join('\n')}`;

    const excitement = `[EXCITEMENT SIGNALS]
${input.excitement
  .map(
    (e: { keywords: string[]; intensity: number }) =>
      `- Keywords: ${e.keywords.join(', ')} (Intensity: ${e.intensity})`
  )
  .join('\n')}`;

    return `${themes}\n${excitement}`;
  }
}
