import crypto from "node:crypto";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { env } from "../config/env.js";

export function signAccessToken(user: { id: string; email: string; role: Role }) {
  const jti = crypto.randomUUID();
  const token = jwt.sign({ email: user.email, role: user.role, jti }, env.JWT_SECRET, {
    subject: user.id,
    expiresIn: "15m"
  });
  return { token, jti };
}

export function signRefreshToken(userId: string) {
  const jti = crypto.randomUUID();
  const token = jwt.sign({ jti }, env.REFRESH_SECRET, {
    subject: userId,
    expiresIn: "30d"
  });
  return { token, jti };
}

export function hashToken(token: string) {
  return crypto.createHash("sha256").update(token).digest("hex");
}

export function createOpaqueToken() {
  return crypto.randomBytes(32).toString("hex");
}
