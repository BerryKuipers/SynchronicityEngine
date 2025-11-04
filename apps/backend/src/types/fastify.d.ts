import 'fastify'
declare module 'fastify' {
  interface FastifyInstance {
    logSink: { log: (e: unknown) => void }
    traceSink: { trace: (e: unknown) => void }
  }
}
