import { FastifyInstance } from 'fastify'
import { getLatestSnapshot } from '../adapters/persistenceAdapter'

export default async function storage(f: FastifyInstance) {
f.get('/api/v1/snapshots/latest/:sessionId', async (req, _reply) => {
const { sessionId } = req.params as { sessionId: string }
const s = await getLatestSnapshot(sessionId)
return s ?? { snapshot: null }
})
}