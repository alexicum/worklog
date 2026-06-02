import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

/**
 * Базовый API-клиент приложения.
 * Все эндпоинты из фич будут внедряться сюда через метод .injectEndpoints().
 */
export const baseApi = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    // Используем относительный путь, так как Vite-прокси перенаправит /api на http://localhost:3000
    baseUrl: '/api',
  }),
  // Регистрируем теги для управления кэшем (автообновление списков при CRUD)
  tagTypes: ['WorkLog'],
  endpoints: () => ({}),
});
