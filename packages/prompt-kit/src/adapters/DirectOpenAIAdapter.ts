import OpenAI from 'openai';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { EngineEventPayload, EngineEventPayloadSchema } from '../schema/event';

let openai: OpenAI | null = null;

function getClient(): OpenAI {
  if (!openai) {
    openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openai;
}

const STRICT_JSON = process.env.STRICT_JSON === 'true';

const REPAIR_PROMPT = `Return only the tool call 'emit_event_payload' with a JSON argument that matches the provided JSON Schema exactly. No prose. No markdown. No extra keys. If a value is unknown, choose the safest default and set confidence ≤ 0.3.`;

export async function generate(
  system: string,
  user: string,
  options?: { seed?: number }
): Promise<EngineEventPayload> {
  const client = getClient();
  const messages: OpenAI.Chat.Completions.ChatCompletionMessageParam[] = [
    { role: 'system', content: system },
    { role: 'user', content: user },
  ];

  const tools = [
    {
      type: 'function' as const,
      function: {
        name: 'emit_event_payload',
        description: 'Emits a structured engine event.',
        parameters: zodToJsonSchema(EngineEventPayloadSchema),
      },
    },
  ];

  let completion = await client.chat.completions.create({
    model: 'gpt-4-turbo-preview',
    messages,
    tools,
    tool_choice: STRICT_JSON ? { type: 'function', function: { name: 'emit_event_payload' } } : 'auto',
    seed: options?.seed,
  });

  const toolCall = completion.choices[0].message.tool_calls?.[0];

  if (!toolCall) {
    if (STRICT_JSON) {
      throw new Error('STRICT_JSON: No tool call was returned.');
    }

    messages.push(completion.choices[0].message);
    messages.push({ role: 'user', content: REPAIR_PROMPT });

    completion = await client.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages,
      tools,
      tool_choice: { type: 'function', function: { name: 'emit_event_payload' } },
      seed: options?.seed,
    });

    const repairedToolCall = completion.choices[0].message.tool_calls?.[0];
    if (!repairedToolCall) {
        throw new Error('Failed to repair JSON output.');
    }

    const payload = JSON.parse(repairedToolCall.function.arguments);
    return EngineEventPayloadSchema.parse(payload);
  }

  const payload = JSON.parse(toolCall.function.arguments);
  return EngineEventPayloadSchema.parse(payload);
}
