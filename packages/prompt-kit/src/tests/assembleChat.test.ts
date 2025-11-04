import { assembleChat } from '../PromptService';
import { PromptAssemblyInput } from '../types';

describe('assembleChat', () => {
  const baseInput: PromptAssemblyInput = {
    layer: 'physical',
    lawVersion: '1.0',
    personaVersion: '1.0',
    beliefs: {
      beliefs: [
        {
          id: 'b1',
          description: 'The world is friendly.',
          intensity: 0.8,
          rigidity: 0.2,
        },
      ],
    },
    world: {
      time: 1,
      energy: 10,
      resonance: 0.9,
      narrative: 'A new day begins.',
    },
    blueprint: {
      themes: ['exploration', 'connection'],
      excitement: [
        {
          keywords: ['adventure', 'discovery'],
          intensity: 0.9,
        },
      ],
    },
    userIntent: 'What should I do next?',
    seed: 'test-seed',
  };

  it('should produce a deterministic promptHash for identical inputs', () => {
    const assembly1 = assembleChat(baseInput);
    const assembly2 = assembleChat(baseInput);
    expect(assembly1.meta.promptHash).toBe(assembly2.meta.promptHash);
  });

  it('should produce a different promptHash for different inputs', () => {
    const assembly1 = assembleChat(baseInput);
    const assembly2 = assembleChat({
      ...baseInput,
      userIntent: 'What is the meaning of life?',
    });
    expect(assembly1.meta.promptHash).not.toBe(assembly2.meta.promptHash);
  });

  it('should correctly split components into system and user prompts', () => {
    const { system, user } = assembleChat(baseInput);
    expect(system).toContain('This is a test law for the physical layer.');
    expect(system).toContain('This is a test persona.');
    expect(system).toContain('[GUARDRAILS]');
    expect(user).toContain('[BELIEFS]');
    expect(user).toContain('[WORLD STATE]');
    expect(user).toContain('[BLUEPRINT THEMES]');
    expect(user).toContain('[EXCITEMENT SIGNALS]');
    expect(user).toContain('[USER INTENT]');
  });
});
