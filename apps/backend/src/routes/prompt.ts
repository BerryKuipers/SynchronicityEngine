import { FastifyInstance } from 'fastify';
import { assembleChat, DirectOpenAIAdapter, LangChainAdapter, MockDeterministicAdapter } from '@synchronicity/prompt-kit';
import { makeDigest } from '@synchronicity/prompt-kit/utils';
import { z } from 'zod';
import { zodToJsonSchema } from 'zod-to-json-schema';
import type { PromptAssemblyInput } from '@synchronicity/prompt-kit/types';
import { randomUUID } from 'crypto';
import { ILogSink } from '@synchronicity/trace/log';
import { ITraceSink } from '@synchronicity/trace/sink';
import { LogRecord, TraceSpan } from '@synchronicity/trace/types';

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

export default async function (fastify: FastifyInstance, opts: { logSink: ILogSink, traceSink: ITraceSink | null }) {
  const { logSink, traceSink } = opts;

  const createTraceContext = () => {
    const traceId = randomUUID();
    const runId = randomUUID();

    return {
      traceId,
      runId,
      log: (record: Omit<LogRecord, 'ts' | 'traceId' | 'runId'>) => {
        logSink.write({ ...record, ts: Date.now(), traceId, runId });
      },
      trace: (span: Omit<TraceSpan, 'ts' | 'traceId' | 'runId'>) => {
        traceSink?.append({ ...span, ts: Date.now(), traceId, runId });
      },
    };
  }

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

  fastify.post<{ Body: PromptAssemblyInput }>(
    '/generate',
    { schema: { body: zodToJsonSchema(promptAssemblyInputSchema) } },
    async (request, reply) => {
      const { log, trace } = createTraceContext();

      // 1. Assemble phase
      const assembleSpanId = randomUUID();
      trace({
        spanId: assembleSpanId,
        phase: 'assemble',
        inputs: {
          beliefsDigest: makeDigest(request.body.beliefs as unknown),
          worldDigest: makeDigest(request.body.world as unknown),
          blueprintDigest: makeDigest(request.body.blueprint as unknown),
          personaVersion: request.body.personaVersion,
          lawVersion: request.body.lawVersion,
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
          beliefsDigest: makeDigest(request.body.beliefs as unknown),
          worldDigest: makeDigest(request.body.world as unknown),
          blueprintDigest: makeDigest(request.body.blueprint as unknown),
          lawVersion: request.body.lawVersion,
          personaVersion: request.body.personaVersion,
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
        switch (LLM_PROVIDER) {
          case 'openai':
            llmResponse = await DirectOpenAIAdapter.generate(
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
      } catch (error) {
        log({
          level: 'error',
          topic: 'adapter.error',
          msg: 'Error calling LLM provider',
          data: {
            error: String((error as Error)?.message ?? error),
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
