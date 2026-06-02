import { Router } from "express";
import { Role } from "@prisma/client";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { articleCreateSchema, slugParamSchema } from "../../validators/resource.validator.js";
import * as controller from "./article.controller.js";

export function articleRoutes() {
  const router = Router();
  router.get("/", controller.list);
  router.post("/", authenticate, authorize(Role.editor, Role.admin, Role.super_admin), validate(articleCreateSchema), controller.create);
  router.get("/:slug", validate(slugParamSchema), controller.getBySlug);
  return router;
}
