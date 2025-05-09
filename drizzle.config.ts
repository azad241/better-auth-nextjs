import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  out: './app/api/database/drizzle',
  schema: ['./app/api/database/schema.ts', './auth-schema.ts'],
  dialect: 'sqlite',
  dbCredentials: {
    url: process.env.DB_FILE_NAME!,
  },
});
