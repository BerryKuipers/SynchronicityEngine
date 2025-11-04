import { LLMAdapter, LLMAdapterOptions } from './LLMAdapter';
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
  private model: string;

  constructor(apiKey: string, model: string = 'gpt-4-turbo') {
    this.openai = new OpenAI({ apiKey });
    this.model = model;
  }

  private async attemptRepair(repairPrompt: string): Promise<EngineEventPayload> {
    const repairedResponse = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: repairPrompt }],
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

    const toolCall = repairedResponse.choices[0]?.message?.tool_calls?.[0];
    if (!toolCall) {
      throw new Error('Invalid response from OpenAI: no tool call found.');
    }

    try {
      const repairedPayload = JSON.parse(toolCall.function.arguments);
      return EngineEventPayloadSchema.parse(repairedPayload);
    } catch (error) {
      throw new Error(`Failed to repair JSON response from LLM. Final error: ${(error as Error).message}`);
    }
  }

  async generate(prompt: string, options?: LLMAdapterOptions): Promise<EngineEventPayload> {
    const response = await this.openai.chat.completions.create({
      model: this.model,
      messages: [{ role: 'user', content: prompt }],
      seed: options?.seed,
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

    const rawArguments = toolCall.function.arguments;
    let payload: any;

    try {
      payload = JSON.parse(rawArguments);
    } catch (jsonError) {
      if (process.env.STRICT_JSON === 'true') {
        throw new Error(`Invalid JSON response from LLM: ${(jsonError as Error).message}`);
      }
      const repairPrompt = `Return only the tool call 'emit_event_payload' with a JSON argument that matches the provided JSON Schema exactly. No prose. No markdown. No extra keys. If a value is unknown, choose the safest default and set confidence ≤ 0.3.`;
      return this.attemptRepair(repairPrompt);
    }

    try {
      return EngineEventPayloadSchema.parse(payload);
    } catch (zodError) {
      if (process.env.STRICT_JSON === 'true') {
        throw new Error(`Invalid schema from LLM: ${(zodError as ZodError).message}`);
      }
      const repairPrompt = `Return only the tool call 'emit_event_payload' with a JSON argument that matches the provided JSON Schema exactly. No prose. No markdown. No extra keys. If a value is unknown, choose the safest default and set confidence ≤ 0.3.`;
      return this.attemptRepair(repairPrompt);
    }
  }
}
