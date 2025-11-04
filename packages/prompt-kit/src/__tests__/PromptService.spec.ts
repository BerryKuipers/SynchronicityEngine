import { describe, it } from 'node:test';
import assert from 'node:assert';
import { PromptService } from '../PromptService';

describe('PromptService', () => {
  it('should produce a stable promptHash', async () => {
    const service = new PromptService();
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
