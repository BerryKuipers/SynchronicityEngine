import { ChatOpenAI } from '@langchain/openai';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';
import { LLMAdapter } from './LLMAdapter';

export class LangChainAdapter implements LLMAdapter {
  async generate(
    system: string,
    user: string
  ): Promise<EngineEventPayload> {
    const llm = new ChatOpenAI({
      modelName: 'gpt-4-turbo-preview',
      apiKey: process.env.OPENAI_API_KEY,
    });

    const structuredLLM = llm.withStructuredOutput(EngineEventPayloadSchema);

    const response = await structuredLLM.invoke([
      new SystemMessage(system),
      new HumanMessage(user),
    ]);

    return EngineEventPayloadSchema.parse(response);
  }
}
