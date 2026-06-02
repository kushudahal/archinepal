import { ProjectStatus, ReportStatus, Role } from "@prisma/client";
import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./admin.service.js";

export const overview = asyncHandler(async (_req, res) => sendSuccess(res, await service.overview()));
export const moderateProject = asyncHandler(async (req, res) => sendSuccess(res, await service.moderateProject(req.params.id, req.body.status as ProjectStatus, req.user!.id)));
export const updateUserRole = asyncHandler(async (req, res) => sendSuccess(res, await service.updateUserRole(req.params.id, req.body.role as Role, req.user!.id)));
export const reports = asyncHandler(async (req, res) => sendSuccess(res, await service.listReports(req.query.status as ReportStatus | undefined)));
