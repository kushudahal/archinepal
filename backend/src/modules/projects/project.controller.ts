import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./project.service.js";

export const list = asyncHandler(async (req, res) => sendSuccess(res, await service.listProjects(req.query)));
export const getBySlug = asyncHandler(async (req, res) => sendSuccess(res, await service.getProject(req.params.slug)));
export const create = asyncHandler(async (req, res) => sendSuccess(res, await service.createProject(req.user!.id, req.body), 201));
export const update = asyncHandler(async (req, res) => sendSuccess(res, await service.updateProject(req.user!.id, req.params.id, req.body)));
export const remove = asyncHandler(async (req, res) => {
  await service.deleteProject(req.user!.id, req.params.id);
  sendSuccess(res, { deleted: true });
});
export const like = asyncHandler(async (req, res) => sendSuccess(res, await service.likeProject(req.user!.id, req.params.id)));
export const comment = asyncHandler(async (req, res) => sendSuccess(res, await service.commentOnProject(req.user!.id, req.params.id, req.body.content), 201));
