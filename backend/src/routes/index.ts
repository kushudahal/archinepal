import { Router } from "express";
import { adminRoutes } from "../modules/admin/admin.routes.js";
import { articleRoutes } from "../modules/articles/article.routes.js";
import { authRoutes } from "../modules/auth/auth.routes.js";
import { eventRoutes } from "../modules/events/event.routes.js";
import { firmRoutes } from "../modules/firms/firm.routes.js";
import { jobRoutes } from "../modules/jobs/job.routes.js";
import { notificationRoutes } from "../modules/notifications/notification.routes.js";
import { projectRoutes } from "../modules/projects/project.routes.js";
import { searchRoutes } from "../modules/search/search.routes.js";
import { userRoutes } from "../modules/users/user.routes.js";
import { storageRoutes } from "../storage/storage.routes.js";

export function createRouter() {
  const router = Router();

  router.use("/auth", authRoutes());
  router.use("/users", userRoutes());
  router.use("/projects", projectRoutes());
  router.use("/firms", firmRoutes());
  router.use("/jobs", jobRoutes());
  router.use("/articles", articleRoutes());
  router.use("/events", eventRoutes());
  router.use("/search", searchRoutes());
  router.use("/notifications", notificationRoutes());
  router.use("/storage", storageRoutes());
  router.use("/admin", adminRoutes());

  return router;
}
