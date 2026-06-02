import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "../config/env.js";
import { redis } from "../config/redis.js";
import { ApiError } from "../utils/http.js";
import { logger } from "../utils/logger.js";

type AccessPayload = {
  sub: string;
  email: string;
  role: Role;
  jti: string;
};

export async function authenticate(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : req.signedCookies?.accessToken;

  if (!token) {
    next(new ApiError(401, "Authentication required.", "UNAUTHENTICATED"));
    return;
  }

  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as AccessPayload;
    const blacklisted =
      redis.status === "ready"
        ? await redis.get(`blacklist:${payload.jti}`).catch((error: Error) => {
            logger.warn({ error }, "Redis unavailable during token blacklist check; allowing request");
            return null;
          })
        : null;
    if (blacklisted) throw new ApiError(401, "Token has been revoked.", "TOKEN_REVOKED");
    req.user = { id: payload.sub, email: payload.email, role: payload.role };
    next();
  } catch (error) {
    next(error instanceof ApiError ? error : new ApiError(401, "Invalid or expired token.", "INVALID_TOKEN"));
  }
}

export function authorize(...roles: Role[]) {
  return (req: Request, _res: Response, next: NextFunction) => {
    if (!req.user) {
      next(new ApiError(401, "Authentication required.", "UNAUTHENTICATED"));
      return;
    }
    if (!roles.includes(req.user.role)) {
      next(new ApiError(403, "You do not have permission to perform this action.", "FORBIDDEN"));
      return;
    }
    next();
  };
}
