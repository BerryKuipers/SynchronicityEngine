import { FastifyInstance } from 'fastify'

export default async function (fastify: FastifyInstance) {
  const { traceSink } = fastify

  if (!traceSink) {
    fastify.get('/api/v1/trace/recent', async (request, reply) => {
      reply.send([])
    })
    fastify.get('/api/v1/trace/:traceId', async (request, reply) => {
      reply.send([])
    })
    return
  }

  fastify.get('/api/v1/trace/recent', async (request, reply) => {
    // This is not implemented in the sink yet, returning empty array
    // TODO: Implement head logic in sink
    reply.send([])
  })

  fastify.get('/api/v1/trace/:traceId', async (request, reply) => {
    const { traceId } = request.params as { traceId: string }
    const spans = traceSink.get(traceId)
    reply.send(spans)
  })
}
