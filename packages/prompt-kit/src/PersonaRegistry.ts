import { promises as fs } from 'fs';
import * as path from 'path';
import { IPromptRegistry } from './contracts/PromptContracts.js';

export class PersonaRegistry
  implements IPromptRegistry<null, { version: string }>
{
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public async load(
    key: null,
    version: { version: string }
  ): Promise<{ path: string; body: string }> {
    const filePath = path.join(
      this.basePath,
      'persona',
      `persona_${version.version}.md`
    );

    try {
      const body = await fs.readFile(filePath, 'utf-8');
      return { path: filePath, body };
    } catch (error) {
      throw new Error(`Could not load persona file: ${filePath}`);
    }
  }
}
