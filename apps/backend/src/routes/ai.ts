import { FastifyInstance } from 'fastify';
import { FromSchema } from 'json-schema-to-ts';
import {
  assembleChat,
  DirectOpenAIAdapter,
  MockDeterministicAdapter,
} from '@synchronicity/prompt-kit';
import type { PromptAssemblyInput, ChatAssembly } from '@synchronicity/prompt-kit/types';

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
      } as unknown as PromptAssemblyInput);

      // Select and use adapter functionally
      const result = process.env.OPENAI_API_KEY
        ? await DirectOpenAIAdapter.generate(assembly.system, assembly.user, { seed })
        : MockDeterministicAdapter.generate(assembly.system, assembly.user, { seed });

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
