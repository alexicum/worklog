# --- Этап 1: Сборка всего монорепозитория ---
FROM node:24-alpine AS base

# Configure pnpm global
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME/bin:$PATH"
ENV COREPACK_ENABLE_DOWNLOAD_PROMPT=0

# Because telemetry messages are annoying
ENV TURBO_TELEMETRY_DISABLED=1

RUN corepack enable
RUN corepack prepare pnpm@11.4.0

FROM base AS builder

WORKDIR /app

RUN pnpm add turbo --global


# Копируем файлы конфигурации монорепозитория для кэширования слоев
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json turbo.json tsconfig.json ./
COPY apps/api/package.json ./apps/api/
COPY packages/database/package.json ./packages/database/
COPY packages/schemas/package.json ./packages/schemas/

# Устанавливаем все зависимости (включая dev)
RUN pnpm install --frozen-lockfile

# Копируем исходный код
COPY apps/api ./apps/api
COPY packages/database ./packages/database
COPY packages/schemas ./packages/schemas

# Собираем все пакеты через Turborepo (выполнит tsc во всех dist)
RUN pnpm build

# --- Этап 2: Финальный легковесный образ ---
FROM base AS runner
# RUN npm install -g pnpm

WORKDIR /app

# Копируем только скомпилированный код и необходимые package.json файлы
COPY --from=builder /app/package.json /app/pnpm-workspace.yaml /app/pnpm-lock.yaml ./
COPY --from=builder /app/apps/api/package.json ./apps/api/
COPY --from=builder /app/apps/api/dist ./apps/api/dist
COPY --from=builder /app/packages/database ./packages/database
COPY --from=builder /app/packages/schemas ./packages/schemas

# Устанавливаем только production-зависимости, чтобы уменьшить размер образа
RUN pnpm install --prod --frozen-lockfile --ignore-scripts

EXPOSE 3000

# Запускаем наше скомпилированное Fastify-приложение
# CMD ["sleep", "infinty"]
CMD ["pnpm", "--filter", "@repo/api", "start"]
