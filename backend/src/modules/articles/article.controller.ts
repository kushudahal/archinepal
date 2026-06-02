import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./article.service.js";

export const list = asyncHandler(async (req, res) => sendSuccess(res, await service.listArticles(req.query)));
export const create = asyncHandler(async (req, res) => sendSuccess(res, await service.createArticle(req.user!.id, req.body), 201));
export const getBySlug = asyncHandler(async (req, res) => sendSuccess(res, await service.getArticle(req.params.slug)));
