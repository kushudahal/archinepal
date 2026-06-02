import { Router } from "express";
import { authenticate } from "../../middlewares/auth.middleware.js";
import * as controller from "./search.controller.js";

export function searchRoutes() {
  const router = Router();
  router.get("/", controller.search);
  router.get("/autocomplete", controller.autocomplete);
  router.get("/trending", controller.trending);
  router.get("/personalized", authenticate, controller.search);
  return router;
}
