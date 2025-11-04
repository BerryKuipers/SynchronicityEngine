import { LLMAdapter } from './LLMAdapter';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';
import { BaseChatModel } from 'langchain/chat_models/base';
import { HumanMessage } from 'langchain/schema';
import { JsonOutputFunctionsParser } from 'langchain/output_parsers';

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

export class LangChainAdapter implements LLMAdapter {
  private model: BaseChatModel;

  constructor(model: BaseChatModel) {
    this.model = model;
  }

  async generate(prompt: string): Promise<EngineEventPayload> {
    const extractionFunction = {
      name: 'emit_event_payload',
      description: 'Emits a valid EngineEventPayload JSON object.',
      parameters: EngineEventPayloadJsonSchema,
    };

    const runnable = this.model
      .bind({
        functions: [extractionFunction],
        function_call: { name: 'emit_event_payload' },
      })
      .pipe(new JsonOutputFunctionsParser());

    const result = await runnable.invoke([new HumanMessage(prompt)]);

    try {
      return EngineEventPayloadSchema.parse(result);
    } catch (error) {
      throw new Error(`Invalid JSON output from LangChain adapter: ${(error as Error).message}`);
    }
  }
}
