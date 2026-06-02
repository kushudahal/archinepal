import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./job.service.js";

export const list = asyncHandler(async (req, res) => sendSuccess(res, await service.listJobs(req.query)));
export const create = asyncHandler(async (req, res) => sendSuccess(res, await service.createJob(req.user!.id, req.body), 201));
export const getById = asyncHandler(async (req, res) => sendSuccess(res, await service.getJob(req.params.id)));
