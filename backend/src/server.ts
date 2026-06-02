import http from "node:http";
import { createApp } from "./app.js";
import { env } from "./config/env.js";
import { prisma } from "./config/prisma.js";
import { redis } from "./config/redis.js";
import { attachSockets } from "./sockets/index.js";
import { logger } from "./utils/logger.js";

async function bootstrap() {
  await prisma.$connect();
  await redis.connect().catch((error: Error) => logger.warn({ error }, "Redis unavailable; continuing without cache connection"));

  const app = createApp();
  const server = http.createServer(app);
  attachSockets(server);

  server.listen(env.PORT, () => {
    logger.info(`ARCHINEPAL API running on ${env.API_URL}`);
  });

  const shutdown = async () => {
    logger.info("Shutting down API");
    server.close();
    await prisma.$disconnect();
    await redis.quit().catch(() => undefined);
    process.exit(0);
  };

  process.on("SIGTERM", shutdown);
  process.on("SIGINT", shutdown);
}

bootstrap().catch((error: Error) => {
  logger.fatal({ error }, "Failed to start API");
  process.exit(1);
});
