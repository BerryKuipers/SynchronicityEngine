import { DirectOpenAIAdapter } from '../adapters/DirectOpenAIAdapter';
import { test, mock } from 'node:test';
import assert from 'node:assert';
import OpenAI from 'openai';

mock.method(OpenAI.Chat.Completions.prototype, 'create', async (options: any) => {
  const content = options.messages[0].content;

  // Check for the repair prompt
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

  // The initial call with invalid data
  return {
    choices: [
      {
        message: {
          tool_calls: [
            {
              function: {
                // This is a valid JSON string, but it will fail Zod validation
                // because it's missing the 'resonance' and 'remainingEnergy' fields.
                arguments: '{"actionId": "test-action", "narrative": "invalid json", "applied": true}',
              },
            },
          ],
        },
      },
    ],
  };
});

test('DirectOpenAIAdapter should repair invalid JSON', async () => {
  const adapter = new DirectOpenAIAdapter('test-api-key');
  const response = await adapter.generate('invalid prompt');

  assert.deepStrictEqual(response, {
    actionId: 'repaired-action',
    narrative: 'repaired narrative',
    resonance: {
      focus: 0.5,
      intuition: 0.5,
      harmony: 0.5,
    },
    applied: true,
    remainingEnergy: 100,
  });
});
