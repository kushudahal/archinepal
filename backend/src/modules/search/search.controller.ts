import { asyncHandler } from "../../utils/async-handler.js";
import { sendSuccess } from "../../utils/http.js";
import * as service from "./search.service.js";

export const search = asyncHandler(async (req, res) => sendSuccess(res, await service.search(req.query, req.user?.id)));
export const autocomplete = asyncHandler(async (req, res) => sendSuccess(res, await service.autocomplete(String(req.query.q ?? ""))));
export const trending = asyncHandler(async (_req, res) => sendSuccess(res, await service.trendingSearches()));
