import Fastify from 'fastify';
import cors from '@fastify/cors';
import {
  createDefaultEngine,
  EngineCommandPort,
  EngineQueryPort,
} from '@synchronicity/engine';
import { EngineSnapshotV1 } from '@synchronicity/shared';
import { createInMemoryWithNdjson, ITraceSink, createNdjsonLogger, ILogSink, LogRecord, TraceSpan } from '@synchronicity/trace';
import { randomUUID } from 'crypto';
import storage from './routes/storage.js';
import promptRoutes from './routes/prompt.js';
import traceRoutes from './routes/trace.js';
import logRoutes from './routes/logs.js';
import aiRoutes from './routes/ai.js';

const server = Fastify({ logger: true });

// The engine now conforms to the port interfaces
const engine: EngineCommandPort & EngineQueryPort = createDefaultEngine();

const traceSample = Number(process.env.TRACE_SAMPLE ?? (process.env.NODE_ENV === 'development' ? 1.0 : 0));
const traceSink: ITraceSink | null = traceSample > 0 ? createInMemoryWithNdjson('var/traces') : null;

if (traceSink) {
  server.decorate('traceSink', traceSink);
}

const logSink: ILogSink = createNdjsonLogger('var/logs', 'backend');
server.decorate('logSink', logSink);

function createTraceContext() {
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

server.decorate('createTraceContext', createTraceContext);

await server.register(cors, { origin: true });

server.register(storage);
server.register(promptRoutes, { prefix: '/api/v1/prompt' });
server.register(traceRoutes);
server.register(logRoutes);
server.register(aiRoutes, { prefix: '/api/v1/ai' });

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
