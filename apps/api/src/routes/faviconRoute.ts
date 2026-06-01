import { FastifyInstance } from 'fastify';

export const faviconRoute = async (fastify: FastifyInstance): Promise<void> => {
  fastify.get('/favicon.ico', async (request, reply) => {
    return reply.code(204).send();
  });
}