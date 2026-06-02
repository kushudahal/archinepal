import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env, isProduction } from "../../config/env.js";
import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as authService from "./auth.service.js";

const cookieOptions = {
  httpOnly: true,
  secure: isProduction,
  sameSite: "lax" as const,
  signed: true
};

export const register = asyncHandler(async (req, res) => {
  const user = await authService.register(req.body);
  sendSuccess(res, user, 201);
});

export const login = asyncHandler(async (req: Request, res: Response) => {
  if (env.AUTH_DEBUG) {
    console.log("[auth.login] backend received login request", {
      email: req.body?.email,
      passwordPresent: Boolean(req.body?.password),
      contentType: req.get("content-type"),
      origin: req.get("origin")
    });
  }

  const result = await authService.login(req.body, {
    userAgent: req.get("user-agent"),
    ipAddress: req.ip
  });

  if (env.AUTH_DEBUG) {
    console.log("[auth.login] backend authenticated user", { userId: result.user.id, email: result.user.email });
  }

  res.cookie("accessToken", result.accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  res.cookie("refreshToken", result.refreshToken, { ...cookieOptions, maxAge: 30 * 24 * 60 * 60 * 1000 });

  if (env.AUTH_DEBUG) {
    console.log("[auth.login] backend sending login response with signed httpOnly cookies");
  }

  sendSuccess(res, result);
});

export const refresh = asyncHandler(async (req, res) => {
  const token = req.signedCookies?.refreshToken ?? req.body?.refreshToken;
  const accessToken = await authService.refresh(token);
  res.cookie("accessToken", accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 });
  sendSuccess(res, { accessToken });
});

export const logout = asyncHandler(async (req, res) => {
  const accessToken = req.signedCookies?.accessToken ?? req.headers.authorization?.replace("Bearer ", "");
  const decoded = accessToken ? (jwt.decode(accessToken) as { jti?: string } | null) : null;
  await authService.logout(decoded?.jti, req.signedCookies?.refreshToken);
  res.clearCookie("accessToken");
  res.clearCookie("refreshToken");
  sendSuccess(res, { loggedOut: true });
});

export const forgotPassword = asyncHandler(async (req, res) => {
  await authService.forgotPassword(req.body.email);
  sendSuccess(res, { message: "If the email exists, a reset link has been sent." });
});

export const resetPassword = asyncHandler(async (req, res) => {
  await authService.resetPassword(req.body.token, req.body.password);
  sendSuccess(res, { message: "Password updated." });
});
