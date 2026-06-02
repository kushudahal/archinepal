import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./user.service.js";

export const me = asyncHandler(async (req, res) => sendSuccess(res, await service.getMe(req.user!.id)));
export const dashboard = asyncHandler(async (req, res) => sendSuccess(res, await service.getDashboard(req.user!.id)));
export const updateMe = asyncHandler(async (req, res) => sendSuccess(res, await service.updateMe(req.user!.id, req.body)));
export const getById = asyncHandler(async (req, res) => sendSuccess(res, await service.getPublicUser(req.params.id)));
