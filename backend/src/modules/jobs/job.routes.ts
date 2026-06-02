import { Router } from "express";
import { Role } from "@prisma/client";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { idParamSchema, jobCreateSchema } from "../../validators/resource.validator.js";
import * as controller from "./job.controller.js";

export function jobRoutes() {
  const router = Router();
  router.get("/", controller.list);
  router.post("/", authenticate, authorize(Role.firm_owner, Role.admin, Role.super_admin), validate(jobCreateSchema), controller.create);
  router.get("/:id", validate(idParamSchema), controller.getById);
  return router;
}
