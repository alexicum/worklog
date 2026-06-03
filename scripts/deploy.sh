#!/bin/bash
set -e

export ENV_FILE=.env.prod

# Wipe out the compose project
docker compose --env-file $ENV_FILE down -v --remove-orphans

# Build the compose project
docker compose --env-file $ENV_FILE build --no-cache

# Start the database service, detached
docker compose --env-file $ENV_FILE up --wait --no-build db

# Push and seed db from docker in temporary container ('run --rm' api)
# Run once 
docker compose --env-file $ENV_FILE run --rm api pnpm --filter=@repo/database db:reset

# Start the fastify api service
docker compose --env-file $ENV_FILE up --wait --no-build api

# Start the web service
docker compose up -d web