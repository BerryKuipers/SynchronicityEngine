import { ChatOpenAI } from '@langchain/openai';
import { ChatAnthropic } from '@langchain/anthropic';
import { HumanMessage, SystemMessage } from '@langchain/core/messages';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event.js';

export async function generate(
  system: string,
  user: string
): Promise<EngineEventPayload> {
  const provider = process.env.LANGCHAIN_PROVIDER || 'openai';

  let llm;

  if (provider === 'anthropic') {
    // Use Anthropic Claude
    llm = new ChatAnthropic({
      modelName: process.env.ANTHROPIC_MODEL_NAME || 'claude-sonnet-4-5',
      apiKey: process.env.ANTHROPIC_API_KEY,
      temperature: 0.7,
    });
  } else {
    // Use OpenAI (default)
    llm = new ChatOpenAI({
      modelName: process.env.OPENAI_MODEL_NAME || 'gpt-4.1-mini',
      apiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    });
  }

  const structuredLLM = llm.withStructuredOutput(EngineEventPayloadSchema);

  const response = await structuredLLM.invoke([
    new SystemMessage(system),
    new HumanMessage(user),
  ]);

  return EngineEventPayloadSchema.parse(response);
}
