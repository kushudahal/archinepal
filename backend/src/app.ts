import express from "express";
import { pinoHttp } from "pino-http";
import swaggerUi from "swagger-ui-express";
import { createRouter } from "./routes/index.js";
import { swaggerSpec } from "./docs/swagger.js";
import { applySecurity } from "./middlewares/security.middleware.js";
import { requestContext } from "./middlewares/request-context.middleware.js";
import { errorMiddleware, notFound } from "./middlewares/error.middleware.js";
import { logger } from "./utils/logger.js";

export function createApp() {
  const app = express();

  app.use(requestContext);
  app.use(pinoHttp({ logger }));
  applySecurity(app);

  app.get("/health", (_req, res) => {
    res.json({ status: "ok", service: "archinepal-api" });
  });

  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use("/api", createRouter());
  app.use(notFound);
  app.use(errorMiddleware);

  return app;
}
