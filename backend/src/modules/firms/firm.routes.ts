import { Router } from "express";
import { Role } from "@prisma/client";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { firmCreateSchema, slugParamSchema } from "../../validators/resource.validator.js";
import * as controller from "./firm.controller.js";

export function firmRoutes() {
  const router = Router();
  router.get("/", controller.list);
  router.post("/", authenticate, authorize(Role.firm_owner, Role.admin, Role.super_admin), validate(firmCreateSchema), controller.create);
  router.get("/:slug", validate(slugParamSchema), controller.getBySlug);
  return router;
}
