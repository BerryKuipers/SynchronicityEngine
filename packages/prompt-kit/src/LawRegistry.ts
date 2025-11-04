import { promises as fs } from 'fs';
import * as path from 'path';

export interface LawPrompt {
  version: string;
  content: string;
}

export class LawRegistry {
  private laws = new Map<string, LawPrompt[]>();
  private basePath: string;

  constructor(basePath: string) {
    this.basePath = basePath;
  }

  async load(layer: string): Promise<LawPrompt[]> {
    if (this.laws.has(layer)) {
      return this.laws.get(layer)!;
    }

    const dirPath = path.join(this.basePath, 'layers', layer);
    const files = await fs.readdir(dirPath);
    const prompts = await Promise.all(
      files.map(async (file) => {
        const version = path.basename(file, '.md').split('_').pop();
        if (!version) {
          throw new Error(`Could not extract version from filename: ${file}`);
        }
        const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
        return { version, content };
      })
    );

    this.laws.set(layer, prompts);
    return prompts;
  }

  get(layer: string, version: string): LawPrompt | undefined {
    const prompts = this.laws.get(layer);
    return prompts?.find((p) => p.version === version);
  }
}
