import { NextFunction, Request, Response } from "express";
import { Prisma } from "@prisma/client";
import { env } from "../config/env.js";
import { ApiError } from "../utils/http.js";
import { logger } from "../utils/logger.js";

export function notFound(req: Request, _res: Response, next: NextFunction) {
  next(new ApiError(404, `Route not found: ${req.method} ${req.originalUrl}`, "NOT_FOUND"));
}

export function errorMiddleware(error: unknown, req: Request, res: Response, _next: NextFunction) {
  if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
    return res.status(409).json({ success: false, code: "CONFLICT", message: "Resource already exists." });
  }

  if (error instanceof ApiError) {
    return res.status(error.statusCode).json({ success: false, code: error.code, message: error.message });
  }

  logger.error({ error, requestId: req.requestId }, "Unhandled API error");
  return res.status(500).json({
    success: false,
    code: "INTERNAL_SERVER_ERROR",
    message: "Something went wrong.",
    debug: env.AUTH_DEBUG && error instanceof Error ? { name: error.name, message: error.message, stack: error.stack } : undefined
  });
}
