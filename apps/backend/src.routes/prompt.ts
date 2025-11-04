import { FastifyInstance } from 'fastify';
import { assembleChat } from '@synchronicity/prompt-kit';
import * as DirectOpenAiAdapter from '@synchronicity/prompt-kit/adapters/DirectOpenAiAdapter';
import * as LangChainAdapter from '@synchronicity/prompt-kit/adapters/LangChainAdapter';
import * as MockDeterministicAdapter from '@synchronicity/prompt-kit/adapters/MockDeterministicAdapter';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { PromptAssemblyInput } from '@synchronicity/prompt-kit/types';

const LLM_PROVIDER = process.env.LLM_PROVIDER || 'mock';

const beliefSchema = z.object({
  id: z.string(),
  description: z.string(),
  intensity: z.number(),
  rigidity: z.number(),
});

const beliefOverlaySchema = z.object({
  beliefs: z.array(beliefSchema),
});

const worldStateSchema = z.object({
  time: z.number(),
  energy: z.number(),
  resonance: z.number(),
  narrative: z.string(),
});

const blueprintSchema = z.object({
  themes: z.array(z.string()),
  excitement: z.array(
    z.object({
      keywords: z.array(z.string()),
      intensity: z.number(),
    })
  ),
});

const promptAssemblyInputSchema = z.object({
  layer: z.enum(['physical', 'higher', 'soul', 'oversoul']),
  lawVersion: z.string(),
  personaVersion: z.string(),
  beliefs: beliefOverlaySchema,
  world: worldStateSchema,
  blueprint: blueprintSchema,
  userIntent: z.string(),
  seed: z.string(),
  guardrails: z.array(z.string()).optional(),
});

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/assemble',
    { schema: { querystring: zodToJsonSchema(promptAssemblyInputSchema) } },
    async (request, reply) => {
      const chatAssembly = assembleChat(
        request.query as PromptAssemblyInput
      );
      reply.send(chatAssembly);
    }
  );

  fastify.post(
    '/generate',
    { schema: { body: zodToJsonSchema(promptAssemblyInputSchema) } },
    async (request, reply) => {
      const chatAssembly = assembleChat(
        request.body as PromptAssemblyInput
      );
      let llmResponse;

      switch (LLM_PROVIDER) {
        case 'openai':
          llmResponse = await DirectOpenAiAdapter.generate(
            chatAssembly.system,
            chatAssembly.user
          );
          break;
        case 'langchain':
          llmResponse = await LangChainAdapter.generate(
            chatAssembly.system,
            chatAssembly.user
          );
          break;
        default:
          llmResponse = MockDeterministicAdapter.generate(
            chatAssembly.system,
            chatAssembly.user
          );
      }

      reply.send({
        messages: {
          system: chatAssembly.system,
          user: chatAssembly.user,
        },
        meta: chatAssembly.meta,
        llm: llmResponse,
      });
    }
  );
}
