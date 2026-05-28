import { FastifyInstance } from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { Type, TObject } from '@sinclair/typebox';
import { CrudService } from '#api/services/crud.service.js';

interface CrudSchemas {
  response: TObject<any>;
  create: TObject<any>;
  update: TObject<any>;
  paramsWithId: TObject<any>;
  errorResponse: TObject<any>;
}

export function createCrudRoutes(service: CrudService<any, any, any>, schemas: CrudSchemas, prefix: string) {
  return async function (fastify: FastifyInstance) {
    const server = fastify.withTypeProvider<TypeBoxTypeProvider>();
    server.register(async (instance) => {
      
      instance.post(`/${prefix}`, { schema: { body: schemas.create, response: { 201: schemas.response } } },
        async (request, reply) => {
          const item = await service.create(request.body);
          return reply.status(201).send(item);
      });

      instance.get(`/${prefix}`, { schema: { response: { 200: Type.Array(schemas.response) } } }, async () => {
        return await service.getAll();
      });

      instance.get(`/${prefix}/:id`, { schema: {
          params: schemas.paramsWithId,
          response: { 200: schemas.response, 404: schemas.errorResponse }
        }},
        async (request, reply) => {
          const item = await service.getById((request.params as any).id as string);
          if (!item) return reply.status(404).send({ message: 'Resource not found' });
          return item;
      });

      instance.put(`/${prefix}/:id`, { schema: { params: schemas.paramsWithId, body: schemas.update, response: { 200: schemas.response, 404: schemas.errorResponse } } },
        async (request, reply) => {
          try {
            return await service.update((request.params as any).id as string, request.body);
          }
          catch {
            return reply.status(404).send({ message: 'Resource not found' });
          }
      });

      instance.delete(`/${prefix}/:id`, { schema: { params: schemas.paramsWithId, response: { 204: Type.Null(), 404: schemas.errorResponse } } },
        async (request, reply) => {
          try {
            await service.delete((request.params as any).id as string);
            return reply.status(204).send(); }
          catch {
            return reply.status(404).send({ message: 'Resource not found' }); 
          }
      });

    });
  };
}
