import * as fs from 'fs';
import * as path from 'path';
import { IPromptRegistry } from './contracts/PromptContracts';
import { Layer } from './types';

export class LawRegistry
  implements IPromptRegistry<{ layer: Layer }, { version: string }>
{
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  public load(
    key: { layer: Layer },
    version: { version: string }
  ): { path: string; body: string } {
    const filePath = path.join(
      this.basePath,
      'layers',
      key.layer,
      `law_${version.version}.md`
    );

    try {
      const body = fs.readFileSync(filePath, 'utf-8');
      return { path: filePath, body };
    } catch (error) {
      throw new Error(`Could not load law file: ${filePath}`);
    }
  }
}
