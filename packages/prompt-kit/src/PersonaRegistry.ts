import * as fs from 'fs';
import * as path from 'path';
import { IPromptRegistry } from './contracts/PromptContracts';

export class PersonaRegistry
  implements IPromptRegistry<null, { version: string }>
{
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public load(
    key: null,
    version: { version: string }
  ): { path: string; body: string } {
    const filePath = path.join(
      this.basePath,
      'persona',
      `persona_${version.version}.md`
    );

    try {
      const body = fs.readFileSync(filePath, 'utf-8');
      return { path: filePath, body };
    } catch (error) {
      throw new Error(`Could not load persona file: ${filePath}`);
    }
  }
}
