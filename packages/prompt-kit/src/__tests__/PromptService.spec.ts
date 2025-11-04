import { describe, it } from 'node:test';
import assert from 'node:assert';
import path from 'path';
import { PromptService } from '../PromptService';
import { LawRegistry } from '../LawRegistry';
import { PersonaRegistry } from '../PersonaRegistry';

describe('PromptService', () => {
  it('should produce a stable promptHash', async () => {
    const basePath = path.join(process.cwd(), 'config', 'prompts');
    const lawRegistry = new LawRegistry(basePath);
    const personaRegistry = new PersonaRegistry(basePath);
    const service = new PromptService(lawRegistry, personaRegistry);
    const input = {
      layer: 'physical',
      lawVersion: 'v1',
      personaVersion: 'v1',
      beliefs: { belief1: 'value1' },
      worldState: { worldState1: 'value1' },
      blueprint: { blueprint1: 'value1' },
      guardrails: ['guardrail1'],
    };

    const result1 = await service.assemble(input);
    const result2 = await service.assemble(input);

    assert.strictEqual(result1.meta.promptHash, result2.meta.promptHash);
  });
});
