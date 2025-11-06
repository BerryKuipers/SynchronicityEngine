import Fastify from 'fastify';
import cors from '@fastify/cors';
import dotenv from 'dotenv';
dotenv.config({ path: '../../packages/persistence/.env' });
import {
  createDefaultEngine,
  EngineCommandPort,
  EngineQueryPort,
} from '@synchronicity/engine';
import { EngineSnapshotV1 } from '@synchronicity/shared';
import { createInMemoryWithNdjson, ITraceSink } from '@synchronicity/trace/sink';
import { createNdjsonLogger, ILogSink } from '@synchronicity/trace/log';
import { LogRecord, TraceSpan } from '@synchronicity/trace/types';
import { randomUUID } from 'crypto';
import storage from './routes/storage.js';
import promptRoutes from './routes/prompt.js';
import logRoutes from './routes/logs.js';
import incarnationRoutes from './routes/incarnation.js';
import aiRoutes from './routes/ai.js';

const server = Fastify({ logger: true });

// Configuration
const API_VERSION = process.env.API_VERSION ?? 'v1';
const API_PREFIX = `/api/${API_VERSION}`;

// The engine now conforms to the port interfaces
const engine: EngineCommandPort & EngineQueryPort = createDefaultEngine();

const traceSample = Number(process.env.TRACE_SAMPLE ?? (process.env.NODE_ENV === 'development' ? 1.0 : 0));
const traceSink: ITraceSink | null = traceSample > 0 ? createInMemoryWithNdjson('var/traces') : null;

const logSink: ILogSink = createNdjsonLogger('var/logs', 'backend');

await server.register(cors, { origin: true });

server.register(storage);
server.register(promptRoutes, { prefix: `${API_PREFIX}/prompt`, logSink, traceSink });
server.register(logRoutes, { logSink });
server.register(incarnationRoutes, { prefix: API_PREFIX });
server.register(aiRoutes, { prefix: `${API_PREFIX}/ai` });

server.get('/health', () => {
  return { status: 'ok' };
});

// Refactored to use the snapshot query port and the v1 DTO
server.get(`${API_PREFIX}/sessions/:id`, async (request): Promise<EngineSnapshotV1> => {
  const { id } = request.params as { id: string };
  const snapshot = await engine.snapshot(id);
  return snapshot;
});

// Refactored to use the act command port
server.post(`${API_PREFIX}/sessions/:id/actions`, async (request, reply) => {
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

const port = Number(process.env.PORT ?? 3001);
const host = process.env.HOST ?? '127.0.0.1';

const start = async (): Promise<void> => {
  try {
    await server.listen({ port, host });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
};

await start();
