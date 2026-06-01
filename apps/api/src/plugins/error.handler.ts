import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

// Описываем интерфейс ошибок Prisma, чтобы не импортировать тяжелые пакеты в рантайм
interface PrismaClientKnownRequestError extends Error {
  code: string;
  meta?: Record<string, unknown>;
}

export function registerErrorHandler(fastify: FastifyInstance) {
  fastify.setErrorHandler((unknownError: unknown, request: FastifyRequest, reply: FastifyReply) => {
    const error = unknownError as Error & { validation?: any[]; statusCode?: number; code?: string };
    // Для мониторинга в контейнере
    request.log.error(error);

    // 2. Обработка специфичных ошибок Prisma 7 (коды Pxxxx)
    if (error.name === 'PrismaClientKnownRequestError' || 'code' in error) {
      const prismaError = error as PrismaClientKnownRequestError;
      
      switch (prismaError.code) {
        case 'P2025': // Запись для обновления/удаления не найдена в PostgreSQL
          return reply.status(404).send({
            statusCode: 404,
            error: 'Not Found',
            message: 'Запрашиваемый ресурс не найден в базе данных'
          });
          
        case 'P2002': // Нарушение уникального ограничения (например, дубликат поля)
          return reply.status(409).send({
            statusCode: 409,
            error: 'Conflict',
            message: 'Ресурс с такими уникальными данными уже существует',
            target: prismaError.meta?.target
          });
          
        default:
          return reply.status(500).send({
            statusCode: 500,
            error: 'Internal Server Error',
            message: 'Произошла непредвиденная ошибка при работе с базой данных'
          });
      }
    }

    // 3. Обработка ошибок валидации Fastify / Typebox
    if (error.validation) {
      return reply.status(400).send({
        statusCode: 400,
        error: 'Bad Request',
        message: 'Ошибка валидации входящих данных',
        details: error.validation.map(err => ({
          path: err.instancePath,
          message: err.message,
          params: err.params
        }))
      });
    }

    // 4. Все остальные непредвиденные рантайм-ошибки (Fallback)
    const statusCode = error.statusCode || 500;
    return reply.status(statusCode).send({
      statusCode,
      error: error.name || 'Internal Server Error',
      message: error.message || 'Внутренняя ошибка сервера'
    });
  });
}
