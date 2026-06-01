# Worklog

Монорепозиторий системы учета рабочего времени (Worklog):
pnpm, Turborepo, Fastify, Prisma.

## Сборка и запуск

1. Скопировать `.env.prod.example` в `.env.prop` в корне проекта.
```
POSTGRES_PASSWORD=dbpwd
DATABASE_URL=postgresql://postgres:dbpwd@db:5432/worklog?schema=public
```

2. Запустить скрипт `sh scripts/deploy.sh`

## 🛠 Стек и Архитектура

* **Менеджер пакетов:** `pnpm workspaces`
* **Оркестрация и сборка**: Turborepo + TS Project References (tsc --build)
* **API Бэкенд:** `Fastify` (`@repo/api`) + `Typebox`
* **База данных:** `PostgreSQL` + `Prisma` (`@repo/database`, `@repo/schemas`)
* **Контейнеризация:** Multi-stage Docker-сборка с разделением стадий сборки и продакшн-рантайма.

## Особенности реализации
* createCrudRoutes - фабричная функция для добавления типизированного CRUD-endpoint новой сущности (`apps\api\src\routes\crud.factory.ts`)
* typebox использует схемы из @repo/schemas (сгенерированные prisma)
---

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

API доступно по адресу: http://localhost:3000/worklog

## TODO:

1. Использовать docker secrets
2. Перенести prisma в devDependencies.
   Cейчас в deps для запуска `prisma seed` в одном контейнере с api.
3. `turbo prune --docker`
4. Выделить tsconfig.base.json
5. eslint, prettier.
6. 