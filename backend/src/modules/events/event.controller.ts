import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./event.service.js";

export const list = asyncHandler(async (req, res) => sendSuccess(res, await service.listEvents(req.query)));
export const create = asyncHandler(async (req, res) => sendSuccess(res, await service.createEvent(req.user!.id, req.body), 201));
export const getById = asyncHandler(async (req, res) => sendSuccess(res, await service.getEvent(req.params.id)));
