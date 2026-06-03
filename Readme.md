# Worklog

Монорепозиторий системы учета рабочего времени (Worklog)
- Список: фильтрация и сортировка по дате. Редактирование и удаление записей.
- Форма добавления/редактирования.

- pnpm, Turborepo
- Front: Vite, TS, React, FSD, MUI, React-router.
- Back: TS, ESM, PostgreSQL, Fastify, TypeBox, Prisma.

## Сборка и запуск

1. Скопировать `.env.prod.example` в `.env.prop` в корне проекта.
```
POSTGRES_PASSWORD=dbpwd
DATABASE_URL=postgresql://postgres:dbpwd@db:5432/worklog?schema=public
```

2. Запустить скрипт `sh scripts/deploy.sh`

3. web приложение доступно по адресу: http://127.0.0.1:5173/worklog

## 🏗️ Структура Монорепозитория

```text
├── apps/
│   ├── api/             # Backend: Fastify (Node.js 24 + Prisma 7) [Порт 3000]
│   └── web/             # Frontend: React 19 + Vite 8 + MUI 9 (FSD) [Порт 5173]
├── packages/
│   ├── database/        # Клиент БД: Prisma Schema, клиент и миграции PostgreSQL
│   └── schemas/         # Контракты: Валидационные схемы данных на Typebox
├── compose.yaml         # Оркестрация локального и продакшн Docker-окружения
├── turbo.json           # Декларация тасок и кэширования сборки Turborepo
└── pnpm-workspace.yaml  # Конфигурация пакетов воркспейса pnpm
```

## 🛠 Стек и Архитектура

## 🛠️ Технический Стек и Особенности

*   **Backend (`apps/api`):** Архитектура плагинов Fastify. Фабрика CRUD-маршрутов со сквозным префиксом `/api`. Валидация через Fastify Type Provider на базе Typebox. Node.js 24 Native ESM.
*   **Frontend (`apps/web`):** Методология Feature-Sliced Design (FSD 2.0). Сверхбыстрая сборка через Vite 8 + Rolldown. RTK Query для CRUD и кэширования. Универсальные Stateful-формы на базе паттерна сброса пропса `key`.
*   **Database (`packages/database`):** PostgreSQL + Prisma 7.
*   **Schemas (`packages/schemas`):** Контракты (Typebox schemas). Выведенные TypeScript-типы переиспользуются бэкендом и фронтендом.

## Запуск (Локально)

### 1. Подготовка окружения
Создать файл `.env` в корне проекта:
```env
DATABASE_URL=postgresql://postgres:prisma@localhost:5433/worklog?schema=public
POSTGRES_PASSWORD=prisma
NODE_ENV=development
```
### 2. Выполнить запуск контейнеров (см. Сборка и запуск)
### 3. Остановить контейнер api.
`docker stop worklog-api` 
### 4. Запуск api:  
`pnpm dev`

**web приложение доступно по адресу: http://127.0.0.1:5173/worklog**

**API доступно по адресу: http://localhost:3000/api/worklog**

## TODO:

1. Использовать docker secrets
2. Перенести prisma в devDependencies.
   Cейчас в deps для запуска `prisma seed` в одном контейнере с api.
3. `turbo prune --docker`
4. Выделить tsconfig.base.json
5. eslint, prettier.