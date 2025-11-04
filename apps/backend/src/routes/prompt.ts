import { FastifyInstance } from 'fastify';
import { assembleChat, makeDigest, DirectOpenAIAdapter, LangChainAdapter, MockDeterministicAdapter, PromptAssemblyInput } from '@synchronicity/prompt-kit';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import { randomUUID } from 'crypto';

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
  seed: z.number(),
  guardrails: z.array(z.string()).optional(),
});

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/assemble',
    { schema: { querystring: zodToJsonSchema(promptAssemblyInputSchema) } },
    async (request, reply) => {
      const chatAssembly = await assembleChat(
        request.query as PromptAssemblyInput
      );
      reply.send(chatAssembly);
    }
  );

  fastify.post(
    '/generate',
    { schema: { body: zodToJsonSchema(promptAssemblyInputSchema) } },
    async (request, reply) => {
      const { createTraceContext } = fastify as any;
      const { log, trace } = createTraceContext();
      const { body } = request as { body: PromptAssemblyInput };

      // 1. Assemble phase
      const assembleSpanId = randomUUID();
      trace({
        spanId: assembleSpanId,
        phase: 'assemble',
        inputs: {
          beliefsDigest: makeDigest(body.beliefs),
          worldDigest: makeDigest(body.world),
          blueprintDigest: makeDigest(body.blueprint),
          personaVersion: body.personaVersion,
          lawVersion: body.lawVersion,
        },
      });

      const chatAssembly = await assembleChat(
        request.body as PromptAssemblyInput
      );

      log({
        level: 'info',
        topic: 'assemble.done',
        msg: 'Chat assembly complete',
        data: {
          beliefsDigest: makeDigest(body.beliefs),
          worldDigest: makeDigest(body.world),
          blueprintDigest: makeDigest(body.blueprint),
          lawVersion: body.lawVersion,
          personaVersion: body.personaVersion,
        },
      });


      // 2. Generate phase
      const generateSpanId = randomUUID();
      trace({
        spanId: generateSpanId,
        parentSpanId: assembleSpanId,
        phase: 'generate',
        seed: (request.body as PromptAssemblyInput).seed,
        inputs: {
          provider: LLM_PROVIDER,
        },
      });

      log({
        level: 'info',
        topic: 'adapter.call',
        msg: `Calling LLM provider: ${LLM_PROVIDER}`,
        data: {
          provider: LLM_PROVIDER,
          // TODO: Add model when available
        },
      });

      let llmResponse;
      try {
        const directOpenAiAdapter = new DirectOpenAIAdapter({ apiKey: process.env.OPENAI_API_KEY });
        const langChainAdapter = new LangChainAdapter();
        const mockDeterministicAdapter = new MockDeterministicAdapter();
        switch (LLM_PROVIDER) {
          case 'openai':
            llmResponse = await directOpenAiAdapter.generate(
              chatAssembly.system,
              chatAssembly.user
            );
            break;
          case 'langchain':
            llmResponse = await langChainAdapter.generate(
              chatAssembly.system,
              chatAssembly.user
            );
            break;
          default:
            llmResponse = mockDeterministicAdapter.generate(
              chatAssembly.system,
              chatAssembly.user
            );
        }
      } catch (error) {
        log({
          level: 'error',
          topic: 'adapter.error',
          msg: 'Error calling LLM provider',
          data: {
            error: (error as Error).message,
          },
        });
        throw error;
      }


      // 3. Validate phase
      // TODO: Add actual validation logic
      const validated = true;
      const repaired = false;
      const reasons = ['TODO: Add validation reasons'];

      trace({
        spanId: randomUUID(),
        parentSpanId: generateSpanId,
        phase: 'validate',
        outputs: {
          validated,
          repaired,
          event: llmResponse, // Redact large fields if needed
        },
        reasons,
      });

      log({
        level: 'info',
        topic: 'adapter.result',
        msg: 'LLM response received and validated',
        data: {
          validated,
          repaired,
          // TODO: Add eventType and intensity when available
          reasons,
        },
      });


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
