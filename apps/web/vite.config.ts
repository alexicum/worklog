import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'node:url';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      // Нативная замена paths для Vite: мапим сорцы под структуру FSD
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  server: {
    port: 5173,
    strictPort: true, // Если docker контейнер запущен - выведет ошибку
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Адрес Fastify бэкенда apps/api
        changeOrigin: true,
      },
    },
  },
  build: {
    target: 'esnext', // Для поддержки Native ESM в Node.js 24
    sourcemap: true,
  },
});
