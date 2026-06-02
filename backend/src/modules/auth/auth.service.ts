import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Role } from "@prisma/client";
import { addDays, addMinutes } from "../../utils/time.js";
import { prisma } from "../../config/prisma.js";
import { env } from "../../config/env.js";
import { redis } from "../../config/redis.js";
import { ApiError } from "../../utils/http.js";
import { createOpaqueToken, hashToken, signAccessToken, signRefreshToken } from "../../services/token.service.js";
import { emailTemplates, sendEmail } from "../../services/email.service.js";

export async function register(input: { name: string; email: string; password: string; role: Role }) {
  const password = await bcrypt.hash(input.password, 12);
  const user = await prisma.user.create({
    data: {
      name: input.name,
      email: input.email,
      password,
      role: input.role,
      profile: { create: {} }
    },
    select: publicUserSelect
  });

  const verifyToken = createOpaqueToken();
  await prisma.emailVerification.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(verifyToken),
      expiresAt: addDays(new Date(), 2)
    }
  });
  await sendEmail(user.email, "Verify your ARCHINEPAL account", emailTemplates.verify(`${env.FRONTEND_URL}/verify-email?token=${verifyToken}`));
  return user;
}

export async function login(input: { email: string; password: string }, meta: { userAgent?: string; ipAddress?: string }) {
  const user = await prisma.user.findUnique({ where: { email: input.email } });
  if (!user || user.isSuspended) throw new ApiError(401, "Invalid credentials.", "INVALID_CREDENTIALS");
  const valid = await bcrypt.compare(input.password, user.password);
  if (!valid) throw new ApiError(401, "Invalid credentials.", "INVALID_CREDENTIALS");

  const access = signAccessToken(user);
  const refresh = signRefreshToken(user.id);
  await prisma.session.create({
    data: {
      userId: user.id,
      refreshToken: hashToken(refresh.token),
      userAgent: meta.userAgent,
      ipAddress: meta.ipAddress,
      expiresAt: addDays(new Date(), 30)
    }
  });

  return {
    user: sanitizeUser(user),
    accessToken: access.token,
    refreshToken: refresh.token
  };
}

export async function refresh(refreshToken: string | undefined) {
  if (!refreshToken) throw new ApiError(401, "Refresh token required.", "REFRESH_REQUIRED");
  const payload = jwt.verify(refreshToken, env.REFRESH_SECRET) as { sub: string };
  const tokenHash = hashToken(refreshToken);
  const session = await prisma.session.findUnique({ where: { refreshToken: tokenHash }, include: { user: true } });
  if (!session || session.revokedAt || session.expiresAt < new Date()) {
    throw new ApiError(401, "Refresh token is invalid.", "INVALID_REFRESH_TOKEN");
  }
  if (payload.sub !== session.userId) throw new ApiError(401, "Refresh token mismatch.", "INVALID_REFRESH_TOKEN");
  return signAccessToken(session.user).token;
}

export async function logout(accessJti: string | undefined, refreshToken: string | undefined) {
  if (accessJti) await redis.set(`blacklist:${accessJti}`, "1", "EX", 15 * 60);
  if (refreshToken) {
    await prisma.session.updateMany({
      where: { refreshToken: hashToken(refreshToken), revokedAt: null },
      data: { revokedAt: new Date() }
    });
  }
}

export async function forgotPassword(email: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return;
  const token = createOpaqueToken();
  await prisma.passwordReset.create({
    data: {
      userId: user.id,
      tokenHash: hashToken(token),
      expiresAt: addMinutes(new Date(), 30)
    }
  });
  await sendEmail(user.email, "Reset your ARCHINEPAL password", emailTemplates.resetPassword(`${env.FRONTEND_URL}/reset-password?token=${token}`));
}

export async function resetPassword(token: string, password: string) {
  const tokenHash = hashToken(token);
  const reset = await prisma.passwordReset.findUnique({ where: { tokenHash } });
  if (!reset || reset.usedAt || reset.expiresAt < new Date()) throw new ApiError(400, "Reset token is invalid or expired.", "INVALID_RESET_TOKEN");
  await prisma.$transaction([
    prisma.user.update({ where: { id: reset.userId }, data: { password: await bcrypt.hash(password, 12) } }),
    prisma.passwordReset.update({ where: { id: reset.id }, data: { usedAt: new Date() } }),
    prisma.session.updateMany({ where: { userId: reset.userId, revokedAt: null }, data: { revokedAt: new Date() } })
  ]);
}

export const publicUserSelect = {
  id: true,
  name: true,
  email: true,
  role: true,
  avatar: true,
  bio: true,
  location: true,
  website: true,
  isEmailVerified: true,
  createdAt: true,
  updatedAt: true
};

function sanitizeUser<T extends { password: string }>(user: T) {
  const { password: _password, ...safe } = user;
  return safe;
}
