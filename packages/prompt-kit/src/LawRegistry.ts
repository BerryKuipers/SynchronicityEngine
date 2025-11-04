import { promises as fs } from 'fs';
import * as path from 'path';
import { IPromptRegistry } from './contracts/PromptContracts.js';
import { Layer } from './types.js';

export class LawRegistry
  implements IPromptRegistry<{ layer: Layer }, { version: string }>
{
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public async load(
    key: { layer: Layer },
    version: { version: string }
  ): Promise<{ path: string; body: string }> {
    const filePath = path.join(
      this.basePath,
      'layers',
      key.layer,
      `law_${version.version}.md`
    );

    try {
      const body = await fs.readFile(filePath, 'utf-8');
      return { path: filePath, body };
    } catch (error) {
      throw new Error(`Could not load law file: ${filePath}`);
    }
  }
}
