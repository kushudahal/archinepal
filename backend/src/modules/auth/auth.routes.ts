import { Router } from "express";
import { validate } from "../../middlewares/validate.js";
import { forgotPasswordSchema, loginSchema, refreshSchema, registerSchema, resetPasswordSchema } from "../../validators/auth.validator.js";
import * as controller from "./auth.controller.js";

export function authRoutes() {
  const router = Router();

  router.post("/register", validate(registerSchema), controller.register);
  router.post("/login", validate(loginSchema), controller.login);
  router.post("/logout", controller.logout);
  router.post("/refresh", validate(refreshSchema), controller.refresh);
  router.post("/forgot-password", validate(forgotPasswordSchema), controller.forgotPassword);
  router.post("/reset-password", validate(resetPasswordSchema), controller.resetPassword);

  return router;
}
