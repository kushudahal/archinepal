import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./notification.service.js";

export const list = asyncHandler(async (req, res) => sendSuccess(res, await service.listNotifications(req.user!.id)));
export const markRead = asyncHandler(async (req, res) => sendSuccess(res, await service.markRead(req.user!.id, req.params.id)));
