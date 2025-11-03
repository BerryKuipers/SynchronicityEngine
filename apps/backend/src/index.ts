import Fastify from 'fastify';
import cors from '@fastify/cors';
import { createDefaultEngine } from '@synchronicity/engine';

const server = Fastify({ logger: true });
const engine = createDefaultEngine();

await server.register(cors, { origin: true });

server.get('/health', () => {
  return { status: 'ok' };
});

server.get('/api/sessions/:id', (request) => {
  const { id } = request.params as { id: string };
  const snapshot = engine.describe(id);
  return snapshot;
});

server.post('/api/sessions/:id/actions', (request, reply) => {
  const { id } = request.params as { id: string };
  const body = request.body as { actionId?: string };
  if (!body?.actionId) {
    void reply.code(400);
    return { error: 'actionId is required' };
  }
  try {
    return engine.performAction(id, body.actionId);
  } catch (error) {
    void reply.code(400);
    return { error: (error as Error).message };
  }
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
