import compression from "compression";
import cookieParser from "cookie-parser";
import cors from "cors";
import csrf from "csurf";
import { json, urlencoded, type Application, type NextFunction, type Request, type Response } from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import slowDown from "express-slow-down";
import { env, isProduction } from "../config/env.js";

export function applySecurity(app: Application) {
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(
    cors({
      origin: env.FRONTEND_URL,
      credentials: true,
      methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"]
    })
  );
  app.use(compression());
  app.use(json({ limit: "1mb" }));
  app.use(urlencoded({ extended: true, limit: "1mb" }));
  app.use(cookieParser(env.COOKIE_SECRET));
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      limit: isProduction ? 300 : 1500,
      standardHeaders: true,
      legacyHeaders: false
    })
  );
  app.use(
    slowDown({
      windowMs: 15 * 60 * 1000,
      delayAfter: 80,
      delayMs: () => 250
    })
  );

  const csrfProtection = csrf({
    cookie: {
      httpOnly: true,
      sameSite: "lax",
      secure: isProduction
    }
  });

  app.use((req: Request, res: Response, next: NextFunction) => {
    if (["GET", "HEAD", "OPTIONS"].includes(req.method) || req.path.startsWith("/api/auth")) {
      next();
      return;
    }
    csrfProtection(req as never, res as never, next);
  });
}
