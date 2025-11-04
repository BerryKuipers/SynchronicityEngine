import { promises as fs } from 'fs';
import * as path from 'path';

export interface PersonaTemplate {
  version: string;
  content: string;
}

export class PersonaRegistry {
  private personas = new Map<string, PersonaTemplate>();

  async load(): Promise<PersonaTemplate[]> {
    const dirPath = path.join(process.cwd(), 'config', 'prompts', 'persona');
    const files = await fs.readdir(dirPath);
    const templates = await Promise.all(
      files.map(async (file) => {
        const version = path.basename(file, '.md').split('_')[1];
        const content = await fs.readFile(path.join(dirPath, file), 'utf-8');
        const template = { version, content };
        this.personas.set(version, template);
        return template;
      })
    );

    return templates;
  }

  get(version: string): PersonaTemplate | undefined {
    return this.personas.get(version);
  }
}
