import Fastify from 'fastify';
import cors from '@fastify/cors';
import { z } from 'zod';
import {
  createDefaultEngine,
  EngineCommandPort,
  EngineQueryPort,
} from '@synchronicity/engine';
import { EngineSnapshotV1 } from '@synchronicity/shared';
import {
  LLMAdapter,
  MockDeterministicAdapter,
  DirectOpenAIAdapter,
  LangChainAdapter,
} from '@synchronicity/prompt-kit';
import storage from './routes/storage';

const server = Fastify({ logger: true });

// The engine now conforms to the port interfaces
const engine: EngineCommandPort & EngineQueryPort = createDefaultEngine();

await server.register(cors, { origin: true });

server.register(storage);

server.get('/health', () => {
  return { status: 'ok' };
});

// Refactored to use the snapshot query port and the v1 DTO
server.get('/api/v1/sessions/:id', async (request): Promise<EngineSnapshotV1> => {
  const { id } = request.params as { id: string };
  const snapshot = await engine.snapshot(id);
  return snapshot;
});

// Refactored to use the act command port
server.post('/api/v1/sessions/:id/actions', async (request, reply) => {
  const { id } = request.params as { id: string };
  const body = request.body as { actionId?: string };
  if (!body?.actionId) {
    void reply.code(400);
    return { error: 'actionId is required' };
  }
  try {
    // The 'intent' is now the actionId
    await engine.act(id, body.actionId);
    return { ok: true };
  } catch (error) {
    void reply.code(400);
    return { error: (error as Error).message };
  }
});

const initializeLlmAdapter = (): LLMAdapter => {
  const provider = process.env.LLM_PROVIDER;

  if (process.env.NODE_ENV === 'production') {
    if (provider !== 'openai' && provider !== 'langchain') {
      throw new Error(
        `FATAL: Invalid LLM_PROVIDER configuration for production. Received "${provider}", but must be one of "openai" or "langchain".`
      );
    }
  }

  switch (provider) {
    case 'openai':
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('FATAL: OPENAI_API_KEY is required for the OpenAI provider.');
      }
      return new DirectOpenAIAdapter(process.env.OPENAI_API_KEY);
    case 'langchain':
      if (!process.env.OPENAI_API_KEY) {
        throw new Error('FATAL: OPENAI_API_KEY is required for the LangChain provider.');
      }
      return new LangChainAdapter(process.env.OPENAI_API_KEY);
    case 'mock':
    default: // Fallback to mock for development
      return new MockDeterministicAdapter();
  }
};

const llmAdapter = initializeLlmAdapter();

const promptRequestBodySchema = z.object({
  prompt: z.string().min(1),
});

server.post('/api/v1/prompt/generate', async (request, reply) => {
  const parseResult = promptRequestBodySchema.safeParse(request.body);

  if (!parseResult.success) {
    void reply.code(400);
    return { error: 'Invalid request body', details: parseResult.error.flatten() };
  }

  const { prompt } = parseResult.data;
  const result = await llmAdapter.generate(prompt);

  return { prompt, llm: result };
});

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '0.0.0.0';

const start = async (): Promise<void> => {
  try {
    await server.listen({ port, host });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

await start();
