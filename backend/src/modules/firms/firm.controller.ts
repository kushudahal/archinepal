import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./firm.service.js";

export const list = asyncHandler(async (req, res) => sendSuccess(res, await service.listFirms(req.query)));
export const create = asyncHandler(async (req, res) => sendSuccess(res, await service.createFirm(req.user!.id, req.body), 201));
export const getBySlug = asyncHandler(async (req, res) => sendSuccess(res, await service.getFirm(req.params.slug)));
