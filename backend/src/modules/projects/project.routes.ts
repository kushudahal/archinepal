import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import { validate } from "../../middlewares/validate.js";
import { commentCreateSchema, idParamSchema, projectCreateSchema, projectQuerySchema, slugParamSchema } from "../../validators/resource.validator.js";
import * as controller from "./project.controller.js";

export function projectRoutes() {
  const router = Router();
  router.get("/", validate(projectQuerySchema), controller.list);
  router.get("/:slug", validate(slugParamSchema), controller.getBySlug);
  router.post("/", authenticate, validate(projectCreateSchema), controller.create);
  router.put("/:id", authenticate, validate(idParamSchema.merge(projectCreateSchema.partial())), controller.update);
  router.delete("/:id", authenticate, validate(idParamSchema), controller.remove);
  router.post("/:id/likes", authenticate, validate(idParamSchema), controller.like);
  router.post("/:id/comments", authenticate, validate(idParamSchema.merge(commentCreateSchema)), controller.comment);
  return router;
}
