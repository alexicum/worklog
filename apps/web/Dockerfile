# ========================================================
# STAGE 1: Base & Install (Установка зависимостей монорепозитория)
# ========================================================
FROM node:24-alpine AS base

ENV CI=true
# Устанавливаем pnpm глобально
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Because telemetry messages are annoying
ENV TURBO_TELEMETRY_DISABLED=1

RUN corepack enable
RUN corepack prepare pnpm@11.5.0

WORKDIR /usr/src/app

# Копируем конфигурационные файлы воркспейса для кэширования слоев
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json ./
COPY apps/web/package.json ./apps/web/
COPY packages/schemas/package.json ./packages/schemas/

# Ставим зависимости всего монорепозитория
RUN pnpm install --frozen-lockfile

# ========================================================
# STAGE 2: Checker & Builder (Сборка графа через Turborepo)
# ========================================================
FROM base AS builder

# Копируем исходный код необходимых пакетов
COPY packages/schemas ./packages/schemas
COPY apps/web ./apps/web

# Запускаем архитектурный линтинг Steiger
RUN pnpm --filter=@repo/web lint:fsd

# Собираем проект через Turborepo (соберет зависимость @repo/schemas)
RUN pnpm turbo build --filter=@repo/web

# Изолируем готовое production-приложение без символических ссылок в папку /prod/web
# Запускаем деплой с флагом --legacy для совместимости с pnpm 10+
RUN pnpm deploy --filter=@repo/web --prod --legacy /prod/web

# Переносим скомпилированную Vite статику (папку dist) в изолированный воркспейс
RUN cp -r apps/web/dist /prod/web/dist

# ========================================================
# STAGE 3: Runner (Финальный легковесный веб-сервер)
# ========================================================
FROM nginx:1.27-alpine AS runner

# Копируем кастомный конфиг Nginx для поддержки SPA-роутинга
COPY apps/web/nginx.conf /etc/nginx/conf.d/default.conf

# Копируем скомпилированную статику из этапа сборки
COPY --from=builder /prod/web/dist /usr/share/nginx/html

# Оставляем стандартный порт 80 внутри контейнера (маппинг будет в compose)
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
