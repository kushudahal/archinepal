import { Router } from "express";
import { z } from "zod";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validate } from "../middlewares/validate.js";
import { asyncHandler } from "../utils/async-handler.js";
import { sendSuccess } from "../utils/http.js";
import { createUploadUrl } from "./storage.service.js";

const uploadSchema = z.object({
  body: z.object({
    filename: z.string().min(1),
    contentType: z.string().min(3),
    folder: z.string().optional()
  })
});

export function storageRoutes() {
  const router = Router();
  router.post(
    "/upload-url",
    authenticate,
    validate(uploadSchema),
    asyncHandler(async (req, res) => sendSuccess(res, await createUploadUrl(req.body)))
  );
  return router;
}
