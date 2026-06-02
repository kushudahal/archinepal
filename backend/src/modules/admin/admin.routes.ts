import { Router } from "express";
import { ProjectStatus, Role } from "@prisma/client";
import { z } from "zod";
import { authenticate, authorize } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { idParamSchema } from "../../validators/resource.validator.js";
import * as controller from "./admin.controller.js";

const projectModerationSchema = idParamSchema.merge(z.object({ body: z.object({ status: z.nativeEnum(ProjectStatus) }) }));
const roleSchema = idParamSchema.merge(z.object({ body: z.object({ role: z.nativeEnum(Role) }) }));

export function adminRoutes() {
  const router = Router();
  router.use(authenticate, authorize(Role.admin, Role.super_admin, Role.moderator, Role.editor));
  router.get("/overview", controller.overview);
  router.get("/reports", controller.reports);
  router.patch("/projects/:id/status", validate(projectModerationSchema), controller.moderateProject);
  router.patch("/users/:id/role", authorize(Role.super_admin, Role.admin), validate(roleSchema), controller.updateUserRole);
  return router;
}
