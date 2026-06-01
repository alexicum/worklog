import Fastify from 'fastify';
import { TypeBoxTypeProvider } from '@fastify/type-provider-typebox';
import { createCrudRoutes } from './routes/crud.factory.js';
import { workLogService } from './services/worklog.service.js';
import { registerErrorHandler } from './plugins/error.handler.js';
import { faviconRoute } from './routes/faviconRoute.js';
import * as workLogSchemas from '@repo/schemas';

const app = Fastify({ logger: true }).withTypeProvider<TypeBoxTypeProvider>();

registerErrorHandler(app);

app.register(faviconRoute);

app.register(createCrudRoutes(
  workLogService,
  {
    response: workLogSchemas.WorkLogSchema,
    create: workLogSchemas.CreateWorkLogSchema,
    update: workLogSchemas.UpdateWorkLogSchema,
    paramsWithId: workLogSchemas.ParamsWithIdSchema,
    errorResponse: workLogSchemas.ErrorResponseSchema
  },
  'worklog'
));

export { app };
