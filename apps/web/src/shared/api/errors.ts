import type { SerializedError } from '@reduxjs/toolkit';
import type { FetchBaseQueryError } from '@reduxjs/toolkit/query';

/**
 * Type Guard для проверки, является ли ошибка ошибкой RTK Query (FetchBaseQueryError).
 */
export function isFetchBaseQueryError(error: unknown): error is FetchBaseQueryError {
  return typeof error === 'object' && error !== null && 'status' in error;
}

/**
 * Универсальный обработчик, извлекающий ошибки из ответов RTK Query.
 */
export function getApiErrorMessage(error: unknown): string {
  if (isFetchBaseQueryError(error)) {
    // Безопасное сужение типа для поля data, прилетающего из нашего Fastify error handler
    const errorData = error.data as { message?: string } | undefined;
    return errorData?.message || 'Не удалось выполнить операцию. Проверьте введенные данные.';
  }

  // Обработка системных или сетевых ошибок RTK Query (например, timeout или abort)
  const serializedError = error as SerializedError;
  return serializedError?.message || 'Произошла непредвиденная ошибка сети. Попробуйте позже.';
}