import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { idParamSchema, userUpdateSchema } from "../../validators/resource.validator.js";
import * as controller from "./user.controller.js";

export function userRoutes() {
  const router = Router();
  router.get("/me", authenticate, controller.me);
  router.get("/me/dashboard", authenticate, controller.dashboard);
  router.put("/me", authenticate, validate(userUpdateSchema), controller.updateMe);
  router.get("/:id", validate(idParamSchema), controller.getById);
  return router;
}
