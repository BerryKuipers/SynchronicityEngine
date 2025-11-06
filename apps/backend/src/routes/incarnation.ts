import { FastifyInstance } from 'fastify';
import { PhysicalBodyRepo } from '@synchronicity/persistence';
import { Static, Type } from '@sinclair/typebox';

const IncarnationIdParams = Type.Object({
  id: Type.String(),
});

const UpdateBodyPayload = Type.Partial(Type.Object({
  health: Type.Number(),
  energy: Type.Number(),
  fatigue: Type.Number(),
  hunger: Type.Number(),
  mood: Type.Number(),
  injuries: Type.Record(Type.String(), Type.Any()),
  traits: Type.Record(Type.String(), Type.Any()),
}));

export default async function (fastify: FastifyInstance) {
  fastify.get(
    '/incarnation/:id/body',
    {
      schema: {
        params: IncarnationIdParams,
      },
    },
    async (request, reply) => {
      const { id } = request.params as Static<typeof IncarnationIdParams>;
      const body = await PhysicalBodyRepo.findByIncarnationId(id);
      if (!body) {
        return reply.code(404).send({ error: 'Physical body not found' });
      }
      return body;
    }
  );

  fastify.patch(
    '/incarnation/:id/body',
    {
      schema: {
        params: IncarnationIdParams,
        body: UpdateBodyPayload,
      },
    },
    async (request, reply) => {
      const { id } = request.params as Static<typeof IncarnationIdParams>;
      const payload = request.body as Static<typeof UpdateBodyPayload>;

      const updatedBody = await PhysicalBodyRepo.updateByIncarnationId(id, {
        ...payload,
        health: payload.health?.toString(),
        energy: payload.energy?.toString(),
        fatigue: payload.fatigue?.toString(),
        hunger: payload.hunger?.toString(),
        mood: payload.mood?.toString(),
      });

      if (!updatedBody) {
        return reply.code(404).send({ error: 'Physical body not found' });
      }

      return updatedBody;
    }
  );
}
