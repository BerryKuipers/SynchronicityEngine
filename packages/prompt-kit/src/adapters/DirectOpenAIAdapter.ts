import { LLMAdapter } from './LLMAdapter';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';
import OpenAI from 'openai';
import { ZodError } from 'zod';

const EngineEventPayloadJsonSchema = {
  type: 'object',
  properties: {
    actionId: { type: 'string' },
    narrative: { type: 'string' },
    resonance: {
      type: 'object',
      properties: {
        focus: { type: 'number' },
        intuition: { type: 'number' },
        harmony: { type: 'number' },
      },
      required: ['focus', 'intuition', 'harmony'],
    },
    applied: { type: 'boolean' },
    remainingEnergy: { type: 'number' },
  },
  required: ['actionId', 'narrative', 'resonance', 'applied', 'remainingEnergy'],
};

export class DirectOpenAIAdapter implements LLMAdapter {
  private openai: OpenAI;

  constructor(apiKey: string) {
    this.openai = new OpenAI({ apiKey });
  }

  async generate(prompt: string): Promise<EngineEventPayload> {
    const response = await this.openai.chat.completions.create({
      model: 'gpt-4-turbo',
      messages: [{ role: 'user', content: prompt }],
      tools: [
        {
          type: 'function',
          function: {
            name: 'emit_event_payload',
            description: 'Emits a valid EngineEventPayload JSON object.',
            parameters: EngineEventPayloadJsonSchema,
          },
        },
      ],
      tool_choice: {
        type: 'function',
        function: { name: 'emit_event_payload' },
      },
    });

    const toolCall = response.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('Invalid response from OpenAI: no tool call found.');
    }

    const payload = JSON.parse(toolCall.function.arguments);

    try {
      return EngineEventPayloadSchema.parse(payload);
    } catch (error) {
      if (process.env.STRICT_JSON === 'true') {
        throw new Error(`Invalid JSON output from OpenAI: ${(error as ZodError).message}`);
      }

      // Single repair prompt retry
      const repairPrompt = `The following JSON is invalid, please fix it: ${JSON.stringify(
        payload
      )}\n\nError: ${(error as ZodError).toString()}`;

      const repairedResponse = await this.openai.chat.completions.create({
        model: 'gpt-4-turbo',
        messages: [{ role: 'user', content: repairPrompt }],
        response_format: { type: 'json_object' },
      });

      const repairedPayload = JSON.parse(repairedResponse.choices[0].message.content || '{}');
      return EngineEventPayloadSchema.parse(repairedPayload);
    }
  }
}
