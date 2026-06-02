import { Role } from "@prisma/client";
import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    name: z.string().min(2).max(120),
    email: z.string().email().toLowerCase(),
    password: z.string().min(8).max(128),
    role: z.nativeEnum(Role).default(Role.student)
  })
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase(),
    password: z.string().min(8)
  })
});

export const forgotPasswordSchema = z.object({
  body: z.object({
    email: z.string().email().toLowerCase()
  })
});

export const resetPasswordSchema = z.object({
  body: z.object({
    token: z.string().min(20),
    password: z.string().min(8).max(128)
  })
});

export const refreshSchema = z.object({
  body: z.object({
    refreshToken: z.string().optional()
  }).optional()
});
