import { describe, it, beforeEach, afterEach } from 'node:test';
import assert from 'node:assert';
import sinon from 'sinon';
import OpenAI from 'openai';
import { DirectOpenAIAdapter } from '../adapters/DirectOpenAIAdapter';
import { EngineEventPayloadSchema } from '../schema/event';

describe('DirectOpenAIAdapter', () => {
  let openaiStub: sinon.SinonStub;

  beforeEach(() => {
    openaiStub = sinon.stub(OpenAI.Chat.Completions.prototype, 'create');
  });

  afterEach(() => {
    openaiStub.restore();
  });

  it('should return a valid EngineEventPayload on the first attempt', async () => {
    const adapter = new DirectOpenAIAdapter('fake-api-key');
    const mockResponse = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                function: {
                  arguments: JSON.stringify({
                    actionId: 'test-action',
                    narrative: 'Test narrative',
                    resonance: { focus: 0.5, intuition: 0.5, harmony: 0.5 },
                    applied: true,
                    remainingEnergy: 100,
                  }),
                },
              },
            ],
          },
        },
      ],
    };
    openaiStub.resolves(mockResponse);

    const result = await adapter.generate('test prompt');
    assert.doesNotThrow(() => EngineEventPayloadSchema.parse(result));
  });

  it('should attempt to repair invalid JSON and succeed', async () => {
    const adapter = new DirectOpenAIAdapter('fake-api-key');
    const invalidJsonResponse = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                function: {
                  arguments: '{"actionId": "test-action", "narrative": "Test narrative", "resonance": { "focus": 0.5, "intuition": 0.5, "harmony": 0.5 }, "applied": true, "remainingEnergy": 100,}',
                },
              },
            ],
          },
        },
      ],
    };
    const validJsonResponse = {
      choices: [
        {
          message: {
            tool_calls: [
              {
                function: {
                  arguments: JSON.stringify({
                    actionId: 'repaired-action',
                    narrative: 'Repaired narrative',
                    resonance: { focus: 0.6, intuition: 0.6, harmony: 0.6 },
                    applied: false,
                    remainingEnergy: 50,
                  }),
                },
              },
            ],
          },
        },
      ],
    };
    openaiStub.onFirstCall().resolves(invalidJsonResponse);
    openaiStub.onSecondCall().resolves(validJsonResponse);

    const result = await adapter.generate('test prompt');
    assert.strictEqual(result.actionId, 'repaired-action');
  });
});
