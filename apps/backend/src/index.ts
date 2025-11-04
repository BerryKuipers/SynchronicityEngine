import Fastify from 'fastify';
import cors from '@fastify/cors';
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

let llmAdapter: LLMAdapter;

switch (process.env.LLM_PROVIDER) {
  case 'openai':
    llmAdapter = new DirectOpenAIAdapter(process.env.OPENAI_API_KEY!);
    break;
  case 'langchain':
    llmAdapter = new LangChainAdapter(process.env.OPENAI_API_KEY!);
    break;
  default:
    llmAdapter = new MockDeterministicAdapter();
}

server.post('/api/v1/prompt/generate', async (request, reply) => {
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.LLM_PROVIDER === 'mock'
  ) {
    void reply.code(400);
    return { error: 'Mock provider is not allowed in production.' };
  }

  const { prompt } = request.body as { prompt: string };
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
