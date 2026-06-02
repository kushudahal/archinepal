import { Router } from "express";
import { Role } from "@prisma/client";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { eventCreateSchema, idParamSchema } from "../../validators/resource.validator.js";
import * as controller from "./event.controller.js";

export function eventRoutes() {
  const router = Router();
  router.get("/", controller.list);
  router.post("/", authenticate, authorize(Role.editor, Role.admin, Role.super_admin, Role.firm_owner), validate(eventCreateSchema), controller.create);
  router.get("/:id", validate(idParamSchema), controller.getById);
  return router;
}
