import dotenv from "dotenv";
import { z } from "zod";

dotenv.config();

const testDefaults =
  process.env.NODE_ENV === "test"
    ? {
        DATABASE_URL: "postgresql://archinepal:archinepal@localhost:5432/archinepal_test?schema=public",
        JWT_SECRET: "test-access-secret-with-enough-length",
        REFRESH_SECRET: "test-refresh-secret-with-enough-length",
        COOKIE_SECRET: "test-cookie-secret",
        CSRF_SECRET: "test-csrf-secret"
      }
    : {};

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().default(4000),
  API_URL: z.string().url().default("http://localhost:4000"),
  FRONTEND_URL: z.string().url().default("http://localhost:3000"),
  DATABASE_URL: z.string().min(1),
  REDIS_URL: z.string().min(1).default("redis://localhost:6379"),
  JWT_SECRET: z.string().min(24),
  REFRESH_SECRET: z.string().min(24),
  COOKIE_SECRET: z.string().min(16).default("development-cookie-secret"),
  CSRF_SECRET: z.string().min(16).default("development-csrf-secret"),
  AWS_REGION: z.string().default("ap-south-1"),
  AWS_S3_BUCKET: z.string().optional(),
  AWS_ACCESS_KEY: z.string().optional(),
  AWS_SECRET_KEY: z.string().optional(),
  CLOUDINARY_URL: z.string().optional(),
  EMAIL_FROM: z.string().default("ARCHINEPAL <hello@archinepal.com>"),
  EMAIL_HOST: z.string().optional(),
  EMAIL_PORT: z.coerce.number().default(587),
  EMAIL_USER: z.string().optional(),
  EMAIL_PASSWORD: z.string().optional(),
  EMAIL_API_KEY: z.string().optional(),
  SENTRY_DSN: z.string().optional(),
  AUTH_DEBUG: z.coerce.boolean().default(false)
});

export const env = envSchema.parse({ ...testDefaults, ...process.env });
export const isProduction = env.NODE_ENV === "production";
