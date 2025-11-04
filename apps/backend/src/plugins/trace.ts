import fp from 'fastify-plugin'
export default fp(async app => {
  app.decorate('logSink', { log: e => app.log.info(e) })
  app.decorate('traceSink', { trace: e => app.log.debug(e) })
})
