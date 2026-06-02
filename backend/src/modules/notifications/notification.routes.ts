import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { idParamSchema } from "../../validators/resource.validator.js";
import * as controller from "./notification.controller.js";

export function notificationRoutes() {
  const router = Router();
  router.use(authenticate);
  router.get("/", controller.list);
  router.patch("/:id/read", validate(idParamSchema), controller.markRead);
  return router;
}
