import 'dotenv/config';
import { defineConfig, env } from 'prisma/config';

console.log('connectionString in prisma.config: ', env('DATABASE_URL'))

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: "prisma/migrations",
    seed: "pnpm dlx tsx prisma/seed.ts",
  },
  datasource: {
    url: env('DATABASE_URL'),
  },
});