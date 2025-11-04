import { DirectOpenAIAdapter } from '../adapters/DirectOpenAIAdapter';
import { test, mock, describe } from 'node:test';
import assert from 'node:assert';
import OpenAI from 'openai';

mock.method(OpenAI.Chat.Completions.prototype, 'create', async (options: any) => {
  const content = options.messages[0].content;

  if (content.includes('please fix it')) {
    return {
      choices: [
        {
          message: {
            content: JSON.stringify({
              actionId: 'repaired-action',
              narrative: 'repaired narrative',
              resonance: {
                focus: 0.5,
                intuition: 0.5,
                harmony: 0.5,
              },
              applied: true,
              remainingEnergy: 100,
            }),
          },
        },
      ],
    };
  }

  if (content.includes('invalid json string')) {
    return {
      choices: [
        {
          message: {
            tool_calls: [{ function: { arguments: '{"actionId": "test-action", "narrative": "invalid json"' } }],
          },
        },
      ],
    };
  }

  // Default case for invalid Zod schema
  return {
    choices: [
      {
        message: {
          tool_calls: [
            {
              function: {
                arguments: '{"actionId": "test-action", "narrative": "invalid schema", "applied": true}',
              },
            },
          ],
        },
      },
    ],
  };
});

describe('DirectOpenAIAdapter', () => {
  test('should repair a response with an invalid Zod schema', async () => {
    const adapter = new DirectOpenAIAdapter('test-api-key');
    const response = await adapter.generate('prompt for invalid schema');

    assert.deepStrictEqual(response, {
      actionId: 'repaired-action',
      narrative: 'repaired narrative',
      resonance: { focus: 0.5, intuition: 0.5, harmony: 0.5 },
      applied: true,
      remainingEnergy: 100,
    });
  });

  test('should repair a response with an invalid JSON string', async () => {
    const adapter = new DirectOpenAIAdapter('test-api-key');
    const response = await adapter.generate('invalid json string');

    assert.deepStrictEqual(response, {
      actionId: 'repaired-action',
      narrative: 'repaired narrative',
      resonance: { focus: 0.5, intuition: 0.5, harmony: 0.5 },
      applied: true,
      remainingEnergy: 100,
    });
  });
});
