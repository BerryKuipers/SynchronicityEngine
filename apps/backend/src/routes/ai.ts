import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import {
  assembleChat,
  LLMAdapter,
  PromptAssemblyInput,
  ChatAssembly,
} from '@synchronicity/prompt-kit';
import { adapters } from '@synchronicity/prompt-kit';

const fillBodySchema = {
  type: 'object',
  properties: {
    layer: { type: 'string' },
    lawVersion: { type: 'string' },
    personaVersion: { type: 'string' },
    seed: { type: 'number' },
    beliefs: { type: 'object' },
    world: { type: 'object' },
    blueprint: { type: 'object' },
    field: {
      type: 'object',
      properties: {
        id: { type: 'string' },
        kind: {
          type: 'string',
          enum: ['short_text', 'long_text', 'json', 'title', 'tags'],
        },
        purpose: { type: 'string' },
        constraints: { type: 'object' },
        currentValue: { type: 'string' },
      },
      required: ['id', 'kind', 'purpose'],
    },
    extraContext: { type: 'object' },
  },
  required: ['layer', 'field'],
} as const;

function selectAdapter(): LLMAdapter {
  if (process.env.OPENAI_API_KEY) {
    return new adapters.DirectOpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY });
  }
  return new adapters.MockDeterministicAdapter();
}

export default async function (fastify: FastifyInstance) {
  fastify.post<{ Body: FromSchema<typeof fillBodySchema> }>(
    '/fill',
    { schema: { body: fillBodySchema } },
    async (request, reply) => {
      const {
        layer,
        lawVersion,
        personaVersion,
        seed,
        beliefs,
        world,
        blueprint,
        field,
        extraContext,
      } = request.body;

      const userIntent = `Fill the field '${field.id}' (${
        field.kind
      }) with the purpose: ${
        field.purpose
      }. Current value is: '${JSON.stringify(
        field.currentValue
      )}'. Constraints: ${JSON.stringify(
        field.constraints
      )}. Extra context: ${JSON.stringify(extraContext)}`;

      const assembly: ChatAssembly = await assembleChat({
        layer,
        lawVersion: lawVersion ?? 'default',
        personaVersion: personaVersion ?? 'default',
        seed: seed ?? 0,
        beliefs: beliefs ?? { beliefs: [] },
        world: world ?? {},
        blueprint: blueprint ?? { themes: [], excitement: [] },
        userIntent,
      } as PromptAssemblyInput);

      const adapter = selectAdapter();
      const result = await adapter.generate(assembly.system, assembly.user, {
        seed,
      });

      // TODO: map confidence from result
      return reply.send({
        text: result.narrative,
        confidence: result.resonance.focus,
        seedUsed: seed,
        promptHash: assembly.meta.promptHash,
      });
    }
  );
}
